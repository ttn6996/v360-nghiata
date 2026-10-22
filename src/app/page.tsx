import type { Metadata } from "next";
import Link from "next/link";
import {
  Camera,
  Map,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Compass,
  TreePine,
  Landmark,
  Users,
  type LucideIcon,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { heritageSites, culturalArticles } from "@/data/mockData";
import type { HeritageSiteCategory } from "@/types/heritage";

export const metadata: Metadata = {
  title: "Trang Chủ — Khám Phá Di Sản Nghĩa Tá",
  description:
    "Hành trình khám phá không gian 360° và di sản văn hóa lịch sử xã Nghĩa Tá, Chợ Đồn, Bắc Kạn — vùng đất ATK cách mạng và văn hóa Tày, Nùng.",
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

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ======================================================
            SECTION 1: CINEMATIC HERO
           ====================================================== */}
        <section
          aria-labelledby="hero-heading"
          className="relative min-h-screen flex flex-col justify-end overflow-hidden"
          style={{ background: "var(--accent-forest)" }}
        >
          {/* Layered atmospheric gradient */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background: `
                radial-gradient(ellipse 70% 50% at 30% 60%, rgba(28,56,43,0.9) 0%, transparent 70%),
                radial-gradient(ellipse 80% 60% at 80% 30%, rgba(34,53,66,0.7) 0%, transparent 65%),
                linear-gradient(180deg, rgba(11,15,13,0.3) 0%, rgba(11,15,13,0.85) 100%)
              `,
            }}
          />

          {/* Topographic texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cellipse cx='30' cy='30' rx='28' ry='12'/%3E%3Cellipse cx='30' cy='30' rx='20' ry='8'/%3E%3Cellipse cx='30' cy='30' rx='12' ry='5'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Decorative coordinate */}
          <div
            className="absolute top-24 right-6 md:right-12 text-right"
            aria-hidden="true"
          >
            <p className="font-mono text-[0.625rem] tracking-widest opacity-50" style={{ color: "#a9a69b" }}>
              22°09′22″N
            </p>
            <p className="font-mono text-[0.625rem] tracking-widest opacity-50" style={{ color: "#a9a69b" }}>
              105°36′49″E
            </p>
          </div>

          {/* Hero Content */}
          <div className="container-editorial relative z-10 pb-16 pt-32 md:pb-24 md:pt-40">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-6 animate-fade-up" aria-hidden="true">
                <span className="block w-8 h-px" style={{ background: "var(--accent-heritage)" }} />
                <span className="text-caption uppercase tracking-widest" style={{ color: "var(--accent-heritage)" }}>
                  Nghĩa Tá · Chợ Đồn · Bắc Kạn
                </span>
              </div>

              {/* Main headline */}
              <h1
                id="hero-heading"
                className="text-display mb-5 animate-fade-up delay-100"
                style={{ color: "#f5f4ef" }}
              >
                Khám Phá{" "}
                <span className="font-display italic" style={{ color: "#dca354" }}>
                  Di Sản
                </span>{" "}
                &amp; Thiên Nhiên Nghĩa Tá
              </h1>

              {/* Lead paragraph */}
              <p
                className="text-body-lg mb-8 max-w-xl animate-fade-up delay-200"
                style={{ color: "#a9a69b", lineHeight: 1.7 }}
              >
                Hành trình số vào vùng đất cách mạng ATK và rừng núi đại ngàn
                Bắc Kạn — nơi lịch sử kháng chiến, văn hóa Tày, Nùng và thiên
                nhiên nguyên sinh giao thoa qua từng thế hệ.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 animate-fade-up delay-300">
                <Link href="/kham-pha" className="btn-heritage">
                  <Camera size={16} strokeWidth={1.75} aria-hidden="true" />
                  Khám Phá Toàn Cảnh 360°
                </Link>
                <Link href="/di-tich" className="btn-outline-dark">
                  <Map size={16} strokeWidth={1.75} aria-hidden="true" />
                  Xem Di Tích &amp; Thắng Cảnh
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500"
            aria-hidden="true"
          >
            <span className="text-caption uppercase tracking-widest text-[0.5625rem]" style={{ color: "#737066" }}>
              Cuộn xuống
            </span>
            <div
              className="w-px h-8"
              style={{
                background: "linear-gradient(to bottom, var(--accent-heritage), transparent)",
              }}
            />
          </div>
        </section>

        {/* ======================================================
            SECTION 2: CURATED EXPLORER PREVIEW
           ====================================================== */}
        <section
          aria-labelledby="explore-heading"
          className="py-16 md:py-24"
          style={{ background: "var(--bg-canvas)" }}
        >
          <div className="container-editorial">
            <header className="mb-10 md:mb-14 max-w-lg">
              <p className="text-caption uppercase tracking-widest mb-3" style={{ color: "var(--accent-heritage)" }}>
                Điểm Đến Nổi Bật
              </p>
              <h2 id="explore-heading" className="text-h1" style={{ color: "var(--text-primary)" }}>
                Bản Đồ Điểm Chạm
              </h2>
              <p className="text-body mt-3" style={{ color: "var(--text-secondary)" }}>
                Các địa danh di sản và thắng cảnh tiêu biểu của Nghĩa Tá,
                được phân loại theo lịch sử, thiên nhiên và văn hóa.
              </p>
            </header>

            {/* Heritage Site Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {heritageSites.map((site, idx) => {
                const Icon = categoryIcon[site.category];
                return (
                  <article
                    key={site.id}
                    className={`relative group rounded overflow-hidden flex flex-col ${
                      idx === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                    }`}
                    style={{
                      background: "var(--bg-surface-elevated)",
                      border: "1px solid var(--border-subtle)",
                      minHeight: idx === 0 ? "320px" : "200px",
                    }}
                  >
                    {/* Color block header */}
                    <div
                      className="relative flex-shrink-0 flex items-end p-4"
                      style={{
                        background: `linear-gradient(135deg, ${site.thumbnailColor} 0%, color-mix(in srgb, ${site.thumbnailColor} 60%, #0b0f0d) 100%)`,
                        height: idx === 0 ? "180px" : "110px",
                      }}
                    >
                      <div
                        className="absolute top-3 left-3 w-8 h-8 rounded-sm flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
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
                    <div className="flex flex-col flex-1 p-4">
                      <h3
                        className="text-h3 mb-1.5 group-hover:text-[var(--accent-heritage)] transition-colors duration-150"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {site.title}
                      </h3>
                      <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--text-secondary)" }}>
                        {site.description.slice(0, idx === 0 ? 180 : 90)}
                        {site.description.length > (idx === 0 ? 180 : 90) ? "…" : ""}
                      </p>
                      {site.coordinates && (
                        <p className="text-caption mb-3" style={{ color: "var(--text-muted)" }}>
                          <Compass size={11} strokeWidth={1.75} className="inline mr-1" aria-hidden="true" />
                          {site.coordinates.lat.toFixed(4)}°N, {site.coordinates.lng.toFixed(4)}°E
                        </p>
                      )}
                      <Link
                        href={`/di-tich/${site.slug}`}
                        className="link-heritage inline-flex items-center gap-1.5 text-sm font-medium focus-visible:outline-none focus-visible:underline"
                        aria-label={`Xem chi tiết: ${site.title}`}
                      >
                        Khám phá thêm
                        <ArrowRight
                          size={14}
                          strokeWidth={1.75}
                          className="group-hover:translate-x-0.5 transition-transform duration-150"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Link href="/di-tich" className="btn-outline">
                Xem toàn bộ danh mục di tích
                <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================
            SECTION 3: HISTORICAL NARRATIVE
           ====================================================== */}
        <section
          aria-labelledby="history-heading"
          className="py-16 md:py-24"
          style={{ background: "var(--bg-surface-elevated)" }}
        >
          <div className="container-editorial">
            <div className="divider mb-12" aria-hidden="true" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Text column */}
              <div>
                <p className="text-caption uppercase tracking-widest mb-3" style={{ color: "var(--accent-heritage)" }}>
                  Dòng Chảy Lịch Sử
                </p>
                <h2 id="history-heading" className="text-h1 mb-5" style={{ color: "var(--text-primary)" }}>
                  Vùng Đất ATK &amp; Ký Ức Kháng Chiến
                </h2>
                <p className="text-body-lg mb-4" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Trong những năm kháng chiến chống thực dân Pháp (1946–1954),
                  các cánh rừng già Chợ Đồn — trong đó có Nghĩa Tá — trở thành
                  vùng An Toàn Khu (ATK) che chở cho nhiều cơ quan đầu não của
                  chính phủ kháng chiến Việt Nam.
                </p>
                <p className="text-body mb-6" style={{ color: "var(--text-secondary)" }}>
                  Địa hình núi đá vôi hiểm trở, rừng đại ngàn dày đặc và sự
                  che chở của đồng bào các dân tộc Tày, Nùng đã tạo nên lá
                  chắn tự nhiên vô giá trong suốt cuộc trường kỳ kháng chiến.
                </p>
                <div
                  className="flex items-start gap-3 p-4 rounded"
                  style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-subtle)" }}
                >
                  <AlertTriangle
                    size={15}
                    strokeWidth={1.75}
                    style={{ color: "var(--status-pending)", marginTop: "2px", flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    <strong style={{ color: "var(--text-secondary)" }}>[DỮ LIỆU THỬ NGHIỆM]:</strong>{" "}
                    Nội dung lịch sử trên trang này được tổng hợp từ tài liệu
                    công khai và cần được xác minh bởi nhà nghiên cứu lịch sử
                    địa phương trước khi công bố chính thức.
                  </p>
                </div>
              </div>

              {/* Visual column — Abstract ATK map */}
              <div className="relative" aria-hidden="true">
                <div
                  className="relative rounded overflow-hidden"
                  style={{ background: "var(--accent-river)", aspectRatio: "4/3" }}
                >
                  <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <path d="M0 250 L60 150 L90 180 L140 90 L180 130 L220 60 L260 100 L300 70 L340 110 L380 80 L400 120 L400 300 Z" fill="rgba(28,56,43,0.6)" />
                    <path d="M0 300 L0 200 L50 190 L100 220 L150 160 L200 200 L250 170 L300 210 L350 175 L400 200 L400 300 Z" fill="rgba(28,56,43,0.9)" />
                    <path d="M30 250 Q80 230 130 245 Q180 260 230 240 Q280 220 340 235 Q370 242 400 230" fill="none" stroke="rgba(100,160,200,0.4)" strokeWidth="2" />
                    {[0, 1, 2, 3].map((i) => (
                      <ellipse key={i} cx="220" cy="100" rx={60 + i * 30} ry={25 + i * 12} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    ))}
                    <circle cx="220" cy="100" r="4" fill="#dca354" opacity="0.9" />
                    <circle cx="220" cy="100" r="8" fill="none" stroke="#dca354" strokeWidth="1" opacity="0.5" />
                    <circle cx="220" cy="100" r="14" fill="none" stroke="#dca354" strokeWidth="0.5" opacity="0.3" />
                  </svg>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-caption uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>ATK Chợ Đồn</p>
                    <p className="font-mono text-xs" style={{ color: "rgba(220,163,84,0.8)" }}>22.1561°N · 105.6137°E</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="badge-demo"><AlertTriangle size={9} />Tọa độ thử nghiệm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            SECTION 4: CULTURAL HIGHLIGHT
           ====================================================== */}
        <section
          aria-labelledby="culture-heading"
          className="py-16 md:py-24"
          style={{ background: "var(--bg-canvas)" }}
        >
          <div className="container-editorial">
            <header className="mb-10 md:mb-14 max-w-lg">
              <p className="text-caption uppercase tracking-widest mb-3" style={{ color: "var(--accent-heritage)" }}>
                Âm Vang Rừng Đại Ngàn
              </p>
              <h2 id="culture-heading" className="text-h1" style={{ color: "var(--text-primary)" }}>
                Di Sản Văn Hóa Bản Địa
              </h2>
              <p className="text-body mt-3" style={{ color: "var(--text-secondary)" }}>
                Khám phá nếp sống, nghệ thuật và lễ hội của đồng bào Tày, Nùng
                tại Nghĩa Tá — những ký ức văn hóa được lưu truyền qua nhiều thế hệ.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {culturalArticles.map((article) => (
                <article
                  key={article.id}
                  className="group rounded overflow-hidden flex flex-col"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
                >
                  <div
                    className="px-5 py-6 flex-shrink-0"
                    style={{
                      background: `linear-gradient(160deg, ${article.thumbnailColor} 0%, color-mix(in srgb, ${article.thumbnailColor} 50%, #0b0f0d) 100%)`,
                      borderBottom: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    <span className="text-caption uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {article.category}
                    </span>
                    <h3 className="font-display text-base font-semibold mt-2 leading-snug" style={{ color: "#f5f4ef" }}>
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--text-secondary)" }}>
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                      <div className="flex items-center gap-2">
                        <span className="badge-demo">
                          <AlertTriangle size={9} aria-hidden="true" />
                          Demo
                        </span>
                        <span className="text-caption" style={{ color: "var(--text-muted)" }}>
                          {article.readTime} phút đọc
                        </span>
                      </div>
                      <Link
                        href={`/van-hoa/${article.slug}`}
                        className="link-heritage inline-flex items-center gap-1 text-sm font-medium focus-visible:outline-none focus-visible:underline"
                        aria-label={`Đọc bài: ${article.title}`}
                      >
                        <BookOpen size={13} strokeWidth={1.75} aria-hidden="true" />
                        Đọc bài
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/van-hoa" className="btn-outline">
                Xem toàn bộ kho tàng văn hóa
                <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================
            SECTION 5: DATA TRANSPARENCY DECLARATION
           ====================================================== */}
        <section
          aria-labelledby="transparency-heading"
          style={{ background: "var(--accent-forest)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >

        </section>
      </main>
      <SiteFooter />
    </>
  );
}
