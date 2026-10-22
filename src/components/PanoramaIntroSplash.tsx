"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Globe } from "lucide-react";

interface Props {
  isOpen: boolean;
  onStart: (sceneId?: string) => void;
  language?: "vi" | "en";
}

interface DestinationCard {
  id: string;
  title: string;
  shortTitle: string;
  image: string;
  rotation: number;
  translateY: number;
}

const DESTINATIONS: DestinationCard[] = [
  {
    id: "scene-atk-forest",
    title: "Khu Di Tích ATK Định Hóa",
    shortTitle: "Di Tích ATK Định Hóa",
    image: "/images/destinations/atk-dinh-hoa.jpg",
    rotation: -6,
    translateY: 10,
  },
  {
    id: "scene-thac-tien",
    title: "Thắng Cảnh Thác Nàng Tiên",
    shortTitle: "Thác Nàng Tiên",
    image: "/images/destinations/thac-nang-tien.jpg",
    rotation: -2,
    translateY: 0,
  },
  {
    id: "scene-ban-lang",
    title: "Bản Làng Nhà Sàn Tày",
    shortTitle: "Bản Làng Nhà Sàn",
    image: "/images/destinations/ban-lang-tay.jpg",
    rotation: 2,
    translateY: 0,
  },
  {
    id: "scene-rung-dai-ngan",
    title: "Rừng Nguyên Sinh Đại Ngàn",
    shortTitle: "Rừng Đại Ngàn",
    image: "/images/destinations/rung-nghia-ta.jpg",
    rotation: 6,
    translateY: 10,
  },
];

