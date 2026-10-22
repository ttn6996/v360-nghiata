import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, AlertTriangle, BookOpen, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { culturalArticles } from "@/data/mockData";

export const metadata: Metadata = {
  title: "Di Sản Văn Hóa",
  description:
    "Kho tàng văn hóa phi vật thể: Hát Then, nhà sàn Tày, lễ hội Lồng Tồng và đời sống bản địa Nghĩa Tá, Bắc Kạn.",
};

export default function VanHoaPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        {/* Page header */}
        <section
          aria-labelledby="vanhoa-heading"
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
              Kho Tàng Bản Địa
            </p>
            <h1
              id="vanhoa-heading"
              className="text-h1 mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Di Sản Văn Hóa Nghĩa Tá
            </h1>
            <p
              className="text-body max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Nghệ thuật, kiến trúc, lễ hội và nếp sống truyền thống của đồng
              bào Tày, Nùng — những ký ức văn hóa được lưu giữ qua nhiều thế hệ
              giữa đại ngàn Bắc Kạn.
            </p>
          </div>
        </section>

        {/* Demo data notice */}
        <div
          className="py-3"
          style={{
            background: "color-mix(in srgb, var(--status-pending) 8%, transparent)",
            borderBottom: "1px solid color-mix(in srgb, var(--status-pending) 20%, transparent)",
          }}
          role="note"
        >
          <div className="container-editorial flex items-center gap-2">
            <AlertTriangle
              size={13}
              strokeWidth={1.75}
              style={{ color: "var(--status-pending)", flexShrink: 0 }}
              aria-hidden="true"
            />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              <strong style={{ color: "var(--status-pending)" }}>
                [DỮ LIỆU THỬ NGHIỆM]:
              </strong>{" "}
              Toàn bộ bài viết văn hóa trên trang này là nội dung thử nghiệm
              chưa được xác minh bởi cộng đồng hoặc nhà nghiên cứu địa phương.
            </p>
          </div>
        </div>

        {/* Articles grid */}
        <section
          aria-labelledby="articles-heading"
          className="py-12 md:py-16"
          style={{ background: "var(--bg-canvas)" }}
        >
          <div className="container-editorial">
            <h2 id="articles-heading" className="sr-only">
              Danh sách bài viết văn hóa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {culturalArticles.map((article) => (
                <article
                  key={article.id}
                  className="group rounded overflow-hidden flex flex-col"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {/* Color header */}
                  <div
                    className="px-5 py-6 flex-shrink-0"
                    style={{
                      background: `linear-gradient(160deg, ${article.thumbnailColor} 0%, color-mix(in srgb, ${article.thumbnailColor} 50%, #0b0f0d) 100%)`,
                    }}
                  >
                    <span
                      className="text-caption uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {article.category}
                    </span>
                    <h2
                      className="font-display text-base font-semibold mt-2 leading-snug"
                      style={{ color: "#f5f4ef" }}
                    >
                      {article.title}
                    </h2>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <p
                      className="text-sm leading-relaxed flex-1 mb-4 italic"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      &ldquo;{article.contentTeaser.slice(0, 160)}&hellip;&rdquo;
                    </p>

                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: "1px solid var(--border-subtle)" }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="text-caption flex items-center gap-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Clock size={11} strokeWidth={1.75} aria-hidden="true" />
                          {article.readTime} phút
                        </span>
                        {article.publishedYear && (
                          <span
                            className="text-caption"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {article.publishedYear}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/van-hoa/${article.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                        style={{ color: "var(--accent-heritage)" }}
                        aria-label={`Đọc bài: ${article.title}`}
                      >
                        <BookOpen size={13} strokeWidth={1.75} aria-hidden="true" />
                        Đọc bài
                        <ArrowRight
                          size={13}
                          strokeWidth={1.75}
                          className="group-hover:translate-x-0.5 transition-transform duration-150"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
