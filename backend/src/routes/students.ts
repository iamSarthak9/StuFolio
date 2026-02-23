import { Router, Response } from "express";
import prisma from "../lib/prisma";
import { AuthRequest, authenticateToken, requireRole } from "../middleware/auth";

const router = Router();

// GET /api/students/me — dashboard data
router.get("/me", authenticateToken, requireRole("STUDENT"), async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            include: {
                student: {
                    include: {
                        semesterCGPAs: { orderBy: { semester: "asc" } },
                        codingProfiles: true,
                        badges: true,
                        attendances: { include: { subject: true } },
                    },
                },
            },
        });

        if (!user?.student) {
            return res.status(404).json({ error: "Student profile not found" });
        }

        const s = user.student;

        // Build dashboard response
        const statCards = [
            { label: "Performance Index", value: s.performanceIdx?.toFixed(1) || "0", change: "+5.2% this month", icon: "TrendingUp", accent: "primary" },
            { label: "Current CGPA", value: s.cgpa.toFixed(2), change: `Semester ${s.semesterCGPAs.length}`, icon: "GraduationCap", accent: "accent" },
            { label: "Problems Solved", value: String(s.codingScore || 0), change: "Across all platforms", icon: "Code", accent: "warning" },
            { label: "Day Streak", value: String(s.streak), change: "Keep it up!", icon: "Flame", accent: "accent" },
        ];

        // Coding profile summary
        const codingProfiles = s.codingProfiles.map((cp) => ({
            platform: cp.platform,
            handle: cp.handle,
            stats: JSON.parse(cp.stats),
        }));

        // Warnings based on attendance
        const warnings = s.attendances
            .filter((a) => (a.attended / a.total) * 100 < 75)
            .map((a) => ({
                text: `${a.subject.code} attendance at ${((a.attended / a.total) * 100).toFixed(0)}% — below 75% eligibility threshold!`,
                type: "danger",
            }));

        // Performance trend from semester CGPAs
        const performanceTrend = s.semesterCGPAs.map((sc) => ({
            semester: sc.semester,
            cgpa: sc.cgpa,
        }));

        return res.json({
            profile: {
                name: user.name,
                enrollment: s.enrollment,
                section: s.section,
                semester: s.semester,
                branch: s.branch,
                year: s.year,
                cgpa: s.cgpa,
                rank: s.rank,
                totalStudents: s.totalStudents,
            },
            statCards,
            codingProfiles,
            warnings,
            performanceTrend,
            badges: s.badges.filter((b) => b.earned).map((b) => ({ label: b.label, icon: b.icon })),
        });
    } catch (error: any) {
        console.error("Student dashboard error:", error);
        return res.status(500).json({ error: "Failed to load dashboard" });
    }
});

// GET /api/students/me/profile — full profile page
router.get("/me/profile", authenticateToken, requireRole("STUDENT"), async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            include: {
                student: {
                    include: {
                        semesterCGPAs: { orderBy: { semester: "asc" } },
                        codingProfiles: true,
                        badges: true,
                        skills: { include: { skill: true } },
                    },
                },
            },
        });

        if (!user?.student) return res.status(404).json({ error: "Student not found" });

        const s = user.student;

        return res.json({
            profile: {
                name: user.name,
                enrollment: s.enrollment,
                email: user.email,
                section: s.section,
                semester: s.semester,
                branch: s.branch,
                year: s.year,
                cgpa: s.cgpa,
                rank: s.rank,
                totalStudents: s.totalStudents,
            },
            semesterCGPAs: s.semesterCGPAs.map((sc) => ({ sem: sc.semester, cgpa: sc.cgpa })),
            codingProfiles: s.codingProfiles.map((cp) => ({
                platform: cp.platform,
                handle: cp.handle,
                stats: JSON.parse(cp.stats),
            })),
            badges: s.badges.map((b) => ({
                label: b.label,
                description: b.description,
                icon: b.icon,
                earned: b.earned,
            })),
            skills: s.skills.map((ss) => ss.skill.name),
        });
    } catch (error: any) {
        console.error("Profile error:", error);
        return res.status(500).json({ error: "Failed to load profile" });
    }
});

