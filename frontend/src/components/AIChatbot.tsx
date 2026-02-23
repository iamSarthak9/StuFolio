import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

const quickActions = [
    "How do I check my attendance?",
    "Show me my AI analysis",
    "How to link my LeetCode profile?",
    "Where can I see the leaderboard?",
];

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

const botResponses: Record<string, string> = {
    "attendance": "You can check your attendance by navigating to the **Attendance** section from the sidebar. It shows subject-wise attendance tracking and eligibility predictions based on the 75% criteria.",
    "ai": "Head over to **AI Analysis** in the sidebar! There you'll find performance predictions, strength/weakness analysis, personalized improvement suggestions, and a goal simulator.",
    "leetcode": "Go to **Settings** → **Integrations** tab. You can link your LeetCode, Codeforces, and GitHub profiles there. Once linked, your coding stats will appear on your dashboard and profile.",
    "leaderboard": "Click on **Leaderboard** in the sidebar. You can switch between Overall, Coding, Academic, and Improvement rankings using the tabs at the top.",
    "default": "I can help you navigate through StuFolio! Try asking about attendance tracking, AI analysis, coding profiles, leaderboards, calendar events, or career planning. 🚀",
};

const getResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes("attendance")) return botResponses["attendance"];
    if (lower.includes("ai") || lower.includes("analysis")) return botResponses["ai"];
    if (lower.includes("leetcode") || lower.includes("link") || lower.includes("profile")) return botResponses["leetcode"];
    if (lower.includes("leaderboard") || lower.includes("rank")) return botResponses["leaderboard"];
    return botResponses["default"];
};

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, text: "Hi! I'm StuBot 🤖 — your AI assistant for StuFolio. How can I help you today?", sender: "bot" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;
        const userMsg: Message = { id: Date.now(), text, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        setTimeout(() => {
            const botMsg: Message = { id: Date.now() + 1, text: getResponse(text), sender: "bot" };
            setMessages((prev) => [...prev, botMsg]);
        }, 600);
    };

    return (
        <>
            {/* Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-gradient-primary shadow-glow-lg flex items-center justify-center text-white hover:shadow-glow transition-all"
                    >
                        <MessageCircle className="h-6 w-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] rounded-2xl border border-border bg-card shadow-elevated flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-card">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                                    <Bot className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-display font-semibold text-foreground text-sm">StuBot</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                                        <span className="text-[10px] text-accent">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender === "user"
                                                ? "bg-gradient-primary text-white rounded-br-md"
                                                : "bg-secondary text-foreground rounded-bl-md"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Sparkles className="h-3 w-3 text-primary" />
                                    <span className="text-[10px] text-muted-foreground font-medium">Quick questions</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {quickActions.map((action) => (
                                        <button
                                            key={action}
                                            onClick={() => sendMessage(action)}
                                            className="text-[11px] px-2.5 py-1 rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 border-t border-border">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 h-10 rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                                />
                                <button
                                    onClick={() => sendMessage(input)}
                                    disabled={!input.trim()}
                                    className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white disabled:opacity-40 hover:shadow-glow transition-all"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;
