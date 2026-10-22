"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Compass,
  ArrowRight,
  Eye,
  Landmark,
  TreePine,
  Users,
  Sparkles,
} from "lucide-react";
import type { HeritageSite, HeritageSiteCategory } from "@/types/heritage";
import { panoramaScenes } from "@/data/mockData";

interface Props {
  sites: HeritageSite[];
}

export default function InteractiveTourismMap({ sites }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSiteId, setActiveSiteId] = useState<string>(sites[0]?.id || "");

  const activeSite = sites.find((s) => s.id === activeSiteId) || sites[0];

  const filteredSites =
    selectedCategory === "all"
      ? sites
      : sites.filter((s) => s.category === selectedCategory);

  // Map coordinates percentage for Nghĩa Tá, Định Hóa, Thái Nguyên schematic representation
  const mapCoords: Record<string, { top: string; left: string }> = {
    "atk-dinh-hoa": { top: "38%", left: "32%" },
    "thac-nang-tien": { top: "25%", left: "68%" },
    "ban-lang-tay-nung": { top: "62%", left: "44%" },
    "rung-nghia-ta": { top: "72%", left: "75%" },
  };

  const getCategoryIcon = (category: HeritageSiteCategory) => {
    switch (category) {
      case "lich-su-cach-mang":
        return <Landmark size={15} className="text-[#dca354]" />;
      case "thang-canh-tu-nhien":
        return <TreePine size={15} className="text-emerald-400" />;
      case "van-hoa-ban-lang":
        return <Users size={15} className="text-amber-300" />;
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xl">
      {/* Top Filter Bar */}
      <div className="p-4 md:p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b37322] mb-1">
            <Compass size={14} />
            <span>Bản Đồ Du Lịch Số Tương Tác</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)]">
            Tọa Độ Khám Phá Nghĩa Tá · Định Hóa
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-[var(--accent-forest)] text-white shadow-sm"
                : "bg-white text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-heritage)]"
            }`}
          >
            Tất Cả ({sites.length})
          </button>
          <button
            onClick={() => setSelectedCategory("lich-su-cach-mang")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              selectedCategory === "lich-su-cach-mang"
                ? "bg-[var(--accent-forest)] text-white shadow-sm"
                : "bg-white text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-heritage)]"
            }`}
          >
            <Landmark size={13} />
            <span>ATK Định Hóa</span>
          </button>
          <button
            onClick={() => setSelectedCategory("thang-canh-tu-nhien")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              selectedCategory === "thang-canh-tu-nhien"
                ? "bg-[var(--accent-forest)] text-white shadow-sm"
                : "bg-white text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-heritage)]"
            }`}
          >
            <TreePine size={13} />
            <span>Thắng Cảnh</span>
          </button>
          <button
            onClick={() => setSelectedCategory("van-hoa-ban-lang")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              selectedCategory === "van-hoa-ban-lang"
                ? "bg-[var(--accent-forest)] text-white shadow-sm"
                : "bg-white text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-heritage)]"
            }`}
          >
            <Users size={13} />
            <span>Bản Làng Tày</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Active Location Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Interactive Map Visual (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 relative bg-[#13221b] overflow-hidden min-h-[380px] lg:min-h-[520px] select-none">
          {/* Topographic Background Pattern */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `radial-gradient(circle at 35% 45%, #2a523e 0%, transparent 60%), radial-gradient(circle at 75% 30%, #1e3d30 0%, transparent 50%), radial-gradient(circle at 60% 80%, #1c3629 0%, transparent 50%)`,
            }}
          />

          {/* Styled River & Valley SVG representation */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stream */}
            <path
              d="M 50 480 Q 200 420 320 380 T 520 280 T 700 150 T 900 80"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="4 2"
            />
            {/* Historical Trail */}
            <path
              d="M 100 200 Q 250 250 350 220 T 550 350 T 750 400"
              fill="none"
              stroke="#dca354"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
          </svg>

          {/* Area Labels */}
          <div className="absolute top-6 left-6 text-white/50 text-xs font-mono tracking-widest uppercase pointer-events-none">
            [ Bản Đồ Không Gian Xã Nghĩa Tá · Định Hóa · Thái Nguyên ]
          </div>

          <div className="absolute bottom-6 left-6 flex items-center gap-4 text-[11px] text-white/60 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dca354]" />
              <span>Di tích ATK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Cảnh quan sinh thái</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <span>Bản làng Tày</span>
            </div>
          </div>

          {/* Interactive Waypoint Pins */}
          {filteredSites.map((site) => {
            const coords = mapCoords[site.id] || { top: "50%", left: "50%" };
            const isActive = site.id === activeSiteId;

            return (
              <div
                key={site.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                style={{ top: coords.top, left: coords.left }}
                onClick={() => setActiveSiteId(site.id)}
              >
                {/* Ping animation when active */}
                {isActive && (
                  <span className="absolute -inset-2 rounded-full bg-[#dca354]/40 animate-ping" />
                )}

                <div
                  className={`relative flex items-center justify-center rounded-full transition-all duration-300 shadow-xl ${
                    isActive
                      ? "w-12 h-12 bg-[#dca354] text-[#0b0f0d] scale-110 ring-4 ring-[#dca354]/30"
                      : "w-9 h-9 bg-[#1c382b] hover:bg-[#256a42] text-white border-2 border-white/40 hover:scale-105"
                  }`}
                >
                  {getCategoryIcon(site.category)}
                </div>

                {/* Pin Label Tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none ${
                    isActive
                      ? "bg-[#dca354] text-[#0b0f0d] font-bold opacity-100 scale-100"
                      : "bg-[#0b0f0d]/90 text-white border border-white/10 opacity-80 group-hover:opacity-100"
                  }`}
                >
                  {site.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Destination Preview Card (4-5 cols) */}
        {activeSite && (
          <div className="lg:col-span-5 xl:col-span-4 p-6 md:p-8 flex flex-col justify-between bg-[var(--bg-surface)]">
            <div>
              {/* Category & Location */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-subtle)] text-[var(--accent-heritage)]">
                  {activeSite.category === "lich-su-cach-mang"
                    ? "Lịch Sử Cách Mạng"
                    : activeSite.category === "thang-canh-tu-nhien"
                    ? "Thắng Cảnh Tự Nhiên"
                    : "Văn Hóa Bản Làng"}
                </span>
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  <MapPin size={12} className="text-[#b37322]" />
                  Định Hóa, Thái Nguyên
                </span>
              </div>

              {/* Title & Subtitle */}
              <h4 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">
                {activeSite.title}
              </h4>
              <p className="text-xs text-[var(--text-muted)] font-medium mb-4">
                {activeSite.subtitle}
              </p>

              {/* Photo Thumbnail */}
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 shadow-md group">
                <Image
                  src={activeSite.imageUrl}
                  alt={activeSite.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#dca354]" />
                  <span>Điểm đến nổi bật tại Nghĩa Tá</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                {activeSite.description}
              </p>

              {/* Travel Highlights / Tips */}
              {activeSite.travelTips && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] mb-5 text-xs">
                  <div>
                    <span className="text-[var(--text-muted)] block text-[11px]">Thời gian lý tưởng:</span>
                    <span className="font-semibold text-[var(--text-primary)] line-clamp-1">
                      {activeSite.travelTips.bestTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-[11px]">Thời lượng:</span>
                    <span className="font-semibold text-[var(--text-primary)] line-clamp-1">
                      {activeSite.travelTips.duration}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              {(() => {
                const linkedScene = panoramaScenes.find((p) => p.linkedSiteSlug === activeSite.slug);
                const panoUrl = linkedScene ? `/kham-pha?scene=${linkedScene.id}` : "/kham-pha";
                return (
                  <Link
                    href={panoUrl}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[var(--accent-forest)] hover:bg-[#256a42] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Eye size={16} />
                    <span>Trải Nghiệm Toàn cảnh</span>
                  </Link>
                );
              })()}
              <Link
                href={`/di-tich/${activeSite.slug}`}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-[var(--border-strong)] hover:border-[var(--accent-heritage)] bg-white text-[var(--text-primary)] font-medium text-sm flex items-center justify-center gap-2 transition-all hover:bg-[var(--bg-canvas)]"
              >
                <span>Xem Cẩm Nang</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
