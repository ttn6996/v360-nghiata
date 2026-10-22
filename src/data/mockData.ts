// ============================================================
// V360 NGHĨA TÁ — Mock Dataset
// [DỮ LIỆU THỬ NGHIỆM / DEMO ASSET]
// All entries below are prototype data assembled from publicly
// available references to Chợ Đồn (Bắc Kạn) cultural heritage.
// Coordinates are approximate. No classified or private data included.
// This dataset MUST be replaced with verified archival sources
// before any public release.
// ============================================================

import type { HeritageSite, PanoramaScene, CulturalArticle } from "@/types/heritage";

export const heritageSites: HeritageSite[] = [
  {
    id: "atk-cho-don",
    slug: "atk-cho-don",
    title: "Khu ATK Chợ Đồn",
    subtitle: "Căn cứ địa Cách mạng kháng chiến chống Pháp",
    category: "lich-su-cach-mang",
    status: "demo",
    coordinates: { lat: 22.1561, lng: 105.6137 },
    description:
      "Khu An Toàn Khu (ATK) Chợ Đồn là một trong những căn cứ địa quan trọng của cách mạng Việt Nam trong cuộc kháng chiến chống thực dân Pháp (1946–1954). Nơi đây từng che chở nhiều cơ quan đầu não kháng chiến giữa đại ngàn rừng núi Việt Bắc.",
    historicalContext:
      "ATK Việt Bắc — bao gồm Chợ Đồn và các huyện lân cận — là hệ thống căn cứ bí mật trải rộng qua rừng núi Bắc Kạn, Tuyên Quang và Thái Nguyên. Nhiều di tích lịch sử vẫn còn nguyên vẹn trong lòng rừng già.",
    thumbnailColor: "#1c382b",
    panoramaSceneId: "scene-atk-forest",
    visitingNotes:
      "Trang phục phù hợp với vùng núi. Tôn trọng không gian lịch sử. Không di dời hiện vật.",
    readTime: 5,
  },
  {
    id: "thac-nang-tien",
    slug: "thac-nang-tien",
    title: "Thác Nàng Tiên",
    subtitle: "Thắng cảnh núi rừng nguyên sinh Nghĩa Tá",
    category: "thang-canh-tu-nhien",
    status: "demo",
    coordinates: { lat: 22.1723, lng: 105.6248 },
    description:
      "Thác nước giữa lòng rừng nguyên sinh với dòng chảy mát lành quanh năm. Khung cảnh núi đá vôi hùng vĩ bao quanh tạo nên vẻ đẹp nguyên thủy và thơ mộng hiếm có của vùng cao Chợ Đồn.",
    thumbnailColor: "#223542",
    visitingNotes: "Mùa tham quan tốt nhất: tháng 4–10. Mang giày chống trơn trượt.",
    readTime: 3,
  },
  {
    id: "ban-lang-tay-nung",
    slug: "ban-lang-tay-nung",
    title: "Bản làng Tày — Nùng",
    subtitle: "Không gian văn hóa bản địa truyền thống",
    category: "van-hoa-ban-lang",
    status: "demo",
    coordinates: { lat: 22.1645, lng: 105.6095 },
    description:
      "Các bản làng Tày và Nùng tại Nghĩa Tá vẫn bảo tồn kiến trúc nhà sàn truyền thống, trang phục thổ cẩm đặc trưng và nếp sinh hoạt cộng đồng gắn bó chặt chẽ với thiên nhiên và mùa màng.",
    thumbnailColor: "#b37322",
    panoramaSceneId: "scene-ban-lang",
    readTime: 4,
  },
  {
    id: "rung-nguyen-sinh",
    slug: "rung-nguyen-sinh",
    title: "Rừng Đại Ngàn Nghĩa Tá",
    subtitle: "Đa dạng sinh thái vùng núi đá vôi Bắc Kạn",
    category: "thang-canh-tu-nhien",
    status: "demo",
    coordinates: { lat: 22.1589, lng: 105.6312 },
    description:
      "Hệ sinh thái rừng nhiệt đới trên nền đá vôi cổ đại với quần thể thực vật phong phú. Rừng nguyên sinh là lá phổi xanh và cũng là vùng đệm bảo vệ hệ thống suối, sông phục vụ đời sống nông nghiệp địa phương.",
    thumbnailColor: "#256a42",
    readTime: 4,
  },
];

