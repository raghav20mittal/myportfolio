"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Compass, FileText } from "lucide-react";

const HeroNeuralMesh = dynamic(() => import("./HeroSphere"), { ssr: false });

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
    }),
};

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-14">
            {/* Soft bottom fade — no hard divider */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left — Text */}
                    <div className="flex flex-col gap-5">
                        <motion.p
                            custom={0}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="section-label"
                        >
                            AI/ML ENGINEER & AUTOMATION SPECIALIST
                        </motion.p>

                        <motion.h1
                            custom={1}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-glow"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Raghav Mittal
                        </motion.h1>

                        <motion.p
                            custom={2}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-base sm:text-lg max-w-lg leading-relaxed"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Engineering{" "}
                            <em className="not-italic font-medium" style={{ color: "var(--text-body)" }}>Intelligence</em>{" "}
                            through latent space exploration.
                        </motion.p>

                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-3 mt-4"
                        >
                            <a
                                href="#projects"
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md transition-all"
                                style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
                            >
                                <Compass className="w-3.5 h-3.5" />
                                MAP NEURAL SPACE
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md border transition-all"
                                style={{ background: "var(--btn-secondary-bg)", color: "var(--btn-secondary-text)", borderColor: "var(--btn-secondary-border)" }}
                            >
                                <FileText className="w-3.5 h-3.5" />
                                VIEW DOSSIER
                            </a>
                        </motion.div>
                    </div>

                    {/* Right — 3D Neural Mesh */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                        className="relative h-[400px] lg:h-[520px] overflow-hidden"
                        style={{
                            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 85%)",
                            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 85%)",
                        }}
                    >
                        <HeroNeuralMesh />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
