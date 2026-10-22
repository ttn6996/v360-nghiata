import type { Metadata } from "next";
import Link from "next/link";
import { Camera, AlertTriangle, Expand, ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { panoramaScenes } from "@/data/mockData";

export const metadata: Metadata = {
  title: "Không Gian Khám Phá 360°",
  description:
    "Trải nghiệm tour ảo 360° khám phá cảnh quan và di tích lịch sử Nghĩa Tá, Chợ Đồn, Bắc Kạn.",
};

export default function KhamPhaPage() {
  const firstScene = panoramaScenes[0];

  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        {/* Hero */}
        <section
          aria-labelledby="khampha-heading"
          className="py-12 md:py-16"
          style={{ background: "var(--bg-canvas)" }}
        >
          <div className="container-editorial">
            <Link
              href="/"
              className="link-muted inline-flex items-center gap-1.5 text-sm mb-6 focus-visible:outline-none focus-visible:underline"
            >
              <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              Trang chủ
            </Link>

            <p
              className="text-caption uppercase tracking-widest mb-3"
              style={{ color: "var(--accent-heritage)" }}
            >
              Tour Ảo Tương Tác
            </p>
            <h1
              id="khampha-heading"
              className="text-h1 mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Không Gian Khám Phá 360°
            </h1>
            <p
              className="text-body max-w-2xl mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Trải nghiệm toàn cảnh không gian rừng núi, bản làng và di tích lịch
              sử Nghĩa Tá qua ống kính 360° tương tác.
            </p>
          </div>
        </section>

        {/* 360 Viewer Placeholder */}
        <section
          aria-label="Không gian xem 360°"
          style={{
            background: "var(--accent-river)",
            minHeight: "60vh",
            position: "relative",
          }}
        >
          {/* Demo notice banner */}
          <div
            className="absolute top-0 inset-x-0 z-10 py-2 px-4 flex items-center justify-center gap-2"
            style={{
              background: "rgba(168,98,20,0.9)",
              backdropFilter: "blur(4px)",
            }}
            role="alert"
          >
            <AlertTriangle size={14} strokeWidth={1.75} style={{ color: "#fff" }} aria-hidden="true" />
            <p className="text-xs font-medium" style={{ color: "#fff" }}>
              [DEMO / PLACEHOLDER ASSET] — Trình xem 360° thực tế đang được phát triển. Ảnh toàn cảnh dưới đây là tài sản thử nghiệm.
            </p>
          </div>

          {/* Placeholder viewer canvas */}
          <div
            className="flex items-center justify-center"
            style={{ minHeight: "60vh", paddingTop: "48px" }}
          >
            <div className="text-center max-w-md px-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                aria-hidden="true"
              >
                <Camera size={32} strokeWidth={1.25} style={{ color: "#dca354" }} />
              </div>
              <h2 className="text-h2 mb-3" style={{ color: "#f5f4ef" }}>
                {firstScene.title}
              </h2>
              <p className="text-sm mb-1" style={{ color: "#a9a69b" }}>
                {firstScene.subtitle}
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#737066" }}>
                Trình xem 360° (Pannellum / Marzipano) sẽ được tích hợp tại đây
                sau khi ảnh toàn cảnh thực tế từ Nghĩa Tá được chụp và xử lý.
                Đang đánh giá thư viện dựa trên kích thước bundle, hiệu suất
                cảm ứng và khả năng tương thích WebGL.
              </p>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm"
                style={{
                  background: "rgba(220,163,84,0.15)",
                  border: "1px solid rgba(220,163,84,0.3)",
                  color: "#dca354",
                }}
              >
                <Expand size={14} strokeWidth={1.75} aria-hidden="true" />
                360° Viewer — Giai đoạn Phase 5
              </div>
            </div>
          </div>
        </section>

        {/* Scene List */}
        <section
          aria-labelledby="scenes-heading"
          className="py-12 md:py-16"
          style={{ background: "var(--bg-surface-elevated)" }}
        >
          <div className="container-editorial">
            <h2
              id="scenes-heading"
              className="text-h2 mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Danh sách Cảnh quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {panoramaScenes.map((scene) => (
                <div
                  key={scene.id}
                  className="flex items-center gap-4 p-4 rounded"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--accent-river)" }}
                    aria-hidden="true"
                  >
                    <Camera size={18} strokeWidth={1.5} style={{ color: "#dca354" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-h3 truncate" style={{ color: "var(--text-primary)" }}>
                      {scene.title}
                    </h3>
                    <span className="badge-demo mt-1">
                      <AlertTriangle size={9} aria-hidden="true" />
                      Tài sản thử nghiệm
                    </span>
                  </div>
                  <span
                    className="text-caption flex-shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {scene.hotspots.length} điểm nóng
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
