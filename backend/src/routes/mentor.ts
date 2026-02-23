import { Router, Response } from "express";
import prisma from "../lib/prisma";
import { AuthRequest, authenticateToken, requireRole } from "../middleware/auth";

const router = Router();

// GET /api/mentor/dashboard — overview stats + student list
router.get("/dashboard", authenticateToken, requireRole("MENTOR"), async (req: AuthRequest, res: Response) => {
    try {
        const mentor = await prisma.mentor.findUnique({
            where: { userId: req.user!.userId },
        });

        if (!mentor) return res.status(404).json({ error: "Mentor profile not found" });

        // Get all students in mentor's section
        const students = await prisma.student.findMany({
            where: { section: mentor.section },
            include: {
                user: { select: { name: true } },
                attendances: { include: { subject: true } },
                codingProfiles: true,
            },
        });

        const totalStudents = students.length;

        // At-risk students (attendance below 75% in any subject)
        const atRiskStudents = students.filter((s) =>
            s.attendances.some((a) => (a.attended / a.total) * 100 < 75)
        );

        // CGPA distribution
        const cgpaRanges = [
            { range: "Below 6", count: 0 },
            { range: "6-7", count: 0 },
            { range: "7-8", count: 0 },
            { range: "8-9", count: 0 },
            { range: "9+", count: 0 },
        ];
        students.forEach((s) => {
            if (s.cgpa < 6) cgpaRanges[0].count++;
            else if (s.cgpa < 7) cgpaRanges[1].count++;
            else if (s.cgpa < 8) cgpaRanges[2].count++;
            else if (s.cgpa < 9) cgpaRanges[3].count++;
            else cgpaRanges[4].count++;
        });

        // Attendance distribution
        const aboveThreshold = students.filter((s) => {
            const totalAtt = s.attendances.reduce((sum, a) => sum + a.attended, 0);
            const totalClasses = s.attendances.reduce((sum, a) => sum + a.total, 0);
            return totalClasses > 0 && (totalAtt / totalClasses) * 100 >= 85;
        }).length;

        const nearThreshold = students.filter((s) => {
            const totalAtt = s.attendances.reduce((sum, a) => sum + a.attended, 0);
            const totalClasses = s.attendances.reduce((sum, a) => sum + a.total, 0);
            const pct = totalClasses > 0 ? (totalAtt / totalClasses) * 100 : 0;
            return pct >= 75 && pct < 85;
        }).length;

        const belowThreshold = totalStudents - aboveThreshold - nearThreshold;

        // Average CGPA
        const avgCGPA = totalStudents > 0
            ? (students.reduce((sum, s) => sum + s.cgpa, 0) / totalStudents).toFixed(2)
            : "0";

        // Student list for table
        const studentList = students.map((s) => {
            const totalProblems = s.codingProfiles.reduce((sum, cp) => {
                const stats = JSON.parse(cp.stats) as { label: string; value: string }[];
                const solved = stats.find((st) => st.label.toLowerCase().includes("solved"));
                return sum + (solved ? parseInt(solved.value.replace(/,/g, "")) || 0 : 0);
            }, 0);

            const totalAtt = s.attendances.reduce((sum, a) => sum + a.attended, 0);
            const totalClasses = s.attendances.reduce((sum, a) => sum + a.total, 0);
            const attPct = totalClasses > 0 ? Math.round((totalAtt / totalClasses) * 100) : 0;

            return {
                id: s.id,
                name: s.user.name,
                cgpa: s.cgpa,
                problems: totalProblems,
                attendance: attPct,
                status: attPct < 75 ? "danger" : s.cgpa < 6 ? "warning" : "ok",
                trend: s.cgpa >= 8 ? "up" : s.cgpa >= 7 ? "same" : "down",
            };
        });

        return res.json({
            stats: {
                totalStudents,
                atRiskCount: atRiskStudents.length,
                averageCGPA: avgCGPA,
                section: mentor.section,
            },
            cgpaDistribution: cgpaRanges,
            attendanceDistribution: [
                { name: "Above 85%", value: aboveThreshold, color: "hsl(160, 84%, 39%)" },
                { name: "75-85%", value: nearThreshold, color: "hsl(217, 91%, 60%)" },
                { name: "Below 75%", value: belowThreshold, color: "hsl(0, 72%, 51%)" },
            ],
            students: studentList,
        });
    } catch (error: any) {
        console.error("Mentor dashboard error:", error);
        return res.status(500).json({ error: "Failed to load dashboard" });
    }
});

