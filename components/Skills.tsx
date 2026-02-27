"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const mlSkills = [
    { label: "TensorFlow", abbr: "TF", color: "bg-orange-500" },
    { label: "PyTorch", abbr: "PT", color: "bg-red-500" },
    { label: "Keras", abbr: "K", color: "bg-red-600" },
    { label: "OpenCV", abbr: "CV", color: "bg-green-500" },
    { label: "Scikit-Learn", abbr: "Sk", color: "bg-blue-500" },
    { label: "Pandas", abbr: "Pd", color: "bg-yellow-600" },
    { label: "N8N", abbr: "N8", color: "bg-red-500" },
];

const languages = ["Python", "JavaScript", "SQL"];
const webDev = ["NextJS", "HTML5", "Tailwind"];

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-3xl font-bold mb-14 text-center text-white">
                        Technical Arsenal
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
                    {/* AI / ML — Large card */}
                    <AnimatedSection
                        className="md:col-span-2 md:row-span-2"
                        delay={0.1}
                    >
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.3 }}
                            className="h-full rounded-2xl p-8 bg-gradient-to-br from-indigo-950/60 to-[#0a0a0a] border border-white/[0.04] relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                                <Brain className="w-32 h-32" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                AI &amp; Machine Learning
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {mlSkills.map((skill) => (
                                    <motion.div
                                        key={skill.label}
                                        whileHover={{ scale: 1.03 }}
                                        className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-lg border border-white/[0.06] hover:bg-white/[0.06] transition-colors cursor-default"
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full ${skill.color} flex items-center justify-center font-bold text-white text-xs`}
                                        >
                                            {skill.abbr}
                                        </div>
                                        <span className="text-slate-300 text-sm">
                                            {skill.label}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    {/* Languages card */}
                    <AnimatedSection delay={0.2}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="h-full rounded-2xl p-6 bg-[#111111] border border-white/[0.04] flex flex-col justify-between hover:border-[#0d83f2]/30 transition-colors"
                        >
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                                    <Code2 className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Languages</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {languages.map((l) => (
                                    <span
                                        key={l}
                                        className="px-2.5 py-1 bg-white/[0.04] rounded text-sm font-medium text-slate-300"
                                    >
                                        {l}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    {/* Web Dev card */}
                    <AnimatedSection delay={0.3}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="h-full rounded-2xl p-6 bg-[#111111] border border-white/[0.04] flex flex-col justify-between hover:border-[#0d83f2]/30 transition-colors"
                        >
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Web Dev</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {webDev.map((w) => (
                                    <span
                                        key={w}
                                        className="px-2.5 py-1 bg-white/[0.04] rounded text-sm font-medium text-slate-300"
                                    >
                                        {w}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
