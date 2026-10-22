import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  Sparkles,
  Heart,
  Shield,
  Trees,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingTourismDock from "@/components/FloatingTourismDock";

export const metadata: Metadata = {
  title: "Giới Thiệu Về Xã Nghĩa Tá · Huyện Định Hóa, Tỉnh Thái Nguyên",
  description:
    "Tìm hiểu về vị trí địa lý, lịch sử chiến khu cách mạng ATK Định Hóa, danh lam thắng cảnh và bản sắc đồng bào dân tộc tại xã Nghĩa Tá, Định Hóa, Thái Nguyên.",
};

export default function GioiThieuPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--bg-canvas)]">
        {/* Scenic Editorial Header */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-[#0c1410] text-white overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Image
              src="/images/hero/hero-nghia-ta.jpg"
              alt="Toàn cảnh Nghĩa Tá"
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

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c382b] border border-[#dca354]/40 text-xs font-semibold uppercase tracking-wider text-[#dca354] mb-3">
                <Compass size={13} />
                <span>Cẩm Nang Giới Thiệu Địa Phương</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fbf9f5] tracking-tight leading-tight">
                Về Vùng Đất Nghĩa Tá
              </h1>
              <p className="font-body text-base md:text-lg text-[#a9a69b] mt-3 leading-relaxed">
                Nghĩa Tá — Xã vùng cao thuộc huyện Định Hóa, tỉnh Thái Nguyên.
                Nơi giao hòa giữa thiên nhiên đá vôi nguyên sơ, cội nguồn chiến
                khu An Toàn Khu (ATK) lịch sử và tấm lòng nhân hậu của đồng bào
                các dân tộc.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Narrative with Scenic Image */}
        <section className="py-12 md:py-20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-7 space-y-4 text-base text-[var(--text-secondary)] leading-relaxed font-body">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b37322] mb-1">
                  <Sparkles size={14} />
                  <span>Vị Trí & Khái Quát Địa Lý</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-snug">
                  Mảnh Đất Chiến Khu Hào Hùng & Non Nước Hữu Tình
                </h2>
                <p>
                  Tọa lạc tại vùng núi phía Tây huyện Định Hóa, xã Nghĩa Tá được
                  thiên nhiên ưu ái ban tặng những dãy núi đá vôi kỳ vĩ, những
                  thung lũng lúa trù phú và cánh rừng nhiệt đới bạt ngàn. Nơi
                  đây từng là một trong những phên dậu kiên cố của vùng ATK Định
                  Hóa trong thời kỳ kháng chiến chống Pháp.
                </p>
                <p>
                  Với địa hình thung lũng lòng chảo được che chắn bởi các dãy
                  núi cao, Nghĩa Tá sở hữu khí hậu trong lành, mát mẻ quanh năm
                  cùng hệ sinh thái động thực vật phong phú, thích hợp cho phát
                  triển du lịch sinh thái, khám phá trải nghiệm và du lịch về
                  nguồn giáo dục truyền thống.
                </p>
              </div>

              <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-subtle)]">
                <Image
                  src="/images/destinations/rung-nghia-ta.jpg"
                  alt="Rừng nguyên sinh đại ngàn Nghĩa Tá"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Core Values 3-column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 rounded-2xl md:rounded-3xl bg-white border border-[var(--border-subtle)] shadow-md hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#1c382b]/10 text-[var(--accent-forest)] flex items-center justify-center mb-5">
                  <Shield size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
                  Chiến Khu Lịch Sử
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                  Nằm trong quần thể di tích Quốc gia đặc biệt ATK Định Hóa, nơi
                  ghi dấu những quyết sách quan trọng của Trung ương Đảng và Bác
                  Hồ trong kháng chiến.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl bg-white border border-[var(--border-subtle)] shadow-md hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#b37322]/10 text-[#b37322] flex items-center justify-center mb-5">
                  <Trees size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
                  Cảnh Quan Nguyên Sơ
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                  Danh thắng Thác Nàng Tiên ẩn mình giữa rừng già cùng hệ thống
                  hang động karst tự nhiên tạo nên khung cảnh sơn thủy hữu tình,
                  mát lành.
                </p>
              </div>

              <div className="p-8 rounded-2xl md:rounded-3xl bg-white border border-[var(--border-subtle)] shadow-md hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#1c382b]/10 text-[var(--accent-forest)] flex items-center justify-center mb-5">
                  <Heart size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
                  Bản Sắc Độc Đáo
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                  Cộng đồng người Tày, Nùng gắn bó keo sơn với nếp nhà sàn
                  truyền thống, điệu hát Then mượt mà và nền ẩm thực miền núi
                  phong phú.
                </p>
              </div>
            </div>

            {/* Travel Guide Callout Banner */}
            <div className="rounded-2xl md:rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[#12241b] via-[#0c1812] to-[#070e0a] text-white border border-[#dca354]/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#dca354] block mb-2">
                  Khởi Hành Ngay Hôm Nay
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fbf9f5] mb-2">
                  Sẵn Sàng Trải Nghiệm Khám phá toàn cảnh khu Nghĩa Tá?
                </h3>
                <p className="text-sm text-[#a9a69b] leading-relaxed">
                  Bắt đầu chuyến tham quan thực tế ảo toàn cảnh các địa danh nổi
                  tiếng hoặc lên lịch trình cho chuyến du ngoạn thực địa tại
                  Định Hóa, Thái Nguyên.
                </p>
              </div>

              <Link
                href="/kham-pha"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#dca354] to-[#edb86e] text-[#0b0f0d] font-bold text-sm shadow-xl shadow-[#dca354]/25 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap flex-shrink-0"
              >
                <Compass size={17} />
                <span>Khám phá toàn cảnh ngay</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FloatingTourismDock />
      <SiteFooter />
    </>
  );
}
