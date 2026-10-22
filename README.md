# v360-nghiata

> **V360 Nghĩa Tá** — Nền tảng web khám phá di sản lịch sử cách mạng, danh lam thắng cảnh và văn hóa truyền thống xã Nghĩa Tá, huyện Chợ Đồn, tỉnh Bắc Kạn qua trải nghiệm không gian 360°.

---

## 🌟 Giới Thiệu Dự Án

V360 Nghĩa Tá được xây dựng theo định hướng thẩm mỹ **Editorial Cinematic Heritage**, kết hợp giữa câu chuyện di sản có chiều sâu và công nghệ khám phá không gian ảo 360 độ hiện đại.

- **Địa bàn:** Xã Nghĩa Tá, Huyện Chợ Đồn, Tỉnh Bắc Kạn (Tọa độ: `22°09′22″N 105°36′49″E`)
- **Đặc trưng di sản:** Vùng ATK cách mạng thời kháng chiến chống Pháp; danh thắng Thác Nàng Tiên; bản sắc văn hóa Tày, Nùng (Hát Then Đàn Tính, nhà sàn, Lễ hội Lồng Tồng).
- **Nguyên tắc cốt lõi:** Tính chân thực di sản (Heritage Truthfulness), minh bạch dữ liệu (`[ĐÃ XÁC MINH]` vs `[DỮ LIỆU THỬ NGHIỆM]`).

---

## 🛠 Công Nghệ & Kiến Trúc

- **Framework:** [Next.js 16.4.2](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering)
- **Runtime & UI:** React 19, TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 với Semantic Token System độc lập
- **Icons:** Lucide React (1.75px stroke, no generic emoji)
- **Architecture:** Server Components by default, thu hẹp Client Boundaries tối đa, zero waterfalls
- **Aesthetics:** Tuân thủ 12 nguyên tắc Anti-Slop Design, phông chữ *Newsreader* (Display serif) & *Be Vietnam Pro* (Body sans-serif)

---

## 🧭 Cấu Trúc Website & Routes

- `/` — Trang chủ: Cinematic Hero, Bản đồ điểm chạm tương tác, Khám phá 360 preview, Không gian di sản văn hóa, Chân trang bản địa.
- `/kham-pha` — Trải nghiệm Tour 360°: Canvas tối chuyên dụng, điều khiển hướng nhìn/zoom, danh sách điểm di sản 360°.
- `/di-tich` — Danh mục Di tích & Thắng cảnh: Bộ lọc chuyên đề (Lịch sử cách mạng, Thắng cảnh tự nhiên, Văn hóa bản làng).
- `/di-tich/[slug]` — Chi tiết từng di tích: ATK Chợ Đồn, Thác Nàng Tiên, Bản làng Tày - Nùng, Rừng đại ngàn.
- `/van-hoa` — Lưu trữ chuyên đề di sản văn hóa phi vật thể.
- `/van-hoa/[slug]` — Chi tiết văn hóa: Hát Then Đàn Tính, Kiến trúc Nhà Sàn, Lễ hội Lồng Tồng.
- `/gioi-thieu` — Tôn chỉ dự án, 3 nguyên tắc bảo tồn, quy trình 4 bước số hóa di sản.
- `/not-found` — Trang 404 tùy biến.

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
- 📖 [Đặc Tả Dự Án (Project Brief)](docs/PROJECT_BRIEF.md)

---

## 📄 Bản Quyền & Giấy Phép

Dự án phi thương mại vì mục tiêu bảo tồn và quảng bá di sản văn hóa địa phương xã Nghĩa Tá, huyện Chợ Đồn, tỉnh Bắc Kạn.
