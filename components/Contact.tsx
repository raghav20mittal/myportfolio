"use client";

import { useState, FormEvent } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

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
        <section id="contact" className="py-28 relative">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="mb-12">
                        <p className="section-label mb-4">TRANSMISSION PROTOCOL</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-glow" style={{ color: "var(--text-primary)" }}>
                            INITIATE_CONTACT
                        </h2>
                        <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
                            Open for research collaborations and engineering inquiries.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                    <div className="glass rounded-2xl p-6 sm:p-8">
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <input type="hidden" name="from_name" value="Portfolio Contact" />
                            <input type="hidden" name="subject" value="New message from portfolio" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name" className="block text-[11px] font-medium tracking-wider mb-2 uppercase" style={{ color: "var(--text-muted)" }}>
                                        Name
                                    </label>
                                    <input
                                        type="text" id="name" name="name" required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors"
                                        style={{ background: "var(--input-bg)", border: `1px solid var(--input-border)`, color: "var(--text-primary)" }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-[11px] font-medium tracking-wider mb-2 uppercase" style={{ color: "var(--text-muted)" }}>
                                        Email
                                    </label>
                                    <input
                                        type="email" id="email" name="email" required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors"
                                        style={{ background: "var(--input-bg)", border: `1px solid var(--input-border)`, color: "var(--text-primary)" }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-[11px] font-medium tracking-wider mb-2 uppercase" style={{ color: "var(--text-muted)" }}>
                                    Message
                                </label>
                                <textarea
                                    id="message" name="message" required rows={4}
                                    placeholder="Tell me about your project..."
                                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors resize-none"
                                    style={{ background: "var(--input-bg)", border: `1px solid var(--input-border)`, color: "var(--text-primary)" }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className="w-full py-3.5 text-sm font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
                            >
                                {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                                {status === "success" && <CheckCircle2 className="w-4 h-4" />}
                                {status === "idle" && <Send className="w-3.5 h-3.5" />}
                                {status === "error" && <Send className="w-3.5 h-3.5" />}
                                {status === "loading" ? "TRANSMITTING..." : status === "success" ? "TRANSMITTED" : status === "error" ? "RETRY" : "TRANSMIT"}
                            </button>
                        </form>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
