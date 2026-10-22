"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Compass,
  MapPin,
  Info,
  X,
  Eye,
} from "lucide-react";
import type { PanoramaScene, PanoramaHotspot } from "@/types/heritage";

interface Props {
  scenes: PanoramaScene[];
  initialSceneId?: string;
  className?: string;
  height?: string;
  showSceneThumbnails?: boolean;
}

export default function InteractivePanoramaViewer({
  scenes,
  initialSceneId,
  className = "",
  height = "600px",
  showSceneThumbnails = true,
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
  const [selectedHotspot, setSelectedHotspot] = useState<PanoramaHotspot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hotspotPositions, setHotspotPositions] = useState<
    { hotspot: PanoramaHotspot; x: number; y: number; visible: boolean }[]
  >([]);

  // Refs for animation loop
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

  // WebGL Renderer Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      console.warn("WebGL not supported, falling back to 2D context");
      return;
    }

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader for spherical equirectangular projection
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
        vec3 rayWorld = vec3(rayPitched.x * cy + rayPitched.z * sy, rayPitched.y, -rayPitched.x * sy + rayPitched.z * cy);

        // Convert to spherical coords
        float lon = atan(rayWorld.x, rayWorld.z);
        float lat = asin(clamp(rayWorld.y, -1.0, 1.0));

        vec2 uv = vec2((lon / (2.0 * PI)) + 0.5, 0.5 - (lat / PI));
        gl_FragColor = texture2D(u_image, uv);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error("Shader compile error:", glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uYaw = gl.getUniformLocation(program, "u_yaw");
    const uPitch = gl.getUniformLocation(program, "u_pitch");
    const uFov = gl.getUniformLocation(program, "u_fov");

    // Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Initial 1x1 black placeholder
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

    // Load active image
    setIsLoading(true);
    textureLoadedRef.current = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!gl) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      textureLoadedRef.current = true;
      setIsLoading(false);
    };
    img.src = activeScene.equirectangularImageUrl;

    // Render loop
    let animationFrameId: number;

    const render = () => {
      if (!canvas || !gl) return;

      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      // Physics damping & auto-rotate
      if (!isDraggingRef.current) {
        if (autoRotateRef.current) {
          yawRef.current = (yawRef.current + 0.08) % 360;
        }
        // Momentum
        yawRef.current += velocityRef.current.x;
        pitchRef.current = Math.max(-80, Math.min(80, pitchRef.current + velocityRef.current.y));
        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;
      }

      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uYaw, yawRef.current);
      gl.uniform1f(uPitch, pitchRef.current);
      gl.uniform1f(uFov, fovRef.current);

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

          // Hotspot world vector
          const hsWorld = {
            x: Math.cos(radPitchHs) * Math.sin(radYawHs),
            y: Math.sin(radPitchHs),
            z: Math.cos(radPitchHs) * Math.cos(radYawHs),
          };

          // Inverse camera yaw rotation
          const x1 = hsWorld.x * Math.cos(-radYawCam) + hsWorld.z * Math.sin(-radYawCam);
          const y1 = hsWorld.y;
          const z1 = -hsWorld.x * Math.sin(-radYawCam) + hsWorld.z * Math.cos(-radYawCam);

          // Inverse camera pitch rotation
          const xCam = x1;
          const yCam = y1 * Math.cos(-radPitchCam) - z1 * Math.sin(-radPitchCam);
          const zCam = y1 * Math.sin(-radPitchCam) + z1 * Math.cos(-radPitchCam);

          // Visible only if in front of camera
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
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
      }
    };
  }, [activeScene]);

  // Pointer event handlers for drag / touch
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    setAutoRotate(false);
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;

    const sensitivity = (fovRef.current / 75) * 0.22;
    const dYaw = -dx * sensitivity;
    const dPitch = dy * sensitivity;

    yawRef.current = (yawRef.current + dYaw) % 360;
    pitchRef.current = Math.max(-80, Math.min(80, pitchRef.current + dPitch));

    velocityRef.current = { x: dYaw * 0.5, y: dPitch * 0.5 };
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setYaw(yawRef.current);
    setPitch(pitchRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.05;
    const newFov = Math.max(40, Math.min(95, fovRef.current + zoomDelta));
    fovRef.current = newFov;
    setFov(newFov);
  };

  // Zoom buttons
  const zoomIn = () => {
    const newFov = Math.max(40, fovRef.current - 10);
    fovRef.current = newFov;
    setFov(newFov);
  };

  const zoomOut = () => {
    const newFov = Math.min(95, fovRef.current + 10);
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
    velocityRef.current = { x: 0, y: 0 };
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting fullscreen:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Switch scene
  const switchScene = (sceneId: string) => {
    const targetScene = scenes.find((s) => s.id === sceneId);
    if (targetScene) {
      setActiveSceneId(sceneId);
      setSelectedHotspot(null);
      yawRef.current = targetScene.initialYaw;
      pitchRef.current = targetScene.initialPitch;
      fovRef.current = targetScene.initialFov || 75;
      setYaw(targetScene.initialYaw);
      setPitch(targetScene.initialPitch);
      setFov(targetScene.initialFov || 75);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-xl bg-[#0b0f0d] text-white shadow-2xl select-none ${className}`}
      style={{ height }}
    >
      {/* 360 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        aria-label={`Trình xem 360 độ: ${activeScene.title}`}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0b0f0d]/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full border-2 border-[#dca354] border-t-transparent animate-spin mb-4" />
          <p className="font-body text-sm font-medium tracking-wide text-[#f5f4ef]">
            Đang tải không gian 360°...
          </p>
        </div>
      )}

      {/* Interactive 3D Hotspots on Canvas */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {hotspotPositions.map(({ hotspot, x, y, visible }) => {
          if (!visible) return null;
          return (
            <div
              key={hotspot.id}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 cursor-pointer group"
              style={{ left: `${x}px`, top: `${y}px` }}
              onClick={() => {
                if (hotspot.linkedSceneId) {
                  switchScene(hotspot.linkedSceneId);
                } else {
                  setSelectedHotspot(hotspot);
                }
              }}
            >
              {/* Pulsing ring */}
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#dca354]/40 animate-ping" />
                <div className="relative w-7 h-7 rounded-full bg-[#1c382b] border-2 border-[#dca354] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin size={14} className="text-[#dca354]" />
                </div>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md bg-[#0b0f0d]/90 backdrop-blur-md border border-white/15 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                <p className="font-medium text-[#f5f4ef]">{hotspot.label}</p>
                {hotspot.linkedSceneId && (
                  <p className="text-[10px] text-[#dca354]">Nhấp để chuyển cảnh ➔</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Header Overlay */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 md:p-6 bg-gradient-to-b from-[#0b0f0d]/90 via-[#0b0f0d]/40 to-transparent flex items-start justify-between pointer-events-none">
        <div className="pointer-events-auto max-w-md">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1c382b]/80 border border-[#dca354]/30 backdrop-blur-md mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#dca354]">
              Tour 360° Trực Tuyến
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white drop-shadow-md">
            {activeScene.title}
          </h3>
          <p className="font-body text-xs md:text-sm text-white/80 drop-shadow line-clamp-1">
            {activeScene.location}
          </p>
        </div>

        {/* Top-Right Quick Link */}
        {activeScene.linkedSiteSlug && (
          <Link
            href={`/di-tich/${activeScene.linkedSiteSlug}`}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-xs font-medium text-white transition-all hover:scale-105"
          >
            <Info size={13} />
            <span>Xem Chi Tiết</span>
          </Link>
        )}
      </div>

      {/* Compass / Heading Indicator */}
      <div className="absolute top-20 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] text-white/80 pointer-events-none">
        <Compass
          size={14}
          className="text-[#dca354] transition-transform duration-100"
          style={{ transform: `rotate(${-yaw}deg)` }}
        />
        <span>Góc nhìn: {Math.round((yaw + 360) % 360)}°</span>
      </div>

      {/* Right-Side Camera Floating Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={zoomIn}
          className="w-10 h-10 rounded-lg bg-black/60 hover:bg-[#1c382b] border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 hover:border-[#dca354]/60"
          title="Thu phóng gần"
          aria-label="Thu phóng gần"
        >
          <ZoomIn size={18} />
        </button>

        <button
          onClick={zoomOut}
          className="w-10 h-10 rounded-lg bg-black/60 hover:bg-[#1c382b] border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 hover:border-[#dca354]/60"
          title="Thu nhỏ góc nhìn"
          aria-label="Thu nhỏ góc nhìn"
        >
          <ZoomOut size={18} />
        </button>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`w-10 h-10 rounded-lg border backdrop-blur-md flex items-center justify-center transition-all active:scale-95 ${
            autoRotate
              ? "bg-[#dca354] text-[#0b0f0d] border-[#dca354]"
              : "bg-black/60 hover:bg-[#1c382b] text-white border-white/15"
          }`}
          title={autoRotate ? "Dừng tự động xoay" : "Bật tự động xoay"}
          aria-label="Tự động xoay 360"
        >
          <RotateCw size={18} className={autoRotate ? "animate-spin" : ""} />
        </button>

        <button
          onClick={resetView}
          className="w-10 h-10 rounded-lg bg-black/60 hover:bg-[#1c382b] border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 hover:border-[#dca354]/60"
          title="Đặt lại góc nhìn mặc định"
          aria-label="Đặt lại góc nhìn"
        >
          <Eye size={18} />
        </button>

        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 rounded-lg bg-black/60 hover:bg-[#1c382b] border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 hover:border-[#dca354]/60"
          title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
          aria-label="Toàn màn hình"
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {/* Selected Hotspot Modal Popup */}
      {selectedHotspot && (
        <div className="absolute inset-x-4 bottom-24 md:bottom-28 z-30 mx-auto max-w-sm rounded-xl bg-[#0b0f0d]/95 border border-[#dca354]/40 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dca354]" />
              <h4 className="font-display font-bold text-base text-[#f5f4ef]">
                {selectedHotspot.label}
              </h4>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-white/60 hover:text-white p-1 rounded-md"
            >
              <X size={16} />
            </button>
          </div>
          {selectedHotspot.thumbnailUrl && (
            <div className="relative h-28 w-full rounded-lg overflow-hidden mb-2">
              <Image
                src={selectedHotspot.thumbnailUrl}
                alt={selectedHotspot.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 380px"
              />
            </div>
          )}
          <p className="text-xs text-[#a9a69b] leading-relaxed mb-3">
            {selectedHotspot.description}
          </p>
          {activeScene.linkedSiteSlug && (
            <Link
              href={`/di-tich/${activeScene.linkedSiteSlug}`}
              className="block w-full text-center py-2 rounded-lg bg-[#1c382b] hover:bg-[#256a42] text-xs font-semibold text-[#f5f4ef] transition-colors"
            >
              Tìm hiểu lịch sử & văn hóa ➔
            </Link>
          )}
        </div>
      )}

      {/* Bottom Scene Carousel Bar */}
      {showSceneThumbnails && scenes.length > 1 && (
        <div className="absolute bottom-0 inset-x-0 z-20 p-3 md:p-4 bg-gradient-to-t from-[#0b0f0d] via-[#0b0f0d]/80 to-transparent flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {scenes.map((scene) => {
              const isActive = scene.id === activeSceneId;
              return (
                <button
                  key={scene.id}
                  onClick={() => switchScene(scene.id)}
                  className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-left transition-all flex-shrink-0 ${
                    isActive
                      ? "bg-[#1c382b] border-[#dca354] shadow-lg shadow-[#dca354]/20 scale-105"
                      : "bg-black/50 border-white/10 hover:border-white/30 hover:bg-black/70"
                  }`}
                >
                  <div className="relative w-8 h-8 rounded-md overflow-hidden bg-zinc-800 flex-shrink-0">
                    <Image
                      src={scene.equirectangularImageUrl}
                      alt={scene.title}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="pr-1">
                    <p
                      className={`text-xs font-medium line-clamp-1 ${
                        isActive ? "text-[#dca354]" : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {scene.title}
                    </p>
                    <p className="text-[10px] text-white/50 line-clamp-1">
                      {scene.location.split(",")[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/60 whitespace-nowrap pl-2">
            <span>Kéo chuột để xoay 360°</span>
          </div>
        </div>
      )}
    </div>
  );
}
