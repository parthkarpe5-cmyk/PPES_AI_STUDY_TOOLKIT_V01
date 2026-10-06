import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Mail, ExternalLink, GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0d1f35] text-white border-t border-white/10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {/* Brand and Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2fa8cc] to-[#1f4e79] flex items-center justify-center text-white ring-2 ring-white/15">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-white text-lg tracking-tight font-display">
                  Prarambha Path
                </span>
                <span className="text-[11px] font-medium text-white/50 tracking-wider">
                  Evening School • Savardhat, Goa
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 max-w-md leading-relaxed">
              Inspired by the Gurukul tradition, Prarambh Path’s AI Study Toolkit teaches students in Classes 8–10 to use AI as an interactive study mentor rather than an answer machine.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a227]/10 text-[#f0d074] text-xs font-semibold border border-[#c9a227]/25">
              <ShieldCheck className="w-4 h-4 text-[#c9a227]" />
              <span>Core Philosophy: <strong>Choose. Ask. Check. Learn.</strong></span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#c9a227] mb-4 font-display">
              Toolkit Modules
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/" className="group flex items-center gap-1.5 text-white/60 transition-all duration-200 hover:text-[#c9a227]">
                  <span className="h-px w-3 rounded-full bg-white/20 transition-all group-hover:w-5 group-hover:bg-[#c9a227]" />
                  <span>Overview & Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/which-ai" className="group flex items-center gap-1.5 text-white/60 transition-all duration-200 hover:text-[#c9a227]">
                  <span className="h-px w-3 rounded-full bg-white/20 transition-all group-hover:w-5 group-hover:bg-[#c9a227]" />
                  <span>Step 1: Which AI for My Task?</span>
                </Link>
              </li>
              <li>
                <Link href="/prompt-builder" className="group flex items-center gap-1.5 text-white/60 transition-all duration-200 hover:text-[#c9a227]">
                  <span className="h-px w-3 rounded-full bg-white/20 transition-all group-hover:w-5 group-hover:bg-[#c9a227]" />
                  <span>Step 2: Guided Prompt Builder</span>
                </Link>
              </li>
              <li>
                <Link href="/verify" className="group flex items-center gap-1.5 text-white/60 transition-all duration-200 hover:text-[#c9a227]">
                  <span className="h-px w-3 rounded-full bg-white/20 transition-all group-hover:w-5 group-hover:bg-[#c9a227]" />
                  <span>Step 3: Check & Verify Answers</span>
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href="https://www.prarambhapath.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs text-[#2fa8cc] hover:text-white transition-colors"
                >
                  <span>Visit Main PPES Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Initiative */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#c9a227] mb-4 font-display">
              PPES Community
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#2fa8cc]/15 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-[#2fa8cc]" />
                </div>
                <span className="text-xs text-white/60 leading-relaxed">
                  Savardhat Village, Bicholim Taluka, Goa
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#2fa8cc]/15 mt-0.5">
                  <Mail className="h-3.5 w-3.5 text-[#2fa8cc]" />
                </div>
                <a
                  href="mailto:prarambhpath4444@gmail.com"
                  className="text-xs text-white/60 hover:text-[#c9a227] transition-colors leading-relaxed"
                >
                  prarambhpath4444@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-3">
                  <a
                    href="https://youtube.com/@prarambhapath?si=wQcjubXc9SCucgBF"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PPES YouTube Channel"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#c9a227] transition-colors text-xs"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.instagram.com/prarambha_path"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PPES Instagram Profile"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#c9a227] transition-colors text-xs"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://open.spotify.com/show/20Ah469M6xBubEMBiBZt3Y?si=lYsRyCnkQF6D5QFA04briA"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PPES Student Podcast"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#c9a227] transition-colors text-xs"
                  >
                    Spotify
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Prarambha Path Evening School. All rights reserved.</p>
          <p className="text-white/40">A student-led initiative from Savardhat, Goa • Free for every learner</p>
        </div>
      </div>
    </footer>
  );
}
