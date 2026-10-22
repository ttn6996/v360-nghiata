import type { Metadata } from "next";
import { Suspense } from "react";
import KhamPhaViewerClient from "@/components/KhamPhaViewerClient";

export const metadata: Metadata = {
  title: "Tour Khám Phá 360° Không Gian Di Sản Nghĩa Tá · Định Hóa",
  description:
    "Trải nghiệm thực tế ảo toàn cảnh 360° di tích lịch sử ATK Định Hóa, thắng cảnh Thác Nàng Tiên và không gian bản làng Tày xã Nghĩa Tá, Định Hóa, Thái Nguyên.",
};

export default function KhamPhaPage() {
  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#070b09] select-none">
      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#070b09] text-white">
            <div className="w-12 h-12 rounded-full border-2 border-[#dca354] border-t-transparent animate-spin mb-3" />
            <p className="font-display text-sm font-bold text-[#f5f4ef]">
              Đang tải tour ảo 360° V360 Nghĩa Tá...
            </p>
          </div>
        }
      >
        <KhamPhaViewerClient />
      </Suspense>
    </main>
  );
}
