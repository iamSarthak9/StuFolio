import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Search, Code, GraduationCap, Flame, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const leaderboardData = [
  { rank: 1, name: "Aarav Patel", section: "CS-A", problems: 512, rating: 1820, cgpaScore: 94, codingScore: 96, consistency: 98, overallScore: 94.2, change: "up", streak: 23 },
  { rank: 2, name: "Priya Sharma", section: "CS-B", problems: 480, rating: 1750, cgpaScore: 91, codingScore: 92, consistency: 95, overallScore: 91.5, change: "up", streak: 18 },
  { rank: 3, name: "Rohan Mehta", section: "CS-A", problems: 445, rating: 1680, cgpaScore: 88, codingScore: 89, consistency: 90, overallScore: 88.1, change: "same", streak: 12 },
  { rank: 4, name: "Nakul Gupta", section: "CS-A", problems: 347, rating: 1590, cgpaScore: 84, codingScore: 82, consistency: 88, overallScore: 82.4, change: "up", streak: 7 },
  { rank: 5, name: "Ananya Singh", section: "CS-B", problems: 310, rating: 1520, cgpaScore: 86, codingScore: 78, consistency: 82, overallScore: 80.7, change: "down", streak: 5 },
  { rank: 6, name: "Vikram Joshi", section: "CS-A", problems: 290, rating: 1480, cgpaScore: 83, codingScore: 76, consistency: 80, overallScore: 78.3, change: "up", streak: 10 },
  { rank: 7, name: "Sneha Reddy", section: "CS-B", problems: 275, rating: 1420, cgpaScore: 81, codingScore: 74, consistency: 78, overallScore: 76.0, change: "same", streak: 3 },
  { rank: 8, name: "Arjun Kumar", section: "CS-A", problems: 260, rating: 1380, cgpaScore: 79, codingScore: 72, consistency: 75, overallScore: 73.5, change: "down", streak: 0 },
  { rank: 9, name: "Divya Nair", section: "CS-B", problems: 240, rating: 1350, cgpaScore: 77, codingScore: 70, consistency: 72, overallScore: 71.2, change: "up", streak: 2 },
  { rank: 10, name: "Karan Verma", section: "CS-A", problems: 220, rating: 1300, cgpaScore: 75, codingScore: 68, consistency: 70, overallScore: 68.8, change: "down", streak: 0 },
];

type TabType = "overall" | "coding" | "academic" | "improvement";

const tabs: { key: TabType; label: string; icon: typeof Trophy }[] = [
  { key: "overall", label: "Overall", icon: Trophy },
  { key: "coding", label: "Coding", icon: Code },
  { key: "academic", label: "Academic", icon: GraduationCap },
  { key: "improvement", label: "Improvement", icon: TrendingUp },
];

const getRankBadge = (rank: number) => {
  if (rank === 1) return "bg-warning/20 text-warning border-warning/30";
  if (rank === 2) return "bg-gray-300/20 text-gray-300 border-gray-300/30";
  if (rank === 3) return "bg-amber-600/20 text-amber-500 border-amber-600/30";
  return "bg-secondary text-muted-foreground border-border";
};

const getSortedData = (tab: TabType) => {
  const sorted = [...leaderboardData];
  switch (tab) {
    case "coding":
      sorted.sort((a, b) => b.codingScore - a.codingScore);
      break;
    case "academic":
      sorted.sort((a, b) => b.cgpaScore - a.cgpaScore);
      break;
    case "improvement":
      sorted.sort((a, b) => b.consistency - a.consistency);
      break;
    default:
      sorted.sort((a, b) => b.overallScore - a.overallScore);
  }
  return sorted.map((s, i) => ({ ...s, displayRank: i + 1 }));
};

const getScoreForTab = (student: typeof leaderboardData[0], tab: TabType) => {
  switch (tab) {
    case "coding": return student.codingScore;
    case "academic": return student.cgpaScore;
    case "improvement": return student.consistency;
    default: return student.overallScore;
  }
};

const LeaderboardPage = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("overall");

  const sortedData = getSortedData(activeTab);
  const filtered = sortedData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Leaderboard" subtitle="Class CS-2026 — Performance Rankings" role="student">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-muted-foreground border border-border hover:bg-secondary/50 hover:text-foreground"
              }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
        {[filtered[1], filtered[0], filtered[2]].filter(Boolean).map((student, i) => {
          const positions = [2, 1, 3];
          const pos = positions[i];
          return (
            <motion.div
              key={student.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-2xl border bg-card p-4 text-center ${pos === 1 ? "border-warning/30 bg-gradient-to-b from-warning/5 to-transparent -mt-4" :
                  "border-border"
                }`}
            >
              <div className={`mx-auto mb-3 h-14 w-14 rounded-full flex items-center justify-center text-base font-bold ${pos === 1 ? "bg-warning/20 text-warning ring-2 ring-warning/30" :
                  pos === 2 ? "bg-gray-300/20 text-gray-300" :
                    "bg-amber-600/20 text-amber-500"
                }`}>
                {student.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex justify-center mb-2">
                <Medal className={`h-5 w-5 ${pos === 1 ? "text-warning" : pos === 2 ? "text-gray-300" : "text-amber-500"}`} />
              </div>
              <p className="text-sm font-semibold text-foreground truncate">{student.name}</p>
              <p className="text-lg font-display font-bold text-gradient-primary mt-1">{getScoreForTab(student, activeTab)}</p>
              <p className="text-[10px] text-muted-foreground">#{pos}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-card"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-warning/10 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-warning" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground text-sm">Full Rankings</h3>
              <p className="text-[10px] text-muted-foreground">{filtered.length} students · Privacy-safe scores</p>
            </div>
          </div>
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-secondary/50 border-border text-foreground text-sm rounded-lg"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3">Rank</th>
                <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3">Student</th>
                <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3">Problems</th>
                <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3">Rating</th>
                <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3">
                  {activeTab === "coding" ? "Coding Score" : activeTab === "academic" ? "Academic Score" : activeTab === "improvement" ? "Consistency" : "Score"}
                </th>
                <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3">Streak</th>
                <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, i) => (
                <motion.tr
                  key={student.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`border-b border-border last:border-0 hover:bg-secondary/30 transition-colors ${student.name === "Nakul Gupta" ? "bg-primary/5" : ""
                    }`}
                >
                  <td className="px-4 py-3.5">
                    <div className={`inline-flex h-7 w-7 items-center justify-center rounded-md border text-xs font-bold ${getRankBadge(student.displayRank)}`}>
                      {student.displayRank <= 3 ? <Medal className="h-3.5 w-3.5" /> : student.displayRank}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${student.name === "Nakul Gupta" ? "bg-gradient-primary shadow-glow" : "bg-gradient-primary"
                        }`}>
                        {student.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <span className="font-medium text-sm text-foreground">{student.name}</span>
                        <p className="text-[10px] text-muted-foreground">{student.section}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">{student.problems}</td>
                  <td className="px-4 py-3.5 text-sm text-muted-foreground">{student.rating}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-display font-bold text-gradient-primary">
                      {getScoreForTab(student, activeTab)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {student.streak > 0 ? (
                      <div className="flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5 text-warning" />
                        <span className="text-xs font-medium text-warning">{student.streak}d</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    {student.change === "up" && <TrendingUp className="h-4 w-4 text-accent" />}
                    {student.change === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
                    {student.change === "same" && <Minus className="h-4 w-4 text-muted-foreground" />}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
