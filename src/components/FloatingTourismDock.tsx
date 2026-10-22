"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Camera,
  Map,
  BookOpen,
  SunMedium,
  Compass,
  ChevronUp,
} from "lucide-react";

export default function FloatingTourismDock() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Thanh công cụ du lịch nhanh"
      className={`fixed bottom-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#0e1713]/90 border border-white/15 backdrop-blur-xl shadow-2xl text-white">
        <Link
          href="/kham-pha"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#fbf9f5] hover:bg-white/10 hover:text-[#dca354] transition-all group active:scale-95"
          title="Mở toàn cảnh 360 độ"
        >
          <div className="w-6 h-6 rounded-lg bg-[#dca354]/20 text-[#dca354] flex items-center justify-center group-hover:bg-[#dca354] group-hover:text-[#0e1713] transition-colors">
            <Camera size={14} />
          </div>
          <span className="hidden sm:inline">Khám phá toàn cảnh360°</span>
        </Link>

        <div className="w-px h-5 bg-white/15" />

        <Link
          href="/#ban-do-du-lich"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#fbf9f5] hover:bg-white/10 hover:text-[#dca354] transition-all group active:scale-95"
          title="Bản đồ du lịch Nghĩa Tá"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-[#0e1713] transition-colors">
            <Map size={14} />
          </div>
          <span className="hidden sm:inline">Bản Đồ Số</span>
        </Link>

        <div className="w-px h-5 bg-white/15" />

        <Link
          href="/di-tich"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#fbf9f5] hover:bg-white/10 hover:text-[#dca354] transition-all group active:scale-95"
          title="Danh sách di tích ATK"
        >
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-[#0e1713] transition-colors">
            <Compass size={14} />
          </div>
          <span className="hidden md:inline">Điểm Đến</span>
        </Link>

        <div className="w-px h-5 bg-white/15 hidden sm:block" />

        <Link
          href="/van-hoa"
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#fbf9f5] hover:bg-white/10 hover:text-[#dca354] transition-all group active:scale-95"
          title="Văn hóa Tày Nùng"
        >
          <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-[#0e1713] transition-colors">
            <BookOpen size={14} />
          </div>
          <span className="hidden lg:inline">Văn Hóa</span>
        </Link>

        {/* Live weather badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
          <SunMedium size={14} className="text-amber-400" />
          <span>Nghĩa Tá 23°C</span>
        </div>

        <div className="w-px h-5 bg-white/15" />

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          type="button"
          className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all active:scale-95"
          aria-label="Cuộn lên đầu trang"
          title="Lên đầu trang"
        >
          <ChevronUp size={16} />
        </button>
      </div>
    </aside>
  );
}
