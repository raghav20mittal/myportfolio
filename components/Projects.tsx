"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Project {
    title: string;
    description: React.ReactNode;
    tags: { label: string; color: string }[];
    codeUrl: string;
    gradient: string;
}

const projects: Project[] = [
    {
        title: "Invisible Cloak",
        description: (
            <>
                A real-time computer vision application that creates an invisibility
                effect by masking specific colors in a video stream. Achieved{" "}
                <span className="text-[#0d83f2] font-semibold">
                    85% background masking accuracy
                </span>{" "}
                under variable lighting conditions.
            </>
        ),
        tags: [
            { label: "OpenCV", color: "blue" },
            { label: "Python", color: "yellow" },
            { label: "NumPy", color: "green" },
        ],
        codeUrl: "https://github.com/raghav20mittal",
        gradient: "from-blue-600/20 via-transparent to-transparent",
    },
    {
        title: "Hand Sign Recognition",
        description: (
            <>
                Developed a robust hand gesture recognition system for sign language
                translation. Utilized MediaPipe for landmark detection and TensorFlow
                for classification, achieving{" "}
                <span className="text-[#0d83f2] font-semibold">98% accuracy</span>.
            </>
        ),
        tags: [
            { label: "TensorFlow", color: "orange" },
            { label: "MediaPipe", color: "teal" },
            { label: "CNN", color: "blue" },
        ],
        codeUrl: "https://github.com/raghav20mittal",
        gradient: "from-purple-600/20 via-transparent to-transparent",
    },
];

const tagColors: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            {/* Dot grid background */}
            <div className="absolute inset-0 dot-grid opacity-40" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 text-white">
                            Key Projects
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Showcasing practical applications of Computer Vision and Machine
                            Learning.
                        </p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <AnimatedSection key={project.title} delay={index * 0.15}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                                className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
                            >
                                {/* Gradient Header */}
                                <div className="h-44 relative overflow-hidden">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Code2 className="w-16 h-16 text-white/10 group-hover:text-white/20 transition-colors duration-500" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#0d83f2] transition-colors">
                                            {project.title}
                                        </h3>
                                        <a
                                            href={project.codeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white/[0.04] hover:bg-[#0d83f2] rounded-full text-white transition-colors flex-shrink-0"
                                            title="View Code"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>

                                    <p className="text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag.label}
                                                className={`px-3 py-1 text-xs font-semibold rounded-full border ${tagColors[tag.color]
                                                    }`}
                                            >
                                                {tag.label}
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
