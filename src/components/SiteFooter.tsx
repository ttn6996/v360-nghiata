import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

// Static year — update on new deployments
const CURRENT_YEAR = 2025;

export default function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: "var(--accent-forest)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Main Footer Content */}
      <div className="container-editorial py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dca354] rounded-sm"
              aria-label="V360 Nghĩa Tá — Trang chủ"
            >
              <span
                className="font-display text-xl font-semibold"
                style={{ color: "#f5f4ef" }}
              >
                V360 Nghĩa Tá
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "#a9a69b" }}
            >
              Khám phá không gian 360° và di sản văn hóa lịch sử xã Nghĩa Tá,
              huyện Chợ Đồn, tỉnh Bắc Kạn.
            </p>
            <div className="flex items-start gap-2">
              <MapPin
                size={14}
                strokeWidth={1.75}
                style={{ color: "#dca354", marginTop: "2px", flexShrink: 0 }}
                aria-hidden="true"
              />
              <address
                className="not-italic text-caption"
                style={{ color: "#737066" }}
              >
                Xã Nghĩa Tá, Huyện Định Hóa
                <br />
                Tỉnh Thái Nguyên, Việt Nam
              </address>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3
              className="text-caption uppercase tracking-widest mb-4"
              style={{ color: "#dca354" }}
            >
              Khám Phá
            </h3>
            <nav aria-label="Footer navigation — Khám phá">
              <ul className="space-y-2">
                {[
                  { href: "/kham-pha", label: "Tour Ảo 360°" },
                  { href: "/di-tich", label: "Di Tích & Thắng Cảnh" },
                  { href: "/van-hoa", label: "Di Sản Văn Hóa" },
                  { href: "/gioi-thieu", label: "Về Dự Án" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="link-dark text-sm focus-visible:outline-none focus-visible:underline focus-visible:decoration-[#dca354]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Data Transparency Column */}
          <div>
            <h3
              className="text-caption uppercase tracking-widest mb-4"
              style={{ color: "#dca354" }}
            >
              Liên hệ
            </h3>
            <div className="flex items-center gap-2 mt-4">
              <Mail
                size={14}
                strokeWidth={1.75}
                style={{ color: "#737066" }}
                aria-hidden="true"
              />
              <span className="text-caption" style={{ color: "#737066" }}>
                v360.nghiata@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container-editorial py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-caption" style={{ color: "#737066" }}>
            © {CURRENT_YEAR + 1 } - Nghĩa Tá, Định Hóa, Thái Nguyên
          </p>
          <p className="text-caption" style={{ color: "#737066" }}>
            Dữ liệu thử nghiệm
          </p>
        </div>
      </div>
    </footer>
  );
}
