import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Eye,
  ChevronRight,
  Search,
  Filter,
  Download,
  CheckCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";

const classStats = [
  { label: "Total Students", value: "42", icon: Users, accent: "primary", change: "" },
  { label: "Avg Performance", value: "74.6", icon: BarChart3, accent: "accent", change: "+3.2% from last sem" },
  { label: "At Risk", value: "5", icon: AlertTriangle, accent: "destructive", change: "Need attention" },
  { label: "Improving", value: "28", icon: TrendingUp, accent: "accent", change: "67% of class" },
];

const cgpaDistribution = [
  { range: "6.0-6.5", count: 3 },
  { range: "6.5-7.0", count: 5 },
  { range: "7.0-7.5", count: 8 },
  { range: "7.5-8.0", count: 10 },
  { range: "8.0-8.5", count: 9 },
  { range: "8.5-9.0", count: 5 },
  { range: "9.0+", count: 2 },
];

const attendanceData = [
  { name: "Above 85%", value: 22, color: "hsl(160, 84%, 39%)" },
  { name: "75-85%", value: 12, color: "hsl(217, 91%, 60%)" },
  { name: "Below 75%", value: 8, color: "hsl(0, 72%, 51%)" },
];

const trendData = [
  { month: "Aug", current: 68, past: 72 },
  { month: "Sep", current: 71, past: 70 },
  { month: "Oct", current: 74, past: 71 },
  { month: "Nov", current: 73, past: 73 },
  { month: "Dec", current: 76, past: 72 },
  { month: "Jan", current: 78, past: 74 },
  { month: "Feb", current: 74.6, past: 73 },
];

const students = [
  { name: "Karan Verma", cgpa: 7.5, problems: 220, attendance: 65, status: "danger", trend: "down" },
  { name: "Arjun Kumar", cgpa: 7.9, problems: 260, attendance: 72, status: "warning", trend: "same" },
  { name: "Divya Nair", cgpa: 7.7, problems: 240, attendance: 68, status: "warning", trend: "up" },
  { name: "Meera Iyer", cgpa: 6.8, problems: 120, attendance: 60, status: "danger", trend: "down" },
  { name: "Rahul Sinha", cgpa: 7.2, problems: 180, attendance: 70, status: "warning", trend: "same" },
  { name: "Aarav Patel", cgpa: 9.4, problems: 512, attendance: 92, status: "ok", trend: "up" },
  { name: "Priya Sharma", cgpa: 9.1, problems: 480, attendance: 88, status: "ok", trend: "up" },
  { name: "Sneha Reddy", cgpa: 8.1, problems: 275, attendance: 80, status: "ok", trend: "same" },
  { name: "Nakul Gupta", cgpa: 8.42, problems: 347, attendance: 78, status: "ok", trend: "up" },
];

const statusMap = {
  ok: { label: "Healthy", className: "bg-accent/10 text-accent border-accent/20" },
  warning: { label: "Warning", className: "bg-warning/10 text-warning border-warning/20" },
  danger: { label: "At Risk", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const tooltipStyle = {
  background: "hsl(220, 18%, 7%)",
  border: "1px solid hsl(220, 16%, 14%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 96%)",
};

const MentorDashboard = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "danger" | "warning" | "ok">("all");

  const filteredStudents = students
    .filter((s) => filter === "all" || s.status === filter)
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Mentor Dashboard" subtitle="Class CS-2026 — Dr. Sharma" role="mentor">
      {/* At-risk alert */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 rounded-xl p-4 bg-destructive/10 border border-destructive/20 text-destructive mb-6"
      >
        <AlertTriangle className="h-5 w-5 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold">5 students are at risk!</p>
          <p className="text-xs opacity-80">Karan Verma, Meera Iyer need immediate attention — attendance & performance below threshold.</p>
        </div>
        <Link to="/mentor/alerts" className="text-xs font-medium underline shrink-0">View All</Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {classStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-5 card-hover"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${stat.accent === "primary" ? "bg-primary/10 text-primary" :
                  stat.accent === "accent" ? "bg-accent/10 text-accent" :
                    "bg-destructive/10 text-destructive"
                }`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
            {stat.change && <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* CGPA Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-1">CGPA Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Class-wide breakdown</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cgpaDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 14%)" />
              <XAxis dataKey="range" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-1">Attendance Overview</h3>
          <p className="text-xs text-muted-foreground mb-4">Student attendance distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                {attendanceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {attendanceData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                <span className="text-[10px] text-muted-foreground">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trend Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-1">Performance Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Current vs past batch</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="mc1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 14%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10 }} axisLine={false} domain={[60, 85]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="current" stroke="hsl(217, 91%, 60%)" fill="url(#mc1)" strokeWidth={2} name="Current Batch" />
              <Area type="monotone" dataKey="past" stroke="hsl(215, 15%, 40%)" fill="transparent" strokeWidth={2} strokeDasharray="4 4" name="Past Batch" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="h-2 w-6 rounded bg-primary" /><span className="text-[10px] text-muted-foreground">Current</span></div>
            <div className="flex items-center gap-1.5"><div className="h-2 w-6 rounded bg-muted-foreground border-t border-dashed" /><span className="text-[10px] text-muted-foreground">Past</span></div>
          </div>
        </motion.div>
      </div>

      {/* Student List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="rounded-xl border border-border bg-card"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-border gap-3">
          <div>
            <h3 className="font-display font-semibold text-foreground">Student Overview</h3>
            <p className="text-xs text-muted-foreground">Click on a student for detailed view</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {(["all", "danger", "warning", "ok"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[10px] font-medium px-2.5 py-1 rounded-md border transition-all ${filter === f
                      ? f === "danger" ? "bg-destructive/10 text-destructive border-destructive/20"
                        : f === "warning" ? "bg-warning/10 text-warning border-warning/20"
                          : f === "ok" ? "bg-accent/10 text-accent border-accent/20"
                            : "bg-primary/10 text-primary border-primary/20"
                      : "text-muted-foreground border-border hover:bg-secondary/50"
                    }`}
                >
                  {f === "all" ? "All" : f === "danger" ? "At Risk" : f === "warning" ? "Warning" : "Healthy"}
                </button>
              ))}
            </div>
            <div className="relative w-40">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs bg-secondary/50 border-border rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="divide-y divide-border/50">
          {filteredStudents.map((student) => {
            const status = statusMap[student.status as keyof typeof statusMap];
            return (
              <Link
                key={student.name}
                to={`/mentor/students?name=${encodeURIComponent(student.name)}`}
                className="flex items-center justify-between px-4 py-3.5 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-bold text-white">
                    {student.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{student.name}</span>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[11px] text-muted-foreground">CGPA: {student.cgpa}</span>
                      <span className="text-[11px] text-muted-foreground">Problems: {student.problems}</span>
                      <span className={`text-[11px] ${student.attendance < 75 ? "text-destructive" : "text-muted-foreground"}`}>
                        Attendance: {student.attendance}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {student.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-accent" />}
                  {student.trend === "down" && <TrendingUp className="h-3.5 w-3.5 text-destructive rotate-180" />}
                  <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${status.className}`}>
                    {status.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
