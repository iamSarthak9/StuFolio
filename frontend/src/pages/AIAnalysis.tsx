import { motion } from "framer-motion";
import {
    Brain,
    TrendingUp,
    TrendingDown,
    Target,
    Zap,
    BookOpen,
    AlertTriangle,
    CheckCircle,
    Lightbulb,
    BarChart3,
    Sparkles,
} from "lucide-react";
import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import DashboardLayout from "@/components/DashboardLayout";

const strengthData = [
    { subject: "DSA", score: 88, fullMark: 100 },
    { subject: "DBMS", score: 91, fullMark: 100 },
    { subject: "OOP", score: 85, fullMark: 100 },
    { subject: "OS", score: 72, fullMark: 100 },
    { subject: "CN", score: 65, fullMark: 100 },
    { subject: "Coding", score: 82, fullMark: 100 },
];

const predictionData = [
    { sem: "Sem 1", actual: 7.8, predicted: null },
    { sem: "Sem 2", actual: 8.1, predicted: null },
    { sem: "Sem 3", actual: 7.9, predicted: null },
    { sem: "Sem 4", actual: 8.5, predicted: null },
    { sem: "Sem 5", actual: 8.42, predicted: null },
    { sem: "Sem 6", actual: null, predicted: 8.7 },
    { sem: "Sem 7", actual: null, predicted: 8.9 },
    { sem: "Sem 8", actual: null, predicted: 9.0 },
];

const suggestions = [
    {
        icon: AlertTriangle,
        title: "Focus on Computer Networks",
        description: "Your CN score (65%) is significantly below your average. Dedicate 2 extra hours/week to practice CN concepts and solve related problems.",
        priority: "high",
        color: "text-destructive bg-destructive/10 border-destructive/20",
    },
    {
        icon: TrendingUp,
        title: "Maintain DSA Momentum",
        description: "Your DSA performance is strong at 88%. Keep solving 3-5 medium problems daily to maintain this trajectory.",
        priority: "medium",
        color: "text-primary bg-primary/10 border-primary/20",
    },
    {
        icon: BookOpen,
        title: "Improve OS Fundamentals",
        description: "OS score at 72% can be improved. Focus on process scheduling, memory management, and deadlock chapters.",
        priority: "medium",
        color: "text-warning bg-warning/10 border-warning/20",
    },
    {
        icon: Zap,
        title: "Contest Participation",
        description: "Participate in at least 2 contests per week on Codeforces/LeetCode to improve your competitive rating from 1590 to 1700+.",
        priority: "low",
        color: "text-accent bg-accent/10 border-accent/20",
    },
];

const goalSimulator = [
    { target: "8.5 CGPA", needed: "Score 75%+ in all subjects this sem", feasibility: "Very Likely", color: "text-accent" },
    { target: "9.0 CGPA", needed: "Score 85%+ in all subjects, 90%+ in DSA & DBMS", feasibility: "Challenging", color: "text-warning" },
    { target: "9.5 CGPA", needed: "Score 92%+ in all subjects consistently", feasibility: "Difficult", color: "text-destructive" },
];

const explainableInsights = [
    { question: "Why did your OS score drop?", answer: "Your OS attendance dropped 8% in weeks 5-7, correlating with the score decline. Students with >80% attendance scored 15% higher on average.", icon: "📉" },
    { question: "Why is your coding improving?", answer: "Your daily problem-solving streak (7 days) and increased contest participation (+40%) are driving improvement. Your rating is up 12% this month.", icon: "📈" },
    { question: "How does attendance affect grades?", answer: "Analysis shows a 0.85 correlation between attendance and scores. Every 5% attendance increase corresponds to ~3% score improvement.", icon: "📊" },
];

const tooltipStyle = {
    background: "hsl(220, 18%, 7%)",
    border: "1px solid hsl(220, 16%, 14%)",
    borderRadius: "8px",
    color: "hsl(210, 40%, 96%)",
};

