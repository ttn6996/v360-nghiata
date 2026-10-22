"use client";

import React from "react";
import { Compass, Sparkles, Volume2, Navigation, Map, Eye } from "lucide-react";

interface Props {
  isOpen: boolean;
  onStart: () => void;
  language?: "vi" | "en";
}

export default function PanoramaIntroSplash({
  isOpen,
  onStart,
  language = "vi",
}: Props) {
  if (!isOpen) return null;

  const isEn = language === "en";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#14231b] via-[#0e1713] to-[#080d0a] border border-[#dca354]/40 shadow-2xl p-6 sm:p-8 text-white text-center overflow-hidden">
        {/* Background Decorative Radial Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#dca354]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c382b] border border-[#dca354]/40 text-[11px] font-bold uppercase tracking-wider text-[#dca354] mb-4">
          <Sparkles size={13} />
          <span>
            {isEn
              ? "Digital Heritage & Tourism Portal"
              : "Bản Đồ Số Di Sản & Du Lịch 360°"}
          </span>
        </div>

        {/* Main Title */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#fbf9f5] mb-2 tracking-tight">
          {isEn
            ? "Nghia Ta Virtual Exploration"
            : "Khám Phá Toàn Cảnh Nghĩa Tá"}
        </h2>
        <p className="text-xs sm:text-sm text-[#dca354] font-medium mb-4">
          {isEn
            ? "Dinh Hoa District · Thai Nguyen Province"
            : "Huyện Định Hóa · Tỉnh Thái Nguyên"}
        </p>

        {/* Narrative Description */}
        <p className="font-body text-xs sm:text-sm text-[#a9a69b] leading-relaxed max-w-md mx-auto mb-6">
          {isEn
            ? "Welcome to the immersive digital tour of ATK Dinh Hoa revolutionary base, the pristine Nang Tien Waterfall, and traditional Tay ethnic stilt houses."
            : "Chào mừng quý khách đến với không gian trải nghiệm thực tế ảo toàn cảnh các di tích lịch sử cách mạng ATK Định Hóa, danh thắng Thác Nàng Tiên và nếp sống bản làng Tày - Nùng."}
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1.5">
            <Eye size={16} className="text-[#dca354]" />
            <span className="text-[11px] font-semibold text-white/90">
              {isEn ? "360° Panorama" : "Ảnh 360° Đỉnh Cao"}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1.5">
            <Volume2 size={16} className="text-[#dca354]" />
            <span className="text-[11px] font-semibold text-white/90">
              {isEn ? "Audio Guide" : "Thuyết Minh Ảo"}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1.5">
            <Map size={16} className="text-[#dca354]" />
            <span className="text-[11px] font-semibold text-white/90">
              {isEn ? "Radar Minimap" : "Bản Đồ Radar"}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1.5">
            <Navigation size={16} className="text-[#dca354]" />
            <span className="text-[11px] font-semibold text-white/90">
              {isEn ? "Live Hotspots" : "Điểm Chạm Cự Ly"}
            </span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#dca354] via-[#edb86e] to-[#dca354] text-[#0b0f0d] font-bold text-sm tracking-wide shadow-xl shadow-[#dca354]/25 hover:shadow-[#dca354]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <Compass size={18} className="group-hover:rotate-45 transition-transform" />
            <span>
              {isEn ? "START VIRTUAL TOUR" : "BẮT ĐẦU TRẢI NGHIỆM TOUR 360°"}
            </span>
          </button>

          <button
            onClick={onStart}
            className="text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            {isEn ? "Skip intro and enter directly" : "Bỏ qua & Xem trực tiếp"}
          </button>
        </div>
      </div>
    </div>
  );
}
