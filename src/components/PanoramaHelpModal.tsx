"use client";

import React from "react";
import {
  X,
  Compass,
  MousePointer,
  ZoomIn,
  Navigation,
  Mic,
  Map,
  Glasses,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language?: "vi" | "en";
}

export default function PanoramaHelpModal({
  isOpen,
  onClose,
  language = "vi",
}: Props) {
  if (!isOpen) return null;

  const isEn = language === "en";

  const instructions = [
    {
      icon: <MousePointer size={20} className="text-[#dca354]" />,
      title: isEn ? "Drag to Rotate 360°" : "Xoay & Quan Sát 360°",
      desc: isEn
        ? "Click and drag with mouse or swipe touch screen to look around freely in any direction."
        : "Nhấp giữ chuột trái và kéo hoặc vuốt ngón tay trên màn hình cảm ứng để quan sát không gian đa chiều.",
    },
    {
      icon: <ZoomIn size={20} className="text-[#dca354]" />,
      title: isEn ? "Zoom In & Out" : "Thu Phóng Góc Nhìn",
      desc: isEn
        ? "Scroll mouse wheel or use +/- buttons on the right toolbar to zoom in on architecture or widen view."
        : "Sử dụng con lăn chuột hoặc nút cộng/trừ bên phải để phóng to chi tiết cảnh quan hoặc thu rộng tầm mắt.",
    },
    {
      icon: <Navigation size={20} className="text-[#dca354]" />,
      title: isEn ? "Interactive Hotspots" : "Điểm Chạm Tương Tác (Hotspots)",
      desc: isEn
        ? "Click pulsing radar pins with distance badges (e.g. 499m) to travel to adjacent scenes or view archives."
        : "Nhấp vào các vòng tròn phát sáng kèm chỉ số cự ly (vd: 499m) để chuyển góc nhìn hoặc xem tư liệu di tích.",
    },
    {
      icon: <Mic size={20} className="text-[#dca354]" />,
      title: isEn ? "Virtual Audio Guide" : "Thuyết Minh Giọng Đọc Ảo",
      desc: isEn
        ? "Click the microphone icon in the top bar to listen to automated spoken heritage narrations."
        : "Bật nút 'Thuyết Minh' trên thanh điều khiển để nghe giọng đọc truyền cảm tự động giới thiệu lịch sử.",
    },
    {
      icon: <Map size={20} className="text-[#dca354]" />,
      title: isEn ? "Digital Radar Minimap" : "Bản Đồ Radar Định Vị",
      desc: isEn
        ? "Observe the 65° illuminated radar cone in the bottom-left map tracking your real-time heading."
        : "Theo dõi chùm quét sáng 65° trên bản đồ thu nhỏ ở góc trái để định vị hướng nhìn thực địa.",
    },
    {
      icon: <Glasses size={20} className="text-[#dca354]" />,
      title: isEn ? "VR Headset Mode" : "Chế Độ Thực Tế Ảo (VR)",
      desc: isEn
        ? "Toggle the VR glasses icon for stereoscopic split-screen view compatible with mobile VR headsets."
        : "Nhấp biểu tượng kính VR để bật chế độ thực tế ảo chia đôi màn hình cho kính VR Cardboard.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#0e1713] border border-[#dca354]/40 shadow-2xl p-6 md:p-8 text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1c382b] border border-[#dca354]/40 flex items-center justify-center text-[#dca354]">
              <Compass size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#dca354]">
                {isEn ? "Usage Guide" : "Cẩm Nang Thao Tác"}
              </span>
              <h3 className="font-display text-lg md:text-xl font-bold text-[#fbf9f5]">
                {isEn
                  ? "How to Explore 360° Virtual Tour"
                  : "Hướng Dẫn Trải Nghiệm Tour Ảo 360°"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Instructions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {instructions.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#dca354]/30 transition-all flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#f5f4ef] mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#a9a69b] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#dca354] hover:bg-[#edb86e] text-[#0b0f0d] text-xs font-bold transition-all active:scale-95 shadow-lg shadow-[#dca354]/20"
          >
            {isEn ? "Got It · Start Tour" : "Đã Hiểu · Bắt Đầu Khám Phá"}
          </button>
        </div>
      </div>
    </div>
  );
}
