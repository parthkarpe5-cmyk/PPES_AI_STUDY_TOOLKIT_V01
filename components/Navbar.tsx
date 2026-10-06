'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, MessageSquare, CheckCircle, Menu, X, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Overview', icon: BookOpen },
    { href: '/which-ai', label: 'Which AI?', icon: Compass },
    { href: '/prompt-builder', label: 'Prompt Builder', icon: MessageSquare },
    { href: '/verify', label: 'Check & Verify', icon: CheckCircle },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d1f35]/95 backdrop-blur-md border-b border-white/10 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-[#2fa8cc] rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2fa8cc] to-[#1f4e79] flex items-center justify-center text-white shadow-md ring-2 ring-white/15 group-hover:ring-[#c9a227]/70 transition-all duration-300 group-hover:scale-105">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-lg tracking-tight font-display">
                  Prarambh Path
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#c9a227]/20 text-[#f0d074] border border-[#c9a227]/30">
                  P.P.E.S.
                </span>
              </div>
              <span className="text-[11px] font-medium text-white/60 tracking-wider">
                AI Study Toolkit • Class 8–10
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#2fa8cc]' : 'text-white/50'}`} />
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#c9a227]" />
                  )}
                </Link>
              );
            })}

            <Link
              href="/prompt-builder"
              className="ml-3 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#ff6b00]/20 transition-all duration-200 hover:shadow-[#ff6b00]/35 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Build Prompt</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 focus:outline-hidden focus:ring-2 focus:ring-[#2fa8cc]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0d1f35]/98 px-4 pt-3 pb-5 space-y-1 shadow-2xl">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-white/10 text-white font-semibold border-l-3 border-[#c9a227]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-[#2fa8cc]' : 'text-white/50'}`} />
                  <span>{link.label}</span>
                </div>
                {active && <span className="w-2 h-2 rounded-full bg-[#c9a227]" />}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              href="/prompt-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-orange-600 text-white font-semibold shadow-lg shadow-[#ff6b00]/25 text-center"
            >
              <span>Build My Study Prompt →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
