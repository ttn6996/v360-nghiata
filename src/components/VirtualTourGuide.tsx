"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Props {
  title: string;
  speaker?: string;
  duration?: string;
  script: string;
  audioUrl?: string;
  autoPlay?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function VirtualTourGuide({
  title,
  speaker = "Thuyết minh viên ảo AI",
  duration = "0:45",
  script,
  audioUrl,
  autoPlay = true,
  onClose,
  className = "",
}: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [videoSupported, setVideoSupported] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize video playback with speech state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {
        // Autoplay policy fallback: video remains muted and continues
        video.muted = true;
        video.play().catch(() => setVideoSupported(false));
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // Stop narration speech
  const stopNarration = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Play narration speech
  const startNarration = useCallback(() => {
    // 1. If real audio file is provided
    if (audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setProgress(100);
        };
        audioRef.current.ontimeupdate = () => {
          if (audioRef.current && audioRef.current.duration) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        };
      }
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      return;
    }

    // 2. Fallback to Web Speech API
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "vi-VN";
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const vnVoice = voices.find((v) => v.lang.includes("vi") || v.lang.includes("VN"));
    if (vnVoice) {
      utterance.voice = vnVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      const estDurationMs = Math.max(15000, script.length * 75);
      const startTime = Date.now();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentP = Math.min(100, (elapsed / estDurationMs) * 100);
        setProgress(currentP);
        if (currentP >= 100 && progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }, 300);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [script, audioUrl]);

  // Handle autoPlay on mount or scene change
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (autoPlay) {
      timer = setTimeout(() => {
        startNarration();
      }, 150);
    }

    return () => {
      if (timer) clearTimeout(timer);
      stopNarration();
    };
  }, [script, autoPlay, startNarration, stopNarration]);

  const togglePlay = () => {
    if (isPlaying) {
      stopNarration();
    } else {
      startNarration();
    }
  };

  const handleReplay = () => {
    stopNarration();
    setProgress(0);
    setTimeout(() => {
      startNarration();
    }, 150);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (!isMuted) {
        window.speechSynthesis.pause();
      } else {
        window.speechSynthesis.resume();
      }
    }
    setIsMuted(!isMuted);
  };

  // Minimized Floating Pill Mode
  if (isMinimized) {
    return (
      <aside
        aria-label="Thuyết minh viên ảo đang thu nhỏ"
        className={`pointer-events-auto flex items-center gap-2.5 p-2 pr-3.5 rounded-full bg-[#0c1410]/95 border border-[#dca354]/50 shadow-2xl backdrop-blur-xl text-white transition-all animate-in zoom-in-90 ${className}`}
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="relative flex items-center gap-2 text-left group focus-visible:outline-none"
          title="Nhấn để mở rộng thuyết minh viên ảo"
        >
          {/* Avatar Thumbnail */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#dca354] shadow-md flex-shrink-0 bg-[#1c382b]">
            <Image
              src="/images/mc/guide-idle.png"
              alt="Thuyết minh viên ảo"
              fill
              className="object-cover object-top"
              sizes="40px"
            />
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-[#dca354] animate-ping opacity-60" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#f5f4ef] group-hover:text-[#dca354] transition-colors">
                MC Thuyết Minh Ảo
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-[#dca354] soundwave-bar-1" />
                  <span className="w-0.5 bg-[#dca354] soundwave-bar-2" />
                  <span className="w-0.5 bg-[#dca354] soundwave-bar-3" />
                </div>
              )}
            </div>
            <span className="text-[10px] text-[#a9a69b] block truncate max-w-[130px]">
              {title}
            </span>
          </div>
        </button>

        <div className="w-px h-5 bg-white/15 mx-0.5" />

        <button
          onClick={togglePlay}
          className="w-7 h-7 rounded-full bg-[#dca354] text-[#0b0f0d] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-sm"
          title={isPlaying ? "Tạm dừng" : "Phát thuyết minh"}
          aria-label={isPlaying ? "Tạm dừng" : "Phát"}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
        </button>

        <button
          onClick={() => setIsMinimized(false)}
          className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
          title="Mở rộng"
          aria-label="Mở rộng"
        >
          <Maximize2 size={11} />
        </button>

        {onClose && (
          <button
            onClick={() => {
              stopNarration();
              onClose();
            }}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-red-500/30 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            title="Đóng thuyết minh"
            aria-label="Đóng"
          >
            <X size={12} />
          </button>
        )}
      </aside>
    );
  }

  // Expanded Presenter Mode (Standing MC with synced looping video)
  return (
    <aside
      aria-label="Thuyết minh viên ảo AI"
      className={`pointer-events-auto flex flex-col md:flex-row items-end gap-3 transition-all select-none ${className}`}
    >
      {/* Speech Caption Bubble & Controls (Side-docked) */}
      <div className="w-72 sm:w-80 rounded-2xl bg-[#0b120e]/95 border border-[#dca354]/50 shadow-2xl backdrop-blur-xl p-3.5 text-white transition-all order-2 md:order-1 animate-in fade-in slide-in-from-bottom-2">
        {/* Caption Card Header */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-[#1c382b] border border-[#dca354]/40 flex items-center justify-center text-[#dca354] flex-shrink-0">
              <Sparkles size={13} />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[#f5f4ef] truncate leading-tight">
                {title}
              </h4>
              <span className="text-[10px] text-[#dca354] block truncate">
                {speaker} · {duration}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setIsMinimized(true)}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              title="Thu nhỏ thuyết minh viên"
              aria-label="Thu nhỏ"
            >
              <Minimize2 size={12} />
            </button>

            {onClose && (
              <button
                onClick={() => {
                  stopNarration();
                  onClose();
                }}
                className="w-6 h-6 rounded-lg bg-white/5 hover:bg-red-500/40 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                title="Đóng thuyết minh"
                aria-label="Đóng"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Live Subtitle Script Box */}
        {showCaptions && (
          <div className="relative mb-3 p-2.5 rounded-xl bg-black/40 border border-white/8 text-xs text-[#d8d5cb] leading-relaxed max-h-28 overflow-y-auto font-sans scrollbar-thin">
            <p className="line-clamp-4 italic">
              &ldquo;{script}&rdquo;
            </p>
          </div>
        )}

        {/* Progress Timeline */}
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-2.5">
          <div
            className="bg-gradient-to-r from-[#dca354] via-[#edb86e] to-[#dca354] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Media Controls Bar */}
        <div className="flex items-center justify-between gap-1.5 pt-0.5">
          <div className="flex items-center gap-1">
            <button
              onClick={toggleMute}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 transition-colors"
              title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
              aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted ? <VolumeX size={13} className="text-red-400" /> : <Volume2 size={13} />}
            </button>

            <button
              onClick={handleReplay}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-[#a9a69b] hover:text-white transition-colors"
              title="Phát lại từ đầu"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Phát lại</span>
            </button>

            <button
              onClick={() => setShowCaptions(!showCaptions)}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-[10px] font-bold text-white/70 hover:text-white flex items-center justify-center transition-colors"
              title={showCaptions ? "Ẩn phụ đề" : "Hiện phụ đề"}
            >
              {showCaptions ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>

          <button
            onClick={togglePlay}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#dca354] via-[#edb86e] to-[#dca354] text-[#0b0f0d] text-xs font-bold transition-all hover:brightness-110 active:scale-95 flex items-center gap-1.5 shadow-md shadow-[#dca354]/25"
            aria-label={isPlaying ? "Tạm dừng thuyết minh" : "Bắt đầu nghe thuyết minh"}
          >
            {isPlaying ? (
              <>
                <Pause size={12} />
                <span>Tạm dừng</span>
              </>
            ) : (
              <>
                <Play size={12} />
                <span>Lắng nghe</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Virtual MC Standing Figure with Video Speech Looper */}
      <div className="relative flex flex-col items-center flex-shrink-0 order-1 md:order-2">
        {/* Floating AI Guide Status Badge */}
        <div className="mb-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0c1410]/90 border border-[#dca354]/40 backdrop-blur-md shadow-lg text-[10px] font-bold text-[#dca354] z-10 whitespace-nowrap">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isPlaying ? "bg-emerald-400 animate-ping" : "bg-amber-400"
            }`}
          />
          <span>{isPlaying ? "MC Đang Thuyết Minh" : "MC Sẵn Sàng"}</span>
        </div>

        {/* Video / Animation Container (Height: 280px desktop, 220px mobile) */}
        <div className="relative w-36 h-64 sm:w-44 sm:h-72 md:w-48 md:h-80 drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] overflow-hidden">
          {videoSupported ? (
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="auto"
              poster="/images/mc/guide-idle.png"
              onError={() => setVideoSupported(false)}
              className={`w-full h-full object-contain object-bottom pointer-events-none transition-opacity duration-300 ${
                isPlaying ? "opacity-100" : "opacity-90"
              }`}
            >
              {/* Transparent WebM with alpha for Chrome / Edge */}
              <source src="/videos/virtual-guide.webm" type="video/webm" />
              {/* Universal H264 MP4 fallback */}
              <source src="/videos/virtual-guide.mp4" type="video/mp4" />
            </video>
          ) : (
            /* Animated WebP fallback with transparent alpha */
            <Image
              src={isPlaying ? "/images/mc/guide-speaking.webp" : "/images/mc/guide-idle.png"}
              alt="Thuyết minh viên ảo AI"
              fill
              className="object-contain object-bottom pointer-events-none"
              sizes="(max-width: 768px) 176px, 192px"
              unoptimized
            />
          )}

          {/* Realistic Floor Shadow */}
          <div className="absolute bottom-0 inset-x-2 h-4 bg-radial from-black/80 via-black/40 to-transparent blur-sm pointer-events-none" />
        </div>
      </div>
    </aside>
  );
}
