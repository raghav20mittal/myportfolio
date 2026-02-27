"use client";

import { motion } from "framer-motion";
import { Rocket, Download, TrendingUp } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
};

export default function Hero() {
    return (
        <section className="relative pt-24 pb-32 overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#0d83f2]/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left — Text */}
                    <div className="flex flex-col gap-6">
                        <motion.p
                            custom={0}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-sm font-semibold tracking-widest uppercase text-[#0d83f2]"
                        >
                            AI/ML Engineer &amp; Automation Specialist
                        </motion.p>

                        <motion.h1
                            custom={1}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white"
                        >
                            Engineering{" "}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d83f2] to-purple-400">
                                Intelligence
                            </span>
                        </motion.h1>

                        <motion.p
                            custom={2}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-lg sm:text-xl text-slate-400 max-w-lg leading-relaxed"
                        >
                            Through Computer Vision &amp; Automation. Building scalable AI
                            solutions that bridge the gap between data and decision‑making.
                        </motion.p>

                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-4 mt-2"
                        >
                            <a
                                href="#projects"
                                className="flex items-center gap-2 px-6 py-3 bg-[#0d83f2] text-white font-bold rounded-lg hover:bg-[#0a6abf] transition-all shadow-lg shadow-[#0d83f2]/20"
                            >
                                <Rocket className="w-4 h-4" />
                                View Projects
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white border border-white/[0.08] font-bold rounded-lg hover:bg-white/[0.08] transition-all"
                            >
                                <Download className="w-4 h-4" />
                                Resume
                            </a>
                        </motion.div>
                    </div>

                    {/* Right — Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0d83f2]/5 via-transparent to-purple-500/5 rounded-full blur-3xl" />
                        <div className="glass-card p-6 rounded-xl max-w-[240px] z-20">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Accuracy</p>
                                    <p className="text-2xl font-bold text-white">98.5%</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">
                                Model performance benchmark in recent CV project
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