const AIAnalysis = () => {
    return (
        <DashboardLayout title="AI Analysis" subtitle="Intelligent insights for your growth" role="student">
            {/* Overall Score */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-purple-500/5 to-accent/5 p-6 mb-8"
            >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-lg shrink-0">
                        <Brain className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-display font-bold text-foreground mb-1">AI Performance Analysis</h2>
                        <p className="text-sm text-muted-foreground mb-3">
                            Based on your academic scores, coding activity, attendance patterns, and peer comparison, here's your comprehensive profile analysis.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <TrendingUp className="h-4 w-4 text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Overall Trend</p>
                                    <p className="text-sm font-semibold text-accent">Upward ↑</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <BarChart3 className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Predicted Sem 6 CGPA</p>
                                    <p className="text-sm font-semibold text-primary">8.7</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center">
                                    <AlertTriangle className="h-4 w-4 text-warning" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Weak Areas</p>
                                    <p className="text-sm font-semibold text-warning">CN, OS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Strength/Weakness Radar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <h3 className="font-display font-semibold text-foreground mb-1">Strength & Weakness Map</h3>
                    <p className="text-xs text-muted-foreground mb-4">Your competency across subjects</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={strengthData}>
                            <PolarGrid stroke="hsl(220, 16%, 14%)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 12 }} />
                            <PolarRadiusAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10 }} domain={[0, 100]} />
                            <Radar
                                name="Score"
                                dataKey="score"
                                stroke="hsl(217, 91%, 60%)"
                                fill="hsl(217, 91%, 60%)"
                                fillOpacity={0.2}
                                strokeWidth={2}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* GPA Prediction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <h3 className="font-display font-semibold text-foreground mb-1">CGPA Prediction</h3>
                    <p className="text-xs text-muted-foreground mb-4">Actual vs predicted trajectory</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={predictionData}>
                            <defs>
                                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(250, 80%, 60%)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(250, 80%, 60%)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 14%)" />
                            <XAxis dataKey="sem" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} axisLine={false} />
                            <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} axisLine={false} domain={[7, 10]} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Area type="monotone" dataKey="actual" stroke="hsl(217, 91%, 60%)" fill="url(#colorActual)" strokeWidth={2} name="Actual" connectNulls={false} />
                            <Area type="monotone" dataKey="predicted" stroke="hsl(250, 80%, 60%)" fill="url(#colorPredicted)" strokeWidth={2} strokeDasharray="5 5" name="Predicted" connectNulls={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Personalized Suggestions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-border bg-card p-6 mb-8"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="h-5 w-5 text-warning" />
                    <h3 className="font-display font-semibold text-foreground">Personalized Improvement Suggestions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestions.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className={`rounded-xl border p-4 ${s.color}`}
                        >
                            <div className="flex items-start gap-3">
                                <s.icon className="h-5 w-5 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold mb-1">{s.title}</h4>
                                    <p className="text-xs opacity-80 leading-relaxed">{s.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Goal Simulator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="h-5 w-5 text-primary" />
                        <h3 className="font-display font-semibold text-foreground">Goal Simulator</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">What you need to reach target CGPAs</p>
                    <div className="space-y-4">
                        {goalSimulator.map((g) => (
                            <div key={g.target} className="rounded-xl border border-border p-4 bg-secondary/20">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-display font-bold text-foreground">{g.target}</span>
                                    <span className={`text-xs font-medium ${g.color}`}>{g.feasibility}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{g.needed}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Explainable AI */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="rounded-xl border border-border bg-card p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                        <h3 className="font-display font-semibold text-foreground">Why This Changed</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">Explainable AI feedback on your performance</p>
                    <div className="space-y-4">
                        {explainableInsights.map((insight) => (
                            <div key={insight.question} className="rounded-xl border border-border p-4 bg-secondary/20">
                                <div className="flex items-start gap-3">
                                    <span className="text-lg">{insight.icon}</span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-1">{insight.question}</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{insight.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default AIAnalysis;