export default function PanoramaIntroSplash({
  isOpen,
  onStart,
  language = "vi",
}: Props) {
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<"vi" | "en">(language);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const startXRef = useRef<number>(0);
  const startRotRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Slow continuous auto-rotation of the Little Planet
  useEffect(() => {
    if (!isOpen || isDragging || isExiting) return;

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      setRotation((prev) => (prev + delta * 3.5) % 360);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, isDragging, isExiting]);

  if (!isOpen) return null;

  // Drag to rotate globe handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startRotRef.current = rotation;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startXRef.current;
    setRotation(startRotRef.current + dx * 0.4);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Launch fly-in transition
  const handleLaunch = (sceneId?: string) => {
    setIsExiting(true);
    setTimeout(() => {
      onStart(sceneId);
      setIsExiting(false);
    }, 750);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden flex flex-col justify-between items-center select-none bg-[#3b93d0] transition-opacity duration-700 ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* ======================================================
          BACKGROUND SKY & ROTATING LITTLE PLANET GLOBE
         ====================================================== */}
      {/* Atmospheric Sky Halo Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1b6fb8] via-[#3fa1e5] to-[#6bc4f7] pointer-events-none" />

      {/* Swirling Sky Ring Underlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] rounded-full bg-radial from-transparent via-white/20 to-transparent blur-2xl animate-pulse" />
      </div>

      {/* Rotating Little Planet Globe (Center Screen) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-750 ease-in-out ${
          isExiting ? "scale-[3.2] opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div
          onPointerDown={handlePointerDown}
          className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[580px] md:h-[580px] lg:w-[680px] lg:h-[680px] rounded-full overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.7),0_25px_65px_rgba(0,25,50,0.5)] cursor-grab active:cursor-grabbing border-4 border-white/50"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.05s linear",
          }}
          title="Kéo chuột để xoay quả địa cầu"
        >
          <Image
            src="/images/panoramas/little-planet-nghia-ta.jpg"
            alt="Quả địa cầu toàn cảnh không gian Nghĩa Tá"
            fill
            priority
            quality={95}
            className="object-cover scale-105 pointer-events-none select-none"
            sizes="(max-width: 768px) 460px, 680px"
          />

          {/* Spherical 3D Shading Overlay */}
          <div className="absolute inset-0 rounded-full bg-radial from-transparent via-transparent to-black/25 pointer-events-none" />
        </div>
      </div>

      {/* ======================================================
          TOP: CALLIGRAPHY BRUSH STROKE BANNER
         ====================================================== */}
      <header className="relative z-20 w-full max-w-2xl px-4 pt-4 sm:pt-7 flex justify-center animate-in fade-in slide-in-from-top-6 duration-700">
        <div className="relative py-3 px-8 sm:px-14 flex flex-col items-center justify-center text-center">
          {/* Authentic Watercolor / Brush Stroke Paper Silhouette */}
          <svg
            className="absolute inset-0 w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,20,40,0.3)] pointer-events-none"
            viewBox="0 0 700 140"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main white ink body */}
            <path
              d="M30,70 C50,35 110,15 180,12 C280,10 420,10 520,12 C590,15 650,35 670,70 C655,105 595,125 520,128 C420,130 280,130 180,128 C105,125 45,105 30,70 Z"
              fill="white"
            />
            {/* Dry brush bristle marks */}
            <path
              d="M15,70 Q35,48 65,56 T120,50 T220,46 T350,45 T480,46 T580,50 T635,56 T685,70 Q665,92 635,84 T580,90 T480,94 T350,95 T220,94 T120,90 T65,84 Z"
              fill="white"
              opacity="0.9"
            />
            <circle cx="20" cy="65" r="3.5" fill="white" opacity="0.85" />
            <circle cx="26" cy="74" r="2" fill="white" opacity="0.6" />
            <circle cx="678" cy="64" r="3" fill="white" opacity="0.85" />
            <circle cx="672" cy="73" r="2.2" fill="white" opacity="0.6" />
          </svg>

          {/* Calligraphic Titles */}
          <div className="relative z-10 px-4">
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-[#1a1f1b] drop-shadow-sm leading-tight">
              CỤM DI TÍCH LỊCH SỬ & THẮNG CẢNH
            </h1>
            <p className="font-sans font-bold text-xs sm:text-sm tracking-[0.2em] uppercase text-[#34463a] mt-1">
              XÃ NGHĨA TÁ · HUYỆN ĐỊNH HÓA
            </p>
          </div>
        </div>
      </header>

      {/* ======================================================
          CENTER: "KHÁM PHÁ NGAY!" BUTTON & LANGUAGE FLAGS
         ====================================================== */}
      <div className="relative z-30 flex flex-col items-center gap-3 my-auto pointer-events-auto">
        {/* Glowing Pill Button (Matching Hong Gai "Khám Phá Ngay!") */}
        <button
          onClick={() => handleLaunch()}
          className="group relative px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#0284c7] to-[#0369a1] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_10px_30px_rgba(2,132,199,0.6)] border-2 border-white/90 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 animate-bounce-subtle cursor-pointer"
          title="Nhấn để bắt đầu khám phá tour 360"
        >
          <span className="absolute -inset-1 rounded-full bg-sky-400 opacity-40 blur-md group-hover:opacity-75 transition-opacity pointer-events-none" />
          <Sparkles size={18} className="text-amber-200 animate-spin-slow relative z-10" />
          <span className="relative z-10 drop-shadow">
            {selectedLang === "en" ? "Explore Now!" : "Khám Phá Ngay!"}
          </span>
        </button>

        {/* Language Selection Round Flags */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/25 backdrop-blur-md shadow-lg">
          {/* Vietnam Flag */}
          <button
            onClick={() => setSelectedLang("vi")}
            className={`w-7 h-7 rounded-full overflow-hidden flex items-center justify-center transition-all ${
              selectedLang === "vi"
                ? "ring-2 ring-amber-300 scale-110 shadow-md"
                : "opacity-60 hover:opacity-100"
            }`}
            title="Tiếng Việt"
            aria-label="Chọn Tiếng Việt"
          >
            <div className="w-full h-full bg-[#da251d] flex items-center justify-center">
              <span className="text-amber-300 text-xs font-bold leading-none">★</span>
            </div>
          </button>

          {/* UK / English Flag */}
          <button
            onClick={() => setSelectedLang("en")}
            className={`w-7 h-7 rounded-full overflow-hidden flex items-center justify-center transition-all ${
              selectedLang === "en"
                ? "ring-2 ring-amber-300 scale-110 shadow-md"
                : "opacity-60 hover:opacity-100"
            }`}
            title="English"
            aria-label="Select English"
          >
            <div className="w-full h-full bg-[#012169] relative flex items-center justify-center text-[10px] text-white font-bold">
              EN
            </div>
          </button>
        </div>
      </div>

      {/* ======================================================
          BOTTOM: CURVED POLAROID DESTINATION PHOTO CARDS
         ====================================================== */}
      <footer className="relative z-30 w-full max-w-5xl px-3 sm:px-6 pb-4 sm:pb-8 flex flex-col items-center">
        {/* Polaroid Cards Arc Container */}
        <div className="w-full flex items-end justify-center gap-2 sm:gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-none">
          {DESTINATIONS.map((dest) => {
            const isHovered = hoveredCard === dest.id;

            return (
              <button
                key={dest.id}
                onClick={() => handleLaunch(dest.id)}
                onMouseEnter={() => setHoveredCard(dest.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white p-1.5 sm:p-2 pb-3 sm:pb-4 rounded-sm shadow-[0_15px_35px_rgba(0,10,30,0.35)] border border-black/10 transition-all duration-300 ease-out cursor-pointer flex-shrink-0"
                style={{
                  transform: isHovered
                    ? "scale(1.12) rotate(0deg) translateY(-14px)"
                    : `rotate(${dest.rotation}deg) translateY(${dest.translateY}px)`,
                  zIndex: isHovered ? 40 : 20,
                }}
                title={`Khám phá trực tiếp: ${dest.title}`}
              >
                {/* Vintage Tape Accent on top */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-4 bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm rotate-2 opacity-80 pointer-events-none" />

                {/* Photo Thumbnail */}
                <div className="relative w-24 h-18 sm:w-32 sm:h-24 md:w-40 md:h-28 overflow-hidden rounded-[2px] bg-neutral-200">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                    sizes="(max-width: 640px) 96px, 160px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Handwritten / Calligraphic Label Underneath */}
                <div className="pt-1.5 sm:pt-2 px-1 text-center">
                  <span className="font-serif italic font-bold text-[11px] sm:text-xs text-neutral-800 tracking-tight block truncate max-w-[96px] sm:max-w-[140px] group-hover:text-sky-700 transition-colors">
                    {dest.shortTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Helper Hint */}
        <div className="mt-2 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-[11px] font-medium text-white/90 shadow">
            <Globe size={12} className="text-sky-300" />
            <span>Kéo xoay quả địa cầu hoặc bấm vào ảnh điểm đến để bay vào khám phá</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
