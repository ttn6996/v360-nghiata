"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Map,
  BookOpen,
  Camera,
  Info,
  ChevronRight,
  Compass,
} from "lucide-react";
import AmbientAudioPlayer from "@/components/AmbientAudioPlayer";

const NAV_LINKS = [
  { href: "/", label: "Trang Chủ", icon: Compass },
  { href: "/kham-pha", label: "Khám phá toàn cảnh", icon: Camera },
  { href: "/di-tich", label: "Điểm Đến", icon: Map },
  { href: "/van-hoa", label: "Văn Hóa", icon: BookOpen },
  { href: "/gioi-thieu", label: "Giới Thiệu", icon: Info },
];

export default function SiteHeader() {
  const pathname = usePathname();
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
            ? "bg-[#0b120e]/95 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/30"
            : "bg-gradient-to-b from-[#070d09]/95 via-[#070d09]/70 to-transparent border-b border-white/5"
        }`}
        role="banner"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Destination Brand (Typographic Wordmark - No Logo Box) */}
            <Link
              href="/"
              className="flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dca354] rounded-xl py-1 flex-shrink-0 whitespace-nowrap"
              aria-label="Nghĩa Tá — Trang chủ"
            >
              <span className="font-display text-lg md:text-xl font-bold tracking-tight leading-tight text-[#fbf9f5] group-hover:text-[#dca354] transition-colors whitespace-nowrap">
                Nghĩa Tá
              </span>
              <span className="text-[10px] md:text-[11px] font-medium tracking-wide text-[#dca354]/90 whitespace-nowrap">
                Định Hóa · Thái Nguyên
              </span>
            </Link>

            {/* Desktop Navigation — strictly single-line, zero wrapping */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-1.5"
              aria-label="Điều hướng chính"
            >
              {NAV_LINKS.map(({ href, label }) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-xl text-xs xl:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? "bg-[#1c382b] text-[#dca354] border border-[#dca354]/40 shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action + Audio Player + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <AmbientAudioPlayer />

              <Link
                href="/kham-pha"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 md:py-2 rounded-xl bg-gradient-to-r from-[#dca354] via-[#edb86e] to-[#dca354] text-[#0b0f0d] text-xs font-bold shadow-md shadow-[#dca354]/20 transition-all hover:brightness-110 active:scale-95 whitespace-nowrap flex-shrink-0"
              >
                <Camera size={14} strokeWidth={2.2} />
                <span>Khám Phá</span>
              </Link>

              <button
                ref={menuBtnRef}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dca354]"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={isDrawerOpen ? "Đóng menu" : "Mở menu điều hướng"}
              >
                {isDrawerOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div
            ref={drawerRef}
            className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#0c1410] border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250"
          >
            <div>
              {/* Header inside drawer (Typographic Wordmark - No Logo Box) */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg text-[#fbf9f5] leading-tight">
                    Nghĩa Tá
                  </span>
                  <span className="text-[11px] font-medium text-[#dca354]">
                    Định Hóa · Thái Nguyên
                  </span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white"
                  aria-label="Đóng menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-1.5" aria-label="Menu di động">
                {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                  const isActive =
                    href === "/" ? pathname === "/" : pathname.startsWith(href);

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#1c382b] text-[#dca354] border border-[#dca354]/40"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <Icon
                            size={16}
                            className={
                              isActive ? "text-[#dca354]" : "text-white/50"
                            }
                          />
                        )}
                        <span>{label}</span>
                      </div>
                      <ChevronRight size={14} className="text-white/40" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <Link
                href="/kham-pha"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#dca354] to-[#edb86e] text-[#0b0f0d] font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Camera size={16} />
                <span>Khám phá toàn cảnh</span>
              </Link>

              <div className="text-[11px] text-[#a9a69b] text-center">
                UBND Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
