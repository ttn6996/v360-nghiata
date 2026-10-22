import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Compass, Mail, Phone, Heart, Users, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Giới Thiệu Vùng Đất Nghĩa Tá · Định Hóa, Thái Nguyên",
  description:
    "Cẩm nang giới thiệu về cảnh sắc, con người, lịch sử cách mạng hào hùng và nét đẹp văn hóa Tày, Nùng tại xã Nghĩa Tá, huyện Định Hóa, tỉnh Thái Nguyên.",
};

export default function GioiThieuPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--bg-canvas)] pt-20">
        {/* Scenic Header */}
        <section className="py-14 md:py-20 bg-[#121d17] text-white border-b border-white/10">
          <div className="container-editorial">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/60 hover:text-white transition-colors mb-6"
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
                Nghĩa Tá — Xã vùng cao thuộc huyện Định Hóa, tỉnh Thái Nguyên. Nơi giao hòa giữa thiên nhiên
                đá vôi nguyên sơ, chiến khu An Toàn Khu (ATK) lịch sử và tấm lòng nhân hậu của đồng bào các dân tộc.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Narrative with Scenic Image */}
        <section className="py-12 md:py-16">
          <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
              <div className="lg:col-span-7 space-y-4 text-base text-[var(--text-secondary)] leading-relaxed font-body">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-snug">
                  Mảnh Đất Chiến Khu Hào Hùng & Non Nước Hữu Tình
                </h2>
                <p>
                  Tọa lạc tại vùng núi phía Tây huyện Định Hóa, xã Nghĩa Tá được thiên nhiên ưu ái ban tặng
                  những dãy núi đá vôi kỳ vĩ, những thung lũng lúa trù phú và cánh rừng nhiệt đới bạt ngàn.
                  Nơi đây từng là một trong những phên dậu kiên cố của vùng ATK Định Hóa trong thời kỳ kháng chiến chống Pháp.
                </p>
                <p>
                  Đến với Nghĩa Tá hôm nay, du khách không chỉ được viếng thăm những di tích lịch sử cách mạng thiêng liêng,
                  chiêm ngưỡng dải thác Nàng Tiên buông lụa giữa thung lũng xanh, mà còn được đắm mình trong nếp sống
                  chân phương của đồng bào Tày, Nùng bên nếp nhà sàn gỗ cổ truyền.
                </p>
                <div className="p-4 rounded-xl bg-white border border-[var(--border-subtle)] flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
                    <MapPin size={15} className="text-[#b37322]" />
                    <span>Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hero/hero-nghia-ta.jpg"
                  alt="Thung lũng Nghĩa Tá, Định Hóa, Thái Nguyên"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Core Tourism Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="p-6 md:p-8 rounded-2xl bg-white border border-[var(--border-subtle)] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-forest)] text-[#dca354] flex items-center justify-center mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
                  Trải Nghiệm Sinh Thái
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Tắm thác mát lành, dạo bước dưới tán rừng nhiệt đới nguyên sinh và hít thở bầu không khí trong lành của núi rừng Định Hóa.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-white border border-[var(--border-subtle)] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-forest)] text-[#dca354] flex items-center justify-center mb-4">
                  <Heart size={20} />
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
                  Về Nguồn Lịch Sử
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Tìm hiểu truyền thống kiên cường của vùng An Toàn Khu (ATK), tri ân thế hệ cha ông đã dựng lán cứu nước giữa rừng già.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-white border border-[var(--border-subtle)] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-forest)] text-[#dca354] flex items-center justify-center mb-4">
                  <Users size={20} />
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
                  Văn Hóa Bản Địa
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Ngủ nhà sàn gỗ, thưởng thức cơm lam cá suối, lắng nghe tiếng đàn Tính và câu hát Then mượt mà của đồng bào Tày, Nùng.
                </p>
              </div>
            </div>

            {/* Travel Assistance Contact Card */}
            <div className="rounded-2xl bg-[#121c17] text-white p-8 md:p-12 text-center max-w-2xl mx-auto shadow-xl">
              <h3 className="font-display text-2xl font-bold text-[#fbf9f5] mb-2">
                Thông Tin Hỗ Trợ Du Khách
              </h3>
              <p className="text-xs sm:text-sm text-[#a9a69b] mb-6">
                UBND Xã Nghĩa Tá luôn chào đón du khách đến tham quan, nghiên cứu và trải nghiệm du lịch cộng đồng.
              </p>
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#dca354]">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15">
                  <MapPin size={14} />
                  <span>Xã Nghĩa Tá, Định Hóa, Thái Nguyên</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15">
                  <Mail size={14} />
                  <span>dulich.nghiata@thainguyen.gov.vn</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
