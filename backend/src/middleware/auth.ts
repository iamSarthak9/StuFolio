import { Request, Response, NextFunction } from "express";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import prisma from "../lib/prisma";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
        clerkId: string;
    };
}

export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }

    try {
        // Verify session with Clerk
        const session = await clerk.verifyToken(token);

        // Find local user by clerkId
        const user = await prisma.user.findUnique({
            where: { clerkId: session.sub },
            include: { student: true, mentor: true }
        });

        if (!user) {
            return res.status(401).json({ error: "User not synchronized. Please log in again." });
        }

        req.user = {
            userId: user.id,
            role: user.role,
            clerkId: session.sub,
        };
        next();
    } catch (err) {
        console.error("Clerk auth error:", err);
        return res.status(403).json({ error: "Invalid or expired session" });
    }
}

export function requireRole(...roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: "Not authenticated" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Insufficient permissions" });
        }
        next();
    };
}
