import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle, Mail, Globe } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Về Dự Án V360 Nghĩa Tá",
  description:
    "Giới thiệu dự án V360 Nghĩa Tá: mục tiêu bảo tồn di sản số, phương pháp thu thập dữ liệu, và cam kết minh bạch dữ liệu.",
};

const PRINCIPLES = [
  {
    icon: CheckCircle,
    title: "Trung thực về Dữ liệu",
    description:
      "Mọi nội dung di sản được gắn nhãn rõ ràng theo trạng thái xác minh: [ĐÃ XÁC MINH] hoặc [DỮ LIỆU THỬ NGHIỆM]. Chúng tôi không phát tán thông tin chưa được kiểm chứng như sự thật đã xác nhận.",
    color: "var(--status-verified)",
  },
  {
    icon: AlertTriangle,
    title: "Minh Bạch về Hạn Chế",
    description:
      "Dự án đang trong giai đoạn phát triển. Ảnh 360° và bản đồ địa lý là tài sản thử nghiệm. Không sử dụng cho mục đích pháp lý, hành chính, hoặc học thuật trước khi có xác nhận chính thức.",
    color: "var(--status-pending)",
  },
  {
    icon: Globe,
    title: "Mục tiêu Bảo Tồn",
    description:
      "V360 Nghĩa Tá là dự án phi lợi nhuận nhằm số hóa và lưu truyền di sản văn hóa, lịch sử của xã Nghĩa Tá cho các thế hệ sau — không vì mục đích thương mại.",
    color: "var(--accent-heritage)",
  },
];

export default function GioiThieuPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        {/* Hero */}
        <section
          aria-labelledby="about-heading"
          className="py-12 md:py-16"
          style={{
            background: "var(--accent-forest)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="container-editorial">
            <Link
              href="/"
              className="link-dark-muted inline-flex items-center gap-1.5 text-sm mb-6 focus-visible:outline-none focus-visible:underline focus-visible:decoration-[rgba(255,255,255,0.6)]"
            >
              <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              Trang chủ
            </Link>
            <p
              className="text-caption uppercase tracking-widest mb-3"
              style={{ color: "#dca354" }}
            >
              Về Chúng Tôi
            </p>
            <h1
              id="about-heading"
              className="text-h1 mb-4"
              style={{ color: "#f5f4ef" }}
            >
              Về Dự Án V360 Nghĩa Tá
            </h1>
            <p
              className="text-body-lg max-w-2xl"
              style={{ color: "#a9a69b", lineHeight: 1.7 }}
            >
              Dự án số hóa di sản và khuyến khích khám phá văn hóa, lịch sử
              xã Nghĩa Tá, huyện Chợ Đồn, tỉnh Bắc Kạn — vùng đất ATK cách
              mạng và cội nguồn văn hóa Tày, Nùng.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section
          aria-labelledby="mission-heading"
          className="py-12 md:py-16"
          style={{ background: "var(--bg-canvas)" }}
        >
          <div className="container-editorial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <h2
                  id="mission-heading"
                  className="text-h2 mb-5"
                  style={{ color: "var(--text-primary)" }}
                >
                  Sứ Mệnh Của Chúng Tôi
                </h2>
                <p
                  className="text-body-lg leading-relaxed mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  V360 Nghĩa Tá ra đời từ mong muốn bảo tồn và lan tỏa vẻ đẹp
                  văn hóa, thiên nhiên và lịch sử của một vùng đất còn ít được
                  biết đến — xã Nghĩa Tá thuộc huyện Chợ Đồn, tỉnh Bắc Kạn.
                </p>
                <p
                  className="text-body leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Thông qua công nghệ ảnh toàn cảnh 360°, hồ sơ di sản số và
                  kho tư liệu văn hóa, chúng tôi xây dựng cầu nối giữa cộng
                  đồng địa phương và những người có mong muốn tìm hiểu về
                  vùng đất này — từ khắp nơi trong và ngoài nước.
                </p>
              </div>

              {/* Principles */}
              <div className="space-y-4">
                {PRINCIPLES.map(({ icon: Icon, title, description, color }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 p-5 rounded"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: `color-mix(in srgb, ${color} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.75}
                        style={{ color }}
                      />
                    </div>
                    <div>
                      <h3
                        className="text-h3 mb-1.5"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {title}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section
          aria-labelledby="methodology-heading"
          className="py-12 md:py-16"
          style={{
            background: "var(--bg-surface-elevated)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <div className="container-editorial max-w-2xl">
            <h2
              id="methodology-heading"
              className="text-h2 mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Phương Pháp Thu Thập Dữ Liệu
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  label: "Khảo sát thực địa",
                  detail:
                    "Nhóm thực hiện khảo sát trực tiếp tại các địa điểm, phỏng vấn người dân địa phương và ghi chép thực tế.",
                },
                {
                  step: "02",
                  label: "Chụp ảnh 360° toàn cảnh",
                  detail:
                    "Sử dụng máy ảnh chuyên dụng equirectangular để thu thập ảnh toàn cảnh tại các điểm di sản.",
                },
                {
                  step: "03",
                  label: "Xác minh thông tin",
                  detail:
                    "Đối chiếu với tài liệu lịch sử công khai, tham vấn nhà nghiên cứu địa phương và cộng đồng.",
                },
                {
                  step: "04",
                  label: "Công bố có ghi chú",
                  detail:
                    "Mọi dữ liệu được gắn nhãn trạng thái xác minh rõ ràng trước khi xuất bản trên website.",
                },
              ].map(({ step, label, detail }) => (
                <div
                  key={step}
                  className="flex items-start gap-5"
                  style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem" }}
                >
                  <span
                    className="font-mono text-xl font-light flex-shrink-0"
                    style={{ color: "var(--accent-heritage)" }}
                    aria-hidden="true"
                  >
                    {step}
                  </span>
                  <div>
                    <h3
                      className="text-h3 mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {label}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section
          aria-labelledby="contact-heading"
          className="py-12 md:py-16"
          style={{ background: "var(--bg-canvas)" }}
        >
          <div className="container-editorial text-center max-w-lg">
            <h2
              id="contact-heading"
              className="text-h2 mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Đóng Góp &amp; Liên Hệ
            </h2>
            <p
              className="text-body mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Bạn là nhà nghiên cứu lịch sử, người dân địa phương, hay chuyên
              gia văn hóa? Chúng tôi rất trân trọng mọi đóng góp để làm phong
              phú và chính xác hóa dữ liệu di sản Nghĩa Tá.
            </p>
            <a
              href="mailto:v360.nghiata@gmail.com"
              className="btn-heritage"
              aria-label="Gửi email đến v360.nghiata@gmail.com"
            >
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              v360.nghiata@gmail.com
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
