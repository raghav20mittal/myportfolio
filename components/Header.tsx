"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
    { label: "TECHNICAL ARSENAL", href: "#skills" },
    { label: "PROJECTS", href: "#projects" },
    { label: "THREADS", href: "#experience" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="fixed top-0 z-50 w-full backdrop-blur-xl border-b" style={{ background: "var(--header-bg)", borderColor: "var(--glass-border)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        whileHover={{ opacity: 1 }}
                        className="flex items-center gap-2"
                        style={{ color: "var(--text-primary)", textDecoration: "none" }}
                    >
                        <span className="text-sm font-semibold tracking-wider">
                            RAGHAV_MITTAL
                        </span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="text-[11px] font-medium tracking-[0.2em] relative"
                                style={{ color: "var(--text-muted)", textDecoration: "none" }}
                                whileHover={{ color: "var(--text-primary)" }}
                                transition={{ duration: 0.15 }}
                            >
                                {link.label}
                                {/* Glow underline on hover */}
                                <motion.span
                                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                                    style={{ background: "var(--text-primary)", originX: 0 }}
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                    </nav>

                    {/* Theme Toggle */}
                    <div className="hidden md:flex items-center">
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.15, color: "var(--text-primary)" }}
                            className="p-2 rounded-lg transition-colors cursor-pointer"
                            style={{ color: "var(--text-muted)" }}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </motion.button>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-center gap-2">
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.15 }}
                            className="p-2 transition-colors cursor-pointer"
                            style={{ color: "var(--text-muted)" }}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </motion.button>
                        <motion.button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            whileHover={{ scale: 1.1 }}
                            className="p-2 transition-colors"
                            style={{ color: "var(--text-muted)" }}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden backdrop-blur-xl"
                        style={{ background: "var(--header-bg)", borderTop: "1px solid var(--glass-border)" }}
                    >
                        <div className="px-4 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-xs font-medium tracking-[0.2em] py-2"
                                    style={{ color: "var(--text-muted)", textDecoration: "none" }}
                                    whileHover={{ color: "var(--text-primary)", x: 4 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
