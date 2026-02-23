import { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Bell,
    Globe,
    Palette,
    Shield,
    CreditCard,
    ExternalLink,
    Check,
    ChevronRight,
    Moon,
    Sun,
    Eye,
    EyeOff,
    Link2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const SettingsPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        attendance: true,
        performance: true,
        contests: true,
        deadlines: true,
        email: false,
    });
    const [privacy, setPrivacy] = useState({
        showProfile: true,
        showCoding: true,
        showAttendance: false,
    });
    const [linkedAccounts, setLinkedAccounts] = useState({
        leetcode: { connected: true, handle: "@nakul_g" },
        codeforces: { connected: true, handle: "@nakul_cf" },
        github: { connected: true, handle: "@nakulgupta" },
        codechef: { connected: false, handle: "" },
    });

    const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
        <button
            onClick={onChange}
            className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-primary" : "bg-secondary"}`}
        >
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
        </button>
    );

    return (
        <DashboardLayout title="Settings" subtitle="Manage your account & preferences" role="student">
            <div className="max-w-3xl space-y-6">
                {/* Profile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <User className="h-5 w-5 text-primary" />
                        <h3 className="font-display font-semibold text-foreground">Profile Information</h3>
                    </div>
                    <div className="flex items-center gap-4 mb-5">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-xl font-bold text-white shadow-glow">
                            NG
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Nakul Gupta</p>
                            <p className="text-xs text-muted-foreground">BTCS22-042 · CS-A · 6th Semester</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                            <Input defaultValue="Nakul Gupta" className="bg-secondary/50 border-border" />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                            <Input defaultValue="nakul.gupta@campus.edu" className="bg-secondary/50 border-border" />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Enrollment Number</label>
                            <Input defaultValue="BTCS22-042" disabled className="bg-secondary/30 border-border opacity-60" />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Section</label>
                            <Input defaultValue="CS-A" disabled className="bg-secondary/30 border-border opacity-60" />
                        </div>
                    </div>
                    <button className="mt-4 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                        Save Changes
                    </button>
                </motion.div>

                {/* Linked Accounts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Link2 className="h-5 w-5 text-primary" />
                        <h3 className="font-display font-semibold text-foreground">Linked Accounts</h3>
                    </div>
                    <div className="space-y-3">
                        {Object.entries(linkedAccounts).map(([platform, data]) => (
                            <div key={platform} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                                <div className="flex items-center gap-3">
                                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold ${data.connected ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                                        }`}>
                                        {platform.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground capitalize">{platform}</p>
                                        <p className="text-xs text-muted-foreground">{data.connected ? data.handle : "Not connected"}</p>
                                    </div>
                                </div>
                                <button className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${data.connected
                                        ? "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20"
                                        : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                                    }`}>
                                    {data.connected ? "Connected" : "Connect"}
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Bell className="h-5 w-5 text-primary" />
                        <h3 className="font-display font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { key: "attendance", label: "Attendance Alerts", desc: "Get notified when attendance drops below threshold" },
                            { key: "performance", label: "Performance Updates", desc: "Weekly performance summaries and insights" },
                            { key: "contests", label: "Contest Reminders", desc: "Upcoming coding contest notifications" },
                            { key: "deadlines", label: "Deadline Alerts", desc: "Assignment and exam deadline reminders" },
                            { key: "email", label: "Email Notifications", desc: "Receive important updates via email" },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                                <ToggleSwitch
                                    checked={notifications[item.key as keyof typeof notifications]}
                                    onChange={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Privacy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Shield className="h-5 w-5 text-primary" />
                        <h3 className="font-display font-semibold text-foreground">Privacy & Visibility</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { key: "showProfile", label: "Show Profile on Leaderboard", desc: "Allow others to see your name on the leaderboard" },
                            { key: "showCoding", label: "Show Coding Profiles", desc: "Display linked coding platform stats publicly" },
                            { key: "showAttendance", label: "Show Attendance", desc: "Allow attendance data to be visible to peers" },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                                <ToggleSwitch
                                    checked={privacy[item.key as keyof typeof privacy]}
                                    onChange={() => setPrivacy((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Lock className="h-5 w-5 text-primary" />
                        <h3 className="font-display font-semibold text-foreground">Security</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Current Password</label>
                            <div className="relative">
                                <Input type={showPassword ? "text" : "password"} defaultValue="••••••••" className="bg-secondary/50 border-border pr-10" />
                                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">New Password</label>
                            <Input type="password" placeholder="Enter new password" className="bg-secondary/50 border-border" />
                        </div>
                    </div>
                    <button className="mt-4 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                        Update Password
                    </button>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default SettingsPage;