export const panoramaScenes: PanoramaScene[] = [
  {
    id: "scene-atk-forest",
    title: "Khu Rừng ATK Chợ Đồn",
    subtitle: "Không gian rừng già lịch sử — [DỮ LIỆU THỬ NGHIỆM]",
    status: "demo",
    equirectangularImageUrl: "/panoramas/placeholder-forest.jpg",
    initialYaw: 0,
    initialPitch: 0,
    hotspots: [
      {
        id: "hs-atk-trail",
        yaw: 45,
        pitch: -10,
        label: "Lối mòn cách mạng",
        description: "Con đường mòn lịch sử từng được dùng trong thời kỳ kháng chiến.",
      },
      {
        id: "hs-stream",
        yaw: 190,
        pitch: -15,
        label: "Suối trong rừng",
        description: "Nguồn nước tự nhiên chảy quanh năm.",
        linkedSceneId: "scene-ban-lang",
      },
    ],
    linkedSiteId: "atk-cho-don",
  },
  {
    id: "scene-ban-lang",
    title: "Bản Làng Tày Truyền Thống",
    subtitle: "Không gian nhà sàn bản địa — [DỮ LIỆU THỬ NGHIỆM]",
    status: "demo",
    equirectangularImageUrl: "/panoramas/placeholder-village.jpg",
    initialYaw: 90,
    initialPitch: 0,
    hotspots: [
      {
        id: "hs-nha-san",
        yaw: 120,
        pitch: -5,
        label: "Nhà sàn truyền thống",
        description: "Kiến trúc nhà sàn Tày với cột gỗ chắc chắn và sàn tre nứa.",
      },
    ],
    linkedSiteId: "ban-lang-tay-nung",
  },
];

export const culturalArticles: CulturalArticle[] = [
  {
    id: "hat-then-dan-tinh",
    slug: "hat-then-dan-tinh",
    title: "Hát Then — Đàn Tính: Linh hồn âm nhạc người Tày",
    category: "Âm nhạc Dân gian",
    excerpt:
      "Hát Then và đàn Tính là di sản phi vật thể của người Tày Bắc Kạn, được UNESCO công nhận năm 2019. Giai điệu ngân vang giữa núi rừng Việt Bắc mang theo lời cầu phúc và tâm tình của bao thế hệ.",
    contentTeaser:
      "Trong ánh lửa bập bùng của đêm hội bản, tiếng đàn Tính ba dây rung lên những nốt nhạc cổ xưa. Người nghệ nhân Tày ngồi thẳng lưng, tay gảy đàn, miệng hát Then — một hình thức nghi lễ âm nhạc gắn bó với đời sống tâm linh và lễ hội cộng đồng từ hàng trăm năm nay.",
    author: "Ban biên tập V360 Nghĩa Tá",
    source: "Tổng hợp từ tài liệu UNESCO và nghiên cứu văn hóa địa phương",
    readTime: 6,
    status: "demo",
    publishedYear: 2024,
    thumbnailColor: "#b37322",
  },
  {
    id: "kien-truc-nha-san",
    slug: "kien-truc-nha-san",
    title: "Nhà Sàn Tày: Kiến trúc sống giữa núi rừng",
    category: "Kiến trúc Truyền thống",
    excerpt:
      "Nhà sàn của người Tày không chỉ là nơi cư trú mà còn là biểu tượng của sự hòa hợp với thiên nhiên, phản ánh triết lý sống cân bằng giữa con người và môi trường vùng cao.",
    contentTeaser:
      "Đứng trên sàn nhà, gió núi thổi mát lành từ phía rừng. Bên dưới sàn, trâu bò náu mình tránh nắng. Kết cấu nhà sàn truyền thống của người Tày — với cột gỗ nghiến chôn sâu trong đất, sàn tre nứa đan chắc — là bằng chứng sinh động của kỹ thuật xây dựng bản địa tinh tế.",
    author: "Ban biên tập V360 Nghĩa Tá",
    source: "Nghiên cứu kiến trúc dân gian Bắc Kạn",
    readTime: 5,
    status: "demo",
    publishedYear: 2024,
    thumbnailColor: "#1c382b",
  },
  {
    id: "le-hoi-long-tong",
    slug: "le-hoi-long-tong",
    title: "Lễ hội Lồng Tồng: Ngày xuống đồng của người Tày",
    category: "Lễ hội Dân gian",
    excerpt:
      "Lồng Tồng — lễ hội xuống đồng — là nghi lễ nông nghiệp quan trọng nhất của người Tày, diễn ra vào mùa xuân với cầu mong mùa màng bội thu và cuộc sống bình an.",
    contentTeaser:
      "Vào ngày Lồng Tồng, cả bản làng tập hợp ra cánh đồng. Những mâm cúng được bày biện trang trọng với xôi màu, bánh chưng và hoa quả địa phương. Tiếng trống, tiếng chiêng nổi lên, và người dân cùng nhau cày những luống đất đầu tiên của năm mới.",
    author: "Ban biên tập V360 Nghĩa Tá",
    source: "Dữ liệu cộng đồng và tài liệu dân tộc học",
    readTime: 7,
    status: "demo",
    thumbnailColor: "#223542",
  },
];
