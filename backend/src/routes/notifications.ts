import { Router, Response } from "express";
import prisma from "../lib/prisma";
import { AuthRequest, authenticateToken } from "../middleware/auth";

const router = Router();

// GET /api/notifications — current user's notifications
router.get("/", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: req.user!.userId },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        return res.json(notifications);
    } catch (error: any) {
        console.error("Notifications error:", error);
        return res.status(500).json({ error: "Failed to load notifications" });
    }
});

// PATCH /api/notifications/:id/read — mark as read
router.patch("/:id/read", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const notification = await prisma.notification.update({
            where: { id: req.params.id },
            data: { read: true },
        });

        return res.json(notification);
    } catch (error: any) {
        console.error("Mark read error:", error);
        return res.status(500).json({ error: "Failed to update notification" });
    }
});

// PATCH /api/notifications/read-all — mark all as read
router.patch("/read-all", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.notification.updateMany({
            where: { userId: req.user!.userId, read: false },
            data: { read: true },
        });

        return res.json({ success: true });
    } catch (error: any) {
        console.error("Mark all read error:", error);
        return res.status(500).json({ error: "Failed to update notifications" });
    }
});

export default router;
