import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, MapPin } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
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
      <main className="min-h-screen bg-[var(--bg-canvas)] pt-20">
        {/* Page Header */}
        <section
          aria-labelledby="ditich-heading"
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

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b37322] mb-2">
                  <Compass size={13} />
                  <span>Cẩm Nang Điểm Đến Du Lịch</span>
                </div>
                <h1
                  id="ditich-heading"
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight"
                >
                  Di Tích & Thắng Cảnh Nghĩa Tá
                </h1>
                <p className="font-body text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mt-2">
                  Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên — Khám phá hành trình về nguồn hào hùng, những dòng thác nguyên sơ và nét đẹp bình dị của bản làng vùng cao.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-canvas)] px-3.5 py-2 rounded-xl border border-[var(--border-subtle)]">
                <MapPin size={13} className="text-[#b37322]" />
                <span>Định Hóa · Thái Nguyên</span>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Section with Client Filter */}
        <section className="py-12 md:py-16">
          <div className="container-editorial">
            <HeritageDirectory initialSites={heritageSites} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
