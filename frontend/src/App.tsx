import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import AIAnalysis from "./pages/AIAnalysis";
import CalendarPage from "./pages/CalendarPage";
import AttendancePage from "./pages/AttendancePage";
import CareerPage from "./pages/CareerPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MentorDashboard from "./pages/MentorDashboard";
import MentorStudentDetail from "./pages/MentorStudentDetail";
import MentorAnalytics from "./pages/MentorAnalytics";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Student */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/ai-analysis" element={<AIAnalysis />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Mentor */}
          <Route path="/mentor" element={<MentorDashboard />} />
          <Route path="/mentor/students" element={<MentorStudentDetail />} />
          <Route path="/mentor/analytics" element={<MentorAnalytics />} />
          <Route path="/mentor/settings" element={<SettingsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
