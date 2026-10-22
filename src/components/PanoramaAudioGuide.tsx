"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface Props {
  title: string;
  speaker?: string;
  duration?: string;
  script: string;
  autoPlay?: boolean;
  className?: string;
}

export default function PanoramaAudioGuide({
  title,
  speaker = "Thuyết minh viên ảo AI",
  duration = "0:45",
  script,
  autoPlay = false,
  className = "",
}: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playSpeech = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "vi-VN";
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const vnVoice = voices.find((v) => v.lang.includes("vi") || v.lang.includes("VN"));
    if (vnVoice) {
      utterance.voice = vnVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      const estDurationMs = 30000;
      const startTime = Date.now();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentP = Math.min(100, (elapsed / estDurationMs) * 100);
        setProgress(currentP);
        if (currentP >= 100 && progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }, 500);
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
  }, [script]);

  // Handle script change / mount
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (autoPlay) {
      timer = setTimeout(() => {
        playSpeech();
      }, 50);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [script, autoPlay, playSpeech]);

  const togglePlay = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      playSpeech();
    }
  };

  const handleReplay = () => {
    stopSpeech();
    setProgress(0);
    setTimeout(() => {
      playSpeech();
    }, 100);
  };

  const toggleMute = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (!isMuted) {
        window.speechSynthesis.pause();
      } else {
        window.speechSynthesis.resume();
      }
    }
    setIsMuted(!isMuted);
  };

  return (
    <aside
      aria-label="Trình phát thuyết minh âm thanh di sản"
      className={`w-72 sm:w-80 rounded-2xl bg-[#0e1713]/90 border border-[#dca354]/40 shadow-2xl backdrop-blur-md p-3.5 text-white pointer-events-auto transition-all ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-[#1c382b] border border-[#dca354]/40 flex items-center justify-center text-[#dca354] flex-shrink-0">
            <Sparkles size={13} />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#f5f4ef] truncate">
              {title}
            </h4>
            <span className="text-[10px] text-[#a9a69b] block truncate">
              {speaker} · {duration}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3 px-1 mr-1">
              <span className="w-0.5 bg-[#dca354] soundwave-bar-1" />
              <span className="w-0.5 bg-[#dca354] soundwave-bar-2" />
              <span className="w-0.5 bg-[#dca354] soundwave-bar-3" />
              <span className="w-0.5 bg-[#dca354] soundwave-bar-4" />
            </div>
          )}

          <button
            onClick={toggleMute}
            className="w-7 h-7 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white/80 transition-colors"
            title={isMuted ? "Bật âm" : "Tắt âm"}
            aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>
      </div>

      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-3">
        <div
          className="bg-gradient-to-r from-[#dca354] to-[#edb86e] h-full transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={handleReplay}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-[#a9a69b] hover:text-white transition-colors"
          title="Nghe lại từ đầu"
        >
          <RotateCcw size={12} />
          <span>Phát lại</span>
        </button>

        <button
          onClick={togglePlay}
          className="px-4 py-1.5 rounded-xl bg-[#dca354] hover:bg-[#edb86e] text-[#0b0f0d] text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-md shadow-[#dca354]/25"
          aria-label={isPlaying ? "Tạm dừng thuyết minh" : "Bắt đầu nghe thuyết minh"}
        >
          {isPlaying ? (
            <>
              <Pause size={13} />
              <span>Tạm dừng</span>
            </>
          ) : (
            <>
              <Play size={13} />
              <span>Lắng nghe</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