// GET /api/mentor/students — all students with optional filters
router.get("/students", authenticateToken, requireRole("MENTOR"), async (req: AuthRequest, res: Response) => {
    try {
        const { section, semester, search } = req.query;

        const mentor = await prisma.mentor.findUnique({
            where: { userId: req.user!.userId },
        });

        if (!mentor) return res.status(404).json({ error: "Mentor not found" });

        const where: any = { section: mentor.section };
        if (section) where.section = section;
        if (semester) where.semester = semester;
        if (search) {
            where.user = { name: { contains: String(search) } };
        }

        const students = await prisma.student.findMany({
            where,
            include: {
                user: { select: { name: true, email: true } },
                attendances: true,
                codingProfiles: true,
            },
            orderBy: { cgpa: "desc" },
        });

        return res.json(
            students.map((s) => {
                const totalAtt = s.attendances.reduce((sum, a) => sum + a.attended, 0);
                const totalClasses = s.attendances.reduce((sum, a) => sum + a.total, 0);
                return {
                    id: s.id,
                    name: s.user.name,
                    email: s.user.email,
                    enrollment: s.enrollment,
                    cgpa: s.cgpa,
                    attendance: totalClasses > 0 ? Math.round((totalAtt / totalClasses) * 100) : 0,
                    section: s.section,
                    semester: s.semester,
                };
            })
        );
    } catch (error: any) {
        console.error("Mentor students error:", error);
        return res.status(500).json({ error: "Failed to load students" });
    }
});

// GET /api/mentor/analytics — batch analytics
router.get("/analytics", authenticateToken, requireRole("MENTOR"), async (req: AuthRequest, res: Response) => {
    try {
        const mentor = await prisma.mentor.findUnique({
            where: { userId: req.user!.userId },
        });

        if (!mentor) return res.status(404).json({ error: "Mentor not found" });

        const students = await prisma.student.findMany({
            where: { section: mentor.section },
            include: {
                semesterCGPAs: { orderBy: { semester: "asc" } },
                attendances: { include: { subject: true } },
                academicRecords: { include: { subject: true } },
            },
        });

        // Performance bands
        const bands = {
            excellent: students.filter((s) => s.cgpa >= 9).length,
            good: students.filter((s) => s.cgpa >= 8 && s.cgpa < 9).length,
            average: students.filter((s) => s.cgpa >= 7 && s.cgpa < 8).length,
            belowAverage: students.filter((s) => s.cgpa >= 6 && s.cgpa < 7).length,
            poor: students.filter((s) => s.cgpa < 6).length,
        };

        // Subject-wise average marks
        const subjectAverages: Record<string, { total: number; count: number; name: string }> = {};
        students.forEach((s) => {
            s.academicRecords.forEach((r) => {
                if (!subjectAverages[r.subject.code]) {
                    subjectAverages[r.subject.code] = { total: 0, count: 0, name: r.subject.name };
                }
                subjectAverages[r.subject.code].total += r.marks;
                subjectAverages[r.subject.code].count++;
            });
        });

        const subjectStats = Object.entries(subjectAverages).map(([code, data]) => ({
            code,
            name: data.name,
            average: Number((data.total / data.count).toFixed(1)),
        }));

        return res.json({
            totalStudents: students.length,
            performanceBands: bands,
            subjectAverages: subjectStats,
        });
    } catch (error: any) {
        console.error("Analytics error:", error);
        return res.status(500).json({ error: "Failed to load analytics" });
    }
});

export default router;
