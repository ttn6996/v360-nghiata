# Site Map & Route Architecture: V360 Nghĩa Tá

**Platform:** Next.js App Router  
**Document Status:** Initial Route Specification  
**Version:** 1.0.0  

---

## 1. Global Navigation Hierarchy

```
[V360 Nghĩa Tá]
├── / (Trang Chủ — Cinematic Narrative & Portal)
│
├── /kham-pha (Không Gian Khám Phá 360° — Virtual Tour Explorer)
│   └── ?diem=[slug] (Deep-link directly into a specific 360 panorama scene)
│
├── /di-tich (Danh Mục Điểm Đến & Di Tích Lịch Sử)
│   └── /di-tich/[slug] (Trang Chi Tiết Di Tích / Thắng Cảnh)
│
├── /van-hoa (Di Sản Văn Hóa & Đời Sống Bản Địa)
│   └── /van-hoa/[slug] (Bài Viết Chuyên Đề Văn Hóa)
│
└── /gioi-thieu (Về Dự Án V360 Nghĩa Tá & Minh Bạch Dữ Liệu)
```

---

## 2. Route Responsibilities & Specifications

### 1. `/` — Trang Chủ (Cinematic Heritage Homepage)
- **Role:** The emotional and visual gateway into Nghĩa Tá. Establishes the editorial tone, natural atmosphere, and historical reverence.
- **Key Sections:**
  - **Cinematic Prologue Hero:** Atmospheric landscape view with evocative title, narrative lead paragraph, and immediate primary action: *"Khám Phá Toàn Cảnh 360°"*.
  - **Bản Đồ Điểm Chạm (Curated Explorer Preview):** Asymmetric editorial showcase of 3–4 key heritage areas.
  - **Dòng Chảy Lịch Sử (Historical Vignette):** Brief, respectful introduction to the revolutionary ATK heritage of Chợ Đồn.
  - **Âm Vang Rừng Đại Ngàn (Cultural Highlight):** Brief audio/visual glimpse into traditional Tày/Nùng folk life.
  - **Minh Bạch & Tuyên Bố Dữ Liệu:** Clear disclaimer regarding project development status and asset verification.
- **Rendering Strategy:** Static Server Component (`generateStaticParams` / SSG) for instantaneous first-paint.

---

### 2. `/kham-pha` — Không Gian Khám Phá 360° (Interactive Virtual Tour)
- **Role:** The centerpiece interactive viewer where users immerse themselves in 360° spherical panoramas of Nghĩa Tá.
- **Key Features:**
  - **360° Canvas Container:** High-performance equirectangular panorama viewport (supports mouse drag, touch swipe, gyroscope on mobile, and fullscreen toggle).
  - **Interactive Hotspots:** Floating pins within the 360 scene linking to neighboring scenes or informative detail popups.
  - **Scene Switcher (Drawer/Rail):** Bottom thumbnail drawer allowing rapid jumping between locations.
  - **Spatial Info Sheet:** Sliding drawer providing historical notes, verified status, and directions.
- **Rendering Strategy:** Server Component shell wrapping a lazy-loaded Client Component viewer (`next/dynamic` with `ssr: false`).

---

### 3. `/di-tich` — Danh Mục Di Tích & Danh Thắng (Landmarks Directory)
- **Role:** Organized, searchable repository of all points of interest, historical monuments, and scenic locations in Nghĩa Tá.
- **Key Features:**
  - **Page-Level Category Filter:** Filter by *Di tích Lịch sử Cách mạng*, *Danh lam Thắng cảnh Tự nhiên*, *Không gian Văn hóa Bản làng*.
  - **Status Filter:** Toggle to view *Đã xác minh* vs. *Dữ liệu đang khảo sát*.
  - **Editorial Destination Cards:** High-fidelity imagery, title, short synopsis, GPS tag, and link to in-depth article or 360 view.
- **Rendering Strategy:** Server Component with lightweight client-side filter state.

---

### 4. `/di-tich/[slug]` — Chi Tiết Điểm Đến (Destination Detail Page)
- **Role:** Deep-dive editorial article for an individual location.
- **Key Features:**
  - **Hero Header:** Large documentary photography, verified coordinates, historical classification.
  - **Rich Article Body:** Formatted typography, archival photographs, architectural details (e.g. stilt house craftsmanship, cave geography).
  - **Embedded Mini-360 Portal:** Button or preview box directly launching the 360 tour at this exact scene.
  - **Practical Travel Notes:** Recommended visiting etiquette, seasonal weather guidance.
- **Rendering Strategy:** Dynamic Server Component with `generateStaticParams`.

---

### 5. `/van-hoa` & `/van-hoa/[slug]` — Di Sản Văn Hóa & Phong Tục (Cultural Archive)
- **Role:** Preserves non-material cultural heritage (intangible heritage) of Nghĩa Tá's ethnic communities.
- **Topics Covered (Subject to local ethnography review):**
  - Nghệ thuật Hát Then, đàn Tính của đồng bào Tày.
  - Kiến trúc Nhà Sàn truyền thống và nếp sống cộng đồng.
  - Lễ hội bản địa (Lễ hội Lồng Tồng / xuống đồng).
  - Ẩm thực truyền thống và nông sản đặc trưng vùng cao Chợ Đồn.
- **Rendering Strategy:** Markdown / MDX-driven static Server Components.

---

### 6. `/gioi-thieu` — Về Dự Án V360 Nghĩa Tá (About & Methodology)
- **Role:** Establishes credibility, attribution, and institutional transparency.
- **Key Features:**
  - Mission statement: Digital preservation and sustainable cultural promotion.
  - Methodology for capturing 360 imagery and documenting heritage.
  - Open data declaration: Distinguishing verified archival sources from prototype assets.
  - Community feedback and contact channel for historians, elders, and contributors.
- **Rendering Strategy:** Static Server Component.

---

## 3. Assumptions & Open Questions Regarding Routes

> [!NOTE]
> - `[OPEN QUESTION]`: How many distinct 360° nodes will be ready for the initial public launch? (The route `/kham-pha` is architected to gracefully scale from 1 demo panorama up to 50+ interconnected nodes).
> - `[OPEN QUESTION]`: Will local authorities provide official administrative boundaries or an approved vector map of Nghĩa Tá commune? (If unavailable, `/kham-pha` will rely on an interactive thumbnail carousel rather than an inaccurate geographic map).
