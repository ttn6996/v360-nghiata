import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Landmark } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingTourismDock from "@/components/FloatingTourismDock";
import HeritageDirectory from "@/components/HeritageDirectory";
import { heritageSites } from "@/data/mockData";

export const metadata: Metadata = {
  title: "Danh Mục Điểm Đến & Thắng Cảnh Nghĩa Tá · Định Hóa",
  description:
    "Khám phá các điểm đến di tích lịch sử ATK Định Hóa, thắng cảnh tự nhiên Thác Nàng Tiên và bản làng truyền thống Tày, Nùng tại Nghĩa Tá, Định Hóa, Thái Nguyên.",
};

export default function DiTichPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--bg-canvas)]">
        {/* Editorial Atmospheric Hero */}
        <section
          aria-labelledby="ditich-heading"
          className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-[#0c1410] text-white overflow-hidden border-b border-white/10"
        >
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <Image
              src="/hero_nghia_ta_1792659715500.jpg"
              alt="Cảnh quan di tích Nghĩa Tá"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1410] via-[#0c1410]/80 to-transparent" />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70 hover:text-white transition-colors mb-4 whitespace-nowrap"
            >
              <ArrowLeft size={14} />
              <span>Quay lại Trang Chủ</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c382b] border border-[#dca354]/40 text-[#dca354] text-xs font-semibold uppercase tracking-wider mb-3">
                  <Landmark size={13} />
                  <span>Cẩm Nang Điểm Đến Du Lịch</span>
                </div>
                <h1
                  id="ditich-heading"
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fbf9f5] tracking-tight leading-tight"
                >
                  Di Tích & Thắng Cảnh Nghĩa Tá
                </h1>
                <p className="font-body text-sm md:text-base text-[#a9a69b] max-w-2xl mt-3 leading-relaxed">
                  Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên — Khám phá cội nguồn di tích cách mạng ATK Định Hóa, dải lụa trắng Thác Nàng Tiên và nét thanh bình của bản làng vùng cao.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#dca354] bg-[#1c382b]/80 border border-[#dca354]/40 px-4 py-2.5 rounded-xl backdrop-blur-md whitespace-nowrap flex-shrink-0">
                <MapPin size={14} />
                <span>Định Hóa · Thái Nguyên</span>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Section with Client Filter */}
        <section className="py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeritageDirectory initialSites={heritageSites} />
          </div>
        </section>
      </main>
      <FloatingTourismDock />
      <SiteFooter />
    </>
  );
}
