"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface Message {
    role: "user" | "bot";
    text: string;
}

// ── Resume Knowledge Base ───────────────────────────────────
const RESUME = {
    name: "Raghav Mittal",
    title: "AI/ML Engineer & Automation Specialist",
    education: "B.Tech in Computer Science (Artificial Intelligence and Machine Learning) from Noida Institute of Engineering and Technology, GPA: 7.35/10.0 (Nov 2021 – Jun 2025)",
    roles: [
        { title: "CX Advisor", company: "ApplyBoard", location: "Gurgaon, IN", start: "2025-08-01", end: null, bullets: ["Handle manual exception tasks flagged by chatbot during student application processing", "Ensure accuracy, compliance, and timely completion of applications not fully automated", "Collaborate with teams to reduce manual interventions and improve automation efficiency"] },
        { title: "Loan Support Intern", company: "ApplyBoard", location: "Gurgaon, IN", start: "2025-03-01", end: "2025-07-31", bullets: ["Built an email automation system that scans incoming mails and auto-replies to team members if required documents or information are missing, reducing manual follow-ups by 40", "Collaborated with cross-functional teams to streamline loan processing workflows, contributing to a 20% reduction in processing time"] },
    ],
    skills: {
        languages: ["Python (Intermediate)", "JavaScript (Beginner)", "HTML/CSS"],
        ml_ai: ["TensorFlow", "Keras", "PyTorch", "OpenCV", "MediaPipe", "Scikit-learn", "Computer Vision", "CNN", "KNN", "Data Augmentation"],
        frameworks: ["ReactJS", "Tailwind CSS", "Flask", "NumPy", "Pandas", "Matplotlib"],
        databases: ["MySQL", "MongoDB", "SQLite"],
        tools: ["N8N", "Git/GitHub", "Jupyter Notebook", "VS Code", "Google Colab", "Figma"],
        soft: ["Communication", "Problem-solving", "Time management", "Leadership", "Teamwork"],
    },
    projects: [
        { name: "Invisible Cloak", date: "Apr 2024", accuracy: "85%", description: "Built a real-time invisibility effect using OpenCV and HSV color masking techniques with 85% accuracy in varying lighting conditions. Implemented background subtraction algorithms for seamless visual effects with minimal artifacts.", tech: ["OpenCV", "NumPy", "Real-time Video Processing"] },
        { name: "Hand Sign Recognition", date: "Feb 2024", accuracy: "98%", description: "Developed a real-time hand gesture recognition system using MediaPipe hand tracking with 98% landmark detection accuracy. Created a dataset of 2,600+ hand gesture images to train and validate the model.", tech: ["OpenCV", "MediaPipe", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"] },
    ],
    interests: "Artificial Intelligence, Machine Learning, Web Development",
    links: { github: "github.com/raghav20mittal", linkedin: "linkedin.com/in/raghavmittal20", email: "raghavmittal434@gmail.com" },
};

// ── Smart Helpers ───────────────────────────────────────────
function calculateExperience(): { years: number; months: number; text: string } {
    const now = new Date();
    const earliest = new Date("2025-03-01"); // Loan Support Intern start

    let totalMonths = (now.getFullYear() - earliest.getFullYear()) * 12 + (now.getMonth() - earliest.getMonth());
    if (totalMonths < 0) totalMonths = 0;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) {
        return { years, months, text: `${months} month${months !== 1 ? "s" : ""}` };
    }
    if (months === 0) {
        return { years, months, text: `${years} year${years !== 1 ? "s" : ""}` };
    }
    return { years, months, text: `${years} year${years !== 1 ? "s" : ""} and ${months} month${months !== 1 ? "s" : ""}` };
}

function formatRoleDetails(roleIdx: number): string {
    const r = RESUME.roles[roleIdx];
    const endStr = r.end ? new Date(r.end).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present";
    const startStr = new Date(r.start).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    return `${r.title} at ${r.company}, ${r.location} (${startStr} – ${endStr}):\n${r.bullets.map(b => `  • ${b}`).join("\n")}`;
}

function getAllSkillsFlat(): string {
    return [
        `🔤 Languages: ${RESUME.skills.languages.join(", ")}`,
        `🧠 ML & AI: ${RESUME.skills.ml_ai.join(", ")}`,
        `⚡ Frameworks: ${RESUME.skills.frameworks.join(", ")}`,
        `🗃️ Databases: ${RESUME.skills.databases.join(", ")}`,
        `🔧 Tools: ${RESUME.skills.tools.join(", ")}`,
        `🤝 Soft Skills: ${RESUME.skills.soft.join(", ")}`,
    ].join("\n\n");
}

// ── Smart Response Engine ───────────────────────────────────
function findAnswer(question: string): string {
    const q = question.toLowerCase().trim();

    // Greeting
    if (/^(hi|hey|hello|yo|sup|hola|howdy)\b/.test(q))
        return `Hey there! 👋 I'm Raghav's AI assistant. I can tell you about his skills, experience, projects, education, or contact info. Fire away!`;

    // Experience duration — smart calculation
    if (q.includes("how much experience") || q.includes("how long") || q.includes("years of experience") || q.includes("total experience") || (q.includes("experience") && (q.includes("how") || q.includes("year") || q.includes("month")))) {
        const exp = calculateExperience();
        return `Raghav has approximately **${exp.text}** of professional experience, all at ApplyBoard in Gurgaon, India. He started as a Loan Support Intern in March 2025 and was promoted to CX Advisor in August 2025, where he continues to work today. That's a solid trajectory showing rapid growth! 📈`;
    }

    // Current role
    if (q.includes("current") && (q.includes("role") || q.includes("job") || q.includes("position") || q.includes("work")))
        return `Currently, Raghav is a **CX Advisor at ApplyBoard** (Aug 2025 – Present) in Gurgaon, India.\n\nHe handles chatbot-flagged exception tasks, ensures compliance in student applications, and collaborates to improve automation efficiency. He was promoted from Intern to Advisor within 5 months — pretty impressive! 🚀`;

    // Experience details
    if (q.includes("experience") || q.includes("work history") || q.includes("job") || q.includes("applyboard") || q.includes("career")) {
        const exp = calculateExperience();
        return `Raghav has **${exp.text}** of professional experience at ApplyBoard:\n\n${formatRoleDetails(0)}\n\n${formatRoleDetails(1)}`;
    }

    // All skills
    if (q.includes("all skill") || q.includes("every skill") || q.includes("complete skill") || q.includes("full skill"))
        return `Here's Raghav's complete skill set:\n\n${getAllSkillsFlat()}`;

    // Tech stack
    if (q.includes("tech stack") || q.includes("technologies") || q.includes("stack"))
        return `Raghav's tech stack:\n\n${getAllSkillsFlat()}`;

    // Specific skill categories
    if (q.includes("programming") || q.includes("language"))
        return `Programming languages: ${RESUME.skills.languages.join(", ")}.\n\nPython is his strongest language — he uses it for ML models, automation scripts, and data processing.`;

    if (q.includes("machine learning") || q.includes(" ml") || q.includes("deep learning") || q.includes("artificial intelligence") || q.match(/\bai\b/))
        return `ML & AI expertise: ${RESUME.skills.ml_ai.join(", ")}.\n\nHe's built real-world projects achieving 85-98% accuracy using these tools. His focus is on Computer Vision and applied ML.`;

    if (q.includes("framework") || q.includes("library") || q.includes("react") || q.includes("flask"))
        return `Frameworks & Libraries: ${RESUME.skills.frameworks.join(", ")}.\n\nHe builds web interfaces with ReactJS and backend APIs with Flask.`;

    if (q.includes("database") || q.includes("db") || q.includes("sql") || q.includes("mongo"))
        return `Databases: ${RESUME.skills.databases.join(", ")}.\n\nHe works with both SQL (MySQL, SQLite) and NoSQL (MongoDB) databases.`;

    if (q.includes("tool") || q.includes("software") || q.includes("n8n") || q.includes("figma"))
        return `Dev tools: ${RESUME.skills.tools.join(", ")}.\n\nN8N is his go-to for workflow automation, and he uses Figma for UI design.`;

    if (q.includes("soft skill") || q.includes("communication") || q.includes("leadership") || q.includes("teamwork"))
        return `Soft skills: ${RESUME.skills.soft.join(", ")}.\n\nAs a CX Advisor handling cross-functional collaboration, he puts these to practice daily.`;

    // Skills general
    if (q.includes("skill"))
        return `Here are Raghav's key skills:\n\n${getAllSkillsFlat()}\n\nWant me to dive deeper into any category?`;

    // Specific skills check
    if (q.includes("python")) return "Python is Raghav's primary language (Intermediate level). He uses it heavily for ML/AI projects with TensorFlow, PyTorch, OpenCV, and for automation with N8N and custom scripts.";
    if (q.includes("tensorflow") || q.includes("keras")) return "Raghav uses TensorFlow & Keras for building deep learning models, especially CNNs for computer vision tasks. His Hand Sign Recognition project achieved 98% accuracy using these frameworks.";
    if (q.includes("opencv")) return "OpenCV is central to Raghav's computer vision work. His Invisible Cloak project uses OpenCV with HSV color masking for real-time video processing at 85% accuracy.";
    if (q.includes("pytorch")) return "Raghav uses PyTorch alongside TensorFlow for deep learning experimentation and model prototyping.";
    if (q.includes("mediapipe")) return "MediaPipe is used in Raghav's Hand Sign Recognition project for real-time hand landmark tracking with 98% detection accuracy.";

    // Education
    if (q.includes("education") || q.includes("degree") || q.includes("college") || q.includes("university") || q.includes("study") || q.includes("qualification") || q.includes("gpa"))
        return `🎓 ${RESUME.education}\n\nHe specialized in Artificial Intelligence and Machine Learning within his CS degree.`;

    // Specific projects
    if (q.includes("invisible") || q.includes("cloak")) {
        const p = RESUME.projects[0];
        return `🔬 **${p.name}** (${p.date})\n\n${p.description}\n\nAccuracy: ${p.accuracy}\nTech: ${p.tech.join(", ")}`;
    }

    if (q.includes("hand") || q.includes("sign") || q.includes("gesture")) {
        const p = RESUME.projects[1];
        return `🔬 **${p.name}** (${p.date})\n\n${p.description}\n\nAccuracy: ${p.accuracy}\nTech: ${p.tech.join(", ")}`;
    }

    // Projects general
    if (q.includes("project"))
        return `Raghav has two key AI projects:\n\n🔬 **${RESUME.projects[0].name}** (${RESUME.projects[0].date}) — ${RESUME.projects[0].accuracy} accuracy\n${RESUME.projects[0].description}\n\n🔬 **${RESUME.projects[1].name}** (${RESUME.projects[1].date}) — ${RESUME.projects[1].accuracy} accuracy\n${RESUME.projects[1].description}`;

    // Contact
    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone") || q.includes("hire") || q.includes("connect"))
        return `📬 Here's how to reach Raghav:\n\n• Email: ${RESUME.links.email}\n• GitHub: ${RESUME.links.github}\n• LinkedIn: ${RESUME.links.linkedin}\n\nOr use the contact form below! He's open to collaborations and opportunities.`;

    // About / Introduction
    if (q.includes("who") || q.includes("about") || q.includes("yourself") || q.includes("tell me about") || q.includes("raghav") || q.includes("introduction") || q.includes("introduce")) {
        const exp = calculateExperience();
        return `👋 I'm **${RESUME.name}**, a ${RESUME.title} with ${exp.text} of professional experience.\n\n🎓 ${RESUME.education}\n\n💼 Currently working as a CX Advisor at ApplyBoard, where I optimize automation and handle complex application workflows.\n\n🧠 I build AI-powered solutions with a focus on Computer Vision — my projects have achieved up to 98% accuracy.\n\n🔥 Areas of interest: ${RESUME.interests}`;
    }

    // Interests
    if (q.includes("interest") || q.includes("passion") || q.includes("hobby") || q.includes("focus"))
        return `Raghav's areas of interest: ${RESUME.interests}.\n\nHe's most passionate about building real-world AI solutions that solve tangible problems, especially in Computer Vision and automation.`;

    // Accuracy / achievements
    if (q.includes("accuracy") || q.includes("achievement") || q.includes("result") || q.includes("accomplishment"))
        return `🏆 Key achievements:\n\n• Invisible Cloak: 85% accuracy under variable lighting\n• Hand Sign Recognition: 98% landmark detection accuracy\n• 40% reduction in manual follow-ups through email automation\n• 20% reduction in loan processing time\n• 99.9% data integrity compliance on financial records\n• Promoted from Intern to Advisor within 5 months`;

    // Thank you / bye
    if (q.includes("thank") || q.includes("thanks") || q.includes("bye") || q.includes("later"))
        return `You're welcome! 😊 Feel free to come back anytime. Have a great day!`;

    // Fallback — intelligent
    return `Great question! While I may not have a specific answer for that, I can tell you about Raghav's:\n\n• 🧠 Skills & tech stack\n• 💼 Work experience & duration\n• 🔬 AI projects & accuracy\n• 🎓 Education\n• 📬 Contact info\n\nTry asking something like "What's his tech stack?" or "How much experience does he have?"`;
}

// ── Typewriter Effect ───────────────────────────────────────
function TypewriterText({ text, onComplete }: { text: string; onComplete: () => void }) {
    const [displayed, setDisplayed] = useState("");
    const idx = useRef(0);

    useEffect(() => {
        idx.current = 0;
        setDisplayed("");
        const interval = setInterval(() => {
            if (idx.current < text.length) {
                setDisplayed(text.slice(0, idx.current + 1));
                idx.current++;
            } else {
                clearInterval(interval);
                onComplete();
            }
        }, 12);
        return () => clearInterval(interval);
    }, [text, onComplete]);

    return <span className="whitespace-pre-wrap">{displayed}<span className="animate-pulse">▌</span></span>;
}

// ── Smiling Baby Face SVG Icon ☺ ────────────────────────────
function AIFaceIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <svg viewBox="0 0 40 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="19" r="15" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="14" cy="16" r="2.5" fill="currentColor" />
            <circle cx="15" cy="14.5" r="1" fill="#050505" opacity="0.8" />
            <circle cx="26" cy="16" r="2.5" fill="currentColor" />
            <circle cx="27" cy="14.5" r="1" fill="#050505" opacity="0.8" />
            <circle cx="10" cy="21" r="2.5" fill="currentColor" opacity="0.12" />
            <circle cx="30" cy="21" r="2.5" fill="currentColor" opacity="0.12" />
            <path d="M13 23 Q16 28 20 28 Q24 28 27 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="20" r="0.8" fill="currentColor" opacity="0.3" />
            <line x1="5" y1="7" x2="7" y2="9" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <line x1="7" y1="7" x2="5" y2="9" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <line x1="33" y1="7" x2="35" y2="9" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <line x1="35" y1="7" x2="33" y2="9" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <line x1="20" y1="4" x2="20" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="20" cy="-1" r="1.5" fill="currentColor" className="animate-pulse" opacity="0.6" />
        </svg>
    );
}

