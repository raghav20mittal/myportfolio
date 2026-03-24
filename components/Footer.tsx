import { Github, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-8 text-center" style={{ background: "var(--bg)", borderTop: "1px solid var(--footer-border)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs tracking-wider" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
                    © 2026 Raghav Mittal. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <a
                        href="https://github.com/raghav20mittal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors"
                        style={{ color: "var(--text-muted)", opacity: 0.5 }}
                        aria-label="GitHub"
                    >
                        <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                        href="https://linkedin.com/in/raghavmittal20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors"
                        style={{ color: "var(--text-muted)", opacity: 0.5 }}
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
