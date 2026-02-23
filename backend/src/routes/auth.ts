import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { createClerkClient } from "@clerk/clerk-sdk-node";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const router = Router();

// POST /api/auth/sync
// This endpoint is called by the frontend after a successful Clerk login/signup
router.post("/sync", async (req: Request, res: Response) => {
    try {
        console.log("🔄 Syncing user identity...", req.body);
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "No session token provided" });
        }

        // Verify with Clerk first
        const session = await clerk.verifyToken(token);
        const { clerkId, email, name } = req.body;

        if (!clerkId || !email) {
            return res.status(400).json({ error: "clerkId and email are required for sync" });
        }

        if (session.sub !== clerkId) {
            return res.status(403).json({ error: "Token does not match clerkId" });
        }

        // 1. Check if user already exists in local DB
        let user = await prisma.user.findUnique({
            where: { clerkId },
            include: { student: true, mentor: true }
        });

        if (!user) {
            // 2. If not, check if a user with this email exists (maybe they registered before Clerk)
            user = await prisma.user.findUnique({
                where: { email },
                include: { student: true, mentor: true }
            });

            if (user) {
                // Link existing user to Clerk
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { clerkId },
                    include: { student: true, mentor: true }
                });
            } else {
                // 3. Create a brand new user (Default to STUDENT for now)
                user = await prisma.user.create({
                    data: {
                        clerkId,
                        email,
                        name: name || email.split("@")[0],
                        role: "STUDENT",
                        student: {
                            create: {
                                enrollment: `STU-${Date.now()}`,
                                section: "CS-A",
                                semester: "1st Semester",
                                branch: "Computer Science & Engineering",
                                year: "1st Year",
                            },
                        },
                    },
                    include: { student: true, mentor: true }
                });
            }
        }

        return res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                studentId: user.student?.id,
                mentorId: user.mentor?.id,
            },
        });
    } catch (error: any) {
        console.error("Sync error:", error);
        return res.status(500).json({ error: "Failed to synchronize user" });
    }
});

export default router;