// ── Main Component ──────────────────────────────────────────
export default function AskRaghav() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", text: "Hey! 👋 I'm Raghav's AI assistant. Ask me about his skills, experience, projects, or education." },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, typing]);

    function handleSend() {
        if (!input.trim() || typing) return;
        const userMsg: Message = { role: "user", text: input.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setTyping(true);

        setTimeout(() => {
            const answer = findAnswer(userMsg.text);
            setMessages((prev) => [...prev, { role: "bot", text: answer }]);
        }, 400);
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <>
            {/* Floating AI Face Bubble */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer group"
                style={{ background: "var(--chat-fab-bg)", border: "1px solid var(--chat-fab-border)", color: "var(--chat-fab-icon)" }}
                aria-label="Ask Raghav AI"
            >
                {isOpen ? (
                    <X className="w-5 h-5" />
                ) : (
                    <div className="relative">
                        <AIFaceIcon className="w-7 h-7" />
                        <span className="absolute -inset-1 rounded-full border animate-ping opacity-30" style={{ borderColor: "var(--chat-ping)" }} />
                    </div>
                )}
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[440px] rounded-2xl overflow-hidden flex flex-col backdrop-blur-2xl"
                        style={{ background: "var(--chat-panel-bg)", border: "1px solid var(--chat-panel-border)" }}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid var(--chat-bot-border)" }}>
                            <AIFaceIcon className="w-5 h-5" style={{ color: "var(--chat-bot-text)" }} />
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500/60 animate-pulse" />
                                <span className="text-[11px] font-medium tracking-wider" style={{ color: "var(--chat-bot-text)" }}>ASK_RAGHAV</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-grow overflow-y-auto px-4 py-4 space-y-3">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                                            }`}
                                        style={msg.role === "user"
                                            ? { background: "var(--chat-user-bg)", color: "var(--chat-user-text)" }
                                            : { background: "var(--chat-bot-bg)", color: "var(--chat-bot-text)", border: "1px solid var(--chat-bot-border)" }
                                        }
                                    >
                                        {msg.role === "bot" && i === messages.length - 1 && typing ? (
                                            <TypewriterText text={msg.text} onComplete={() => setTyping(false)} />
                                        ) : (
                                            <span className="whitespace-pre-wrap">{msg.text}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="px-3 py-3" style={{ borderTop: "1px solid var(--chat-bot-border)" }}>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about skills, projects..."
                                    className="flex-grow px-3 py-2 rounded-lg text-xs focus:outline-none"
                                    style={{ background: "var(--chat-input-bg)", border: "1px solid var(--chat-input-border)", color: "var(--chat-input-text)" }}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={typing || !input.trim()}
                                    className="p-2 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                                    style={{ background: "var(--chat-send-bg)", color: "var(--chat-send-icon)" }}
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

