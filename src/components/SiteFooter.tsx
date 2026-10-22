import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      className="bg-[#121c17] text-white border-t border-white/10"
    >
      {/* Main Footer Content */}
      <div className="container-editorial py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Authority Column (5 cols) */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex flex-col mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dca354] rounded-lg group"
              aria-label="Nghĩa Tá — Trang chủ"
            >
              <span className="font-display text-2xl font-bold text-white group-hover:text-[#dca354] transition-colors leading-tight">
                Nghĩa Tá
              </span>
              <span className="text-xs text-[#dca354] font-medium tracking-wide mt-1">
                Định Hóa · Thái Nguyên — Cổng Thông Tin Du Lịch Di Sản Số
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-[#a9a69b] mb-6 max-w-md">
              Nền tảng số hóa di sản và quảng bá du lịch không gian 360° xã Nghĩa Tá,
              huyện Định Hóa, tỉnh Thái Nguyên — Vùng đất chiến khu An Toàn Khu (ATK)
              lịch sử, thắng cảnh Thác Nàng Tiên và bản sắc văn hóa Tày, Nùng ngàn đời.
            </p>

            <div className="space-y-2 text-xs text-[#a9a69b]">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#dca354] mt-0.5 flex-shrink-0" />
                <address className="not-italic">
                  Ủy ban Nhân dân Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên
                </address>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#dca354] flex-shrink-0" />
                <span>dulich.nghiata@thainguyen.gov.vn</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#dca354] mb-4">
              Khám Phá Điểm Đến
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/kham-pha"
                  className="text-[#a9a69b] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Tour Toàn Cảnh 360°</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/di-tich/atk-dinh-hoa"
                  className="text-[#a9a69b] hover:text-white transition-colors"
                >
                  Khu Di Tích ATK Định Hóa
                </Link>
              </li>
              <li>
                <Link
                  href="/di-tich/thac-nang-tien"
                  className="text-[#a9a69b] hover:text-white transition-colors"
                >
                  Thắng Cảnh Thác Nàng Tiên
                </Link>
              </li>
              <li>
                <Link
                  href="/di-tich/ban-lang-tay-nung"
                  className="text-[#a9a69b] hover:text-white transition-colors"
                >
                  Bản Làng Nhà Sàn Tày — Nùng
                </Link>
              </li>
              <li>
                <Link
                  href="/di-tich/rung-nghia-ta"
                  className="text-[#a9a69b] hover:text-white transition-colors"
                >
                  Rừng Đại Ngàn Nguyên Sinh
                </Link>
              </li>
            </ul>
          </div>

          {/* Culture & Practical Info Column (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#dca354] mb-4">
              Văn Hóa & Cẩm Nang Du Lịch
            </h3>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <Link
                  href="/van-hoa/hat-then-dan-tinh"
                  className="text-[#a9a69b] hover:text-white transition-colors"
                >
                  Nghệ Thuật Hát Then & Đàn Tính Tày
                </Link>
              </li>
              <li>
                <Link
                  href="/van-hoa/kien-truc-nha-san"
                  className="text-[#a9a69b] hover:text-white transition-colors"
                >
                  Kiến Trúc Nhà Sàn Gỗ Cổ Truyền
                </Link>
              </li>
              <li>
                <Link
                  href="/van-hoa/le-hoi-long-tong"
                  className="text-[#a9a69b] hover:text-white transition-colors"
                >
                  Lễ Hội Xuống Đồng Lồng Tồng
                </Link>
              </li>
              <li>
                <Link
                  href="/gioi-thieu"
                  className="text-[#a9a69b] hover:text-white transition-colors"
                >
                  Về Vùng Đất Nghĩa Tá · Định Hóa
                </Link>
              </li>
            </ul>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#a9a69b]">
              <p className="font-semibold text-white mb-1">Hỗ Trợ Thông Tin Du Khách</p>
              <p>Mọi thông tin hướng dẫn lưu trú, ẩm thực bản địa và thuê hướng dẫn viên xin liên hệ Trung tâm VHTT xã Nghĩa Tá.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-white/8 bg-[#0c1410] py-4">
        <div className="container-editorial flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#737066]">
          <p>© 2026 Du Lịch Nghĩa Tá — Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên.</p>
          <p className="flex items-center gap-2">
            <span>Dự án số hóa di sản & du lịch cộng đồng</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
