import { motion } from "framer-motion";
import {
    AlertTriangle,
    TrendingDown,
    Calendar,
    CheckCircle,
    Clock,
    X,
} from "lucide-react";

const notifications = [
    {
        id: 1,
        type: "warning",
        title: "Attendance Alert",
        message: "Your attendance in CN is at 68%. Need 3 more classes for eligibility.",
        time: "2 hours ago",
        icon: AlertTriangle,
        color: "text-warning bg-warning/10",
    },
    {
        id: 2,
        type: "danger",
        title: "Performance Drop",
        message: "Your DBMS score dropped by 12% compared to last assessment.",
        time: "5 hours ago",
        icon: TrendingDown,
        color: "text-destructive bg-destructive/10",
    },
    {
        id: 3,
        type: "info",
        title: "Upcoming Contest",
        message: "LeetCode Biweekly Contest 148 starts tomorrow at 8:00 PM IST.",
        time: "1 day ago",
        icon: Calendar,
        color: "text-primary bg-primary/10",
    },
    {
        id: 4,
        type: "success",
        title: "Milestone Reached",
        message: "You've solved 350 problems on LeetCode! Badge unlocked.",
        time: "2 days ago",
        icon: CheckCircle,
        color: "text-accent bg-accent/10",
    },
];

interface NotificationCenterProps {
    onClose: () => void;
}

const NotificationCenter = ({ onClose }: NotificationCenterProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="absolute right-0 top-12 w-80 sm:w-96 rounded-xl border border-border bg-card shadow-elevated z-50"
        >
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-foreground text-sm">Notifications</h3>
                    <span className="h-5 min-w-[20px] rounded-full bg-destructive text-[10px] font-bold text-white flex items-center justify-center px-1.5">
                        {notifications.length}
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-border/50">
                {notifications.map((notif, i) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-3 p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                    >
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${notif.color}`}>
                            <notif.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{notif.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                            <div className="flex items-center gap-1 mt-1.5">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-3 border-t border-border">
                <button className="w-full text-xs font-medium text-primary hover:text-primary/80 transition-colors text-center py-1">
                    View all notifications
                </button>
            </div>
        </motion.div>
    );
};

export default NotificationCenter;
