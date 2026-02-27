"use client";

import { motion } from "framer-motion";
import { Briefcase, CreditCard, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Role {
    title: string;
    company: string;
    range: string;
    current: boolean;
    icon: React.ReactNode;
    bullets: string[];
}

const roles: Role[] = [
    {
        title: "CX Advisor",
        company: "ApplyBoard",
        range: "2022 – Present",
        current: true,
        icon: <Briefcase className="w-5 h-5 text-[#0d83f2]" />,
        bullets: [
            "Handling manual exceptions and edge-case escalations across student application workflows.",
            "Optimizing automation efficiency, reducing redundant manual touchpoints by streamlining internal processes.",
            "Collaborating with cross-functional teams to improve customer onboarding and satisfaction.",
        ],
    },
    {
        title: "Loan Support Intern",
        company: "ApplyBoard",
        range: "2021 – 2022",
        current: false,
        icon: <CreditCard className="w-5 h-5 text-slate-500" />,
        bullets: [
            "Achieved a **40% reduction** in manual follow-ups through automated workflow implementation.",
            "Drove a **20% reduction** in processing time by developing scripts to automate data entry tasks.",
            "Processed high-volume financial documents with **99% accuracy**.",
        ],
    },
];

function renderBullet(text: string) {
    // Simple bold markdown rendering
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? (
            <strong key={i} className="text-white">
                {part}
            </strong>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}

export default function Experience() {
    return (
        <section id="experience" className="py-24 bg-[#0d0d0d]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-3xl font-bold mb-14 text-center text-white">
                        Professional Experience
                    </h2>
                </AnimatedSection>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[27px] top-0 bottom-0 w-px bg-white/[0.06]" />

                    {roles.map((role, index) => (
                        <AnimatedSection key={role.title} delay={index * 0.15}>
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="relative flex gap-6 sm:gap-8 mb-12 group"
                            >
                                {/* Circle */}
                                <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-[#0a0a0a] border border-white/[0.06] flex items-center justify-center group-hover:border-[#0d83f2]/40 transition-colors">
                                    {role.icon}
                                </div>

                                {/* Card */}
                                <div className="flex-grow pt-1">
                                    <div className="glass-card p-6 rounded-xl">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white">
                                                {role.title}
                                            </h3>
                                            <span
                                                className={`text-sm font-medium px-3 py-1 rounded-full w-fit mt-2 sm:mt-0 ${role.current
                                                        ? "bg-[#0d83f2]/10 text-[#0d83f2]"
                                                        : "bg-white/[0.04] text-slate-400"
                                                    }`}
                                            >
                                                {role.range}
                                            </span>
                                        </div>
                                        <h4 className="text-base text-slate-500 mb-4">
                                            {role.company}
                                        </h4>
                                        <ul className="space-y-3">
                                            {role.bullets.map((b, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-sm text-slate-400"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 text-[#0d83f2] mt-0.5 flex-shrink-0" />
                                                    <span>{renderBullet(b)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
