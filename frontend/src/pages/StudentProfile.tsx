import { motion } from "framer-motion";
import {
    User,
    Mail,
    Hash,
    MapPin,
    ExternalLink,
    Code,
    GitBranch,
    Star,
    Flame,
    Trophy,
    GraduationCap,
    Award,
    Target,
    BookOpen,
    CheckCircle,
    Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const profile = {
    name: "Nakul Gupta",
    enrollment: "BTCS22-042",
    email: "nakul.gupta@campus.edu",
    section: "CS-A",
    semester: "6th Semester",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    cgpa: 8.42,
    rank: 4,
    totalStudents: 42,
};

const semesterCGPAs = [
    { sem: "Sem 1", cgpa: 7.8 },
    { sem: "Sem 2", cgpa: 8.1 },
    { sem: "Sem 3", cgpa: 7.9 },
    { sem: "Sem 4", cgpa: 8.5 },
    { sem: "Sem 5", cgpa: 8.42 },
];

const codingProfiles = [
    {
        platform: "LeetCode",
        handle: "@nakul_g",
        stats: [
            { label: "Problems Solved", value: "234" },
            { label: "Easy / Med / Hard", value: "120 / 95 / 19" },
            { label: "Contest Rating", value: "1,590" },
            { label: "Global Rank", value: "Top 15%" },
        ],
        color: "text-amber-400",
        bg: "bg-amber-400/10 border-amber-400/20",
    },
    {
        platform: "Codeforces",
        handle: "@nakul_cf",
        stats: [
            { label: "Problems Solved", value: "89" },
            { label: "Rating", value: "1,350 (Pupil)" },
            { label: "Contests", value: "23" },
            { label: "Best Rank", value: "#412" },
        ],
        color: "text-blue-400",
        bg: "bg-blue-400/10 border-blue-400/20",
    },
    {
        platform: "GitHub",
        handle: "@nakulgupta",
        stats: [
            { label: "Repositories", value: "24" },
            { label: "Contributions (2026)", value: "847" },
            { label: "Stars Received", value: "156" },
            { label: "Languages", value: "5" },
        ],
        color: "text-gray-300",
        bg: "bg-gray-400/10 border-gray-400/20",
    },
];

const badges = [
    { icon: Flame, label: "7-Day Streak", desc: "Solved problems 7 days in a row", earned: true },
    { icon: Code, label: "Century Club", desc: "Solved 100+ problems", earned: true },
    { icon: Target, label: "Top 5", desc: "Ranked in class top 5", earned: true },
    { icon: BookOpen, label: "Completionist", desc: "Submitted all assignments", earned: true },
    { icon: Trophy, label: "Contest Hero", desc: "Participated in 20+ contests", earned: true },
    { icon: GraduationCap, label: "9+ CGPA", desc: "Achieve 9+ CGPA", earned: false },
    { icon: Award, label: "CodeChef 4★", desc: "Reach 4-star on CodeChef", earned: false },
    { icon: Star, label: "Open Source", desc: "Get 50+ GitHub stars", earned: false },
];

const skills = [
    "C++", "Python", "JavaScript", "React", "Node.js", "SQL",
    "Data Structures", "Algorithms", "Machine Learning", "Git",
];

const activityGrid = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
);

const StudentProfile = () => {
    return (
        <DashboardLayout title="My Profile" subtitle="Your academic & coding identity" role="student">
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-card overflow-hidden mb-8"
            >
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-primary/20 via-purple-500/15 to-accent/10 relative">
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                </div>
                <div className="px-6 pb-6 -mt-12">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                        <div className="h-24 w-24 rounded-2xl bg-gradient-primary flex items-center justify-center text-2xl font-extrabold text-white border-4 border-card shadow-glow">
                            NG
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-display font-bold text-foreground">{profile.name}</h2>
                            <div className="flex flex-wrap items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Hash className="h-3 w-3" />{profile.enrollment}</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3" />{profile.email}</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{profile.section} · {profile.year}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                                <div className="text-xl font-display font-bold text-primary">{profile.cgpa}</div>
                                <div className="text-[10px] text-muted-foreground">CGPA</div>
                            </div>
                            <div className="text-center px-4 py-2 rounded-xl bg-warning/10 border border-warning/20">
                                <div className="text-xl font-display font-bold text-warning">#{profile.rank}</div>
                                <div className="text-[10px] text-muted-foreground">Class Rank</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Academic Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <h3 className="font-display font-semibold text-foreground mb-1">Academic Summary</h3>
                    <p className="text-xs text-muted-foreground mb-4">Semester-wise CGPA progression</p>
                    <div className="space-y-3">
                        {semesterCGPAs.map((s) => (
                            <div key={s.sem} className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground w-14">{s.sem}</span>
                                <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(s.cgpa / 10) * 100}%` }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="h-full rounded-full bg-gradient-primary"
                                    />
                                </div>
                                <span className="text-xs font-semibold text-foreground w-8 text-right">{s.cgpa}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Branch</span>
                            <span className="text-foreground font-medium">{profile.branch}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                            <span className="text-muted-foreground">Semester</span>
                            <span className="text-foreground font-medium">{profile.semester}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Coding Profiles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-4"
                >
                    {codingProfiles.map((p) => (
                        <div key={p.platform} className={`rounded-xl border p-5 ${p.bg}`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`font-display font-bold text-base ${p.color}`}>{p.platform}</span>
                                    <span className="text-xs text-muted-foreground">{p.handle}</span>
                                </div>
                                <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {p.stats.map((stat) => (
                                    <div key={stat.label}>
                                        <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                                        <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Activity Heatmap */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-border bg-card p-6 mb-8"
            >
                <h3 className="font-display font-semibold text-foreground mb-1">Activity Heatmap</h3>
                <p className="text-xs text-muted-foreground mb-4">Your problem-solving activity over the past year</p>
                <div className="overflow-x-auto">
                    <div className="flex gap-[3px] min-w-[700px]">
                        {activityGrid.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px]">
                                {week.map((day, di) => (
                                    <div
                                        key={di}
                                        className={`h-[11px] w-[11px] rounded-[2px] ${day === 0 ? "bg-secondary" :
                                                day === 1 ? "bg-primary/20" :
                                                    day === 2 ? "bg-primary/40" :
                                                        day === 3 ? "bg-primary/60" :
                                                            "bg-primary"
                                            }`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <h3 className="font-display font-semibold text-foreground mb-1">Badges</h3>
                    <p className="text-xs text-muted-foreground mb-4">Achievements and milestones</p>
                    <div className="grid grid-cols-2 gap-3">
                        {badges.map((badge) => (
                            <div
                                key={badge.label}
                                className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${badge.earned
                                        ? "border-primary/30 bg-primary/5"
                                        : "border-border bg-secondary/20 opacity-40"
                                    }`}
                            >
                                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${badge.earned ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                                    }`}>
                                    <badge.icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-foreground">{badge.label}</p>
                                    <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <h3 className="font-display font-semibold text-foreground mb-1">Skills & Technologies</h3>
                    <p className="text-xs text-muted-foreground mb-4">Technologies you've worked with</p>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-xs font-medium text-foreground hover:border-primary/30 transition-all cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default StudentProfile;
