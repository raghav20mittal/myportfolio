"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface Skill {
    id: string;
    label: string;
    abbr: string;
    category: string;
    related: string[];
    size?: "lg" | "sm";
    description?: string;
}

const skills: Skill[] = [
    {
        id: "ai",
        label: "ML & AI",
        abbr: "AI",
        category: "core",
        related: ["tf", "pt", "cv", "sk"],
        size: "lg",
        description: "Computer Vision, CNN, KNN, Data Augmentation — building scalable deep learning solutions.",
    },
    { id: "py", label: "Python", abbr: "Py", category: "lang", related: ["tf", "pt", "cv", "sk", "pd"] },
    { id: "tf", label: "TensorFlow", abbr: "TF", category: "ml", related: ["ai", "py"] },
    { id: "pt", label: "PyTorch", abbr: "PT", category: "ml", related: ["ai", "py"] },
    { id: "cv", label: "OpenCV", abbr: "CV", category: "ml", related: ["ai", "py"] },
    { id: "sk", label: "Scikit-learn", abbr: "Sk", category: "ml", related: ["ai", "py", "pd"] },
    { id: "pd", label: "Pandas", abbr: "Pd", category: "data", related: ["py", "sk"] },
    { id: "react", label: "ReactJS", abbr: "Re", category: "web", related: ["py"] },
    { id: "n8n", label: "N8N", abbr: "N8", category: "auto", related: ["py", "ai"] },
    { id: "mongo", label: "MongoDB", abbr: "Mg", category: "db", related: ["py"] },
    { id: "git", label: "Git/GitHub", abbr: "Gt", category: "tools", related: ["py"] },
    { id: "figma", label: "Figma", abbr: "Fg", category: "tools", related: ["react"] },
];

export default function SkillsHeatmap() {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const isRelated = useCallback(
        (skillId: string) => {
            if (!hoveredSkill) return false;
            const hovered = skills.find((s) => s.id === hoveredSkill);
            return hovered?.related.includes(skillId) || skillId === hoveredSkill;
        },
        [hoveredSkill]
    );

    return (
        <section id="skills" className="py-28 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="flex items-baseline gap-6 mb-14">
                        <span className="section-label">TECHNICAL :: ARSENAL</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-glow" style={{ color: "var(--text-primary)" }}>
                            TECHNICAL ARSENAL
                        </h2>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {skills.map((skill) => {
                            const active = hoveredSkill === skill.id;
                            const related = isRelated(skill.id);
                            const dimmed = hoveredSkill && !related;

                            return (
                                <motion.div
                                    key={skill.id}
                                    onMouseEnter={() => setHoveredSkill(skill.id)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    whileHover={{ scale: 1.03 }}
                                    className={`
                    glass rounded-xl p-4 cursor-default transition-all duration-300 relative
                    ${skill.size === "lg" ? "col-span-2 row-span-2 p-6" : ""}
                    ${dimmed ? "opacity-30" : "opacity-100"}
                  `}
                                    style={{
                                        borderColor: active ? "var(--glass-hover-border)" : related && !active ? "var(--glass-border)" : undefined,
                                        background: active ? "var(--glass-hover-bg)" : related && !active ? "var(--glass-bg)" : undefined,
                                    }}
                                >
                                    <div className="flex flex-col h-full justify-between">
                                        <div
                                            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold mb-3 transition-colors duration-300"
                                            style={{
                                                background: active ? "var(--btn-primary-bg)" : related ? "var(--glass-hover-bg)" : "var(--glass-bg)",
                                                color: active ? "var(--btn-primary-text)" : related ? "var(--text-primary)" : "var(--text-muted)",
                                            }}
                                        >
                                            {skill.abbr}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm transition-colors duration-300" style={{ color: active ? "var(--text-primary)" : "var(--text-body)" }}>
                                                {skill.label}
                                            </p>
                                            {skill.description && (
                                                <p className="text-[11px] mt-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                                    {skill.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {(active || (related && !active)) && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 rounded-xl pointer-events-none"
                                            style={{
                                                boxShadow: active
                                                    ? "0 0 30px rgba(255,255,255,0.06), inset 0 0 30px rgba(255,255,255,0.03)"
                                                    : "0 0 20px rgba(255,255,255,0.03)",
                                            }}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
