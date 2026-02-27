import { Github, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-8 bg-[#0a0a0a] border-t border-white/[0.04] text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-slate-600 text-sm">
                    © 2026 Raghav Mittal. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <a
                        href="https://github.com/raghav20mittal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-[#0d83f2] transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="w-4 h-4" />
                    </a>
                    <a
                        href="https://linkedin.com/in/raghavmittal20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-[#0d83f2] transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
