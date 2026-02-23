import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...\n");

    // Clean existing data
    await prisma.notification.deleteMany();
    await prisma.event.deleteMany();
    await prisma.studentSkill.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.badge.deleteMany();
    await prisma.codingProfile.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.academicRecord.deleteMany();
    await prisma.semesterCGPA.deleteMany();
    await prisma.student.deleteMany();
    await prisma.mentor.deleteMany();
    await prisma.user.deleteMany();
    await prisma.subject.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);

    // ─── Create Subjects ──────────────────────────────
    const subjectsData = [
        { name: "Data Structures & Algorithms", code: "CS301", semester: "5th Semester" },
        { name: "Operating Systems", code: "CS302", semester: "5th Semester" },
        { name: "Database Management Systems", code: "CS303", semester: "5th Semester" },
        { name: "Computer Networks", code: "CS304", semester: "5th Semester" },
        { name: "Object Oriented Programming", code: "CS305", semester: "5th Semester" },
        { name: "Software Engineering", code: "CS306", semester: "5th Semester" },
    ];

    const subjects: Record<string, any> = {};
    for (const s of subjectsData) {
        subjects[s.code] = await prisma.subject.create({ data: s });
    }
    console.log(`✅ Created ${Object.keys(subjects).length} subjects`);

    // ─── Create Skills ────────────────────────────────
    const skillNames = ["C++", "Python", "JavaScript", "React", "Node.js", "SQL", "Data Structures", "Algorithms", "Machine Learning", "Git"];
    const skills: Record<string, any> = {};
    for (const name of skillNames) {
        skills[name] = await prisma.skill.create({ data: { name } });
    }
    console.log(`✅ Created ${Object.keys(skills).length} skills`);

    // ─── Create Demo Student: Nakul Gupta ─────────────
    const studentUser = await prisma.user.create({
        data: {
            email: "nakul.gupta@campus.edu",
            password: hashedPassword,
            name: "Nakul Gupta",
            role: "STUDENT",
            student: {
                create: {
                    enrollment: "BTCS22-042",
                    section: "CS-A",
                    semester: "6th Semester",
                    branch: "Computer Science & Engineering",
                    year: "3rd Year",
                    cgpa: 8.42,
                    rank: 4,
                    totalStudents: 42,
                    performanceIdx: 82.4,
                    codingScore: 347,
                    streak: 12,
                },
            },
        },
        include: { student: true },
    });
    const nakulStudent = studentUser.student!;
    console.log(`✅ Created student: ${studentUser.name}`);

    // Semester CGPAs
    const semCgpas = [
        { semester: "Sem 1", cgpa: 7.8 },
        { semester: "Sem 2", cgpa: 8.1 },
        { semester: "Sem 3", cgpa: 7.9 },
        { semester: "Sem 4", cgpa: 8.5 },
        { semester: "Sem 5", cgpa: 8.42 },
    ];
    for (const sc of semCgpas) {
        await prisma.semesterCGPA.create({
            data: { studentId: nakulStudent.id, ...sc },
        });
    }

    // Attendance (matching frontend mock data)
    const attendanceData = [
        { code: "CS301", attended: 32, total: 38 },
        { code: "CS302", attended: 28, total: 38 },
        { code: "CS303", attended: 35, total: 40 },
        { code: "CS304", attended: 24, total: 35 }, // Below 75% — danger
        { code: "CS305", attended: 30, total: 36 },
        { code: "CS306", attended: 27, total: 34 }, // Near threshold — warning
    ];
    for (const a of attendanceData) {
        await prisma.attendance.create({
            data: {
                studentId: nakulStudent.id,
                subjectId: subjects[a.code].id,
                attended: a.attended,
                total: a.total,
            },
        });
    }

    // Academic Records
    const academicData = [
        { code: "CS301", marks: 88, grade: "A" },
        { code: "CS302", marks: 76, grade: "B+" },
        { code: "CS303", marks: 92, grade: "A+" },
        { code: "CS304", marks: 71, grade: "B" },
        { code: "CS305", marks: 85, grade: "A" },
        { code: "CS306", marks: 82, grade: "A" },
    ];
    for (const a of academicData) {
        await prisma.academicRecord.create({
            data: {
                studentId: nakulStudent.id,
                subjectId: subjects[a.code].id,
                marks: a.marks,
                grade: a.grade,
                semester: "5th Semester",
            },
        });
    }

    // Coding Profiles
    await prisma.codingProfile.createMany({
        data: [
            {
                studentId: nakulStudent.id,
                platform: "LeetCode",
                handle: "@nakul_g",
                stats: JSON.stringify([
                    { label: "Problems Solved", value: "234" },
                    { label: "Easy / Med / Hard", value: "120 / 95 / 19" },
                    { label: "Contest Rating", value: "1,590" },
                    { label: "Global Rank", value: "Top 15%" },
                ]),
            },
            {
                studentId: nakulStudent.id,
                platform: "Codeforces",
                handle: "@nakul_cf",
                stats: JSON.stringify([
                    { label: "Problems Solved", value: "89" },
                    { label: "Rating", value: "1,350 (Pupil)" },
                    { label: "Contests", value: "23" },
                    { label: "Best Rank", value: "#412" },
                ]),
            },
            {
                studentId: nakulStudent.id,
                platform: "GitHub",
                handle: "@nakulgupta",
                stats: JSON.stringify([
                    { label: "Repositories", value: "24" },
                    { label: "Contributions (2026)", value: "847" },
                    { label: "Stars Received", value: "156" },
                    { label: "Languages", value: "5" },
                ]),
            },
        ],
    });

    // Badges
    await prisma.badge.createMany({
        data: [
            { studentId: nakulStudent.id, label: "7-Day Streak", description: "Solved problems 7 days in a row", icon: "Flame", earned: true },
            { studentId: nakulStudent.id, label: "Century Club", description: "Solved 100+ problems", icon: "Code", earned: true },
            { studentId: nakulStudent.id, label: "Top 5", description: "Ranked in class top 5", icon: "Target", earned: true },
            { studentId: nakulStudent.id, label: "Completionist", description: "Submitted all assignments", icon: "BookOpen", earned: true },
            { studentId: nakulStudent.id, label: "Contest Hero", description: "Participated in 20+ contests", icon: "Trophy", earned: true },
            { studentId: nakulStudent.id, label: "9+ CGPA", description: "Achieve 9+ CGPA", icon: "GraduationCap", earned: false },
            { studentId: nakulStudent.id, label: "CodeChef 4★", description: "Reach 4-star on CodeChef", icon: "Award", earned: false },
            { studentId: nakulStudent.id, label: "Open Source", description: "Get 50+ GitHub stars", icon: "Star", earned: false },
        ],
    });

    // Skills
    for (const skillName of skillNames) {
        await prisma.studentSkill.create({
            data: { studentId: nakulStudent.id, skillId: skills[skillName].id },
        });
    }

    // ─── More Students (for leaderboard & mentor dashboard) ────
    const otherStudents = [
        { name: "Priya Sharma", enrollment: "BTCS22-015", cgpa: 9.1, codingScore: 412, streak: 15, rank: 1 },
        { name: "Arjun Mehta", enrollment: "BTCS22-008", cgpa: 8.8, codingScore: 380, streak: 8, rank: 2 },
        { name: "Riya Patel", enrollment: "BTCS22-023", cgpa: 8.65, codingScore: 295, streak: 5, rank: 3 },
        { name: "Amit Kumar", enrollment: "BTCS22-031", cgpa: 7.2, codingScore: 156, streak: 2, rank: 7 },
        { name: "Sneha Reddy", enrollment: "BTCS22-019", cgpa: 8.1, codingScore: 275, streak: 6, rank: 5 },
        { name: "Rohit Verma", enrollment: "BTCS22-037", cgpa: 6.5, codingScore: 89, streak: 0, rank: 10 },
        { name: "Ananya Singh", enrollment: "BTCS22-005", cgpa: 7.8, codingScore: 210, streak: 3, rank: 6 },
        { name: "Vikram Joshi", enrollment: "BTCS22-044", cgpa: 5.9, codingScore: 45, streak: 0, rank: 12 },
    ];

    for (const data of otherStudents) {
        const user = await prisma.user.create({
            data: {
                email: `${data.name.toLowerCase().replace(" ", ".")}@campus.edu`,
                password: hashedPassword,
                name: data.name,
                role: "STUDENT",
                student: {
                    create: {
                        enrollment: data.enrollment,
                        section: "CS-A",
                        semester: "6th Semester",
                        branch: "Computer Science & Engineering",
                        year: "3rd Year",
                        cgpa: data.cgpa,
                        rank: data.rank,
                        totalStudents: 42,
                        performanceIdx: data.cgpa * 10 + Math.random() * 5,
                        codingScore: data.codingScore,
                        streak: data.streak,
                    },
                },
            },
            include: { student: true },
        });

        const sid = user.student!.id;

        // Add attendance for each student
        for (const subj of attendanceData) {
            const variation = Math.floor(Math.random() * 6) - 3;
            await prisma.attendance.create({
                data: {
                    studentId: sid,
                    subjectId: subjects[subj.code].id,
                    attended: Math.max(15, Math.min(subj.total, subj.attended + variation)),
                    total: subj.total,
                },
            });
        }

        // Add coding profile for each
        await prisma.codingProfile.create({
            data: {
                studentId: sid,
                platform: "LeetCode",
                handle: `@${data.name.toLowerCase().replace(" ", "_")}`,
                stats: JSON.stringify([
                    { label: "Problems Solved", value: String(data.codingScore) },
                    { label: "Contest Rating", value: String(1000 + Math.floor(Math.random() * 800)) },
                ]),
            },
        });
    }
    console.log(`✅ Created ${otherStudents.length} additional students`);

    // ─── Create Demo Mentor ───────────────────────────
    const mentorUser = await prisma.user.create({
        data: {
            email: "dr.sharma@campus.edu",
            password: hashedPassword,
            name: "Dr. Anita Sharma",
            role: "MENTOR",
            mentor: {
                create: {
                    department: "Computer Science & Engineering",
                    designation: "Associate Professor",
                    section: "CS-A",
                },
            },
        },
    });
    console.log(`✅ Created mentor: ${mentorUser.name}`);

    // ─── Events ───────────────────────────────────────
    const now = new Date();
    const events = [
        { title: "LeetCode Weekly Contest 437", type: "contest", platform: "LeetCode", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 8, 0), link: "https://leetcode.com/contest/" },
        { title: "Codeforces Round #945", type: "contest", platform: "Codeforces", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 20, 35), link: "https://codeforces.com/" },
        { title: "DSA Assignment 4 Due", type: "deadline", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7) },
        { title: "OS Mid-Semester Exam", type: "exam", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14) },
        { title: "HackOverflow 3.0", type: "hackathon", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21), description: "36-hour national hackathon", link: "https://example.com/hackathon" },
        { title: "DBMS Project Submission", type: "deadline", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10) },
    ];
    for (const e of events) {
        await prisma.event.create({ data: e });
    }
    console.log(`✅ Created ${events.length} events`);

    // ─── Notifications ────────────────────────────────
    const notifications = [
        { userId: studentUser.id, title: "Attendance Warning", message: "Your CN attendance is at 68%, below the 75% threshold.", category: "attendance" },
        { userId: studentUser.id, title: "Performance Drop", message: "OS score dropped 8% from last assessment.", category: "performance" },
        { userId: studentUser.id, title: "Contest Reminder", message: "LeetCode Weekly Contest 437 starts in 2 days!", category: "deadline" },
        { userId: studentUser.id, title: "Badge Earned!", message: "You earned the 'Contest Hero' badge for 20+ contest participation.", category: "system" },
        { userId: mentorUser.id, title: "At-Risk Students", message: "2 students in CS-A have attendance below 75%.", category: "attendance" },
        { userId: mentorUser.id, title: "Exam Scheduled", message: "OS Mid-Semester exam scheduled for next week.", category: "system" },
    ];
    for (const n of notifications) {
        await prisma.notification.create({ data: n });
    }
    console.log(`✅ Created ${notifications.length} notifications`);

    console.log("\n🎉 Database seeded successfully!\n");
    console.log("Demo accounts:");
    console.log("  Student: nakul.gupta@campus.edu / password123");
    console.log("  Mentor:  dr.sharma@campus.edu / password123\n");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
