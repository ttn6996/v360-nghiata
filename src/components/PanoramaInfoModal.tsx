"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, BookOpen, Image as ImageIcon, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import type { PanoramaScene } from "@/types/heritage";

interface Props {
  scene: PanoramaScene;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "info" | "gallery" | "guide";
}

export default function PanoramaInfoModal({
  scene,
  isOpen,
  onClose,
  defaultTab = "info",
}: Props) {
  const [activeTab, setActiveTab] = useState<"info" | "gallery" | "guide">(defaultTab);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-scene-title"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#0e1713] border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1c382b] text-[#dca354] border border-[#dca354]/40 flex-shrink-0">
              {scene.category || "Di Tích Lịch Sử"}
            </span>
            <h3 id="modal-scene-title" className="font-display font-bold text-lg sm:text-xl text-[#fbf9f5] truncate">
              {scene.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
            aria-label="Đóng cửa sổ thông tin"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border-b border-white/10 bg-black/20 text-xs">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "info"
                ? "bg-[#dca354] text-[#0b0f0d] shadow-md"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <BookOpen size={14} />
            <span>Lịch Sử & Ý Nghĩa</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "gallery"
                ? "bg-[#dca354] text-[#0b0f0d] shadow-md"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <ImageIcon size={14} />
            <span>Thư Viện Ảnh ({scene.gallery?.length || 1})</span>
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "guide"
                ? "bg-[#dca354] text-[#0b0f0d] shadow-md"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <Clock size={14} />
            <span>Chỉ Dẫn Tham Quan</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm leading-relaxed text-[#f5f4ef]/90">
          {activeTab === "info" && (
            <div className="space-y-4">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#dca354]">
                <ShieldCheck size={16} className="flex-shrink-0 mt-0.5" />
                <span>
                  Thông tin di tích lịch sử và danh lam thắng cảnh được thẩm định bởi Hội đồng Di sản Văn hóa Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên.
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#dca354] mb-1.5">
                  Tổng Quan Di Tích
                </h4>
                <p className="font-body text-white/90">
                  {scene.historicalDetails?.overview || scene.subtitle}
                </p>
              </div>

              {scene.historicalDetails?.significance && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#dca354] mb-1.5">
                    Giá Trị Lịch Sử & Văn Hóa
                  </h4>
                  <p className="font-body text-white/90">
                    {scene.historicalDetails.significance}
                  </p>
                </div>
              )}

              {scene.audioNarration && (
                <div className="p-3.5 rounded-xl bg-[#1c382b]/80 border border-[#dca354]/30">
                  <h4 className="text-xs font-bold text-[#dca354] mb-1">
                    Trích Đoạn Thuyết Minh
                  </h4>
                  <p className="text-xs italic text-white/85 leading-relaxed">
                    &ldquo;{scene.audioNarration.script}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-3">
              <p className="text-xs text-[#a9a69b]">
                Nhấp vào ảnh để phóng to toàn màn hình.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(scene.gallery || [scene.equirectangularImageUrl]).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxImg(img)}
                    className="group relative h-28 sm:h-36 rounded-xl overflow-hidden border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#dca354]"
                  >
                    <Image
                      src={img}
                      alt={`${scene.title} - ảnh ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "guide" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#a9a69b]">
                <MapPin size={14} className="text-[#dca354]" />
                <span>{scene.location}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#dca354] mb-1.5">
                  Lưu Ý Khi Tham Quan & Thực Hiện Nghi Lễ
                </h4>
                <p className="font-body text-white/90">
                  {scene.historicalDetails?.visitingGuide ||
                    "Du khách vui lòng tuân thủ quy định bảo vệ di sản văn hóa, giữ gìn vệ sinh chung và trân trọng tập quán bản địa của đồng bào vùng cao Định Hóa."}
                </p>
              </div>

              {scene.linkedSiteSlug && (
                <div className="pt-2">
                  <Link
                    href={`/di-tich/${scene.linkedSiteSlug}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c382b] hover:bg-[#256a42] text-xs font-semibold text-white border border-[#dca354]/40 transition-all hover:scale-105"
                  >
                    <span>Xem Cẩm Nang Du Lịch Chi Tiết</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lightbox Overlay for Gallery */}
        {lightboxImg && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={() => setLightboxImg(null)}
          >
            <div className="relative max-w-4xl max-h-[85vh] w-full h-[70vh]">
              <Image
                src={lightboxImg}
                alt="Phóng to ảnh di tích"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
