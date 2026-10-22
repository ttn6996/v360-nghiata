import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Compass,
  Camera,
  Landmark,
  TreePine,
  Users,
  type LucideIcon,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { heritageSites } from "@/data/mockData";
import type { HeritageSiteCategory } from "@/types/heritage";

export const metadata: Metadata = {
  title: "Di Tích & Thắng Cảnh",
  description:
    "Danh mục các điểm đến di sản lịch sử, thắng cảnh tự nhiên và không gian văn hóa bản làng tại Nghĩa Tá, Chợ Đồn, Bắc Kạn.",
};

const categoryLabel: Record<HeritageSiteCategory, string> = {
  "lich-su-cach-mang": "Lịch sử Cách mạng",
  "thang-canh-tu-nhien": "Thắng cảnh Tự nhiên",
  "van-hoa-ban-lang": "Văn hóa Bản làng",
};

const categoryIcon: Record<HeritageSiteCategory, LucideIcon> = {
  "lich-su-cach-mang": Landmark,
  "thang-canh-tu-nhien": TreePine,
  "van-hoa-ban-lang": Users,
};

export default function DiTichPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        {/* Page header */}
        <section
          aria-labelledby="ditich-heading"
          className="py-12 md:py-16"
          style={{
            background: "var(--bg-canvas)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div className="container-editorial">
            <Link
              href="/"
              className="link-muted inline-flex items-center gap-1.5 text-sm mb-6 focus-visible:outline-none focus-visible:underline"
            >
              <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              Trang chủ
            </Link>
            <p
              className="text-caption uppercase tracking-widest mb-3"
              style={{ color: "var(--accent-heritage)" }}
            >
              Danh Mục Điểm Đến
            </p>
            <h1
              id="ditich-heading"
              className="text-h1 mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Di Tích &amp; Thắng Cảnh
            </h1>
            <p
              className="text-body max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Hệ thống các điểm đến lịch sử, thiên nhiên và văn hóa tại xã
              Nghĩa Tá, được phân loại và ghi chú trạng thái xác minh minh bạch.
            </p>
          </div>
        </section>

        {/* Category filters (static — client interactivity in Phase 6) */}
        <section
          aria-label="Bộ lọc danh mục"
          className="py-4"
          style={{
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div className="container-editorial">
            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Danh mục di tích"
            >
              {[
                { label: "Tất cả", active: true },
                { label: "Lịch sử Cách mạng", active: false },
                { label: "Thắng cảnh Tự nhiên", active: false },
                { label: "Văn hóa Bản làng", active: false },
              ].map(({ label, active }) => (
                <span
                  key={label}
                  role="listitem"
                  className="px-4 py-2 rounded-sm text-sm font-medium transition-all duration-100 cursor-default"
                  style={
                    active
                      ? {
                          background: "var(--accent-heritage)",
                          color: "#fff",
                          border: "1px solid var(--accent-heritage)",
                        }
                      : {
                          background: "transparent",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-subtle)",
                        }
                  }
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Site listings */}
        <section
          aria-labelledby="site-list-heading"
          className="py-12 md:py-16"
          style={{ background: "var(--bg-canvas)" }}
        >
          <div className="container-editorial">
            <h2 id="site-list-heading" className="sr-only">
              Danh sách điểm đến
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {heritageSites.map((site) => {
                const Icon = categoryIcon[site.category];
                return (
                  <article
                    key={site.id}
                    className="group rounded overflow-hidden flex flex-col"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {/* Color header */}
                    <div
                      className="relative h-32 flex items-end p-4"
                      style={{
                        background: `linear-gradient(135deg, ${site.thumbnailColor} 0%, color-mix(in srgb, ${site.thumbnailColor} 55%, #0b0f0d) 100%)`,
                      }}
                    >
                      <div
                        className="absolute top-3 left-3 w-8 h-8 rounded-sm flex items-center justify-center"
                        style={{
                          background: "rgba(0,0,0,0.25)",
                          backdropFilter: "blur(4px)",
                        }}
                        aria-hidden="true"
                      >
                        <Icon size={16} strokeWidth={1.75} style={{ color: "rgba(255,255,255,0.8)" }} />
                      </div>
                      <div className="absolute top-3 right-3">
                        {site.status === "verified" ? (
                          <span className="badge-verified">
                            <CheckCircle size={10} aria-hidden="true" />
                            Đã xác minh
                          </span>
                        ) : (
                          <span className="badge-demo">
                            <AlertTriangle size={10} aria-hidden="true" />
                            Thử nghiệm
                          </span>
                        )}
                      </div>
                      <span className="text-caption" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {categoryLabel[site.category]}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-5">
                      <h2
                        className="text-h3 mb-1 group-hover:text-[var(--accent-heritage)] transition-colors duration-150"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {site.title}
                      </h2>
                      <p
                        className="text-sm mb-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {site.subtitle}
                      </p>
                      <p
                        className="text-sm leading-relaxed flex-1 mb-4"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {site.description}
                      </p>

                      {/* Metadata row */}
                      <div
                        className="flex flex-wrap items-center justify-between gap-3 pt-4"
                        style={{ borderTop: "1px solid var(--border-subtle)" }}
                      >
                        <div className="flex items-center gap-3">
                          {site.coordinates && (
                            <span
                              className="text-caption flex items-center gap-1"
                              style={{ color: "var(--text-muted)" }}
                            >
                              <Compass size={11} strokeWidth={1.75} aria-hidden="true" />
                              {site.coordinates.lat.toFixed(4)}°N
                            </span>
                          )}
                          {site.panoramaSceneId && (
                            <span
                              className="text-caption flex items-center gap-1"
                              style={{ color: "var(--accent-heritage)" }}
                            >
                              <Camera size={11} strokeWidth={1.75} aria-hidden="true" />
                              Có 360°
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/di-tich/${site.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                          style={{ color: "var(--accent-heritage)" }}
                          aria-label={`Xem chi tiết: ${site.title}`}
                        >
                          Xem chi tiết
                          <ArrowRight
                            size={14}
                            strokeWidth={1.75}
                            className="group-hover:translate-x-0.5 transition-transform duration-150"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
