import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
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
      <main className="min-h-screen bg-[var(--bg-canvas)]">
        {/* Editorial Atmospheric Hero */}
        <section
          aria-labelledby="vanhoa-heading"
          className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-[#0c1410] text-white overflow-hidden border-b border-white/10"
        >
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <Image
              src="/images/destinations/ban-lang-tay.jpg"
              alt="Văn hóa bản làng Nghĩa Tá"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1410] via-[#0c1410]/80 to-transparent" />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              <span>Quay lại Trang Chủ</span>
            </Link>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c382b] border border-[#dca354]/40 text-[#dca354] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles size={13} />
                <span>Chuyên Đề Di Sản Phi Vật Thể</span>
              </div>
              <h1
                id="vanhoa-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fbf9f5] tracking-tight leading-tight"
              >
                Hồn Cốt Di Sản Tày — Nùng Nghĩa Tá
              </h1>
              <p className="font-body text-sm md:text-base text-[#a9a69b] mt-3 leading-relaxed max-w-2xl">
                Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên — Lắng nghe giai điệu Then ngân vang, chiêm ngưỡng nếp nhà sàn trăm tuổi và khám phá phong tục truyền thống của đồng bào miền chiến khu.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Culture Story (Editorial Hero Spread) */}
        <section className="py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-[var(--border-subtle)] shadow-xl grid grid-cols-1 lg:grid-cols-12 mb-12 group transition-all">
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1c382b]/90 text-[#dca354] border border-[#dca354]/40 backdrop-blur-md shadow-md">
                    Tiêu Điểm Di Sản
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#dca354]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#b37322]">
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-body">
                    {featuredArticle.excerpt}
                  </p>
                  {featuredArticle.quote && (
                    <blockquote className="p-4 rounded-xl bg-[var(--bg-canvas)] border-l-4 border-[#dca354] text-xs text-[var(--text-primary)] italic mb-6">
                      &quot;{featuredArticle.quote}&quot;
                    </blockquote>
                  )}
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
                    <Clock size={13} className="text-[#b37322]" />
                    {featuredArticle.readTime} phút đọc
                  </span>
                  <Link
                    href={`/van-hoa/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-forest)] hover:bg-[#256a42] text-white text-xs font-bold transition-all shadow-md active:scale-95"
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
                  className="rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-[var(--border-subtle)] shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
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
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 font-body">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[var(--border-subtle)] mt-4 flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <Calendar size={13} className="text-[#b37322]" />
                      {article.readTime} phút đọc
                    </span>
                    <Link
                      href={`/van-hoa/${article.slug}`}
                      className="text-xs font-bold text-[#b37322] hover:text-[#965f1a] flex items-center gap-1 transition-colors"
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
