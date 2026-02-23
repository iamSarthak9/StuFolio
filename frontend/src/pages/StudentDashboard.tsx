import { motion } from "framer-motion";
import {
  TrendingUp,
  Code,
  GraduationCap,
  Flame,
  Target,
  Award,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Calendar,
  ExternalLink,
  GitBranch,
  Sparkles,
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
} from "recharts";
import DashboardLayout from "@/components/DashboardLayout";

const performanceData = [
  { week: "W1", coding: 45, academic: 72 },
  { week: "W2", coding: 52, academic: 70 },
  { week: "W3", coding: 61, academic: 75 },
  { week: "W4", coding: 58, academic: 78 },
  { week: "W5", coding: 72, academic: 80 },
  { week: "W6", coding: 80, academic: 82 },
  { week: "W7", coding: 85, academic: 79 },
  { week: "W8", coding: 90, academic: 85 },
];

const subjectData = [
  { subject: "DSA", score: 88 },
  { subject: "OS", score: 72 },
  { subject: "DBMS", score: 91 },
  { subject: "CN", score: 65 },
  { subject: "OOP", score: 85 },
];

const badges = [
  { icon: Flame, label: "7-Day Streak", earned: true },
  { icon: Code, label: "100 Problems", earned: true },
  { icon: GraduationCap, label: "9+ CGPA", earned: false },
  { icon: Target, label: "Top 5 Class", earned: true },
  { icon: Award, label: "CodeChef 4★", earned: false },
  { icon: BookOpen, label: "All Assignments", earned: true },
];

const statCards = [
  { label: "Performance Index", value: "82.4", change: "+5.2% this month", icon: TrendingUp, accent: "primary" },
  { label: "Current CGPA", value: "8.42", change: "↑ 0.3 from last sem", icon: GraduationCap, accent: "accent" },
  { label: "Problems Solved", value: "347", change: "+28 this week", icon: Code, accent: "chart-3" },
  { label: "Attendance", value: "78%", change: "3 classes to 80%", icon: CheckCircle, accent: "warning" },
];

const codingProfiles = [
  { platform: "LeetCode", handle: "@nakul_g", solved: 234, rating: 1590, color: "text-amber-400", bg: "bg-amber-400/10" },
  { platform: "Codeforces", handle: "@nakul_cf", solved: 89, rating: 1350, color: "text-blue-400", bg: "bg-blue-400/10" },
  { platform: "GitHub", handle: "@nakulgupta", repos: 24, contributions: 847, color: "text-gray-300", bg: "bg-gray-400/10" },
];

const upcomingEvents = [
  { title: "LeetCode Biweekly 148", date: "Feb 24", type: "contest", color: "bg-amber-400/10 text-amber-400" },
  { title: "CN Assignment Due", date: "Feb 26", type: "deadline", color: "bg-destructive/10 text-destructive" },
  { title: "DBMS Lab Exam", date: "Mar 2", type: "exam", color: "bg-primary/10 text-primary" },
];

const warnings = [
  { text: "CN attendance at 68% — below 75% eligibility threshold!", type: "danger" },
  { text: "OS score dropped 8% from last assessment. Review recommended.", type: "warning" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

const tooltipStyle = {
  background: "hsl(220, 18%, 7%)",
  border: "1px solid hsl(220, 16%, 14%)",
  borderRadius: "8px",
  color: "hsl(210, 40%, 96%)",
};

const StudentDashboard = () => {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back, Nakul 👋" role="student">
      {/* Warning Alerts */}
      {warnings.length > 0 && (
        <div className="space-y-2 mb-6">
          {warnings.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 rounded-xl p-3.5 text-sm ${w.type === "danger"
                  ? "bg-destructive/10 border border-destructive/20 text-destructive"
                  : "bg-warning/10 border border-warning/20 text-warning"
                }`}
            >
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{w.text}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-border bg-card p-5 card-hover"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${stat.accent === "primary" ? "bg-primary/10 text-primary" :
                  stat.accent === "accent" ? "bg-accent/10 text-accent" :
                    stat.accent === "chart-3" ? "bg-purple-500/10 text-purple-400" :
                      "bg-warning/10 text-warning"
                }`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* AI Insight Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-purple-500/5 to-transparent p-5 mb-8"
      >
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground text-sm mb-1">AI Insight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your coding performance is trending upward (+18% this month) 📈. Focus on Computer Networks — it's your weakest subject at 65%.
              Attending 3 more CN classes will secure your eligibility. Consider solving 5 graph problems on LeetCode to strengthen your DSA weak areas.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-1">Growth Trend</h3>
          <p className="text-xs text-muted-foreground mb-6">Coding vs Academic performance over 8 weeks</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorCoding" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAcademic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 14%)" />
              <XAxis dataKey="week" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="coding" stroke="hsl(217, 91%, 60%)" fill="url(#colorCoding)" strokeWidth={2} name="Coding" />
              <Area type="monotone" dataKey="academic" stroke="hsl(160, 84%, 39%)" fill="url(#colorAcademic)" strokeWidth={2} name="Academic" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-1">Subject Scores</h3>
          <p className="text-xs text-muted-foreground mb-6">Internal assessment breakdown</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={subjectData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 14%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 12 }} axisLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="subject" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 12 }} axisLine={false} width={50} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" fill="hsl(217, 91%, 60%)" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Coding Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="lg:col-span-2 rounded-xl border border-border bg-card p-6"
        >
          <h3 className="font-display font-semibold text-foreground mb-1">Coding Profiles</h3>
          <p className="text-xs text-muted-foreground mb-4">Your linked competitive programming accounts</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {codingProfiles.map((p) => (
              <div key={p.platform} className={`rounded-xl border border-border p-4 ${p.bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-display font-semibold text-sm ${p.color}`}>{p.platform}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mb-2">{p.handle}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{p.platform === "GitHub" ? "Repos" : "Solved"}</span>
                    <span className="text-foreground font-medium">{p.platform === "GitHub" ? p.repos : p.solved}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{p.platform === "GitHub" ? "Contributions" : "Rating"}</span>
                    <span className="text-foreground font-medium">{p.platform === "GitHub" ? p.contributions : p.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-foreground mb-0.5">Upcoming</h3>
              <p className="text-xs text-muted-foreground">Events & deadlines</p>
            </div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className={`h-2 w-2 rounded-full ${event.color.replace('text-', 'bg-').split(' ')[0]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <h3 className="font-display font-semibold text-foreground mb-1">Achievements</h3>
        <p className="text-xs text-muted-foreground mb-6">Your earned badges and milestones</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className={`flex flex-col items-center gap-2.5 rounded-xl border p-4 transition-all ${badge.earned
                  ? "border-primary/30 bg-primary/5 card-hover"
                  : "border-border bg-secondary/20 opacity-40"
                }`}
            >
              <div className={`h-11 w-11 rounded-full flex items-center justify-center ${badge.earned ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                <badge.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-center text-foreground">{badge.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
