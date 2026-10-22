import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  MapPin,
  Compass,
  ArrowRight,
  Calendar,
  Sparkles,
  ChevronRight,
  Landmark,
  TreePine,
  Users,
  Clock,
  Car,
  SunMedium,
  Search,
  ShieldCheck,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingTourismDock from "@/components/FloatingTourismDock";
import InteractivePanoramaViewer from "@/components/InteractivePanoramaViewer";
import InteractiveTourismMap from "@/components/InteractiveTourismMap";
import {
  heritageSites,
  panoramaScenes,
  culturalArticles,
  travelItineraries,
} from "@/data/mockData";

export const metadata: Metadata = {
  title: "Nghĩa Tá — Khám Phá Di Sản & Cảnh Quan Du Lịch Định Hóa, Thái Nguyên",
  description:
    "Cổng thông tin du lịch và Khám phá toàn cảnh không gian 360° xã Nghĩa Tá, huyện Định Hóa, tỉnh Thái Nguyên. Khám phá khu di tích lịch sử ATK Định Hóa, Thác Nàng Tiên và bản sắc văn hóa Tày, Nùng ngàn đời.",
};

export default function HomePage() {
  const featuredSite = heritageSites[0]; // ATK Định Hóa
  const secondarySites = heritageSites.slice(1);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        {/* ======================================================
            SECTION 1: CINEMATIC VISUAL HERO
           ====================================================== */}
        <section
          aria-label="Cảnh sắc Nghĩa Tá"
          className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/hero-nghia-ta.jpg"
              alt="Toàn cảnh thung lũng Nghĩa Tá, Định Hóa, Thái Nguyên trong sương sớm"
              fill
              priority
              quality={90}
              className="object-cover object-center scale-105"
              sizes="100vw"
            />
            {/* Cinematic Gradients for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0d] via-[#0b0f0d]/45 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f0d]/85 via-transparent to-black/35" />
          </div>

          {/* Hero Content */}
          <div className="container-editorial relative z-10 pt-32 pb-24 md:py-36 text-white">
            <div className="max-w-3xl">
              {/* Destination Tag & Weather Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c382b]/90 border border-[#dca354]/40 backdrop-blur-md shadow-lg">
                  <Compass size={14} className="text-[#dca354]" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#dca354]">
                    Xã Nghĩa Tá · Huyện Định Hóa · Tỉnh Thái Nguyên
                  </span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-xs text-white/90">
                  <SunMedium size={13} className="text-amber-400" />
                  <span>23°C · Tiết trời thu đông lý tưởng</span>
                </div>
              </div>

              {/* Headline with Playfair Display */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6 drop-shadow-xl text-[#fbf9f5]">
                Hồn Thiêng Chiến Khu, <br className="hidden sm:block" />
                Kỳ Quan Đại Ngàn
              </h1>

              {/* Subtitle */}
              <p className="font-body text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-normal mb-8 max-w-2xl drop-shadow">
                Hành trình đưa bạn khám phá không gian 360° vùng đất cội nguồn
                cách mạng ATK Định Hóa, ngắm dải lụa trắng Thác Nàng Tiên và hòa
                mình vào nếp nhà sàn thanh bình của đồng bào Tày, Nùng.
              </p>

              {/* Quick Discovery Search Bar */}
              <form
                action="/di-tich"
                method="GET"
                className="mb-8 max-w-xl flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-black/60 focus-within:border-[#dca354] border border-white/25 rounded-2xl p-1.5 backdrop-blur-xl transition-all shadow-xl"
              >
                <div className="pl-3.5 pr-2 text-white/70">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  name="q"
                  placeholder="Tìm di tích ATK, thác nước, nhà sàn..."
                  className="w-full bg-transparent border-none text-sm text-white placeholder-white/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#dca354] hover:bg-[#edb86e] text-[#0b0f0d] text-xs font-bold transition-all flex-shrink-0 active:scale-95"
                >
                  Tìm Kiếm
                </button>
              </form>

              {/* Dual Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/kham-pha"
                  className="px-6 py-3.5 rounded-xl bg-[#dca354] hover:bg-[#edb86e] text-[#0b0f0d] font-bold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-[#dca354]/25 transition-all hover:scale-105 active:scale-95"
                >
                  <Camera size={19} strokeWidth={2} />
                  <span>Trải Nghiệm Khám phá toàn cảnh</span>
                </Link>

                <Link
                  href="#ban-do-du-lich"
                  className="px-6 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/25 hover:border-white/50 backdrop-blur-md text-white font-medium text-base flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <MapPin size={18} className="text-[#dca354]" />
                  <span>Bản Đồ Điểm Đến</span>
                </Link>
              </div>
            </div>

            {/* Quick Destination Highlights Bar */}
            <div className="mt-14 sm:mt-20 pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#dca354]">
                  <Landmark size={20} />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">
                    ATK Định Hóa
                  </span>
                  <span className="text-xs text-white/70">
                    Thủ đô kháng chiến
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-400">
                  <TreePine size={20} />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">
                    Thác Nàng Tiên
                  </span>
                  <span className="text-xs text-white/70">
                    Hồ ngọc giữa núi đá
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
                  <Users size={20} />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">
                    Bản Làng Tày
                  </span>
                  <span className="text-xs text-white/70">
                    Nhà sàn gỗ cổ truyền
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-sky-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">
                    Hát Then Đàn Tính
                  </span>
                  <span className="text-xs text-white/70">
                    Di sản nhân loại
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            SECTION 2: REAL 360° PANORAMA SHOWCASE (Điểm Nhấn Trung Tâm)
           ====================================================== */}
        <section
          aria-labelledby="pano-showcase-heading"
          className="py-16 md:py-24 bg-[#0e1713] text-white relative"
        >
          <div className="container-editorial">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#dca354] mb-2">
                  <Camera size={15} />
                  <span>Trải Nghiệm Toàn Cảnh Tương Tác</span>
                </div>
                <h2
                  id="pano-showcase-heading"
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fbf9f5]"
                >
                  Khám Phá Nghĩa Tá Qua Góc Nhìn 360°
                </h2>
                <p className="text-sm md:text-base text-[#a9a69b] max-w-2xl mt-2 font-body">
                  Kéo chuột để xoay quanh 360 độ, cuộn để phóng to chi tiết và
                  nhấp vào các điểm chạm (hotspots) để khám phá những thắng cảnh
                  biểu tượng của xã Nghĩa Tá, huyện Định Hóa, tỉnh Thái Nguyên.
                </p>
              </div>

              <Link
                href="/kham-pha"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#1c382b] border border-white/20 text-sm font-semibold text-white transition-all hover:border-[#dca354] active:scale-95"
              >
                <span>Mở Phòng Chiếu Toàn Màn Hình</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Embedded Live 360 Viewer */}
            <InteractivePanoramaViewer
              scenes={panoramaScenes}
              height="580px"
              showSceneThumbnails={true}
            />
          </div>
        </section>

        {/* ======================================================
            SECTION 3: BẢN ĐỒ DU LỊCH SỐ TƯƠNG TÁC
           ====================================================== */}
        <section
          id="ban-do-du-lich"
          aria-labelledby="tourism-map-heading"
          className="py-16 md:py-24 bg-[var(--bg-subtle)]/40 scroll-mt-20"
        >
          <div className="container-editorial">
            <InteractiveTourismMap sites={heritageSites} />
          </div>
        </section>

        {/* ======================================================
            SECTION 4: KHÁM PHÁ ĐIỂM ĐẾN (Asymmetric Magazine Layout)
           ====================================================== */}
        <section
          aria-labelledby="destinations-heading"
          className="py-16 md:py-24 bg-[var(--bg-canvas)]"
        >
          <div className="container-editorial">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#b37322] block mb-2">
                  Danh lam & Di tích
                </span>
                <h2
                  id="destinations-heading"
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
                >
                  Những Điểm Đến Không Thể Bỏ Lỡ
                </h2>
              </div>
              <Link
                href="/di-tich"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b37322] hover:text-[#965f1a] transition-colors group"
              >
                <span>Xem Tất Cả Điểm Đến</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* Asymmetrical Grid: 1 Large Hero Card + 3 Secondary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* Featured Landmark Hero Card (7 Cols) */}
              <div className="lg:col-span-7 group relative rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-lg flex flex-col justify-between hover-lift">
                <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                  <Image
                    src={featuredSite.imageUrl}
                    alt={featuredSite.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1c382b]/90 text-[#dca354] border border-[#dca354]/30 backdrop-blur-md flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-[#dca354]" />
                      <span>Di Tích Lịch Sử Quốc Gia</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-medium text-[#dca354] mb-1">
                      {featuredSite.locationName}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mb-1">
                      {featuredSite.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 line-clamp-1">
                      {featuredSite.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-body">
                    {featuredSite.description}
                  </p>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-mono">
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#b37322]" />2 - 3 giờ
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Car size={14} className="text-[#b37322]" />Ô tô, xe máy
                      </span>
                    </div>

                    <Link
                      href={`/di-tich/${featuredSite.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b37322] hover:text-[#965f1a] group/btn"
                    >
                      <span>Khám phá chi tiết</span>
                      <ArrowRight
                        size={14}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Secondary Cards Stack (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {secondarySites.map((site) => (
                  <article
                    key={site.id}
                    className="group rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 flex gap-4 hover:border-[#b37322]/40 shadow-sm transition-all hover:shadow-md hover-lift"
                  >
                    <div className="relative w-32 sm:w-40 h-28 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={site.imageUrl}
                        alt={site.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="160px"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <span className="text-[11px] font-semibold text-[#b37322] uppercase tracking-wider block mb-1">
                          {site.category === "thang-canh-tu-nhien"
                            ? "Thắng Cảnh"
                            : "Bản Làng"}
                        </span>
                        <h4 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[#b37322] transition-colors line-clamp-1">
                          {site.title}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1 font-body">
                          {site.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-[var(--text-muted)] font-mono">
                          {site.locationName.split(",")[0]}
                        </span>
                        <Link
                          href={`/di-tich/${site.slug}`}
                          className="text-xs font-semibold text-[#b37322] flex items-center gap-1"
                        >
                          <span>Chi tiết</span>
                          <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            SECTION 5: VĂN HÓA & NẾP SỐNG BẢN ĐỊA (Editorial Magazine)
           ====================================================== */}
        <section
          aria-labelledby="culture-heading"
          className="py-16 md:py-24 bg-[var(--bg-canvas)]"
        >
          <div className="container-editorial">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#b37322] block mb-2">
                  Bản Sắc Truyền Thống
                </span>
                <h2
                  id="culture-heading"
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
                >
                  Câu Chuyện Văn Hóa Người Tày — Nùng
                </h2>
              </div>
              <Link
                href="/van-hoa"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b37322] hover:text-[#965f1a] transition-colors group"
              >
                <span>Xem Tất Cả Bài Viết</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {culturalArticles.map((article) => (
                <article
                  key={article.id}
                  className="group rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover-lift"
                >
                  <div>
                    {/* Article Thumbnail */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[#b37322] transition-colors mb-3 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 font-body">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 font-mono">
                      <Calendar size={13} />
                      {article.readTime} phút đọc
                    </span>
                    <Link
                      href={`/van-hoa/${article.slug}`}
                      className="text-xs font-semibold text-[#b37322] hover:text-[#965f1a] flex items-center gap-1"
                    >
                      <span>Đọc tiếp</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================
            SECTION 6: GỢI Ý HÀNH TRÌNH DU LỊCH (Travel Itineraries)
           ====================================================== */}
        <section
          aria-labelledby="itinerary-heading"
          className="py-16 md:py-24 bg-[#14231b] text-white"
        >
          <div className="container-editorial">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#dca354] block mb-2">
                Hành Trình Gợi Ý
              </span>
              <h2
                id="itinerary-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fbf9f5] mb-4"
              >
                Gợi Ý Lịch Trình Khám Phá Nghĩa Tá
              </h2>
              <p className="text-sm sm:text-base text-[#a9a69b]">
                Những lộ trình được thiết kế chu đáo giúp bạn cảm nhận trọn vẹn
                bề dày lịch sử kháng chiến và không gian sinh thái hoang sơ của
                vùng đất Định Hóa, Thái Nguyên.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {travelItineraries.map((itinerary, idx) => (
                <div
                  key={itinerary.id}
                  className="rounded-2xl p-6 md:p-8 bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-[#dca354]/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#dca354]/20 text-[#dca354] border border-[#dca354]/40">
                        {itinerary.duration}
                      </span>
                      <span className="text-xs text-[#a9a69b]">
                        Tuyến số 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {itinerary.title}
                    </h3>

                    <p className="text-xs text-[#a9a69b] mb-6 flex items-center gap-1.5">
                      <Users size={13} className="text-[#dca354]" />
                      <span>Phù hợp: {itinerary.suitable}</span>
                    </p>

                    <div className="space-y-3 mb-6">
                      {itinerary.stops.map((stop, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#1c382b] border border-[#dca354] text-[#dca354] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-sm text-white/85 leading-relaxed">
                            {stop}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/kham-pha"
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#dca354] hover:text-[#0b0f0d] border border-white/20 text-center text-sm font-semibold transition-all active:scale-95"
                  >
                    Bắt Đầu Chuyến Đi
                  </Link>
                </div>
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
