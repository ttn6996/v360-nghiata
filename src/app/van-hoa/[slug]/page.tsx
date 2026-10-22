import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertTriangle, User, BookOpen, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { culturalArticles } from "@/data/mockData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return culturalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = culturalArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Không tìm thấy" };
  return {
    title: article.title,
    description: article.excerpt.slice(0, 160),
  };
}

export default async function VanHoaDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = culturalArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        {/* Hero */}
        <section
          aria-labelledby="article-title"
          style={{
            background: `linear-gradient(160deg, ${article.thumbnailColor} 0%, color-mix(in srgb, ${article.thumbnailColor} 45%, #0b0f0d) 100%)`,
            minHeight: "280px",
          }}
        >
          <div className="container-editorial py-12 md:py-16">
            <Link
              href="/van-hoa"
              className="link-dark-muted inline-flex items-center gap-1.5 text-sm mb-8 focus-visible:outline-none focus-visible:underline focus-visible:decoration-[rgba(255,255,255,0.6)]"
            >
              <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              Di Sản Văn Hóa
            </Link>

            <p
              className="text-caption uppercase tracking-widest mb-3"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {article.category}
            </p>
            <h1
              id="article-title"
              className="text-h1 mb-4 max-w-2xl"
              style={{ color: "#f5f4ef" }}
            >
              {article.title}
            </h1>

            {/* Article meta */}
            <div className="flex flex-wrap items-center gap-4">
              <div
                className="flex items-center gap-1.5 text-caption"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <User size={12} strokeWidth={1.75} aria-hidden="true" />
                {article.author}
              </div>
              <div
                className="flex items-center gap-1.5 text-caption"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
                {article.readTime} phút đọc
              </div>
              <span className="badge-demo">
                <AlertTriangle size={9} aria-hidden="true" />
                Dữ liệu thử nghiệm
              </span>
            </div>
          </div>
        </section>

        {/* Article content */}
        <section
          aria-label="Nội dung bài viết"
          className="py-12 md:py-16"
          style={{ background: "var(--bg-canvas)" }}
        >
          <div className="container-editorial">
            <div className="max-w-2xl">
              {/* Demo disclaimer */}
              <div
                className="flex items-start gap-3 p-4 rounded mb-8"
                style={{
                  background: "color-mix(in srgb, var(--status-pending) 8%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--status-pending) 25%, transparent)",
                }}
                role="note"
                aria-label="Cảnh báo dữ liệu thử nghiệm"
              >
                <AlertTriangle
                  size={15}
                  strokeWidth={1.75}
                  style={{
                    color: "var(--status-pending)",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: "var(--status-pending)" }}>
                    [DỮ LIỆU THỬ NGHIỆM / DEMO ASSET]
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Bài viết này được tổng hợp từ:{" "}
                    <em>{article.source}</em>. Nội dung cần được xác minh và
                    phê duyệt bởi nhà nghiên cứu văn hóa địa phương và cộng
                    đồng Tày, Nùng tại Nghĩa Tá.
                  </p>
                </div>
              </div>

              {/* Lead quote */}
              <blockquote
                className="border-l-2 pl-5 mb-8"
                style={{ borderColor: "var(--accent-heritage)" }}
              >
                <p
                  className="text-body-lg italic leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  &ldquo;{article.excerpt}&rdquo;
                </p>
              </blockquote>

              {/* Article teaser */}
              <h2
                className="text-h2 mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Giới thiệu
              </h2>
              <p
                className="text-body-lg leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {article.contentTeaser}
              </p>

              {/* Placeholder for full content */}
              <div
                className="p-6 rounded text-center"
                style={{
                  background: "var(--bg-surface-elevated)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <BookOpen
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--text-muted)", margin: "0 auto 12px" }}
                  aria-hidden="true"
                />
                <p className="text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
                  Nội dung đầy đủ đang được biên soạn
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Toàn bộ bài viết sẽ được hoàn thiện sau khi có xác nhận từ
                  cộng đồng và nhà nghiên cứu địa phương. Mọi thông tin đóng
                  góp xin liên hệ: v360.nghiata@gmail.com
                </p>
              </div>

              {/* Source attribution */}
              <div
                className="mt-8 pt-6"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                <p className="text-caption" style={{ color: "var(--text-muted)" }}>
                  <strong>Nguồn:</strong> {article.source}
                </p>
                {article.publishedYear && (
                  <p className="text-caption mt-1" style={{ color: "var(--text-muted)" }}>
                    Năm biên soạn thử nghiệm: {article.publishedYear}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
