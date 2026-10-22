"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Clock,
  Car,
  ArrowRight,
  Eye,
  Landmark,
  TreePine,
  Users,
  Sparkles,
} from "lucide-react";
import type { HeritageSite } from "@/types/heritage";

interface Props {
  initialSites: HeritageSite[];
}

export default function HeritageDirectory({ initialSites }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSites = useMemo(() => {
    return initialSites.filter((site) => {
      const matchesCategory =
        selectedCategory === "all" || site.category === selectedCategory;
      const matchesSearch =
        site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialSites, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Search & Category Filter Toolbar */}
      <div className="p-4 md:p-6 rounded-2xl bg-white border border-[var(--border-subtle)] shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm điểm đến tại Nghĩa Tá..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#b37322]/40 focus:border-[#b37322]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[var(--accent-forest)] text-white shadow-sm"
                : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
            }`}
          >
            Tất Cả ({initialSites.length})
          </button>
          <button
            onClick={() => setSelectedCategory("lich-su-cach-mang")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === "lich-su-cach-mang"
                ? "bg-[var(--accent-forest)] text-white shadow-sm"
                : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
            }`}
          >
            <Landmark size={14} />
            <span>Lịch Sử ATK</span>
          </button>
          <button
            onClick={() => setSelectedCategory("thang-canh-tu-nhien")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === "thang-canh-tu-nhien"
                ? "bg-[var(--accent-forest)] text-white shadow-sm"
                : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
            }`}
          >
            <TreePine size={14} />
            <span>Thắng Cảnh Tự Nhiên</span>
          </button>
          <button
            onClick={() => setSelectedCategory("van-hoa-ban-lang")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === "van-hoa-ban-lang"
                ? "bg-[var(--accent-forest)] text-white shadow-sm"
                : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
            }`}
          >
            <Users size={14} />
            <span>Văn Hóa Bản Làng</span>
          </button>
        </div>
      </div>

      {/* Destination Grid */}
      {filteredSites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSites.map((site) => (
            <article
              key={site.id}
              className="group rounded-2xl overflow-hidden bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={site.imageUrl}
                    alt={site.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1c382b]/90 text-[#dca354] border border-[#dca354]/30 backdrop-blur-md">
                      {site.category === "lich-su-cach-mang"
                        ? "Di Tích Lịch Sử Cách Mạng"
                        : site.category === "thang-canh-tu-nhien"
                        ? "Thắng Cảnh Thiên Nhiên"
                        : "Văn Hóa Bản Làng Tày — Nùng"}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs text-[#dca354] font-medium flex items-center gap-1 mb-1">
                      <MapPin size={12} />
                      {site.locationName}
                    </span>
                    <h3 className="font-display text-2xl font-bold">{site.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs font-medium text-[#b37322] mb-2">{site.subtitle}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4">
                    {site.description}
                  </p>

                  {/* Highlights pills */}
                  {site.highlights && (
                    <div className="space-y-1.5 mb-4">
                      {site.highlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                          <Sparkles size={12} className="text-[#b37322] flex-shrink-0" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Practical Quick Info */}
                  {site.travelTips && (
                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border-subtle)]">
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-[#b37322]" />
                        {site.travelTips.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Car size={13} className="text-[#b37322]" />
                        {site.travelTips.transportation}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <Link
                  href={`/di-tich/${site.slug}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--accent-forest)] hover:bg-[#256a42] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-colors"
                >
                  <span>Xem Cẩm Nang Chi Tiết</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/kham-pha"
                  className="py-2.5 px-3.5 rounded-xl border border-[var(--border-strong)] hover:border-[#b37322] hover:bg-[var(--bg-subtle)] text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
                  title="Xem trong không gian 360°"
                >
                  <Eye size={14} className="text-[#b37322]" />
                  <span>360°</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-[var(--border-subtle)]">
          <p className="text-[var(--text-muted)] text-sm">
            Không tìm thấy điểm đến phù hợp với từ khóa &quot;{searchQuery}&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-3 text-xs font-semibold text-[#b37322] hover:underline"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
