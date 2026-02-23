import { motion } from "framer-motion";
import {
    CheckCircle,
    AlertTriangle,
    XCircle,
    Calculator,
    TrendingUp,
    Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const subjects = [
    { name: "Data Structures & Algorithms", code: "CS301", attended: 32, total: 38, status: "safe" },
    { name: "Operating Systems", code: "CS302", attended: 28, total: 38, status: "safe" },
    { name: "Database Management Systems", code: "CS303", attended: 35, total: 40, status: "safe" },
    { name: "Computer Networks", code: "CS304", attended: 24, total: 35, status: "danger" },
    { name: "Object Oriented Programming", code: "CS305", attended: 30, total: 36, status: "safe" },
    { name: "Software Engineering", code: "CS306", attended: 27, total: 34, status: "warning" },
];

const getPercentage = (attended: number, total: number) => ((attended / total) * 100).toFixed(1);

const getCanMiss = (attended: number, total: number, remaining: number) => {
    // How many classes can you miss and still maintain 75%?
    let canMiss = 0;
    for (let i = 0; i <= remaining; i++) {
        if ((attended / (total + i)) * 100 >= 75) {
            canMiss = i;
        } else {
            break;
        }
    }
    return canMiss;
};

const getNeedToAttend = (attended: number, total: number, remaining: number) => {
    // How many classes needed to reach 75%?
    const needed = Math.ceil(0.75 * (total + remaining)) - attended;
    return Math.max(0, needed);
};

const overallAttended = subjects.reduce((a, s) => a + s.attended, 0);
const overallTotal = subjects.reduce((a, s) => a + s.total, 0);
const overallPercent = ((overallAttended / overallTotal) * 100).toFixed(1);

const AttendancePage = () => {
    return (
        <DashboardLayout title="Attendance" subtitle="Track your eligibility across subjects" role="student">
            {/* Overall stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Overall Attendance", value: `${overallPercent}%`, icon: CheckCircle, color: Number(overallPercent) >= 75 ? "text-accent bg-accent/10" : "text-destructive bg-destructive/10" },
                    { label: "Classes Attended", value: `${overallAttended}/${overallTotal}`, icon: Calendar, color: "text-primary bg-primary/10" },
                    { label: "Subjects at Risk", value: String(subjects.filter(s => s.status === "danger").length), icon: AlertTriangle, color: "text-destructive bg-destructive/10" },
                    { label: "Subjects Warning", value: String(subjects.filter(s => s.status === "warning").length), icon: AlertTriangle, color: "text-warning bg-warning/10" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-xl border border-border bg-card p-5 card-hover"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                            <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Eligibility alert */}
            {subjects.some(s => s.status === "danger") && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 rounded-xl p-4 bg-destructive/10 border border-destructive/20 text-destructive mb-6"
                >
                    <XCircle className="h-5 w-5 shrink-0" />
                    <div>
                        <p className="text-sm font-semibold">Eligibility Warning</p>
                        <p className="text-xs opacity-80">
                            Your attendance in {subjects.filter(s => s.status === "danger").map(s => s.code).join(", ")} is below 75%.
                            You may lose exam eligibility if not improved immediately.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Subject cards */}
            <div className="space-y-4">
                {subjects.map((subject, i) => {
                    const percent = Number(getPercentage(subject.attended, subject.total));
                    const remainingClasses = 10; // Assume 10 classes remaining
                    const canMiss = getCanMiss(subject.attended, subject.total, remainingClasses);
                    const needToAttend = getNeedToAttend(subject.attended, subject.total, remainingClasses);

                    return (
                        <motion.div
                            key={subject.code}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className={`rounded-xl border bg-card p-5 ${subject.status === "danger"
                                    ? "border-destructive/30"
                                    : subject.status === "warning"
                                        ? "border-warning/30"
                                        : "border-border"
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded">{subject.code}</span>
                                        {subject.status === "danger" && (
                                            <span className="text-[10px] font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded border border-destructive/20">Below 75%</span>
                                        )}
                                        {subject.status === "warning" && (
                                            <span className="text-[10px] font-medium text-warning bg-warning/10 px-2 py-0.5 rounded border border-warning/20">Near threshold</span>
                                        )}
                                    </div>
                                    <h4 className="font-display font-semibold text-foreground text-sm">{subject.name}</h4>

                                    {/* Progress bar */}
                                    <div className="mt-3 flex items-center gap-3">
                                        <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percent}%` }}
                                                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                                                className={`h-full rounded-full ${percent >= 80 ? "bg-accent" :
                                                        percent >= 75 ? "bg-primary" :
                                                            percent >= 70 ? "bg-warning" :
                                                                "bg-destructive"
                                                    }`}
                                            />
                                        </div>
                                        <span className={`text-sm font-display font-bold min-w-[48px] text-right ${percent >= 75 ? "text-accent" : "text-destructive"
                                            }`}>
                                            {percent}%
                                        </span>
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-2">
                                        {subject.attended} / {subject.total} classes attended
                                    </p>
                                </div>

                                {/* Smart predictions */}
                                <div className="flex sm:flex-col gap-3 sm:text-right">
                                    {percent >= 75 ? (
                                        <div className="flex items-center gap-2 sm:justify-end">
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">Can safely miss</p>
                                                <p className="text-sm font-display font-bold text-accent">{canMiss} classes</p>
                                            </div>
                                            <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 sm:justify-end">
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">Need to attend</p>
                                                <p className="text-sm font-display font-bold text-destructive">{needToAttend} more</p>
                                            </div>
                                            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </DashboardLayout>
    );
};

export default AttendancePage;
