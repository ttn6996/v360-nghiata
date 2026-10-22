import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingTourismDock from "@/components/FloatingTourismDock";
import { culturalArticles } from "@/data/mockData";

export const metadata: Metadata = {
  title: "Văn Hóa Bản Địa & Lối Sống Tày — Nùng · Nghĩa Tá, Định Hóa",
  description:
    "Khám phá di sản văn hóa phi vật thể Hát Then Đàn Tính, kiến trúc nhà sàn gỗ cổ truyền và lễ hội Lồng Tồng tại Nghĩa Tá, huyện Định Hóa, tỉnh Thái Nguyên.",
};

export default function VanHoaPage() {
  const featuredArticle = culturalArticles[0]; // Hát Then Đàn Tính
  const otherArticles = culturalArticles.slice(1);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--bg-canvas)] pt-20">
        {/* Header */}
        <section
          aria-labelledby="vanhoa-heading"
          className="py-12 md:py-16 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]"
        >
          <div className="container-editorial">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              <span>Quay lại Trang Chủ</span>
            </Link>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c382b]/10 text-[#1c382b] text-xs font-semibold uppercase tracking-wider mb-2">
                <BookOpen size={13} />
                <span>Chuyên Mục Văn Hóa & Đời Sống Bản Địa</span>
              </div>
              <h1
                id="vanhoa-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight"
              >
                Hồn Cốt Di Sản Tày — Nùng Nghĩa Tá
              </h1>
              <p className="font-body text-sm md:text-base text-[var(--text-secondary)] mt-2 leading-relaxed">
                Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên — Khám phá kho tàng di sản phi vật thể đặc sắc:
                tiếng đàn Tính ngân vang, nếp nhà sàn gỗ cổ kính và sắc màu rực rỡ của ngày hội xuống đồng.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Culture Story (Editorial Hero) */}
        <section className="py-12 md:py-16">
          <div className="container-editorial">
            <div className="rounded-2xl overflow-hidden bg-white border border-[var(--border-subtle)] shadow-md grid grid-cols-1 lg:grid-cols-12 mb-12 group">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1c382b] text-[#dca354] border border-[#dca354]/30 backdrop-blur-md">
                    Tiêu Điểm Di Sản
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#b37322] block mb-2">
                    {featuredArticle.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  {featuredArticle.quote && (
                    <blockquote className="p-4 rounded-xl bg-[var(--bg-canvas)] border-l-4 border-[#dca354] text-xs text-[var(--text-primary)] italic mb-6">
                      &quot;{featuredArticle.quote}&quot;
                    </blockquote>
                  )}
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                    <Clock size={13} />
                    {featuredArticle.readTime} phút đọc
                  </span>
                  <Link
                    href={`/van-hoa/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-forest)] hover:bg-[#256a42] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Đọc Toàn Văn</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Other Cultural Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherArticles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-2xl overflow-hidden bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[#b37322] transition-colors mb-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[var(--border-subtle)] mt-4 flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <Calendar size={13} />
                      {article.readTime} phút đọc
                    </span>
                    <Link
                      href={`/van-hoa/${article.slug}`}
                      className="text-xs font-semibold text-[#b37322] hover:text-[#965f1a] flex items-center gap-1"
                    >
                      <span>Khám phá bài viết</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FloatingTourismDock />
      <SiteFooter />
    </>
  );
}
