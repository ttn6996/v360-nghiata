"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Map, BookOpen, Camera, Info, Compass, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Trang Chủ" },
  { href: "/kham-pha", label: "Tour 360°", icon: Camera },
  { href: "/di-tich", label: "Điểm Đến Di Tích", icon: Map },
  { href: "/van-hoa", label: "Văn Hóa Bản Địa", icon: BookOpen },
  { href: "/gioi-thieu", label: "Cẩm Nang & Giới Thiệu", icon: Info },
];

export default function SiteHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isDrawerOpen]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-sm"
            : "bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white"
        }`}
        role="banner"
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo & Destination Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dca354] rounded-lg p-1"
              aria-label="V360 Nghĩa Tá — Trang chủ"
            >
              <div
                className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-bold font-display text-base shadow-md transition-transform group-hover:scale-105 ${
                  isScrolled
                    ? "bg-[var(--accent-forest)] text-[#dca354]"
                    : "bg-[#1c382b] text-[#dca354] border border-[#dca354]/40"
                }`}
              >
                V360
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-display text-base md:text-lg font-bold tracking-tight leading-tight ${
                    isScrolled ? "text-[var(--text-primary)]" : "text-white drop-shadow"
                  }`}
                >
                  Nghĩa Tá
                </span>
                <span
                  className={`text-[11px] font-medium tracking-wide ${
                    isScrolled ? "text-[var(--text-muted)]" : "text-white/80"
                  }`}
                >
                  Định Hóa · Thái Nguyên
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-1 lg:gap-2"
              aria-label="Điều hướng chính"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isScrolled
                      ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right Action + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/kham-pha"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#dca354] hover:bg-[#edb86e] text-[#0b0f0d] text-sm font-semibold shadow-lg shadow-[#dca354]/25 transition-all hover:scale-105 active:scale-95"
              >
                <Camera size={16} strokeWidth={2} />
                <span>Trải Nghiệm 360°</span>
              </Link>

              <button
                ref={menuBtnRef}
                className={`md:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dca354] ${
                  isScrolled
                    ? "text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={isDrawerOpen ? "Đóng menu" : "Mở menu điều hướng"}
              >
                {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            ref={drawerRef}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-[var(--bg-surface)] p-6 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-forest)] text-[#dca354] flex items-center justify-center font-bold text-sm">
                    V360
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-[var(--text-primary)]">
                      Nghĩa Tá
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      Định Hóa, Thái Nguyên
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="py-6 space-y-1" aria-label="Menu trên điện thoại">
                {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {Icon && <Icon size={17} className="text-[#b37322]" />}
                      <span>{label}</span>
                    </div>
                    <ChevronRight size={15} className="text-[var(--text-muted)]" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[var(--border-subtle)]">
              <Link
                href="/kham-pha"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#dca354] text-[#0b0f0d] font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Camera size={16} />
                <span>Mở Tour Ảo 360°</span>
              </Link>
              <p className="text-[11px] text-center text-[var(--text-muted)] mt-4">
                UBND Xã Nghĩa Tá · Định Hóa · Thái Nguyên
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
