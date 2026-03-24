"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Role {
    title: string;
    company: string;
    location: string;
    range: string;
    current: boolean;
    bullets: string[];
}

const roles: Role[] = [
    {
        title: "CX Advisor",
        company: "ApplyBoard",
        location: "Gurgaon, IN",
        range: "AUG 2025 – PRESENT",
        current: true,
        bullets: [
            "Handle manual exception tasks flagged by the chatbot during student application processing.",
            "Ensure accuracy, compliance, and timely completion of applications not fully automated.",
            "Collaborate with teams to reduce manual interventions and improve automation efficiency.",
        ],
    },
    {
        title: "Loan Support Intern",
        company: "ApplyBoard",
        location: "Gurgaon, IN",
        range: "MAR 2025 – JUL 2025",
        current: false,
        bullets: [
            "Built an email automation system that scans incoming mails and auto-replies to team members if required documents or information are missing, reducing manual follow-ups by **40**.",
            "Collaborate with cross-functional teams to streamline loan processing workflows, contributing to a **20%** reduction in processing time.",
        ],
    },
];

function renderBullet(text: string) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? (
            <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                {part}
            </strong>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}

export default function Experience() {
    return (
        <section id="experience" className="py-28 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="section-label mb-4">PROFESSIONAL TRAJECTORY</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-glow" style={{ color: "var(--text-primary)" }}>
                            Operational Experience
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="space-y-6">
                    {roles.map((role, index) => (
                        <AnimatedSection key={role.title} delay={index * 0.15}>
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="glass rounded-2xl p-6 sm:p-8"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                                    <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{role.company}</h3>
                                    <span
                                        className="text-[10px] font-medium tracking-[0.15em] px-3 py-1 rounded-full w-fit mt-2 sm:mt-0"
                                        style={{ background: "var(--tag-bg)", color: "var(--text-muted)", border: `1px solid var(--tag-border)` }}
                                    >
                                        {role.range}
                                    </span>
                                </div>
                                <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>{role.title}</p>
                                <p className="text-xs mb-5" style={{ color: "var(--text-muted)", opacity: 0.6 }}>{role.location}</p>

                                <ul className="space-y-3">
                                    {role.bullets.map((b, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2.5 text-sm leading-relaxed"
                                            style={{ color: "var(--text-body)" }}
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                                            <span>{renderBullet(b)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
