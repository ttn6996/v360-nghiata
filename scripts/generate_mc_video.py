import os
import cv2
import numpy as np
import imageio_ffmpeg
import subprocess
import shutil

BRAIN_DIR = r"C:\Users\Canh\.gemini\antigravity-ide\brain\affe7175-1e70-4030-abd6-45089eab242e"
FRAME_PATHS = [
    os.path.join(BRAIN_DIR, "ai_tour_guide_mc_1792673647767.jpg"),       # F1: open speaking + hand gesture
    os.path.join(BRAIN_DIR, "ai_tour_guide_mc_frame2_1792673677645.jpg"), # F2: polite closed smile
    os.path.join(BRAIN_DIR, "ai_tour_guide_mc_frame3_1792673700648.jpg"), # F3: open vowel speech
]

TARGET_W, TARGET_H = 480, 854  # 9:16 portrait video resolution for optimal web performance
FPS = 24
TOTAL_FRAMES = 96  # 4 seconds at 24fps

TEMP_DIR = os.path.join("scripts", "temp_frames")
TEMP_RGBA = os.path.join(TEMP_DIR, "rgba")
TEMP_RGB = os.path.join(TEMP_DIR, "rgb")
os.makedirs(TEMP_RGBA, exist_ok=True)
os.makedirs(TEMP_RGB, exist_ok=True)

def chroma_key(img_bgr):
    img_bgr = cv2.resize(img_bgr, (TARGET_W, TARGET_H), interpolation=cv2.INTER_LANCZOS4)
    hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
    
    # Solid green backdrop detection (H: 45 to 88)
    lower_green = np.array([42, 60, 40])
    upper_green = np.array([88, 255, 255])
    is_green = cv2.inRange(hsv, lower_green, upper_green)
    
    # Soft alpha matte
    alpha = 255 - is_green
    alpha = cv2.GaussianBlur(alpha, (5, 5), 0)
    
    # Spill suppression
    b, g, r = cv2.split(img_bgr)
    rb_max = np.maximum(r, b)
    excess_green = np.maximum(0, g.astype(np.int16) - rb_max.astype(np.int16)).astype(np.uint8)
    # Reduce green where spill occurs near boundary
    g_despilled = np.where(is_green > 0, rb_max, np.clip(g.astype(np.int16) - (excess_green // 2), 0, 255).astype(np.uint8))
    
    rgba = cv2.merge([b, g_despilled, r, alpha])
    return rgba

print("Extracting chroma key for keyframes...")
cutouts = [chroma_key(cv2.imread(p)) for p in FRAME_PATHS]
f1, f2, f3 = cutouts[0], cutouts[1], cutouts[2]

# Create animation sequence schedule
# Keyframe points (time_in_frames, frame_index)
# 0 -> F2 (idle smile)
# 16 -> F3 (open vowel)
# 36 -> F1 (speaking gesture)
# 54 -> F3 (speaking vowel)
# 68 -> F2 (nod smile)
# 82 -> F3 (open vowel)
# 96 -> F2 (back to idle smile)
schedule = [
    (0, f2),
    (16, f3),
    (38, f1),
    (56, f3),
    (70, f2),
    (84, f3),
    (96, f2)
]

print(f"Generating {TOTAL_FRAMES} interpolated frames...")

for i in range(TOTAL_FRAMES):
    # Find active segment
    for seg_idx in range(len(schedule) - 1):
        t0, img0 = schedule[seg_idx]
        t1, img1 = schedule[seg_idx + 1]
        if t0 <= i <= t1:
            progress = (i - t0) / float(t1 - t0)
            # Smooth ease-in-out
            smooth_p = 0.5 * (1.0 - np.cos(progress * np.pi))
            
            # Cross-fade blending
            blended = cv2.addWeighted(img0, 1.0 - smooth_p, img1, smooth_p, 0)
            
            # Subtle breathing displacement (vertical sinus: -2 to +2 pixels)
            dy = int(np.sin(i / TOTAL_FRAMES * 4 * np.pi) * 2.5)
            M = np.float32([[1, 0, 0], [0, 1, dy]])
            shifted = cv2.warpAffine(blended, M, (TARGET_W, TARGET_H), borderMode=cv2.BORDER_CONSTANT, borderValue=[0, 0, 0, 0])
            
            # Save RGBA frame (for WebM with alpha)
            rgba_path = os.path.join(TEMP_RGBA, f"frame_{i:04d}.png")
            cv2.imwrite(rgba_path, shifted)
            
            # Save RGB frame with an atmospheric vignette background (for universal MP4)
            # Create a luxury dark gradient background [#0c1410] to [#070d09]
            bg = np.zeros((TARGET_H, TARGET_W, 3), dtype=np.uint8)
            y_coords = np.linspace(0.08, 0.04, TARGET_H)[:, None]
            bg[:, :, 0] = (y_coords * 255 * 0.8).astype(np.uint8) # B
            bg[:, :, 1] = (y_coords * 255 * 1.2).astype(np.uint8) # G
            bg[:, :, 2] = (y_coords * 255 * 0.9).astype(np.uint8) # R
            
            # Alpha composite
            alpha_f = shifted[:, :, 3].astype(np.float32) / 255.0
            alpha_f = np.dstack([alpha_f, alpha_f, alpha_f])
            fg_f = shifted[:, :, :3].astype(np.float32)
            bg_f = bg.astype(np.float32)
            comp = (fg_f * alpha_f + bg_f * (1.0 - alpha_f)).astype(np.uint8)
            
            rgb_path = os.path.join(TEMP_RGB, f"frame_{i:04d}.png")
            cv2.imwrite(rgb_path, comp)
            break

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
print(f"Using FFmpeg: {ffmpeg_exe}")

# 1. Export WebM with transparent alpha
webm_output = os.path.join("public", "videos", "virtual-guide.webm")
print("Encoding VP9 transparent WebM...")
cmd_webm = [
    ffmpeg_exe, "-y",
    "-framerate", str(FPS),
    "-i", os.path.join(TEMP_RGBA, "frame_%04d.png"),
    "-c:v", "libvpx-vp9",
    "-pix_fmt", "yuva420p",
    "-b:v", "1200k",
    "-auto-alt-ref", "0",
    webm_output
]
subprocess.run(cmd_webm, check=True)

# 2. Export H264 MP4 with dark backdrop
mp4_output = os.path.join("public", "videos", "virtual-guide.mp4")
print("Encoding H264 universal MP4...")
cmd_mp4 = [
    ffmpeg_exe, "-y",
    "-framerate", str(FPS),
    "-i", os.path.join(TEMP_RGB, "frame_%04d.png"),
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-b:v", "1500k",
    mp4_output
]
subprocess.run(cmd_mp4, check=True)

# 3. Export animated WebP with full transparency for lightweight instant preview/fallback
webp_output = os.path.join("public", "images", "mc", "guide-speaking.webp")
print("Encoding animated WebP with transparency...")
cmd_webp = [
    ffmpeg_exe, "-y",
    "-framerate", "18",  # smooth 18fps for animated webp
    "-i", os.path.join(TEMP_RGBA, "frame_%04d.png"),
    "-c:v", "libwebp",
    "-lossless", "0",
    "-q:v", "80",
    "-loop", "0",
    "-an",
    webp_output
]
subprocess.run(cmd_webp, check=True)

# 4. Save idle poster
idle_poster = os.path.join("public", "images", "mc", "guide-idle.png")
cv2.imwrite(idle_poster, f2)
print("Saved idle poster:", idle_poster)

# Cleanup temp frames
shutil.rmtree(TEMP_DIR)
print("MC video generation completed successfully!")
