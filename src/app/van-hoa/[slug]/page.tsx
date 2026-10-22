import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, BookOpen, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingTourismDock from "@/components/FloatingTourismDock";
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
  if (!article) return { title: "Bài Viết Không Tìm Thấy" };
  return {
    title: `${article.title} — Di Sản Văn Hóa Nghĩa Tá · Định Hóa`,
    description: article.excerpt.slice(0, 160),
  };
}

export default async function VanHoaDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = culturalArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const relatedArticles = culturalArticles.filter((a) => a.id !== article.id);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--bg-canvas)]">
        {/* Editorial Article Hero Header */}
        <section className="relative h-[55vh] min-h-[400px] w-full overflow-hidden flex items-end">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0d] via-[#0b0f0d]/40 to-black/30" />

          <div className="container-editorial relative z-10 pb-12 text-white">
            <Link
              href="/van-hoa"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              <span>Quay lại Chuyên Mục Văn Hóa</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c382b]/90 border border-[#dca354]/40 text-xs font-semibold uppercase tracking-wider text-[#dca354] mb-3">
              <BookOpen size={13} />
              <span>{article.category}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fbf9f5] max-w-4xl tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 mt-4 font-body">
              <span className="flex items-center gap-1">
                <User size={13} className="text-[#dca354]" />
                {article.author}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-[#dca354]" />
                {article.readTime} phút đọc
              </span>
              <span>·</span>
              <span>{article.locationName}</span>
            </div>
          </div>
        </section>

        {/* Article Reading Layout */}
        <section className="py-12 md:py-16">
          <div className="container-editorial">
            <div className="max-w-3xl mx-auto">
              {/* Lead Paragraph */}
              <p className="font-body text-lg sm:text-xl text-[var(--text-primary)] font-medium leading-relaxed mb-8">
                {article.contentTeaser}
              </p>

              {/* Editorial Pull Quote */}
              {article.quote && (
                <figure className="my-10 p-6 md:p-8 rounded-2xl bg-white border-l-4 border-[#b37322] shadow-sm">
                  <blockquote className="font-display text-lg sm:text-xl text-[var(--text-primary)] italic leading-relaxed">
                    &quot;{article.quote}&quot;
                  </blockquote>
                  <figcaption className="text-xs text-[var(--text-muted)] mt-3 font-medium">
                    — Điệu Then cổ truyền của đồng bào Tày, Định Hóa
                  </figcaption>
                </figure>
              )}

              {/* Full Content Paragraphs */}
              {article.fullContent && (
                <div className="space-y-6 text-base text-[var(--text-secondary)] leading-relaxed font-body">
                  {article.fullContent.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}

              {/* Source attribution box */}
              <div className="mt-12 p-6 rounded-2xl bg-white border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-[var(--text-primary)] block">Nguồn tư liệu & khảo cứu:</span>
                  <span>{article.source}</span>
                </div>
                <div className="text-right sm:text-left">
                  <span className="text-[#b37322] font-medium">Định Hóa · Thái Nguyên</span>
                </div>
              </div>
            </div>

            {/* Related Cultural Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-12 border-t border-[var(--border-subtle)]">
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
                  Các Chuyên Đề Văn Hóa Khác
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {relatedArticles.map((rel) => (
                    <article
                      key={rel.id}
                      className="group rounded-2xl overflow-hidden bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative h-52 w-full overflow-hidden">
                        <Image
                          src={rel.imageUrl}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-[11px] font-semibold text-[#b37322] uppercase tracking-wider block mb-1">
                          {rel.category}
                        </span>
                        <h4 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[#b37322] transition-colors line-clamp-1 mb-2">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-4">
                          {rel.excerpt}
                        </p>
                        <Link
                          href={`/van-hoa/${rel.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#b37322] hover:text-[#965f1a]"
                        >
                          <span>Đọc bài viết</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <FloatingTourismDock />
      <SiteFooter />
    </>
  );
}
