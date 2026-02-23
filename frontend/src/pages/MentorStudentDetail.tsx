import { motion } from "framer-motion";
import {
    User,
    Mail,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle,
    ArrowLeft,
    Code,
    GraduationCap,
    Calendar,
    Sparkles,
    ExternalLink,
    Flame,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts";
import { Link, useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

// Mock student detail
const studentData = {
    name: "Karan Verma",
    enrollment: "BTCS22-055",
    email: "karan.verma@campus.edu",
    section: "CS-A",
    semester: "6th Semester",
    cgpa: 7.5,
    attendance: 65,
    problems: 220,
    rating: 1300,
    streak: 0,
    status: "danger" as const,
};

const performanceData = [
    { week: "W1", score: 62 },
    { week: "W2", score: 58 },
    { week: "W3", score: 64 },
    { week: "W4", score: 60 },
    { week: "W5", score: 55 },
    { week: "W6", score: 52 },
    { week: "W7", score: 58 },
    { week: "W8", score: 61 },
];

const subjectData = [
    { subject: "DSA", score: 65, fullMark: 100 },
    { subject: "OS", score: 50, fullMark: 100 },
    { subject: "DBMS", score: 72, fullMark: 100 },
    { subject: "CN", score: 45, fullMark: 100 },
    { subject: "OOP", score: 68, fullMark: 100 },
    { subject: "SE", score: 55, fullMark: 100 },
];

const attendanceBySubject = [
    { subject: "DSA", attended: 24, total: 38 },
    { subject: "OS", attended: 22, total: 38 },
    { subject: "DBMS", attended: 28, total: 40 },
    { subject: "CN", attended: 18, total: 35 },
    { subject: "OOP", attended: 25, total: 36 },
    { subject: "SE", attended: 20, total: 34 },
];

const aiInsights = [
    "Karan's performance dropped 12% over the last 4 weeks. Attendance in CN is at 51%, which strongly correlates with his lowest subject score.",
    "He hasn't maintained any coding streak recently. Encouraging even 1 problem/day could restart momentum.",
    "His DBMS score (72%) shows potential — if this study approach is applied to CN and OS, improvement is very achievable.",
];

const tooltipStyle = {
    background: "hsl(220, 18%, 7%)",
    border: "1px solid hsl(220, 16%, 14%)",
    borderRadius: "8px",
    color: "hsl(210, 40%, 96%)",
};

const MentorStudentDetail = () => {
    const [searchParams] = useSearchParams();
    const studentName = searchParams.get("name") || studentData.name;

    return (
        <DashboardLayout title="Student Detail" subtitle={`Detailed view — ${studentName}`} role="mentor">
            {/* Back button */}
            <Link to="/mentor" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </Link>

            {/* Profile header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-card p-6 mb-8"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-xl font-bold text-white shadow-glow">
                        {studentName.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-display font-bold text-foreground">{studentName}</h2>
                        <div className="flex flex-wrap gap-3 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" />{studentData.email}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><GraduationCap className="h-3 w-3" />{studentData.enrollment} · {studentData.section}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-center px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                            <div className="text-lg font-display font-bold text-primary">{studentData.cgpa}</div>
                            <div className="text-[10px] text-muted-foreground">CGPA</div>
                        </div>
                        <div className={`text-center px-4 py-2 rounded-xl ${studentData.attendance < 75 ? "bg-destructive/10 border border-destructive/20" : "bg-accent/10 border border-accent/20"}`}>
                            <div className={`text-lg font-display font-bold ${studentData.attendance < 75 ? "text-destructive" : "text-accent"}`}>{studentData.attendance}%</div>
                            <div className="text-[10px] text-muted-foreground">Attendance</div>
                        </div>
                        <div className="text-center px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/20">
                            <div className="text-lg font-display font-bold text-amber-400">{studentData.problems}</div>
                            <div className="text-[10px] text-muted-foreground">Problems</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* AI Insights for Mentor */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-purple-500/5 to-transparent p-5 mb-8"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-display font-semibold text-foreground text-sm">AI Insights for {studentName}</h3>
                </div>
                <ul className="space-y-2">
                    {aiInsights.map((insight, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                            <span className="text-primary shrink-0">•</span>
                            {insight}
                        </li>
                    ))}
                </ul>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Performance Trend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <h3 className="font-display font-semibold text-foreground mb-1">Performance Trend</h3>
                    <p className="text-xs text-muted-foreground mb-4">Weekly score progression</p>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="msd1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 14%)" />
                            <XAxis dataKey="week" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} axisLine={false} />
                            <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} axisLine={false} domain={[40, 80]} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Area type="monotone" dataKey="score" stroke="hsl(217, 91%, 60%)" fill="url(#msd1)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Subject Radar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <h3 className="font-display font-semibold text-foreground mb-1">Subject Competency</h3>
                    <p className="text-xs text-muted-foreground mb-4">Strength and weakness analysis</p>
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={subjectData}>
                            <PolarGrid stroke="hsl(220, 16%, 14%)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} />
                            <PolarRadiusAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10 }} domain={[0, 100]} />
                            <Radar dataKey="score" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.15} strokeWidth={2} />
                        </RadarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Attendance by Subject */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-border bg-card p-6"
            >
                <h3 className="font-display font-semibold text-foreground mb-1">Attendance Breakdown</h3>
                <p className="text-xs text-muted-foreground mb-4">Subject-wise attendance status</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {attendanceBySubject.map((s) => {
                        const percent = ((s.attended / s.total) * 100).toFixed(1);
                        const isBad = Number(percent) < 75;
                        return (
                            <div key={s.subject} className={`rounded-xl border p-4 ${isBad ? "border-destructive/30 bg-destructive/5" : "border-border"}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-foreground">{s.subject}</span>
                                    {isBad ? <AlertTriangle className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-accent" />}
                                </div>
                                <div className="h-2 rounded-full bg-secondary overflow-hidden mb-2">
                                    <div className={`h-full rounded-full ${isBad ? "bg-destructive" : "bg-accent"}`} style={{ width: `${percent}%` }} />
                                </div>
                                <p className="text-xs text-muted-foreground">{s.attended}/{s.total} classes · <span className={isBad ? "text-destructive" : "text-accent"}>{percent}%</span></p>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </DashboardLayout>
    );
};

export default MentorStudentDetail;
