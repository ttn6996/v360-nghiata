"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Map, BookOpen, Camera, Info } from "lucide-react";

const NAV_LINKS = [
  { href: "/kham-pha", label: "Khám Phá 360°", icon: Camera },
  { href: "/di-tich", label: "Di Tích & Thắng Cảnh", icon: Map },
  { href: "/van-hoa", label: "Văn Hóa", icon: BookOpen },
  { href: "/gioi-thieu", label: "Về Dự Án", icon: Info },
];

export default function SiteHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Scroll detection for header backdrop
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close drawer on Escape
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

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  // Focus trap in drawer
  useEffect(() => {
    if (isDrawerOpen && drawerRef.current) {
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    }
  }, [isDrawerOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-[var(--bg-canvas)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-sm"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-16">
            {/* Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-heritage)] rounded-sm"
              aria-label="V360 Nghĩa Tá — Trang chủ"
            >
              <span
                className="font-display text-[1.125rem] font-semibold tracking-tight leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                V360
              </span>
              <span
                className="hidden sm:block text-caption px-2 py-0.5 rounded-sm"
                style={{
                  color: "var(--accent-heritage)",
                  background: "color-mix(in srgb, var(--accent-heritage) 10%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--accent-heritage) 25%, transparent)",
                }}
              >
                Nghĩa Tá
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Điều hướng chính"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-body px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-heritage)] focus-visible:ring-offset-1"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.background = "var(--bg-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Menu Toggle */}
            <div className="flex items-center gap-2">
              <Link
                href="/kham-pha"
                className="btn-heritage hidden sm:inline-flex text-sm py-2"
              >
                <Camera size={15} strokeWidth={1.75} />
                Khám Phá Ngay
              </Link>
              <button
                ref={menuBtnRef}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-heritage)]"
                style={{ color: "var(--text-primary)" }}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={isDrawerOpen ? "Đóng menu" : "Mở menu điều hướng"}
              >
                {isDrawerOpen ? (
                  <X size={22} strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer Panel */}
          <div
            ref={drawerRef}
            id="mobile-nav-drawer"
            className="absolute top-0 right-0 h-full w-4/5 max-w-xs shadow-xl"
            style={{
              background: "var(--bg-surface)",
              borderLeft: "1px solid var(--border-subtle)",
            }}
          >
            {/* Drawer Header */}
            <div
              className="flex items-center justify-between px-5 h-16 border-b"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <span
                className="font-display text-base font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Menu
              </span>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-heritage)]"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Đóng menu"
              >
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            {/* Nav Links */}
            <nav aria-label="Điều hướng di động" className="px-4 py-4">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-sm mb-1 text-sm font-medium transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-heritage)]"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.background = "var(--bg-subtle)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                  {label}
                </Link>
              ))}
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <Link
                  href="/kham-pha"
                  className="btn-heritage w-full justify-center"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Camera size={16} strokeWidth={1.75} aria-hidden="true" />
                  Khám Phá 360°
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
