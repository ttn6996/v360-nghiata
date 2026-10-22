# v360-nghiata

> **V360 Nghĩa Tá** — Cổng thông tin du lịch và nền tảng khám phá di sản 360° tương tác xã Nghĩa Tá, huyện Định Hóa, tỉnh Thái Nguyên.

---

## 🌟 Giới Thiệu Dự Án

V360 Nghĩa Tá được xây dựng theo định hướng thẩm mỹ **Editorial Cinematic Heritage**, kết hợp giữa nghệ thuật kể chuyện di sản có chiều sâu và công nghệ khám phá không gian ảo 360 độ hiện đại, lấy cảm hứng từ các nền tảng bản đồ số du lịch tiên tiến (`bandosohonggai.gov.vn`).

- **Địa bàn:** Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên (Căn cứ địa cách mạng ATK Định Hóa lịch sử).
- **Đặc trưng di sản:** Vùng ATK Định Hóa thời kỳ kháng chiến chống thực dân Pháp; danh thắng sinh thái Thác Nàng Tiên; bản sắc văn hóa Tày, Nùng (Hát Then Đàn Tính, kiến trúc nhà sàn gỗ cổ truyền, Lễ hội Lồng Tồng).
- **Trải nghiệm du khách:** Khám phá Khám phá toàn cảnhảo 360° với bộ điều khiển camera mượt mà, bản đồ số du lịch tương tác, âm thanh thiên nhiên suối ngàn đại ngàn và cẩm nang lịch trình 1 ngày / 2 ngày.

---

## 🛠 Công Nghệ & Kiến Trúc

- **Framework:** [Next.js 16.4.2](https://nextjs.org/) (App Router, Turbopack, Server Components by default)
- **Runtime & UI:** React 19, TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 với Semantic Token System độc lập
- **Icons:** Lucide React (vector SVG, 1.75px stroke, chuẩn Anti-Slop)
- **Typography:** _Playfair Display_ (Display Serif cao cấp, hỗ trợ 100% tiếng Việt chuẩn) & _Be Vietnam Pro_ (Body sans-serif được thiết kế riêng cho tiếng Việt)
- **Đặc tả tương tác:**
  - `InteractivePanoramaViewer`: WebGL Equirectangular Shader rendering thời gian thực, hỗ trợ kéo chuột 360°, xoay la bàn số, thu phóng góc nhìn (FOV), chuyển đổi phân cảnh và điểm chạm (hotspots).
  - `InteractiveTourismMap`: Bản đồ số du lịch định vị các tọa độ di tích ATK, thác nước, bản làng với bộ lọc phân loại và thẻ thông tin chi tiết.
  - `AmbientAudioPlayer`: Bộ phát âm thanh tự nhiên tổng hợp (tiếng suối reo, gió ngàn) qua Web Audio API, tải tức thì không phụ thuộc băng thông.
  - `FloatingTourismDock`: Thanh công cụ du lịch nổi thông minh cho phép truy cập nhanh 1 chạm tới Khám phá toàn cảnh360°, Bản đồ số, Di tích, Văn hóa và thời tiết thực tế.

---

## 🧭 Cấu Trúc Website & Routes

- `/` — **Trang Chủ**: Cinematic Hero với công cụ tìm kiếm nhanh, điểm nhấn 360° trực tiếp, bản đồ số du lịch, danh lam nổi bật, câu chuyện văn hóa Tày - Nùng và lịch trình gợi ý.
- `/kham-pha` — **Khám phá toàn cảnh360° Toàn Cảnh**: Phòng chiếu không gian ảo tương tác cao, chuyển đổi phân cảnh ATK Định Hóa, Thác Nàng Tiên và nhà sàn.
- `/di-tich` — **Danh Mục Điểm Đến**: Bộ lọc danh mục (ATK Định Hóa, Thắng cảnh, Bản làng) và thanh tìm kiếm trực tiếp.
- `/di-tich/[slug]` — **Chi Tiết Di Tích**: Thư viện ảnh thực địa, thông tin lịch sử, cẩm nang du khách (thời gian tham quan, phương tiện, vật dụng cần chuẩn bị) và điểm đến lân cận.
- `/van-hoa` — **Tạp Chí Văn Hóa**: Các chuyên đề di sản văn hóa phi vật thể Hát Then Đàn Tính, Kiến trúc nhà sàn Tày, Lễ hội Lồng Tồng.
- `/van-hoa/[slug]` — **Chi Tiết Chuyên Đề Văn Hóa**: Bài viết sâu sắc, trích dẫn văn hóa và các bài đọc liên quan.
- `/gioi-thieu` — **Cẩm Nang & Lời Chào Nghĩa Tá**: Thông tin địa giới hành chính, bản đồ khí hậu và liên hệ UBND Xã Nghĩa Tá, Định Hóa, Thái Nguyên.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Thử

### Yêu cầu

- Node.js 18.18+ (Khuyến nghị Node 20+ hoặc 22+)
- Trình quản lý gói `npm`

### Chạy môi trường phát triển (Dev)

```bash
npm install
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

### Kiểm tra Lint & Biên Dịch Production

```bash
npm run lint
npm run build
npm run start
```

---

## 📁 Tài Liệu Báo Cáo & Đặc Tả

- 📄 [Báo Cáo Chi Tiết Dự Án](docs/report/BAO_CAO_CHI_TIET_DU_AN.md)
- 🎨 [Đặc Tả Hệ Thống Thiết Kế (Design System)](docs/DESIGN_SYSTEM.md)
- 🗺 [Sơ Đồ Tuyến Đường (Site Map)](docs/SITE_MAP.md)
- 📋 [Kế Hoạch Triển Khai (Implementation Plan)](docs/IMPLEMENTATION_PLAN.md)

---

## 📄 Bản Quyền & Giấy Phép

Dự án phi thương mại vì mục tiêu bảo tồn và quảng bá di sản văn hóa địa phương xã Nghĩa Tá, huyện Định Hóa, tỉnh Thái Nguyên.
