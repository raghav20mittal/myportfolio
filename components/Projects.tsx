"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Project {
    title: string;
    date: string;
    description: string;
    accuracy: number;
    accLabel: string;
    tags: string[];
    codeUrl: string;
    details: string[];
}

const projects: Project[] = [
    {
        title: "Invisible Cloak",
        date: "Apr 2024",
        description:
            "Built a real-time invisibility effect using OpenCV and HSV color masking techniques with 85% accuracy in varying lighting conditions.",
        accuracy: 85,
        accLabel: "85% Accuracy",
        tags: ["OpenCV", "NumPy", "Real-time Video Processing"],
        codeUrl: "https://github.com/raghav20mittal",
        details: [
            "Implemented background subtraction algorithms to create seamless visual effects with minimal artifacts.",
        ],
    },
    {
        title: "Hand Sign Recognition",
        date: "Feb 2024",
        description:
            "Developed a real-time hand gesture recognition system using MediaPipe hand tracking with 98% landmark detection accuracy.",
        accuracy: 98,
        accLabel: "98% Accuracy",
        tags: ["OpenCV", "MediaPipe", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
        codeUrl: "https://github.com/raghav20mittal",
        details: [
            "Created a dataset of 2,600+ hand gesture images to train and validate the model.",
        ],
    },
];

function TrainingGauge({ accuracy, active }: { accuracy: number; active: boolean }) {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (accuracy / 100) * circumference;

    return (
        <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r={radius} fill="none" stroke="var(--glass-border)" strokeWidth="3" />
                <circle
                    cx="40" cy="40" r={radius} fill="none"
                    stroke={active ? "var(--text-primary)" : "var(--glass-border)"}
                    strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={active ? offset : circumference}
                    className="gauge-ring"
                    style={{ filter: active ? "drop-shadow(0 0 6px var(--glow))" : "none", opacity: active ? 0.8 : 0.3 }}
                />
            </svg>
            <span className="absolute text-sm font-bold transition-colors duration-500" style={{ color: active ? "var(--text-primary)" : "var(--text-muted)" }}>
                {active ? `${accuracy}%` : "—"}
            </span>
        </div>
    );
}

export default function Projects() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section id="projects" className="py-28 relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <p className="section-label mb-4">REPOSITORY :: ACTIVE</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-glow tracking-wide" style={{ color: "var(--text-primary)" }}>ACTIVE REPOSITORIES</h2>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <AnimatedSection key={project.title} delay={index * 0.15}>
                            <motion.div
                                onMouseEnter={() => setHoveredIdx(index)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                whileHover={{ y: -4 }}
                                className="glass rounded-2xl overflow-hidden group flex flex-col h-full"
                            >
                                <div className="h-48 relative overflow-hidden" style={{ background: "var(--glass-bg)" }}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 rounded-full blur-xl" style={{ background: "var(--glow)" }} />
                                    </div>
                                    <div className="absolute inset-0 opacity-90" style={{ background: `linear-gradient(to top, var(--bg), transparent)` }} />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="section-label mb-1">{project.accLabel} · {project.date}</p>
                                            <h3 className="text-xl font-bold transition-colors" style={{ color: "var(--text-primary)" }}>
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <TrainingGauge accuracy={project.accuracy} active={hoveredIdx === index} />
                                            <a
                                                href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                                                className="p-2 rounded-full transition-colors"
                                                style={{ background: "var(--tag-bg)", color: "var(--text-muted)" }}
                                                title="View Code"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>

                                    <p className="mb-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>{project.description}</p>
                                    {project.details.map((d, i) => (
                                        <p key={i} className="mb-4 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>• {d}</p>
                                    ))}

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 text-[10px] font-medium tracking-wider rounded" style={{ background: "var(--tag-bg)", color: "var(--tag-text)", border: `1px solid var(--tag-border)` }}>
                                                {tag}
                                            </span>
                                        ))}
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
