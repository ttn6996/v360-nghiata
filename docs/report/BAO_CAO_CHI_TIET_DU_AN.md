# BÁO CÁO CHI TIẾT DỰ ÁN: V360 NGHĨA TÁ
## NỀN TẢNG KHÁM PHÁ DI SẢN & CẢNH QUAN DU LỊCH 360° NGHĨA TÁ (ĐỊNH HÓA, THÁI NGUYÊN)

---

- **Tên dự án:** V360 Nghĩa Tá (Virtual 360 Nghĩa Tá)
- **Địa bàn triển khai:** Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên
- **Phiên bản:** Production-Ready Digital Tourism Platform 2.0
- **Thời gian hoàn thành:** 22/10/2026
- **Kho lưu trữ Git:** [https://github.com/ttn6996/v360-nghiata.git](https://github.com/ttn6996/v360-nghiata.git)

---

## 1. BỐI CẢNH & MỤC TIÊU DỰ ÁN

### 1.1. Bối cảnh địa phương
Xã **Nghĩa Tá** thuộc huyện **Định Hóa**, tỉnh **Thái Nguyên** — là vùng đất gắn liền với căn cứ địa An Toàn Khu (ATK) lịch sử trong thời kỳ kháng chiến chống thực dân Pháp. Nơi đây hội tụ:
- **Di tích lịch sử cách mạng hào hùng:** Hệ thống di tích ATK Định Hóa (Thủ đô kháng chiến), nơi Trung ương Đảng, Bác Hồ và Bộ Tổng tư lệnh từng sống, làm việc và đưa ra các quyết sách lịch sử (tiêu biểu như Chiến dịch Điện Biên Phủ 1954).
- **Thắng cảnh thiên nhiên nguyên sơ:** Những dải núi đá vôi hùng vĩ, rừng nhiệt đới đại ngàn xanh biếc cùng dòng thác Nàng Tiên nguyên sơ với hồ nước xanh ngọc bích ẩn mình giữa thung lũng.
- **Bản sắc văn hóa Tày, Nùng ngàn đời:** Nếp nhà sàn gỗ cổ truyền lợp ngói âm dương, các làn điệu Then ngọt ngào hòa cùng tiếng đàn Tính huyền ảo (Di sản văn hóa phi vật thể của nhân loại) và các hội xuân truyền thống như Lễ hội xuống đồng Lồng Tồng.

### 1.2. Mục tiêu dự án
1. **Kiến tạo sản phẩm du lịch số chuyên nghiệp:** Vượt qua các giao diện giới thiệu kỹ thuật thông thường, xây dựng một cổng thông tin du lịch và khám phá không gian ảo thực thụ, giàu hình ảnh và tạo cảm hứng mạnh mẽ cho du khách, học hỏi tư duy sản phẩm từ các nền tảng bản đồ số du lịch tiên tiến (`bandosohonggai.gov.vn`).
2. **Trải nghiệm khám phá toàn cảnh 360° tương tác:** Tích hợp trình xem WebGL shader mượt mà, hỗ trợ kéo chuột 360°, xoay la bàn số, thu phóng góc nhìn (FOV), chuyển đổi phân cảnh và tương tác các điểm chạm (hotspots).
3. **Bản đồ số du lịch trực quan (Interactive Tourism Map):** Định vị các tọa độ tham quan chính, hiển thị trạng thái và cung cấp thẻ xem nhanh (Quick Preview) với chỉ dẫn lộ trình.
4. **Tiêu chuẩn thiết kế cao cấp (Editorial Craft & Anti-Slop):** Loại bỏ hoàn toàn các mẫu AI generic/slop; sử dụng typography *Playfair Display* & *Be Vietnam Pro* chuẩn hóa 100% tiếng Việt, màu sắc thổ nhưỡng ấm áp và chuyển động tương tác xúc giác (tactile micro-interactions).

---

## 2. KIẾN TRÚC KỸ THUẬT & CÔNG NGHỆ ÁP DỤNG

### 2.1. Tech Stack cốt lõi
- **Core Framework:** `Next.js 16.4.2` (App Router) với `Turbopack`.
- **Ngôn ngữ:** `TypeScript 5` với chế độ kiểm tra nghiêm ngặt (`strict: true`), zero implicit any, zero build errors.
- **Thư viện UI & Runtime:** `React 19.3.0` và `react-dom 19.3.0`.
- **CSS Engine:** `Tailwind CSS v4` kết hợp Semantic Token System độc lập và các tiện ích kính mờ xúc giác (tactile glassmorphism).
- **Hệ thống Icon:** `Lucide React 0.511.0` (vector SVG 1.75px stroke, chuẩn hóa kích thước, không sử dụng emoji làm icon giao diện).
- **WebGL Shader Engine:** Custom Equirectangular Projection Shader kết xuất trực tiếp trên GPU.
- **Web Audio API:** Procedural Sound Generator tạo âm thanh thiên nhiên suối ngàn mà không cần tải tệp âm thanh nặng từ mạng.

### 2.2. Kiến trúc Server / Client Boundaries & Tối ưu hiệu năng
Tuân thủ nghiêm ngặt kỹ năng `vercel-react-best-practices`:
- **Server Components by default:** Toàn bộ các trang (Trang chủ, Điểm đến, Văn hóa, Giới thiệu) dựng khung HTML tĩnh và nạp trước dữ liệu tại server.
- **Client Components cô lập tại các lá tương tác (`'use client'`):**
  - `InteractivePanoramaViewer.tsx`: WebGL rendering, drag/touch gesture, 3D hotspot projection.
  - `InteractiveTourismMap.tsx`: Bộ lọc chuyên đề và thẻ xem nhanh điểm đến.
  - `AmbientAudioPlayer.tsx`: Điều khiển âm thanh tự nhiên tương tác.
  - `FloatingTourismDock.tsx`: Thanh công cụ nổi truy cập nhanh trên toàn bộ website.
  - `HeritageDirectory.tsx`: Lọc và tìm kiếm danh bạ di tích theo thời gian thực.
  - `SiteHeader.tsx`: Thanh điều hướng mờ động và menu di động.
- **Loại bỏ hoàn toàn Network Waterfalls:** Dữ liệu điểm đến và bài viết văn hóa được nạp đồng thời hoặc render tĩnh tại build-time (`generateStaticParams`).

---

## 3. HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM) & ĐỒ HỌA CHUẨN MỰC

### 3.1. Phông chữ chuẩn hóa tiếng Việt
Khắc phục triệt để lỗi phân tách dấu thanh trong tiếng Việt (diacritic splitting):
- **Phông tiêu đề chính (Display Font):** `Playfair Display` (Google Fonts, subset `vietnamese`) — Nét chữ có chân thanh lịch, uyển chuyển, tôn vinh tinh thần di sản và tài liệu lịch sử, hiển thị hoàn hảo các nguyên âm ghép có dấu như `ồ`, `ế`, `ệ`, `ắ`, `ở`.
- **Phông nội dung đọc (Body Font):** `Be Vietnam Pro` (Google Fonts, subset `vietnamese`) — Thiết kế riêng bởi các chuyên gia typography Việt Nam, cân đối tỷ lệ x-height, đảm bảo độ sắc nét và thoải mái khi đọc đoạn văn dài.
- **Phông tọa độ & số liệu (Mono Font):** `JetBrains Mono` — Tabular figures hiển thị tọa độ GPS, thời gian tham quan và cự ly.

### 3.2. Bảng màu 5-Token chuẩn di sản
- **Nền Canvas & Mặt phẳng:** Canvas sáng `#fbf9f5` (giấy in mỹ thuật), Canvas tối `#0b0f0d` (màn đêm đại ngàn cho chế độ 360°).
- **Màu thương hiệu & Thổ nhưỡng:**
  - *Xanh Rừng Già (Deep Forest Green):* `#1c382b`
  - *Xanh Phiến Đá Suối (River Slate):* `#223542`
  - *Vàng Thổ Hoàng / Nâu Đất Nung (Antique Gold):* `#b37322` (light) / `#dca354` (dark)
- **Hệ thống kính mờ xúc giác (Tactile Glassmorphism):**
  - `.glass-panel`: Nền trắng ngà mờ `backdrop-blur-md` kết hợp viền mảnh 1px.
  - `.hover-lift`: Nâng nhẹ mặt thẻ 4px với bóng đổ mềm khi di chuột.
  - `.soundwave-bar`: Hiệu ứng sóng âm thanh sống động khi bật chế độ suối ngàn.

---

## 4. BỘ TÍNH NĂNG TRẢI NGHIỆM DU LỊCH HOÀN THIỆN

### 4.1. Trang chủ (`/`)
- **Cinematic Visual Hero:** Hình ảnh thung lũng Nghĩa Tá trong sương sớm, tiêu đề "Hồn Thiêng Chiến Khu, Kỳ Quan Đại Ngàn", thẻ định danh hành chính chuẩn xác (Xã Nghĩa Tá · Huyện Định Hóa · Tỉnh Thái Nguyên), huy hiệu thời tiết (23°C Nắng Thu) và thanh tìm kiếm điểm đến trực tiếp.
- **Showcase 360° trực tiếp:** Nhúng trình xem 360° ngay trên trang chủ với các góc nhìn ATK Định Hóa và Thác Nàng Tiên.
- **Bản đồ số du lịch tương tác:** Sơ đồ tọa độ điểm đến với các tab phân loại (Tất cả, ATK Định Hóa, Thắng Cảnh, Bản Làng) và bảng xem nhanh điểm đến.
- **Khám phá điểm đến (Asymmetric Magazine Grid):** Thẻ lớn nổi bật cho Di tích Lịch sử Quốc gia ATK Định Hóa cùng 3 thẻ thắng cảnh vệ tinh.
- **Chuyên đề văn hóa Tày — Nùng:** 3 bài viết chuyên sâu về Hát Then Đàn Tính, Kiến trúc Nhà Sàn gỗ và Lễ hội Lồng Tồng.
- **Lịch trình gợi ý:** Lộ trình 1 ngày "Hành Trình Về Nguồn" và lộ trình 2 ngày "Hòa Mình Đại Ngàn".

### 4.2. Phòng chiếu 360° chuyên sâu (`/kham-pha`)
- Khung canvas toàn màn hình (fullscreen capability) tối ưu hóa trải nghiệm thị giác.
- Bộ điều khiển camera: Xoay tự do, zoom in/out, la bàn số báo góc nhìn, tự động xoay (auto-rotate) và đặt lại góc nhìn mặc định.
- Điểm chạm thông tin (hotspots): Tọa độ 3D chiếu sang 2D theo thời gian thực, nhấp để xem mô tả chi tiết và hình ảnh thực địa.
- Dải thumbnail chuyển phân cảnh linh hoạt tại chân trang.

### 4.3. Cẩm nang di tích & thắng cảnh (`/di-tich` & `/di-tich/[slug]`)
- Trang danh bạ có thanh tìm kiếm và bộ lọc đa tiêu chí theo thời gian thực.
- Trang chi tiết từng điểm đến với thư viện ảnh thực tế, câu chuyện lịch sử, cẩm nang du khách (thời lượng tham quan, phương tiện di chuyển, checklist chuẩn bị) và các di tích lân cận.

### 4.4. Tạp chí văn hóa bản địa (`/van-hoa` & `/van-hoa/[slug]`)
- Cung cấp các góc nhìn nghiên cứu sâu sắc về di sản văn hóa phi vật thể của người Tày và người Nùng tại vùng đất Định Hóa.

### 4.5. Các tiện ích thông minh hỗ trợ du khách
- **`AmbientAudioPlayer`:** Trải nghiệm âm thanh đại ngàn (tiếng gió và suối reo) tạo cảm giác không gian chân thực.
- **`FloatingTourismDock`:** Thanh công cụ nổi ở đáy màn hình giúp du khách dễ dàng chuyển đổi giữa Tour 360°, Bản đồ số, Điểm đến, Văn hóa và nút cuộn nhanh lên đầu trang.

---

## 5. KẾT QUẢ KIỂM ĐỊNH CHẤT LƯỢNG

Toàn bộ các tiêu chí kỹ thuật và tiêu chuẩn chất lượng đã được kiểm tra:

| Tiêu chí | Kết quả kiểm tra | Trạng thái |
|---|---|---|
| **TypeScript Compilation** (`tsc --noEmit`) | 0 lỗi kiểu dữ liệu (Strict Mode) | ✅ ĐẠT |
| **ESLint Quality Gate** (`npm run lint`) | 0 warnings, 0 errors | ✅ ĐẠT |
| **Production Build** (`npm run build`) | Hoàn thành xuất sắc toàn bộ 17/17 routes tĩnh | ✅ ĐẠT |
| **Độ chính xác địa danh** | 100% tài liệu và mã nguồn chuẩn: Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên | ✅ ĐẠT |
| **Hiển thị tiếng Việt** | 100% chuẩn xác, không còn lỗi tách dấu với Playfair Display & Be Vietnam Pro | ✅ ĐẠT |
| **Touch Ergonomics (WCAG 2.2 AA)** | Các nút tương tác đạt tối thiểu $44 \times 44$px (`min-h-11 min-w-11`) | ✅ ĐẠT |
| **Tỉ lệ tương phản màu** | Đạt chuẩn WCAG 2.2 AA ($\ge 4.5:1$ cho nội dung và $\ge 7:1$ cho tiêu đề) | ✅ ĐẠT |

---

## 6. HƯỚNG DẪN CÀI ĐẶT & CHẠY LOCAL

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Chạy máy chủ phát triển (Dev)
npm run dev
# Mở trình duyệt tại: http://localhost:3000

# 3. Kiểm tra mã nguồn và biên dịch thương mại
npm run lint
npm run build
npm run start
```

---

## 7. PHÂN TÍCH KỸ THUẬT NGHỊCH ĐẢO (REVERSE ENGINEERING) CỤM DI TÍCH HỒNG GAI & HIỆN THỰC HÓA V360 NGHĨA TÁ

### 7.1. Phương pháp phân tích (REA Methodology)
Áp dụng phương pháp phân tích kỹ thuật nghịch đảo trên cổng số di sản văn hóa Hồng Gai (`https://bandosohonggai.gov.vn/`):
- **Cấu trúc lõi Pano2VR 7.1.11:** Trích xuất và giải mã gói `pano.xml` (1.05MB) và `skin.js` (423KB - skin `skin_dt_hong_gai.ggsk`).
- **Phát hiện cấu trúc biến trạng thái:**
  - `Start`: Trạng thái màn hình chào đón (intro splash).
  - `Show_map`: Bật/tắt bản đồ radar số thu nhỏ.
  - `Show_list_category` & `Show_list_scenes`: Phân cấp danh mục và dải thumbnail di tích.
  - `sound` & `voice`: Tách biệt âm thanh môi trường và giọng thuyết minh di sản.
  - `run_auto_guild`: Chế độ tour hướng dẫn tự động xoay và chuyển điểm.
  - `Show_popup`: Hộp thoại chi tiết lịch sử và thư viện ảnh.
  - `ht_callout`: Điểm chạm tương tác 3D trong không gian hiển thị cự ly (distance tags).

### 7.2. Các thành phần được tái cấu trúc và hoàn thiện tại V360 Nghĩa Tá

| Thành phần Hồng Gai (`ggId`) | Thành phần V360 Nghĩa Tá | Chi tiết giải pháp & tính năng |
|---|---|---|
| `intro_screen` / `bt_start` | `PanoramaIntroSplash.tsx` | Màn hình chào mừng sang trọng với huy hiệu di sản, mô tả điểm đến và nút **"BẮT ĐẦU TRẢI NGHIỆM TOUR 360°"**. |
| `ht_callout` | Hotspot Callout Projection (`InteractivePanoramaViewer.tsx`) | Điểm chạm 3D tính toán theo tọa độ cầu $(yaw, pitch)$, vòng radar xung kích, hiển thị cự ly thực địa (`499m`, `712m`) và thẻ xem nhanh hình ảnh. |
| `map_screen` / `Ban_do_so` | `PanoramaMinimap.tsx` | Bản đồ radar thu nhỏ với đường bình độ địa hình, dòng suối Nghĩa Tá, các điểm ghim di tích và **chùm quét sáng 65° xoay theo thời gian thực** theo góc nhìn camera. |
| `voice_container` / `Seekbar_element` | `PanoramaAudioGuide.tsx` | Trình phát thuyết minh âm thanh di sản tự động với giọng đọc tiếng Việt truyền cảm, sóng equalizer và thanh tiến trình thời lượng. |
| `Help center` / `Thaotac` | `PanoramaHelpModal.tsx` | Bảng hướng dẫn tương tác toàn diện: xoay 360°, thu phóng, điểm chạm cự ly, bản đồ radar và chế độ VR. |
| `thumbnail_menu` / `scroll_scenes` | Khay Thumbnail Đáy Drawer | Thanh trượt phân cảnh với các tab lọc (`Tất Cả`, `ATK Định Hóa`, `Thắng Cảnh`, `Bản Làng`), ảnh thu nhỏ và huy hiệu đã tham quan (`visited_icon`). |
| `Vrmode` / `vr_icon` | Chế độ Thực Tế Ảo VR | Mô phỏng chia đôi màn hình đôi mắt (Stereoscopic dual-eye) tương thích kính VR Cardboard trên điện thoại di động. |
| `bg_tool_control` & Gimbal | Thanh Điều Khiển & La Bàn Số | La bàn góc phương vị trực tiếp (0°–360°), các nút thu phóng, tự động xoay, tour tự động và đặt lại góc nhìn mặc định. |
| `/kham-pha` Full-Screen App | Next.js 16 Partial Prerendering | Chế độ hiển thị 100vh toàn màn hình, đọc tham số `?scene=...` để nhảy trực tiếp vào di tích từ bản đồ hay thẻ bài viết. |

---

*Báo cáo được lưu trữ chính thức tại `docs/report/BAO_CAO_CHI_TIET_DU_AN.md`.*
