import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Compass,
  Camera,
  Clock,
  MapPin,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { heritageSites } from "@/data/mockData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return heritageSites.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = heritageSites.find((s) => s.slug === slug);
  if (!site) return { title: "Không tìm thấy" };
  return {
    title: site.title,
    description: site.description.slice(0, 160),
  };
}

export default async function DiTichDetailPage({ params }: Props) {
  const { slug } = await params;
  const site = heritageSites.find((s) => s.slug === slug);
  if (!site) notFound();

  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        {/* Hero */}
        <section
          aria-labelledby="site-title"
          className="relative overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${site.thumbnailColor} 0%, color-mix(in srgb, ${site.thumbnailColor} 50%, #0b0f0d) 100%)`,
            minHeight: "320px",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='18' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="container-editorial relative z-10 py-12 md:py-16">
            <Link
              href="/di-tich"
              className="link-dark-muted inline-flex items-center gap-1.5 text-sm mb-8 focus-visible:outline-none focus-visible:underline focus-visible:decoration-[rgba(255,255,255,0.6)]"
            >
              <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              Di Tích &amp; Thắng Cảnh
            </Link>

            <div className="flex items-start gap-3 mb-4">
              {site.status === "verified" ? (
                <span className="badge-verified">
                  <CheckCircle size={10} aria-hidden="true" />
                  Đã xác minh
                </span>
              ) : (
                <span className="badge-demo">
                  <AlertTriangle size={10} aria-hidden="true" />
                  Dữ liệu thử nghiệm
                </span>
              )}
            </div>

            <h1
              id="site-title"
              className="text-h1 mb-2"
              style={{ color: "#f5f4ef" }}
            >
              {site.title}
            </h1>
            <p
              className="text-body-lg mb-6"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {site.subtitle}
            </p>

            {/* Metadata pills */}
            <div className="flex flex-wrap items-center gap-3">
              {site.coordinates && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-caption"
                  style={{
                    background: "rgba(0,0,0,0.25)",
                    backdropFilter: "blur(4px)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <Compass size={12} strokeWidth={1.75} aria-hidden="true" />
                  {site.coordinates.lat.toFixed(4)}°N,{" "}
                  {site.coordinates.lng.toFixed(4)}°E
                </div>
              )}
              {site.readTime && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-caption"
                  style={{
                    background: "rgba(0,0,0,0.25)",
                    backdropFilter: "blur(4px)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
                  {site.readTime} phút đọc
                </div>
              )}
              {site.panoramaSceneId && (
                <Link
                  href={`/kham-pha?diem=${site.panoramaSceneId}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-caption transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dca354]"
                  style={{
                    background: "rgba(179,115,34,0.3)",
                    backdropFilter: "blur(4px)",
                    color: "#dca354",
                    border: "1px solid rgba(179,115,34,0.4)",
                  }}
                >
                  <Camera size={12} strokeWidth={1.75} aria-hidden="true" />
                  Xem 360°
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Article body */}
        <section
          aria-label="Nội dung chi tiết"
          className="py-12 md:py-16"
          style={{ background: "var(--bg-canvas)" }}
        >
          <div className="container-editorial">
            <div className="max-w-2xl">
              {/* Data disclaimer */}
              {site.status === "demo" && (
                <div
                  className="flex items-start gap-3 p-4 rounded mb-8"
                  style={{
                    background: "color-mix(in srgb, var(--status-pending) 8%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--status-pending) 25%, transparent)",
                  }}
                  role="note"
                  aria-label="Cảnh báo dữ liệu thử nghiệm"
                >
                  <AlertTriangle
                    size={15}
                    strokeWidth={1.75}
                    style={{
                      color: "var(--status-pending)",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: "var(--status-pending)" }}>
                      [DỮ LIỆU THỬ NGHIỆM / DEMO ASSET]
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Thông tin về địa danh này được tổng hợp từ tài liệu công
                      khai chưa qua xác minh bởi cơ quan địa phương có thẩm
                      quyền. Không sử dụng cho mục đích pháp lý hoặc học thuật.
                    </p>
                  </div>
                </div>
              )}

              {/* Main description */}
              <h2
                className="text-h2 mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Giới thiệu
              </h2>
              <p
                className="text-body-lg leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {site.description}
              </p>

              {/* Historical context */}
              {site.historicalContext && (
                <>
                  <h2
                    className="text-h2 mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Bối Cảnh Lịch Sử
                  </h2>
                  <p
                    className="text-body leading-relaxed mb-8"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {site.historicalContext}
                  </p>
                </>
              )}

              {/* Visiting notes */}
              {site.visitingNotes && (
                <div
                  className="p-5 rounded"
                  style={{
                    background: "var(--bg-surface-elevated)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <h3
                    className="text-h3 mb-3 flex items-center gap-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <MapPin
                      size={15}
                      strokeWidth={1.75}
                      style={{ color: "var(--accent-heritage)" }}
                      aria-hidden="true"
                    />
                    Ghi chú tham quan
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {site.visitingNotes}
                  </p>
                </div>
              )}

              {/* 360 CTA */}
              {site.panoramaSceneId && (
                <div className="mt-8">
                  <Link
                    href={`/kham-pha?diem=${site.panoramaSceneId}`}
                    className="btn-heritage"
                  >
                    <Camera size={16} strokeWidth={1.75} aria-hidden="true" />
                    Trải nghiệm 360° tại đây
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
