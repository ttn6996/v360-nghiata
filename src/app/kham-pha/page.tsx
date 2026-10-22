import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, Eye, MapPin, Sparkles, Info } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InteractivePanoramaViewer from "@/components/InteractivePanoramaViewer";
import { panoramaScenes, heritageSites } from "@/data/mockData";

export const metadata: Metadata = {
  title: "Tour Khám Phá 360° Không Gian Nghĩa Tá · Định Hóa",
  description:
    "Trải nghiệm tour ảo 360° tương tác toàn cảnh di tích lịch sử ATK Định Hóa, Thác Nàng Tiên và bản làng truyền thống xã Nghĩa Tá, Định Hóa, Thái Nguyên.",
};

export default function KhamPhaPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#0b0f0d] text-white pt-20">
        {/* Top Breadcrumb & Title */}
        <section className="py-8 md:py-12 border-b border-white/10 bg-[#121a15]">
          <div className="container-editorial">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm text-white/60 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              <span>Quay lại Trang Chủ</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c382b] border border-[#dca354]/40 text-xs font-semibold uppercase tracking-wider text-[#dca354] mb-3">
                  <Compass size={13} />
                  <span>Không Gian Khám Phá Toàn Cảnh</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fbf9f5] tracking-tight">
                  Tour Ảo 360° Xã Nghĩa Tá
                </h1>
                <p className="font-body text-sm md:text-base text-[#a9a69b] max-w-2xl mt-2">
                  Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên — Khám phá chiều sâu di sản và cảnh quan thiên nhiên qua góc nhìn thực tế ảo trực quan.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#dca354] bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
                <Eye size={16} />
                <span>Kéo thả để quan sát mọi hướng</span>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width 360 Exploration Canvas */}
        <section className="py-6 md:py-10">
          <div className="container-editorial">
            <InteractivePanoramaViewer
              scenes={panoramaScenes}
              height="75vh"
              showSceneThumbnails={true}
              className="border border-white/15"
            />
          </div>
        </section>

        {/* Destination Guide Cards below viewer */}
        <section className="py-12 md:py-16 bg-[#101713] border-t border-white/10">
          <div className="container-editorial">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#dca354] block mb-1">
                Các Điểm Đến Trong Tour
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                Thông Tin Chi Tiết Điểm Khám Phá
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {panoramaScenes.map((scene) => {
                const linkedSite = heritageSites.find(
                  (s) => s.slug === scene.linkedSiteSlug
                );

                return (
                  <div
                    key={scene.id}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#dca354]/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#dca354] mb-2 font-mono">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {scene.location.split(",")[0]}
                        </span>
                        <span>{scene.hotspots.length} Điểm Chạm</span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        {scene.title}
                      </h3>
                      <p className="text-xs text-[#a9a69b] leading-relaxed mb-4">
                        {scene.subtitle}
                      </p>

                      <div className="space-y-1.5 mb-6 text-xs text-white/80">
                        {scene.hotspots.map((hs) => (
                          <div key={hs.id} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#dca354]" />
                            <span>{hs.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {linkedSite && (
                      <Link
                        href={`/di-tich/${linkedSite.slug}`}
                        className="w-full py-2.5 rounded-lg bg-[#1c382b] hover:bg-[#256a42] text-xs font-semibold text-center text-white transition-colors"
                      >
                        Đọc Cẩm Nang Di Tích ➔
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
