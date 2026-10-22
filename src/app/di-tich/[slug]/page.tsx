import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  MapPin,
  Compass,
  CheckCircle2,
  Sparkles,
  Eye,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingTourismDock from "@/components/FloatingTourismDock";
import { heritageSites } from "@/data/mockData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = heritageSites.map((site) => ({ slug: site.slug }));
  // Add backward compatible alias
  slugs.push({ slug: "atk-cho-don" });
  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site =
    heritageSites.find((s) => s.slug === slug) ||
    (slug === "atk-cho-don" ? heritageSites[0] : null);

  if (!site) return { title: "Điểm Đến Không Tìm Thấy" };
  return {
    title: `${site.title} — Cẩm Nang Du Lịch Nghĩa Tá · Định Hóa`,
    description: site.description.slice(0, 160),
  };
}

export default async function DiTichDetailPage({ params }: Props) {
  const { slug } = await params;
  const site =
    heritageSites.find((s) => s.slug === slug) ||
    (slug === "atk-cho-don" ? heritageSites[0] : null);

  if (!site) notFound();

  const relatedSites = heritageSites.filter((s) => s.id !== site.id).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--bg-canvas)]">
        {/* Full-width Scenic Hero Section */}
        <section className="relative h-[65vh] min-h-[460px] w-full overflow-hidden flex items-end">
          <Image
            src={site.imageUrl}
            alt={site.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0d] via-[#0b0f0d]/40 to-black/40" />

          {/* Breadcrumb & Title Overlay */}
          <div className="container-editorial relative z-10 pb-12 text-white">
            <Link
              href="/di-tich"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              <span>Quay lại Danh Mục Di Tích</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c382b]/90 border border-[#dca354]/40 text-xs font-semibold uppercase tracking-wider text-[#dca354] mb-3">
              <Compass size={13} />
              <span>
                {site.category === "lich-su-cach-mang"
                  ? "Di Tích Lịch Sử Kháng Chiến"
                  : site.category === "thang-canh-tu-nhien"
                  ? "Thắng Cảnh Sinh Thái"
                  : "Bản Làng Văn Hóa"}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#fbf9f5] mb-2 tracking-tight">
              {site.title}
            </h1>
            <p className="text-sm sm:text-base text-white/85 max-w-2xl font-medium">
              {site.subtitle}
            </p>

            <div className="flex items-center gap-2 text-xs text-[#dca354] mt-4 font-mono">
              <MapPin size={13} />
              <span>{site.locationName}</span>
            </div>
          </div>
        </section>

        {/* Content & Sidebar Layout */}
        <section className="py-12 md:py-16">
          <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Editorial Article (8 cols) */}
              <div className="lg:col-span-8 space-y-10">
                {/* Introduction */}
                <div className="p-6 md:p-8 rounded-2xl bg-white border border-[var(--border-subtle)] shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-4">
                    Tổng Quan Điểm Đến
                  </h2>
                  <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed mb-4">
                    {site.description}
                  </p>
                  {site.historicalContext && (
                    <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border-l-4 border-[#b37322] my-4 text-sm text-[var(--text-primary)] leading-relaxed italic">
                      &quot;{site.historicalContext}&quot;
                    </div>
                  )}
                </div>

                {/* Highlights Checklist */}
                {site.highlights && (
                  <div className="p-6 md:p-8 rounded-2xl bg-white border border-[var(--border-subtle)] shadow-sm">
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <Sparkles size={18} className="text-[#b37322]" />
                      <span>Những Nét Đặc Sắc Không Thể Bỏ Lỡ</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {site.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            size={16}
                            className="text-[#256a42] flex-shrink-0 mt-0.5"
                          />
                          <span className="text-sm text-[var(--text-secondary)] leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photo Gallery */}
                {site.gallery && site.gallery.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                      Khoảnh Khắc Cảnh Sắc
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {site.gallery.map((imgUrl, i) => (
                        <div
                          key={i}
                          className="relative h-60 rounded-xl overflow-hidden shadow-sm group"
                        >
                          <Image
                            src={imgUrl}
                            alt={`${site.title} - Ảnh ${i + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visiting Notes */}
                {site.visitingNotes && (
                  <div className="p-6 rounded-xl bg-[#1c382b]/8 border border-[#1c382b]/20">
                    <h4 className="font-semibold text-sm text-[var(--accent-forest)] mb-2 flex items-center gap-2">
                      <Compass size={16} />
                      <span>Lưu Ý Cho Khách Tham Quan</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {site.visitingNotes}
                    </p>
                  </div>
                )}
              </div>

              {/* Tourism Quick Sidebar (4 cols) */}
              <aside className="lg:col-span-4 space-y-6">
                {/* 360 Experience CTA Card */}
                <div className="p-6 rounded-2xl bg-[#0b0f0d] text-white border border-[#dca354]/40 shadow-xl text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1c382b] border border-[#dca354] flex items-center justify-center mx-auto mb-3 text-[#dca354]">
                    <Camera size={22} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Khám Phá Không Gian 360°
                  </h3>
                  <p className="text-xs text-[#a9a69b] leading-relaxed mb-5">
                    Trải nghiệm tương tác xoay đa chiều toàn cảnh {site.title} ngay trên thiết bị của bạn.
                  </p>
                  <Link
                    href="/kham-pha"
                    className="w-full py-3 px-4 rounded-xl bg-[#dca354] hover:bg-[#edb86e] text-[#0b0f0d] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Eye size={16} />
                    <span>Mở Tour 360°</span>
                  </Link>
                </div>

                {/* Travel Practical Details Card */}
                {site.travelTips && (
                  <div className="p-6 rounded-2xl bg-white border border-[var(--border-subtle)] shadow-sm">
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4 pb-3 border-b border-[var(--border-subtle)]">
                      Cẩm Nang Tham Quan
                    </h3>
                    <div className="space-y-4 text-xs">
                      <div>
                        <span className="text-[var(--text-muted)] block mb-1">
                          Thời điểm lý tưởng:
                        </span>
                        <span className="font-semibold text-[var(--text-primary)] text-sm">
                          {site.travelTips.bestTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-[var(--text-muted)] block mb-1">
                          Thời lượng đề xuất:
                        </span>
                        <span className="font-semibold text-[var(--text-primary)] text-sm">
                          {site.travelTips.duration}
                        </span>
                      </div>
                      <div>
                        <span className="text-[var(--text-muted)] block mb-1">
                          Phương tiện di chuyển:
                        </span>
                        <span className="font-semibold text-[var(--text-primary)] text-sm">
                          {site.travelTips.transportation}
                        </span>
                      </div>
                      {site.travelTips.ticket && (
                        <div>
                          <span className="text-[var(--text-muted)] block mb-1">Vé tham quan:</span>
                          <span className="font-semibold text-[var(--text-primary)] text-sm">
                            {site.travelTips.ticket}
                          </span>
                        </div>
                      )}
                      {site.travelTips.preparation && (
                        <div>
                          <span className="text-[var(--text-muted)] block mb-1">
                            Chuẩn bị tư trang:
                          </span>
                          <span className="font-semibold text-[var(--text-primary)] text-sm">
                            {site.travelTips.preparation}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact support */}
                <div className="p-5 rounded-2xl bg-[var(--bg-subtle)] text-xs text-[var(--text-secondary)]">
                  <p className="font-bold text-[var(--text-primary)] mb-1">Ủy ban Nhân dân Xã Nghĩa Tá</p>
                  <p className="mb-2">Huyện Định Hóa, Tỉnh Thái Nguyên</p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Thông tin cẩm nang du lịch được bảo tồn và chia sẻ phục vụ du khách và đồng bào.
                  </p>
                </div>
              </aside>
            </div>

            {/* Related Destinations */}
            <div className="mt-16 pt-12 border-t border-[var(--border-subtle)]">
              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
                Các Điểm Đến Lân Cận Tại Nghĩa Tá
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedSites.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/di-tich/${rel.slug}`}
                    className="group rounded-xl overflow-hidden bg-white border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={rel.imageUrl}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[11px] font-semibold text-[#b37322] block mb-1 uppercase tracking-wider">
                        {rel.category === "lich-su-cach-mang"
                          ? "Lịch Sử"
                          : rel.category === "thang-canh-tu-nhien"
                          ? "Thắng Cảnh"
                          : "Bản Làng"}
                      </span>
                      <h4 className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[#b37322] transition-colors line-clamp-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">
                        {rel.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FloatingTourismDock />
      <SiteFooter />
    </>
  );
}
