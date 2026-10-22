"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Web Audio procedural stream soundscape (mountain breeze + gentle water stream)
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Buffer for pink noise (gentle forest river / breeze)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      // Loop White Noise Source
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // River & Breeze Filter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      // Gentle LFO to simulate mountain breeze swells
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // 0.15 Hz swell
      lfoGain.gain.setValueAtTime(150, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
    } catch {
      // Audio context may not be supported or allowed before user gesture
    }
  };

  const toggleSound = () => {
    setHasInteracted(true);
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (!audioCtxRef.current || !gainNodeRef.current) return;

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
      setTimeout(() => setIsPlaying(false), 500);
    } else {
      setIsPlaying(true);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.35, audioCtxRef.current.currentTime + 0.8);
    }
  };

  useEffect(() => {
    const timer = intervalRef.current;
    return () => {
      if (timer) clearInterval(timer);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dca354] active:scale-95 ${
        isPlaying
          ? "bg-[#1c382b] text-[#dca354] border border-[#dca354]/50 shadow-md shadow-[#1c382b]/30"
          : "bg-black/30 hover:bg-black/50 text-white/90 border border-white/20 backdrop-blur-md"
      }`}
      aria-label={isPlaying ? "Tắt âm thanh thiên nhiên Nghĩa Tá" : "Bật âm thanh thiên nhiên Nghĩa Tá (suối ngàn & gió núi)"}
      title={isPlaying ? "Tắt âm thanh thiên nhiên" : "Bật âm thanh thiên nhiên Nghĩa Tá (suối ngàn & gió núi)"}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3.5">
            <span className="w-0.5 bg-[#dca354] rounded-full soundwave-bar-1" />
            <span className="w-0.5 bg-[#dca354] rounded-full soundwave-bar-2" />
            <span className="w-0.5 bg-[#dca354] rounded-full soundwave-bar-3" />
            <span className="w-0.5 bg-[#dca354] rounded-full soundwave-bar-4" />
          </div>
          <span className="font-semibold tracking-wide">Suối ngàn</span>
          <Volume2 size={13} className="text-[#dca354]" />
        </>
      ) : (
        <>
          <VolumeX size={13} className="text-white/70 group-hover:text-white" />
          <span className="hidden sm:inline">Âm thanh đại ngàn</span>
          {!hasInteracted && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dca354] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dca354]" />
            </span>
          )}
        </>
      )}
    </button>
  );
}
