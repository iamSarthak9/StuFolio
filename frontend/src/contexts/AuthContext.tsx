import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from "@clerk/clerk-react";
import api from "@/lib/api";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    studentId?: string;
    mentorId?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: Record<string, any>) => Promise<void>;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
    const { getToken, signOut } = useClerkAuth();
    const { signIn } = useSignIn();
    const { signUp } = useSignUp();

    const [user, setUser] = useState<User | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);

    // Sync Clerk user with our backend
    useEffect(() => {
        const syncUser = async () => {
            if (!clerkLoaded) return;

            if (clerkUser) {
                setIsSyncing(true);
                try {
                    const token = await getToken();
                    if (token) {
                        api.setToken(token);
                        // Call backend to sync/get local user info
                        const data = await api.request<any>("/auth/sync", {
                            method: "POST",
                            body: JSON.stringify({
                                clerkId: clerkUser.id,
                                email: clerkUser.primaryEmailAddress?.emailAddress,
                                name: clerkUser.fullName || clerkUser.username || "User",
                            })
                        });
                        setUser(data.user);
                    }
                } catch (err) {
                    console.error("User sync failed:", err);
                    setUser(null);
                } finally {
                    setIsSyncing(false);
                }
            } else {
                setUser(null);
                api.setToken(null);
                setIsSyncing(false);
            }
        };

        syncUser();
    }, [clerkUser, clerkLoaded, getToken]);

    const login = async (email: string, password: string) => {
        if (!signIn) return;
        const result = await signIn.create({
            identifier: email,
            password,
        });
        if (result.status !== "complete") {
            throw new Error("Login incomplete, please check your credentials.");
        }
    };

    const register = async (userData: Record<string, any>) => {
        if (!signUp) return;
        await signUp.create({
            emailAddress: userData.email,
            password: userData.password,
            firstName: userData.name.split(" ")[0],
            lastName: userData.name.split(" ").slice(1).join(" "),
        });
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    };

    const logout = async () => {
        await signOut();
        setUser(null);
    };

    const signInWithGoogle = async () => {
        if (!signIn) return;
        // Redirect back to login so sync can happen before reaching protected dashboard
        await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/login",
            redirectUrlComplete: "/login",
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading: !clerkLoaded || isSyncing,
                isAuthenticated: !!clerkUser,
                login,
                register,
                logout,
                signInWithGoogle,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;
