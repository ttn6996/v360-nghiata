"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Compass,
  Info,
  Image as ImageIcon,
  Map,
  Mic,
  ChevronUp,
  ChevronDown,
  Layers,
  ArrowLeft,
  Eye,
  Landmark,
  TreePine,
  Users,
  Navigation,
  HelpCircle,
  Glasses,
  Volume2,
  VolumeX,
  Share2,
  Check,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { PanoramaScene, PanoramaHotspot } from "@/types/heritage";
import PanoramaMinimap from "@/components/PanoramaMinimap";
import VirtualTourGuide from "@/components/VirtualTourGuide";
import PanoramaInfoModal from "@/components/PanoramaInfoModal";
import PanoramaHelpModal from "@/components/PanoramaHelpModal";
import PanoramaIntroSplash from "@/components/PanoramaIntroSplash";
import { ambientSound } from "@/utils/ambientSound";

interface Props {
  scenes: PanoramaScene[];
  initialSceneId?: string;
  className?: string;
  height?: string;
  showSceneThumbnails?: boolean;
  isStandalonePage?: boolean;
}

export default function InteractivePanoramaViewer({
  scenes,
  initialSceneId,
  className = "",
  height = "600px",
  showSceneThumbnails = true,
  isStandalonePage = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeSceneId, setActiveSceneId] = useState<string>(
    initialSceneId || scenes[0]?.id || ""
  );
  const activeScene = scenes.find((s) => s.id === activeSceneId) || scenes[0];

  const [yaw, setYaw] = useState<number>(activeScene?.initialYaw || 0);
  const [pitch, setPitch] = useState<number>(activeScene?.initialPitch || 0);
  const [fov, setFov] = useState<number>(activeScene?.initialFov || 75);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hotspotPositions, setHotspotPositions] = useState<
    { hotspot: PanoramaHotspot; x: number; y: number; visible: boolean }[]
  >([]);

  // Features modeled directly after Hong Gai 360 (bandosohonggai.gov.vn)
  const [showMinimap, setShowMinimap] = useState<boolean>(true);
  const [showAudioGuide, setShowAudioGuide] = useState<boolean>(isStandalonePage);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showIntroSplash, setShowIntroSplash] = useState<boolean>(isStandalonePage);
  const [modalDefaultTab, setModalDefaultTab] = useState<"info" | "gallery" | "guide">("info");
  const [showThumbnails, setShowThumbnails] = useState<boolean>(showSceneThumbnails);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredHotspot, setHoveredHotspot] = useState<PanoramaHotspot | null>(null);

  // Advanced Mode States
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  const [isVrMode, setIsVrMode] = useState<boolean>(false);
  const [isAutoGuidedTour, setIsAutoGuidedTour] = useState<boolean>(false);
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [visitedScenes, setVisitedScenes] = useState<string[]>([activeSceneId]);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);

  // Animation & Rendering refs
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const yawRef = useRef<number>(activeScene?.initialYaw || 0);
  const pitchRef = useRef<number>(activeScene?.initialPitch || 0);
  const fovRef = useRef<number>(activeScene?.initialFov || 75);
  const autoRotateRef = useRef<boolean>(true);
  const textureLoadedRef = useRef<boolean>(false);

  // Sync state to refs
  useEffect(() => {
    yawRef.current = yaw;
  }, [yaw]);
  useEffect(() => {
    pitchRef.current = pitch;
  }, [pitch]);
  useEffect(() => {
    fovRef.current = fov;
  }, [fov]);
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Switch scene handler
  const switchScene = useCallback((sceneId: string) => {
    const targetScene = scenes.find((s) => s.id === sceneId);
    if (targetScene) {
      setActiveSceneId(sceneId);
      setVisitedScenes((prev) => (prev.includes(sceneId) ? prev : [...prev, sceneId]));
      setHoveredHotspot(null);
      yawRef.current = targetScene.initialYaw;
      pitchRef.current = targetScene.initialPitch;
      fovRef.current = targetScene.initialFov || 75;
      setYaw(targetScene.initialYaw);
      setPitch(targetScene.initialPitch);
      setFov(targetScene.initialFov || 75);
    }
  }, [scenes]);

  // Auto-Guided Tour effect (run_auto_guild: cycles through scenes automatically every 25s)
  useEffect(() => {
    if (!isAutoGuidedTour) return;
    const interval = setInterval(() => {
      setActiveSceneId((currId) => {
        const idx = scenes.findIndex((s) => s.id === currId);
        const nextIdx = (idx + 1) % scenes.length;
        const nextScene = scenes[nextIdx];
        if (nextScene) {
          setVisitedScenes((prev) => (prev.includes(nextScene.id) ? prev : [...prev, nextScene.id]));
          yawRef.current = nextScene.initialYaw;
          pitchRef.current = nextScene.initialPitch;
          setYaw(nextScene.initialYaw);
          setPitch(nextScene.initialPitch);
          return nextScene.id;
        }
        return currId;
      });
    }, 25000);
    return () => clearInterval(interval);
  }, [isAutoGuidedTour, scenes]);

  // WebGL Renderer Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      console.warn("WebGL not supported, falling back to 2D context");
      return;
    }

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      uniform vec2 u_resolution;
      uniform float u_yaw;
      uniform float u_pitch;
      uniform float u_fov;

      const float PI = 3.141592653589793;

      void main() {
        vec2 st = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
        st.x *= (u_resolution.x / u_resolution.y);

        float tanHalfFov = tan(radians(u_fov) * 0.5);
        vec3 ray = normalize(vec3(st.x * tanHalfFov, -st.y * tanHalfFov, 1.0));

        // Pitch rotation (X axis)
        float cp = cos(radians(u_pitch));
        float sp = sin(radians(u_pitch));
        vec3 rayPitched = vec3(ray.x, ray.y * cp - ray.z * sp, ray.y * sp + ray.z * cp);

        // Yaw rotation (Y axis)
        float cy = cos(radians(u_yaw));
        float sy = sin(radians(u_yaw));
        vec3 rayRotated = vec3(rayPitched.x * cy + rayPitched.z * sy, rayPitched.y, -rayPitched.x * sy + rayPitched.z * cy);

        // Map 3D vector to equirectangular UV
        float longitude = atan(rayRotated.x, rayRotated.z);
        float latitude = asin(clamp(rayRotated.y, -1.0, 1.0));

        vec2 uv = vec2(
          (longitude / (2.0 * PI)) + 0.5,
          (latitude / PI) + 0.5
        );

        gl_FragColor = texture2D(u_image, uv);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile failed:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link failed:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const uImageLoc = gl.getUniformLocation(program, "u_image");
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uYawLoc = gl.getUniformLocation(program, "u_yaw");
    const uPitchLoc = gl.getUniformLocation(program, "u_pitch");
    const uFovLoc = gl.getUniformLocation(program, "u_fov");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([11, 15, 13, 255])
    );

    textureLoadedRef.current = false;
    setIsLoading(true);

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      textureLoadedRef.current = true;
      setIsLoading(false);
    };
    img.src = activeScene.equirectangularImageUrl;

    let animationFrameId: number;

    const render = () => {
      if (!canvas) return;

      if (
        canvas.width !== canvas.clientWidth ||
        canvas.height !== canvas.clientHeight
      ) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      if (!isDraggingRef.current && autoRotateRef.current) {
        yawRef.current = (yawRef.current + 0.06) % 360;
        setYaw(yawRef.current);
      } else if (
        !isDraggingRef.current &&
        (Math.abs(velocityRef.current.x) > 0.005 || Math.abs(velocityRef.current.y) > 0.005)
      ) {
        yawRef.current = (yawRef.current + velocityRef.current.x) % 360;
        pitchRef.current = Math.max(-85, Math.min(85, pitchRef.current + velocityRef.current.y));
        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;
        setYaw(yawRef.current);
        setPitch(pitchRef.current);
      }

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uYawLoc, yawRef.current);
      gl.uniform1f(uPitchLoc, pitchRef.current);
      gl.uniform1f(uFovLoc, fovRef.current);
      gl.uniform1i(uImageLoc, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Compute hotspot 2D screen positions
      if (activeScene?.hotspots) {
        const radYawCam = (yawRef.current * Math.PI) / 180;
        const radPitchCam = (pitchRef.current * Math.PI) / 180;
        const aspect = canvas.width / canvas.height;
        const tanHalf = Math.tan(((fovRef.current * Math.PI) / 180) * 0.5);

        const positions = activeScene.hotspots.map((hs) => {
          const radYawHs = (hs.yaw * Math.PI) / 180;
          const radPitchHs = (hs.pitch * Math.PI) / 180;

          const hsWorld = {
            x: Math.cos(radPitchHs) * Math.sin(radYawHs),
            y: Math.sin(radPitchHs),
            z: Math.cos(radPitchHs) * Math.cos(radYawHs),
          };

          const x1 = hsWorld.x * Math.cos(-radYawCam) + hsWorld.z * Math.sin(-radYawCam);
          const y1 = hsWorld.y;
          const z1 = -hsWorld.x * Math.sin(-radYawCam) + hsWorld.z * Math.cos(-radYawCam);

          const xCam = x1;
          const yCam = y1 * Math.cos(-radPitchCam) - z1 * Math.sin(-radPitchCam);
          const zCam = y1 * Math.sin(-radPitchCam) + z1 * Math.cos(-radPitchCam);

          const inFront = zCam > 0.1;
          if (!inFront) {
            return { hotspot: hs, x: -100, y: -100, visible: false };
          }

          const ndcX = (xCam / zCam) / (tanHalf * aspect);
          const ndcY = (yCam / zCam) / tanHalf;

          const screenX = ((ndcX + 1) * 0.5) * canvas.width;
          const screenY = ((-ndcY + 1) * 0.5) * canvas.height;

          const visible =
            screenX >= -20 &&
            screenX <= canvas.width + 20 &&
            screenY >= -20 &&
            screenY <= canvas.height + 20;

          return { hotspot: hs, x: screenX, y: screenY, visible };
        });

        setHotspotPositions(positions);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (gl) {
        gl.deleteTexture(texture);
        gl.deleteProgram(program);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, [activeScene]);

  // Touch and Mouse Drag Interactions
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    setAutoRotate(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    const sensitivity = (fovRef.current / 75) * 0.22;
    const deltaYaw = -dx * sensitivity;
    const deltaPitch = dy * sensitivity;

    velocityRef.current = { x: deltaYaw * 0.5, y: deltaPitch * 0.5 };
    yawRef.current = (yawRef.current + deltaYaw) % 360;
    pitchRef.current = Math.max(-85, Math.min(85, pitchRef.current + deltaPitch));

    setYaw(yawRef.current);
    setPitch(pitchRef.current);
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile
  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      velocityRef.current = { x: 0, y: 0 };
      setAutoRotate(false);
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePosRef.current.x;
    const dy = e.touches[0].clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };

    const sensitivity = (fovRef.current / 75) * 0.28;
    const deltaYaw = -dx * sensitivity;
    const deltaPitch = dy * sensitivity;

    velocityRef.current = { x: deltaYaw * 0.5, y: deltaPitch * 0.5 };
    yawRef.current = (yawRef.current + deltaYaw) % 360;
    pitchRef.current = Math.max(-85, Math.min(85, pitchRef.current + deltaPitch));

    setYaw(yawRef.current);
    setPitch(pitchRef.current);
  };

  const onTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Wheel zoom
  const onWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.05;
    const newFov = Math.max(35, Math.min(105, fovRef.current + zoomDelta));
    fovRef.current = newFov;
    setFov(newFov);
  };

  // Zoom buttons
  const zoomIn = () => {
    const newFov = Math.max(35, fovRef.current - 12);
    fovRef.current = newFov;
    setFov(newFov);
  };

  const zoomOut = () => {
    const newFov = Math.min(105, fovRef.current + 12);
    fovRef.current = newFov;
    setFov(newFov);
  };

  const resetView = () => {
    yawRef.current = activeScene.initialYaw;
    pitchRef.current = activeScene.initialPitch;
    fovRef.current = activeScene.initialFov || 75;
    setYaw(activeScene.initialYaw);
    setPitch(activeScene.initialPitch);
    setFov(activeScene.initialFov || 75);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.warn("Fullscreen request error:", err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.warn("Exit fullscreen error:", err));
    }
  };

  // Ambient Sound Toggle
  const toggleAmbientSound = () => {
    const active = ambientSound.toggle();
    setIsAmbientPlaying(active);
  };

  // Share link copy
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2500);
    }
  };

  // Hotspot click handler
  const handleHotspotClick = (hs: PanoramaHotspot) => {
    if (hs.linkedSceneId) {
      switchScene(hs.linkedSceneId);
    } else {
      setModalDefaultTab("info");
      setShowInfoModal(true);
    }
  };

  // Icon mapper for hotspot
  const getHotspotIcon = (iconType?: string) => {
    switch (iconType) {
      case "waterfall":
        return <TreePine size={14} className="text-cyan-400" />;
      case "culture":
        return <Users size={14} className="text-amber-400" />;
      case "nature":
        return <Navigation size={14} className="text-emerald-400" />;
      case "temple":
      default:
        return <Landmark size={14} className="text-[#dca354]" />;
    }
  };

  // Filtered scenes for bottom drawer
  const filteredScenes = scenes.filter((scene) => {
    if (selectedCategory === "all") return true;
    return scene.category?.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Multilingual Strings
  const t = {
    vi: {
      backHome: "Trang Chủ",
      clusterTitle: "Nghĩa Tá · Định Hóa",
      clusterSubtitle: "Cụm Di Tích Lịch Sử & Thắng Cảnh Thái Nguyên",
      audioGuide: "Thuyết Minh",
      sound: "Âm Thanh",
      info: "Thông Tin",
      gallery: "Ảnh",
      map: "Bản Đồ",
      help: "Hướng Dẫn",
      vr: "VR",
      share: "Chia Sẻ",
      fullscreen: "Toàn Màn Hình",
      destinations: "Danh Sách Điểm Đến",
      all: "Tất Cả",
      atk: "ATK Định Hóa",
      nature: "Thắng Cảnh",
      culture: "Bản Làng Tày",
      autoTour: "Tour Tự Động",
      copied: "Đã chép link!",
    },
    en: {
      backHome: "Home",
      clusterTitle: "Nghia Ta · Dinh Hoa",
      clusterSubtitle: "Heritage & Natural Landscape Complex",
      audioGuide: "Audio Guide",
      sound: "Sound",
      info: "Info",
      gallery: "Photos",
      map: "Minimap",
      help: "Help",
      vr: "VR Mode",
      share: "Share",
      fullscreen: "Fullscreen",
      destinations: "Destinations List",
      all: "All",
      atk: "ATK Base",
      nature: "Landscape",
      culture: "Tay Village",
      autoTour: "Auto Tour",
      copied: "Link copied!",
    },
  }[language];

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden bg-[#070b09] rounded-2xl md:rounded-3xl shadow-2xl transition-all ${className} ${
        isStandalonePage ? "fixed inset-0 z-50 rounded-none w-screen h-screen" : ""
      }`}
      style={{ height: isStandalonePage ? "100vh" : height }}
    >
      {/* WebGL Equirectangular Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing block transition-opacity duration-300 ${
          isLoading ? "opacity-30" : "opacity-100"
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      />

      {/* VR Stereoscopic Dual Viewport Simulation */}
      {isVrMode && (
        <div className="absolute inset-0 z-40 bg-black/40 flex pointer-events-none">
          <div className="w-1/2 h-full border-r-2 border-white/20 relative flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border border-white/70" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-[10px] text-white/70 font-mono">
              LEFT EYE (VR)
            </div>
          </div>
          <div className="w-1/2 h-full relative flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border border-white/70" />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-[10px] text-white/70 font-mono">
              RIGHT EYE (VR)
            </div>
          </div>
          <button
            onClick={() => setIsVrMode(false)}
            className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-[#dca354] hover:bg-[#edb86e] text-[#0b0f0d] text-xs font-bold pointer-events-auto shadow-2xl transition-all active:scale-95"
          >
            ✕ Thoát Chế Độ VR
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0b0f0d]/85 backdrop-blur-md transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full border-2 border-[#dca354] border-t-transparent animate-spin mb-4" />
          <p className="font-display text-base font-bold tracking-wide text-[#f5f4ef]">
            Đang tải không gian 360°...
          </p>
          <span className="text-xs text-[#a9a69b] mt-1 font-mono">
            {activeScene.title}
          </span>
        </div>
      )}

      {/* ======================================================
          TOP CONTROL BAR (Exact structure of Hong Gai 360)
         ====================================================== */}
      <header className="absolute top-0 inset-x-0 z-30 p-3 sm:p-4 bg-gradient-to-b from-[#0b0f0d]/90 via-[#0b0f0d]/50 to-transparent flex items-center justify-between gap-3 pointer-events-none">
        {/* Left Title & Monument Group */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3">
          {isStandalonePage ? (
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-[#1c382b] border border-white/20 hover:border-[#dca354] backdrop-blur-md text-xs font-semibold text-white transition-all active:scale-95"
            >
              <ArrowLeft size={14} className="text-[#dca354]" />
              <span className="hidden sm:inline">{t.backHome}</span>
            </Link>
          ) : null}

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#1c382b] text-[#dca354] border border-[#dca354]/40">
                {t.clusterTitle}
              </span>
              <span className="text-[11px] font-medium text-white/70 hidden md:inline">
                {t.clusterSubtitle}
              </span>
            </div>
            <h2 className="font-display text-sm sm:text-base md:text-lg font-bold text-[#fbf9f5] truncate drop-shadow max-w-xs sm:max-w-md">
              {activeScene.title}
            </h2>
          </div>
        </div>

        {/* Right Feature Buttons Cluster (Hong Gai Toolset) */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Audio Guide Toggle */}
          {activeScene.audioNarration && (
            <button
              onClick={() => setShowAudioGuide(!showAudioGuide)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border backdrop-blur-md active:scale-95 ${
                showAudioGuide
                  ? "bg-[#1c382b] text-[#dca354] border-[#dca354] shadow-lg shadow-[#dca354]/20"
                  : "bg-black/60 hover:bg-black/80 text-white/90 border-white/20 hover:border-[#dca354]"
              }`}
              title="Thuyết minh âm thanh tự động"
            >
              <Mic
                size={14}
                className={showAudioGuide ? "animate-pulse text-[#dca354]" : ""}
              />
              <span className="hidden sm:inline">{t.audioGuide}</span>
            </button>
          )}

          {/* Ambient Sound Toggle */}
          <button
            onClick={toggleAmbientSound}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border backdrop-blur-md transition-all active:scale-95 ${
              isAmbientPlaying
                ? "bg-[#1c382b] text-[#dca354] border-[#dca354]"
                : "bg-black/60 hover:bg-black/80 text-white/90 border-white/20"
            }`}
            title={isAmbientPlaying ? "Tắt âm thanh rừng suối" : "Bật âm thanh thiên nhiên"}
          >
            {isAmbientPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Info Modal Toggle */}
          <button
            onClick={() => {
              setModalDefaultTab("info");
              setShowInfoModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#dca354] backdrop-blur-md text-xs font-semibold text-white/90 transition-all active:scale-95"
            title="Thông tin chi tiết di tích"
          >
            <Info size={14} className="text-[#dca354]" />
            <span className="hidden md:inline">{t.info}</span>
          </button>

          {/* Photo Gallery Toggle */}
          <button
            onClick={() => {
              setModalDefaultTab("gallery");
              setShowInfoModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#dca354] backdrop-blur-md text-xs font-semibold text-white/90 transition-all active:scale-95"
            title="Thư viện ảnh thực địa"
          >
            <ImageIcon size={14} className="text-amber-300" />
            <span className="hidden lg:inline">
              {t.gallery} ({activeScene.gallery?.length || 1})
            </span>
          </button>

          {/* Minimap Toggle */}
          <button
            onClick={() => setShowMinimap(!showMinimap)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border backdrop-blur-md transition-all active:scale-95 ${
              showMinimap
                ? "bg-[#1c382b] text-[#dca354] border-[#dca354]"
                : "bg-black/60 hover:bg-black/80 text-white/90 border-white/20"
            }`}
            title={showMinimap ? "Ẩn bản đồ" : "Hiện bản đồ số"}
          >
            <Map size={15} />
          </button>

          {/* Help Center Toggle */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="w-9 h-9 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#dca354] backdrop-blur-md flex items-center justify-center text-white/90 transition-all active:scale-95"
            title="Hướng dẫn thao tác"
          >
            <HelpCircle size={15} />
          </button>

          {/* VR Headset Mode Toggle */}
          <button
            onClick={() => setIsVrMode(!isVrMode)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border backdrop-blur-md transition-all active:scale-95 ${
              isVrMode
                ? "bg-[#dca354] text-[#0b0f0d] border-[#dca354]"
                : "bg-black/60 hover:bg-black/80 text-white/90 border-white/20"
            }`}
            title="Chế độ thực tế ảo VR Cardboard"
          >
            <Glasses size={15} />
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage((l) => (l === "vi" ? "en" : "vi"))}
            className="px-2.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#dca354] backdrop-blur-md text-[11px] font-bold text-[#dca354] transition-all active:scale-95"
            title="Chuyển ngôn ngữ VI / EN"
          >
            {language === "vi" ? "VI" : "EN"}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#dca354] backdrop-blur-md flex items-center justify-center text-white/90 transition-all active:scale-95 relative"
            title="Chia sẻ tour ảo"
          >
            {copiedShareLink ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#dca354] backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
            title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </header>

      {/* Share Toast Notification */}
      {copiedShareLink && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-xl bg-[#1c382b] border border-[#dca354] text-xs font-bold text-[#f5f4ef] shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in duration-200">
          <Check size={14} className="text-emerald-400" />
          <span>{t.copied}</span>
        </div>
      )}

      {/* ======================================================
          INTERACTIVE 3D HOTSPOTS ON CANVAS (Callout Style)
         ====================================================== */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {hotspotPositions.map(({ hotspot, x, y, visible }) => {
          if (!visible) return null;

          return (
            <div
              key={hotspot.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{ left: `${x}px`, top: `${y}px` }}
              onMouseEnter={() => setHoveredHotspot(hotspot)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              {/* Hotspot Radar Pulse Ring */}
              <div
                className="relative group cursor-pointer"
                onClick={() => handleHotspotClick(hotspot)}
              >
                <span className="absolute -inset-2 rounded-full bg-[#dca354] opacity-50 radar-ring pointer-events-none" />

                {/* Callout Pill (matching Hong Gai ht_callout) */}
                <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0e1713]/90 border border-[#dca354] shadow-2xl backdrop-blur-md text-white transition-all group-hover:scale-110 group-hover:bg-[#1c382b]">
                  <div className="w-4 h-4 rounded-full bg-[#dca354]/20 flex items-center justify-center flex-shrink-0">
                    {getHotspotIcon(hotspot.iconType)}
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap text-[#f5f4ef]">
                    {hotspot.label}
                  </span>
                  {hotspot.distance && (
                    <span className="text-[10px] text-[#dca354] font-mono px-1 rounded bg-black/50">
                      {hotspot.distance}
                    </span>
                  )}
                </div>

                {/* Hotspot Hover Tooltip Card */}
                {hoveredHotspot?.id === hotspot.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-xl bg-[#0b0f0d]/95 border border-[#dca354]/50 p-2.5 shadow-2xl backdrop-blur-xl animate-in fade-in duration-150 z-30">
                    {hotspot.thumbnailUrl && (
                      <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2">
                        <Image
                          src={hotspot.thumbnailUrl}
                          alt={hotspot.label}
                          fill
                          className="object-cover"
                          sizes="224px"
                        />
                      </div>
                    )}
                    <h5 className="font-display font-bold text-xs text-[#f5f4ef] mb-1">
                      {hotspot.label}
                    </h5>
                    {hotspot.description && (
                      <p className="text-[11px] text-[#a9a69b] leading-snug mb-2">
                        {hotspot.description}
                      </p>
                    )}
                    <div className="text-[10px] font-bold text-[#dca354] flex items-center justify-between">
                      <span>
                        {hotspot.linkedSceneId ? "➔ Chuyển góc nhìn" : "➔ Xem tư liệu"}
                      </span>
                      {hotspot.distance && <span>{hotspot.distance}</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================
          RADAR MINIMAP OVERLAY (Bottom-Left)
         ====================================================== */}
      {showMinimap && (
        <div className="absolute left-4 bottom-24 sm:bottom-28 z-30 pointer-events-none animate-in fade-in slide-in-from-left-4">
          <PanoramaMinimap
            scenes={scenes}
            activeSceneId={activeSceneId}
            yaw={yaw}
            onSelectScene={switchScene}
          />
        </div>
      )}

      {/* ======================================================
          VIRTUAL TOUR GUIDE AI MC (Thuyết Minh Viên Ảo Góc Màn Hình)
         ====================================================== */}
      {showAudioGuide && activeScene.audioNarration && (
        <div className="absolute bottom-20 right-4 sm:bottom-24 sm:right-16 md:right-20 z-30 pointer-events-none animate-in fade-in slide-in-from-bottom-4">
          <VirtualTourGuide
            title={activeScene.audioNarration.title}
            speaker={activeScene.audioNarration.speaker}
            duration={activeScene.audioNarration.duration}
            script={activeScene.audioNarration.script}
            autoPlay={true}
            onClose={() => setShowAudioGuide(false)}
          />
        </div>
      )}

      {/* ======================================================
          RIGHT GIMBAL & CAMERA CONTROLS
         ====================================================== */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
        {/* Live Compass Bearing */}
        <div className="w-10 h-10 rounded-xl bg-[#0e1713]/85 border border-white/20 backdrop-blur-md flex flex-col items-center justify-center text-white shadow-lg pointer-events-none">
          <Compass
            size={16}
            className="text-[#dca354] transition-transform duration-75"
            style={{ transform: `rotate(${-yaw}deg)` }}
          />
          <span className="text-[9px] font-mono font-bold text-[#dca354]">
            {Math.round((yaw + 360) % 360)}°
          </span>
        </div>

        <button
          onClick={zoomIn}
          className="w-10 h-10 rounded-xl bg-[#0e1713]/85 hover:bg-[#1c382b] border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 hover:border-[#dca354]"
          title="Thu phóng gần"
        >
          <ZoomIn size={18} />
        </button>

        <button
          onClick={zoomOut}
          className="w-10 h-10 rounded-xl bg-[#0e1713]/85 hover:bg-[#1c382b] border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 hover:border-[#dca354]"
          title="Thu nhỏ góc nhìn"
        >
          <ZoomOut size={18} />
        </button>

        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`w-10 h-10 rounded-xl border backdrop-blur-md flex items-center justify-center transition-all active:scale-95 ${
            autoRotate
              ? "bg-[#dca354] text-[#0b0f0d] border-[#dca354] shadow-md shadow-[#dca354]/30"
              : "bg-[#0e1713]/85 hover:bg-[#1c382b] text-white border-white/20"
          }`}
          title={autoRotate ? "Dừng tự động xoay" : "Bật tự động xoay"}
        >
          <RotateCw size={17} className={autoRotate ? "animate-spin" : ""} />
        </button>

        {/* Auto Guided Tour (run_auto_guild) */}
        <button
          onClick={() => {
            const nextState = !isAutoGuidedTour;
            setIsAutoGuidedTour(nextState);
            if (nextState) setAutoRotate(true);
          }}
          className={`w-10 h-10 rounded-xl border backdrop-blur-md flex items-center justify-center transition-all active:scale-95 ${
            isAutoGuidedTour
              ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-500/30"
              : "bg-[#0e1713]/85 hover:bg-[#1c382b] text-white border-white/20"
          }`}
          title={isAutoGuidedTour ? "Dừng Tour Tự Động" : "Bật Tour Hướng Dẫn Tự Động"}
        >
          <Sparkles size={17} className={isAutoGuidedTour ? "animate-bounce" : ""} />
        </button>

        {/* Reset Camera View */}
        <button
          onClick={resetView}
          className="w-10 h-10 rounded-xl bg-[#0e1713]/85 hover:bg-[#1c382b] border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 hover:border-[#dca354]"
          title="Đặt lại góc nhìn mặc định"
        >
          <Eye size={18} />
        </button>
      </div>

      {/* ======================================================
          BOTTOM SCENE DRAWER & THUMBNAIL CAROUSEL (thumbnail_menu)
         ====================================================== */}
      <footer className="absolute bottom-0 inset-x-0 z-20 pointer-events-none flex flex-col justify-end">
        {/* Toggle Button for Scene Carousel */}
        <div className="flex justify-center pb-1">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-t-xl bg-[#0e1713]/90 hover:bg-[#1c382b] border-t border-x border-white/20 text-[11px] font-bold text-[#dca354] shadow-lg backdrop-blur-md transition-all active:scale-95"
          >
            <Layers size={13} />
            <span>
              {showThumbnails
                ? "Thu Gọn Điểm Đến"
                : `${t.destinations} (${scenes.length})`}
            </span>
            {showThumbnails ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>

        {/* Carousel Container */}
        {showThumbnails && (
          <div className="pointer-events-auto p-3 sm:p-4 bg-gradient-to-t from-[#0b0f0d] via-[#0b0f0d]/95 to-transparent border-t border-white/10 backdrop-blur-md">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-[#dca354] text-[#0b0f0d]"
                    : "bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                {t.all} ({scenes.length})
              </button>
              <button
                onClick={() => setSelectedCategory("Di Tích")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === "Di Tích"
                    ? "bg-[#dca354] text-[#0b0f0d]"
                    : "bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                {t.atk}
              </button>
              <button
                onClick={() => setSelectedCategory("Thắng Cảnh")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === "Thắng Cảnh"
                    ? "bg-[#dca354] text-[#0b0f0d]"
                    : "bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                {t.nature}
              </button>
              <button
                onClick={() => setSelectedCategory("Văn Hóa")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === "Văn Hóa"
                    ? "bg-[#dca354] text-[#0b0f0d]"
                    : "bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                {t.culture}
              </button>
            </div>

            {/* Thumbnail Cards Grid / Horizontal Scroll */}
            <div className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-none">
              {filteredScenes.map((scene) => {
                const isActive = scene.id === activeSceneId;
                const isVisited = visitedScenes.includes(scene.id);

                return (
                  <button
                    key={scene.id}
                    onClick={() => switchScene(scene.id)}
                    className={`group relative flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border text-left transition-all flex-shrink-0 active:scale-95 ${
                      isActive
                        ? "bg-[#1c382b] border-[#dca354] shadow-lg shadow-[#dca354]/25 scale-105"
                        : "bg-black/60 border-white/15 hover:border-white/40 hover:bg-black/80"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                      <Image
                        src={scene.equirectangularImageUrl}
                        alt={scene.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="48px"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#dca354]/20 border border-[#dca354]" />
                      )}
                      {isVisited && !isActive && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#1c382b] border border-[#dca354] flex items-center justify-center text-[#dca354]">
                          <Check size={8} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-semibold text-[#dca354] block truncate">
                          {scene.category || "Di Tích"}
                        </span>
                        {isVisited && (
                          <span className="text-[9px] text-[#dca354] flex items-center">
                            <CheckCircle2 size={10} />
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-xs font-bold truncate max-w-[140px] sm:max-w-[180px] ${
                          isActive
                            ? "text-[#fbf9f5]"
                            : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {scene.title}
                      </h4>
                      <p className="text-[10px] text-white/50 truncate max-w-[140px]">
                        {scene.location.split(",")[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </footer>

      {/* ======================================================
          INFO & GALLERY MODAL (info_popup & gallery_popup)
         ====================================================== */}
      <PanoramaInfoModal
        scene={activeScene}
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        defaultTab={modalDefaultTab}
      />

      {/* ======================================================
          HELP CENTER MODAL (Help center / Thaotac)
         ====================================================== */}
      <PanoramaHelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        language={language}
      />

      {/* ======================================================
          INTRO SCREEN SPLASH OVERLAY (intro_screen / bt_start)
         ====================================================== */}
      <PanoramaIntroSplash
        isOpen={showIntroSplash}
        onStart={() => setShowIntroSplash(false)}
        language={language}
      />
    </div>
  );
}
