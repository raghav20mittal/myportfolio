"use client";

import { useState, FormEvent } from "react";
import { Github, Linkedin, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

// ── Web3Forms ───────────────────────────────────────────────
// Get your free access key at https://web3forms.com
// After signing up with raghavmittal434@gmail.com, paste the key below.
const WEB3FORMS_KEY = "2bae9f4d-b0bc-47d2-ab60-3614b432c7f8";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("access_key", WEB3FORMS_KEY);

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data,
            });
            const json = await res.json();
            if (json.success) {
                setStatus("success");
                form.reset();
                setTimeout(() => setStatus("idle"), 4000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <section id="contact" className="py-24 bg-[#0d83f2]/[0.03] border-t border-white/[0.04]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4 text-white">
                            Let&apos;s Connect
                        </h2>
                        <p className="text-slate-500">
                            Interested in working together? Drop me a line.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                    <div className="glass-card p-8 rounded-2xl">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Hidden field for Web3Forms recipient */}
                            <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                            <input type="hidden" name="subject" value="New message from your portfolio" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-slate-400 mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-[#0a0a0a]/60 border border-white/[0.06] rounded-lg text-white focus:outline-none focus:border-[#0d83f2] focus:ring-1 focus:ring-[#0d83f2] transition-colors placeholder-slate-600"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-slate-400 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 bg-[#0a0a0a]/60 border border-white/[0.06] rounded-lg text-white focus:outline-none focus:border-[#0d83f2] focus:ring-1 focus:ring-[#0d83f2] transition-colors placeholder-slate-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-slate-400 mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    placeholder="Tell me about your project..."
                                    rows={4}
                                    className="w-full px-4 py-3 bg-[#0a0a0a]/60 border border-white/[0.06] rounded-lg text-white focus:outline-none focus:border-[#0d83f2] focus:ring-1 focus:ring-[#0d83f2] transition-colors placeholder-slate-600 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className="w-full py-4 bg-[#0d83f2] text-white font-bold rounded-lg hover:bg-[#0a6abf] transition-colors shadow-lg shadow-[#0d83f2]/15 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                                {status === "success" && <CheckCircle2 className="w-5 h-5" />}
                                {status === "idle" && <Send className="w-4 h-4" />}
                                {status === "error" && <Send className="w-4 h-4" />}
                                {status === "loading"
                                    ? "Sending..."
                                    : status === "success"
                                        ? "Message Sent!"
                                        : status === "error"
                                            ? "Try Again"
                                            : "Send Message"}
                            </button>

                            {status === "error" && (
                                <p className="text-red-400 text-sm text-center">
                                    Something went wrong. Please try again or email me directly.
                                </p>
                            )}
                        </form>

                        {/* Social Links */}
                        <div className="mt-10 flex justify-center gap-10 border-t border-white/[0.04] pt-8">
                            <a
                                href="https://github.com/raghav20mittal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-white transition-colors flex flex-col items-center gap-2 group"
                            >
                                <span className="p-3 rounded-full bg-white/[0.03] group-hover:bg-[#0d83f2]/10 transition-colors">
                                    <Github className="w-5 h-5" />
                                </span>
                                <span className="text-xs">GitHub</span>
                            </a>
                            <a
                                href="https://linkedin.com/in/raghavmittal20"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-white transition-colors flex flex-col items-center gap-2 group"
                            >
                                <span className="p-3 rounded-full bg-white/[0.03] group-hover:bg-[#0d83f2]/10 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </span>
                                <span className="text-xs">LinkedIn</span>
                            </a>
                            <a
                                href="mailto:raghavmittal434@gmail.com"
                                className="text-slate-500 hover:text-white transition-colors flex flex-col items-center gap-2 group"
                            >
                                <span className="p-3 rounded-full bg-white/[0.03] group-hover:bg-[#0d83f2]/10 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <span className="text-xs">Email</span>
                            </a>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