// GET /api/students/me/attendance — attendance page
router.get("/me/attendance", authenticateToken, requireRole("STUDENT"), async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            include: {
                student: {
                    include: {
                        attendances: { include: { subject: true } },
                    },
                },
            },
        });

        if (!user?.student) return res.status(404).json({ error: "Student not found" });

        const subjects = user.student.attendances.map((a) => {
            const pct = (a.attended / a.total) * 100;
            return {
                name: a.subject.name,
                code: a.subject.code,
                attended: a.attended,
                total: a.total,
                percentage: Number(pct.toFixed(1)),
                status: pct >= 80 ? "safe" : pct >= 75 ? "warning" : "danger",
            };
        });

        const overallAttended = subjects.reduce((a, s) => a + s.attended, 0);
        const overallTotal = subjects.reduce((a, s) => a + s.total, 0);

        return res.json({
            subjects,
            overall: {
                attended: overallAttended,
                total: overallTotal,
                percentage: Number(((overallAttended / overallTotal) * 100).toFixed(1)),
            },
        });
    } catch (error: any) {
        console.error("Attendance error:", error);
        return res.status(500).json({ error: "Failed to load attendance" });
    }
});

// GET /api/students/me/academics — academic records
router.get("/me/academics", authenticateToken, requireRole("STUDENT"), async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            include: {
                student: {
                    include: {
                        semesterCGPAs: { orderBy: { semester: "asc" } },
                        academicRecords: { include: { subject: true } },
                    },
                },
            },
        });

        if (!user?.student) return res.status(404).json({ error: "Student not found" });

        return res.json({
            semesterCGPAs: user.student.semesterCGPAs.map((sc) => ({ sem: sc.semester, cgpa: sc.cgpa })),
            records: user.student.academicRecords.map((r) => ({
                subject: r.subject.name,
                code: r.subject.code,
                marks: r.marks,
                maxMarks: r.maxMarks,
                grade: r.grade,
                semester: r.semester,
            })),
        });
    } catch (error: any) {
        console.error("Academics error:", error);
        return res.status(500).json({ error: "Failed to load academics" });
    }
});

// GET /api/students/:id — specific student (for mentors)
router.get("/:id", authenticateToken, requireRole("MENTOR"), async (req: AuthRequest, res: Response) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: req.params.id },
            include: {
                user: { select: { name: true, email: true } },
                semesterCGPAs: { orderBy: { semester: "asc" } },
                academicRecords: { include: { subject: true } },
                attendances: { include: { subject: true } },
                codingProfiles: true,
                badges: true,
                skills: { include: { skill: true } },
            },
        });

        if (!student) return res.status(404).json({ error: "Student not found" });

        return res.json({
            profile: {
                id: student.id,
                name: student.user.name,
                email: student.user.email,
                enrollment: student.enrollment,
                section: student.section,
                semester: student.semester,
                branch: student.branch,
                year: student.year,
                cgpa: student.cgpa,
                rank: student.rank,
            },
            semesterCGPAs: student.semesterCGPAs.map((sc) => ({ sem: sc.semester, cgpa: sc.cgpa })),
            attendance: student.attendances.map((a) => ({
                subject: a.subject.name,
                code: a.subject.code,
                attended: a.attended,
                total: a.total,
                percentage: Number(((a.attended / a.total) * 100).toFixed(1)),
            })),
            codingProfiles: student.codingProfiles.map((cp) => ({
                platform: cp.platform,
                handle: cp.handle,
                stats: JSON.parse(cp.stats),
            })),
            badges: student.badges.map((b) => ({ label: b.label, earned: b.earned })),
            skills: student.skills.map((ss) => ss.skill.name),
            academicRecords: student.academicRecords.map((r) => ({
                subject: r.subject.name,
                code: r.subject.code,
                marks: r.marks,
                maxMarks: r.maxMarks,
                grade: r.grade,
                semester: r.semester,
            })),
        });
    } catch (error: any) {
        console.error("Student detail error:", error);
        return res.status(500).json({ error: "Failed to load student" });
    }
});

export default router;
