"use client";

import React, { useState } from "react";
import { Map, Minimize2, Maximize2, Compass } from "lucide-react";
import type { PanoramaScene } from "@/types/heritage";

interface Props {
  scenes: PanoramaScene[];
  activeSceneId: string;
  yaw: number;
  onSelectScene: (sceneId: string) => void;
  className?: string;
}

export default function PanoramaMinimap({
  scenes,
  activeSceneId,
  yaw,
  onSelectScene,
  className = "",
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const activeScene = scenes.find((s) => s.id === activeSceneId) || scenes[0];
  const activeCoords = activeScene?.mapCoords || { x: 50, y: 50 };

  return (
    <div
      className={`pointer-events-auto rounded-xl border border-white/20 bg-[#0e1713]/90 backdrop-blur-xl shadow-2xl transition-all duration-300 overflow-hidden text-white ${
        isCollapsed ? "w-11 h-11" : "w-64 sm:w-72"
      } ${className}`}
    >
      {/* Minimap Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <Map size={14} className="text-[#dca354] flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-xs font-semibold tracking-wide truncate text-[#f5f4ef]">
              Bản Đồ Điểm Đến Nghĩa Tá
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white/60 hover:text-white p-1 rounded-md transition-colors flex-shrink-0"
          title={isCollapsed ? "Mở rộng bản đồ" : "Thu nhỏ bản đồ"}
          aria-label={isCollapsed ? "Mở rộng bản đồ" : "Thu nhỏ bản đồ"}
        >
          {isCollapsed ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
        </button>
      </div>

      {/* Minimap Canvas Content */}
      {!isCollapsed && (
        <div className="p-3">
          <div className="relative w-full h-44 rounded-lg overflow-hidden bg-[#16231d] border border-white/10 shadow-inner">
            {/* Stylized Topographic Contour Lines & River Background */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35"
              viewBox="0 0 200 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Mountain ridges */}
              <path
                d="M10 40 Q 60 10 110 50 T 190 30"
                stroke="#dca354"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <path
                d="M0 80 Q 70 60 140 90 T 200 70"
                stroke="#256a42"
                strokeWidth="1.2"
              />
              <path
                d="M20 120 Q 90 100 160 130 T 200 110"
                stroke="#256a42"
                strokeWidth="0.8"
              />
              {/* Winding forest river */}
              <path
                d="M50 0 C 70 40, 40 80, 100 110 C 130 125, 150 140, 170 150"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="opacity-70"
              />
            </svg>

            {/* Radar Field-Of-View Cone radiating from active pin */}
            <div
              className="absolute pointer-events-none transition-transform duration-75"
              style={{
                left: `${activeCoords.x}%`,
                top: `${activeCoords.y}%`,
                transform: `translate(-50%, -50%) rotate(${yaw}deg)`,
                transformOrigin: "center center",
              }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible">
                <defs>
                  <radialGradient id="fovConeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#dca354" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#dca354" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#dca354" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* 65-degree FOV wedge pointing upward */}
                <path
                  d="M 60 60 L 25 5 A 65 65 0 0 1 95 5 Z"
                  fill="url(#fovConeGrad)"
                  stroke="#dca354"
                  strokeWidth="0.75"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>

            {/* Landmark Pins */}
            {scenes.map((scene) => {
              const coords = scene.mapCoords || { x: 50, y: 50 };
              const isActive = scene.id === activeSceneId;

              return (
                <button
                  key={scene.id}
                  onClick={() => onSelectScene(scene.id)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none transition-transform hover:scale-125"
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                  title={`${scene.title} — Nhấp để chuyển góc nhìn`}
                  aria-label={`Chuyển góc nhìn đến ${scene.title}`}
                >
                  {/* Ping effect on active pin */}
                  {isActive && (
                    <span className="absolute -inset-1.5 rounded-full bg-[#dca354] opacity-75 animate-ping pointer-events-none" />
                  )}

                  <div
                    className={`relative w-4 h-4 rounded-full flex items-center justify-center shadow-lg border transition-all ${
                      isActive
                        ? "bg-[#dca354] border-white text-[#0b0f0d] scale-110"
                        : "bg-[#1c382b] border-[#dca354]/60 text-[#dca354] hover:bg-[#256a42]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Tooltip on pin hover */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded bg-black/90 border border-white/20 text-[10px] whitespace-nowrap text-[#f5f4ef] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-20">
                    {scene.title}
                  </span>
                </button>
              );
            })}

            {/* Compass badge in minimap corner */}
            <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] text-[#dca354] font-mono pointer-events-none">
              <Compass size={10} style={{ transform: `rotate(${-yaw}deg)` }} />
              <span>{Math.round((yaw + 360) % 360)}°</span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] text-[#a9a69b]">
            <span className="truncate">Điểm đang xem:</span>
            <span className="font-semibold text-[#dca354] truncate max-w-[150px]">
              {activeScene.title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
