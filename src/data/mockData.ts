// ============================================================
// V360 NGHĨA TÁ — DỮ LIỆU ĐIỂM ĐẾN & DI SẢN DU LỊCH SỐ
// Địa bàn: Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên
// ============================================================

import type { HeritageSite, PanoramaScene, CulturalArticle } from "@/types/heritage";

export const heritageSites: HeritageSite[] = [
  {
    id: "atk-dinh-hoa",
    slug: "atk-dinh-hoa",
    title: "Khu Di Tích ATK Định Hóa",
    subtitle: "Căn cứ địa cách mạng — Thủ đô kháng chiến hào hùng",
    category: "lich-su-cach-mang",
    locationName: "Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên",
    coordinates: { lat: 21.9167, lng: 105.6500, altitude: 420 },
    description:
      "Vùng đất An Toàn Khu (ATK) Định Hóa là căn cứ địa đầu não của Trung ương Đảng, Chính phủ và Chủ tịch Hồ Chí Minh trong suốt 9 năm trường kỳ kháng chiến chống thực dân Pháp (1946–1954). Ẩn mình dưới tán rừng già xanh mướt của Nghĩa Tá và các xã lân cận, hệ thống hầm hào, lán trại, trạm liên lạc bí mật vẫn được gìn giữ trang nghiêm, là điểm về nguồn thiêng liêng của bao thế hệ người Việt.",
    historicalContext:
      "Tại nơi 'Rừng che bộ đội, rừng vây quân thù', Bác Hồ và Đại tướng Võ Nguyên Giáp cùng các đồng chí lãnh đạo đã hoạch định nhiều quyết sách lịch sử, đỉnh cao là Chiến dịch Điện Biên Phủ 'lừng lẫy năm châu, chấn động địa cầu'. Nghĩa Tá tự hào là mảnh đất phên dậu kiên trung trong quần thể ATK Định Hóa lịch sử.",
    imageUrl: "/images/destinations/atk-dinh-hoa.jpg",
    gallery: [
      "/images/destinations/atk-dinh-hoa.jpg",
      "/images/panoramas/pano-atk.jpg",
      "/images/destinations/rung-nghia-ta.jpg",
    ],
    thumbnailColor: "#1c382b",
    panoramaSceneId: "scene-atk-forest",
    visitingNotes:
      "Nên mang trang phục lịch sự khi viếng thăm khu di tích. Đi giày thể thao êm chân vì có những đoạn đường mòn qua tán rừng râm mát.",
    travelTips: {
      bestTime: "Quanh năm, đẹp nhất từ tháng 9 đến tháng 4",
      duration: "2 - 3 giờ tham quan & dâng hương",
      transportation: "Ô tô, xe máy theo Quốc lộ 3C vào trung tâm xã",
      ticket: "Miễn phí vé tham quan",
      preparation: "Mũ nón, nước uống, thuốc xịt côn trùng",
    },
    highlights: [
      "Lán ở và làm việc của cán bộ Trung ương",
      "Bia đá khắc ghi di tích lịch sử cách mạng quốc gia",
      "Đường mòn liên lạc xuyên rừng đại ngàn cổ thụ",
      "Không gian trưng bày hiện vật kháng chiến sinh động",
    ],
    readTime: 5,
  },
  {
    id: "thac-nang-tien",
    slug: "thac-nang-tien",
    title: "Thác Nàng Tiên",
    subtitle: "Dải lụa trắng giữa thung lũng đá vôi nguyên sơ",
    category: "thang-canh-tu-nhien",
    locationName: "Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên",
    coordinates: { lat: 21.9280, lng: 105.6650, altitude: 380 },
    description:
      "Ẩn mình sâu giữa lòng thung lũng đá vôi đại ngàn, Thác Nàng Tiên buông dòng nước trắng xóa nhiều tầng xuống lòng hồ tự nhiên xanh màu ngọc bích. Vách đá rêu phong, thảm dương xỉ cổ sinh và dây leo chằng chịt tạo nên một khung cảnh thần tiên, hoang sơ và trong trẻo tuyệt đối.",
    historicalContext:
      "Gắn liền với truyền thuyết dân gian người Tày về nàng tiên giáng trần say mê cảnh sắc non nước hữu tình mà gửi lại suối tóc thành dòng thác biếc, thắng cảnh là niềm tự hào về vẻ đẹp nguyên thủy được bà con gìn giữ qua nhiều thế hệ.",
    imageUrl: "/images/destinations/thac-nang-tien.jpg",
    gallery: [
      "/images/destinations/thac-nang-tien.jpg",
      "/images/panoramas/pano-thac-tien.jpg",
      "/images/destinations/rung-nghia-ta.jpg",
    ],
    thumbnailColor: "#223542",
    panoramaSceneId: "scene-thac-tien",
    visitingNotes:
      "Mùa nước đẹp nhất từ tháng 4 đến tháng 10. Nên chuẩn bị giày chống trượt và đồ bơi nếu muốn tắm mát tại các vụng nước an toàn.",
    travelTips: {
      bestTime: "Tháng 4 – Tháng 10 (mùa nước trong xanh)",
      duration: "Nửa ngày trải nghiệm & dã ngoại bên suối",
      transportation: "Xe máy hoặc trekking bộ hành 1.5km đường rừng",
      ticket: "Tự do trải nghiệm sinh thái",
      preparation: "Giày bám đá suối, áo phao, túi chống nước điện thoại",
    },
    highlights: [
      "Hồ nước tự nhiên màu ngọc bích quanh năm mát lạnh",
      "3 tầng thác hùng vĩ uốn lượn qua vách đá rêu phong",
      "Thảm thực vật rừng ẩm với dương xỉ và phong lan rừng",
      "Khu vực cắm trại và dã ngoại thư thái bên suối mát",
    ],
    readTime: 4,
  },
  {
    id: "ban-lang-tay-nung",
    slug: "ban-lang-tay-nung",
    title: "Bản Làng Tày — Nùng",
    subtitle: "Không gian sống mộc mạc lưu giữ hồn cốt ngàn đời",
    category: "van-hoa-ban-lang",
    locationName: "Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên",
    coordinates: { lat: 21.9210, lng: 105.6420, altitude: 350 },
    description:
      "Những nếp nhà sàn gỗ lợp ngói âm dương trầm mặc nép mình bên chân núi đá vôi, soi bóng xuống cánh đồng lúa bậc thang uốn lượn. Bản làng người Tày, người Nùng tại Nghĩa Tá là bảo tàng sống động về nếp sống cộng đồng, tiếng thoi đưa dệt thổ cẩm rộn rã và hương khói bếp lam chiều ấm áp.",
    historicalContext:
      "Đồng bào Tày, Nùng Định Hóa là những người một lòng chở che, cưu mang bộ đội và Bác Hồ trong kháng chiến. Tinh thần hiếu khách, chân tình và sự gắn bó máu thịt với núi rừng làm nên sức hút văn hóa vô giá của bản làng.",
    imageUrl: "/images/destinations/ban-lang-tay.jpg",
    gallery: [
      "/images/destinations/ban-lang-tay.jpg",
      "/images/culture/nha-san-tay.jpg",
      "/images/culture/hat-then-dan-tinh.jpg",
    ],
    thumbnailColor: "#b37322",
    panoramaSceneId: "scene-ban-lang",
    visitingNotes:
      "Du khách hãy tôn trọng phong tục nhà sàn: cởi giày trước khi bước lên cầu thang, không ngồi quay lưng vào bàn thờ tổ tiên.",
    travelTips: {
      bestTime: "Mùa lúa chín tháng 5 và tháng 9 - 10",
      duration: "1 ngày hoặc lưu trú homestay qua đêm",
      transportation: "Đường bê tông nông thôn vào tận cổng bản",
      ticket: "Trải nghiệm văn hóa cộng đồng",
      preparation: "Trang phục thoải mái, máy ảnh chụp khoảnh khắc bản làng",
    },
    highlights: [
      "Quần thể nhà sàn gỗ cổ truyền 4-5 gian bề thế",
      "Cây cầu đá cổ bắc qua dòng suối trong vắt đầu bản",
      "Trải nghiệm dệt thổ cẩm chàm và giã bánh dày truyền thống",
      "Lưu trú homestay cùng bữa cơm canh rau rừng, gà đồi",
    ],
    readTime: 5,
  },
  {
    id: "rung-nghia-ta",
    slug: "rung-nghia-ta",
    title: "Rừng Đại Ngàn Nghĩa Tá",
    subtitle: "Kỳ quan sinh thái trên núi đá vôi cổ",
    category: "thang-canh-tu-nhien",
    locationName: "Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên",
    coordinates: { lat: 21.9350, lng: 105.6700, altitude: 550 },
    description:
      "Khu rừng nhiệt đới gió mùa nguyên sinh trải rộng trên các dãy núi đá vôi karst cổ đại. Nơi đây quy tụ nhiều cây cổ thụ hàng trăm năm tuổi với bộ rễ bạnh vè khổng lồ, dây leo chằng chịt và nguồn suối nguồn dồi dào, đóng vai trò là 'lá phổi xanh' điều hòa khí hậu cho toàn vùng Định Hóa.",
    historicalContext:
      "Cánh rừng hiểm trở này từng là bức thành lũy tự nhiên bất khả xâm phạm bảo vệ an toàn cho các cơ quan kháng chiến. Ngày nay, rừng được bảo tồn nghiêm ngặt bởi cộng đồng các thôn bản.",
    imageUrl: "/images/destinations/rung-nghia-ta.jpg",
    gallery: [
      "/images/destinations/rung-nghia-ta.jpg",
      "/images/panoramas/pano-atk.jpg",
      "/images/destinations/thac-nang-tien.jpg",
    ],
    thumbnailColor: "#256a42",
    panoramaSceneId: "scene-atk-forest",
    visitingNotes:
      "Chỉ đi theo các lối mòn đã có người hướng dẫn địa phương. Tuyệt đối không xả rác, không bẻ cành hái hoa rừng quý hiếm.",
    travelTips: {
      bestTime: "Tháng 10 đến tháng 4 năm sau (mùa khô ráo)",
      duration: "3 - 4 giờ trekking khám phá",
      transportation: "Đi bộ dã ngoại theo đường mòn sinh thái",
      ticket: "Miễn phí (khuyến nghị có hướng dẫn viên địa phương)",
      preparation: "Giày trekking chuyên dụng, gậy leo núi, nước uống",
    },
    highlights: [
      "Những cây bạnh vè, lim sến cổ thụ hàng trăm năm tuổi",
      "Vạt nắng sớm chiếu xuyên làn sương mù rừng già huyền ảo",
      "Dòng suối đá trong veo róc rách cá bơi lội",
      "Thế giới các loài hoa phong lan rừng và nấm dược liệu",
    ],
    readTime: 4,
  },
];

export const panoramaScenes: PanoramaScene[] = [
  {
    id: "scene-atk-forest",
    title: "Toàn Cảnh Non Nước & Rừng ATK Định Hóa",
    subtitle: "Góc nhìn 360° từ đỉnh đèo ngắm thung lũng Nghĩa Tá",
    location: "Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên",
    equirectangularImageUrl: "/images/panoramas/pano-atk.jpg",
    initialYaw: 15,
    initialPitch: -5,
    initialFov: 75,
    linkedSiteSlug: "atk-dinh-hoa",
    hotspots: [
      {
        id: "hs-dinh-hoa-valley",
        yaw: 20,
        pitch: -12,
        label: "Thung lũng Nghĩa Tá",
        description: "Dải thung lũng trù phú uốn lượn theo dòng suối và những nương lúa vàng óng.",
        thumbnailUrl: "/images/hero/hero-nghia-ta.jpg",
      },
      {
        id: "hs-forest-trail",
        yaw: -75,
        pitch: -8,
        label: "Lối mòn xuyên rừng ATK",
        description: "Tuyến đường tuần tra và giao liên huyền thoại giữa rừng già Việt Bắc.",
        thumbnailUrl: "/images/destinations/atk-dinh-hoa.jpg",
        linkedSceneId: "scene-thac-tien",
      },
      {
        id: "hs-karst-peak",
        yaw: 135,
        pitch: 18,
        label: "Đỉnh núi đá vôi kỳ vĩ",
        description: "Dãy núi đá vôi điệp trùng che chở cho thủ đô kháng chiến.",
      },
    ],
  },
  {
    id: "scene-thac-tien",
    title: "Không Gian Thác Nàng Tiên 360°",
    subtitle: "Dòng thác mát lành và hồ nước ngọc bích giữa hẻm đá",
    location: "Thác Nàng Tiên, Nghĩa Tá, Định Hóa, Thái Nguyên",
    equirectangularImageUrl: "/images/panoramas/pano-thac-tien.jpg",
    initialYaw: 0,
    initialPitch: 0,
    initialFov: 75,
    linkedSiteSlug: "thac-nang-tien",
    hotspots: [
      {
        id: "hs-waterfall-head",
        yaw: 0,
        pitch: 12,
        label: "Tầng thác chính Nàng Tiên",
        description: "Dòng nước đổ từ độ cao hơn 25 mét tung bọt trắng xóa quanh năm.",
        thumbnailUrl: "/images/destinations/thac-nang-tien.jpg",
      },
      {
        id: "hs-emerald-lagoon",
        yaw: -25,
        pitch: -20,
        label: "Vụng nước ngọc bích",
        description: "Vụng tắm tự nhiên trong veo nhìn thấu tận đáy sỏi cuội.",
      },
      {
        id: "hs-canyon-cliffs",
        yaw: 90,
        pitch: 5,
        label: "Vách đá hẻm vực rêu phong",
        description: "Hệ thống vách đá vôi phủ kín dương xỉ nhiệt đới xanh mướt.",
        linkedSceneId: "scene-atk-forest",
      },
    ],
  },
  {
    id: "scene-ban-lang",
    title: "Không Gian Bản Làng & Nhà Sàn Tày",
    subtitle: "Khuôn viên nhà sàn gỗ cổ truyền và đồng lúa trù phú",
    location: "Bản Tày, Nghĩa Tá, Định Hóa, Thái Nguyên",
    equirectangularImageUrl: "/images/destinations/ban-lang-tay.jpg",
    initialYaw: -10,
    initialPitch: -2,
    initialFov: 75,
    linkedSiteSlug: "ban-lang-tay-nung",
    hotspots: [
      {
        id: "hs-ancient-house",
        yaw: -15,
        pitch: 0,
        label: "Nhà sàn gỗ cổ truyền",
        description: "Kiến trúc 5 gian bề thế lợp ngói âm dương trên trăm năm tuổi.",
        thumbnailUrl: "/images/culture/nha-san-tay.jpg",
      },
      {
        id: "hs-stone-bridge",
        yaw: 70,
        pitch: -18,
        label: "Cầu đá qua suối bản",
        description: "Cây cầu đá mộc mạc nối liền các ngõ xóm trù phú của bản làng.",
      },
    ],
  },
];

export const culturalArticles: CulturalArticle[] = [
  {
    id: "hat-then-dan-tinh",
    slug: "hat-then-dan-tinh",
    title: "Tiếng Đàn Tính & Điệu Then Ngân Vang Rừng Núi",
    category: "Di Sản Văn Hóa Phi Vật Thể",
    locationName: "Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên",
    excerpt:
      "Hát Then, đàn Tính là báu vật tinh thần của người Tày, Nùng tại Định Hóa, được UNESCO vinh danh là Di sản văn hóa phi vật thể đại diện của nhân loại.",
    contentTeaser:
      "Mỗi dịp xuân về hay khi bản làng có việc trọng, tiếng đàn Tính làm từ quả bầu khô lại cất lên trầm bổng, hòa cùng giọng hát Then thiết tha lay động lòng người. Đó không chỉ là lời ca tiếng hát, mà còn là cây cầu nối tâm linh gửi gắm ước vọng về mùa màng tươi tốt, gia đạo bình yên và tình yêu đôi lứa bền chặt giữa non ngàn.",
    fullContent: [
      "Đàn Tính (Tính tẩu) của người Tày là nhạc cụ độc đáo với bầu đàn làm từ nửa quả bầu già phơi khô, cần đàn dài bằng gỗ dâu hoặc dướng, dây đàn bằng tơ tằm óng ả. Âm sắc của đàn Tính không chói gắt mà trầm ấm, vang xa như tiếng suối reo trong khe đá, như tiếng gió thoảng qua đồi thông.",
      "Nghệ thuật Hát Then tại Nghĩa Tá được gìn giữ qua hình thức truyền khẩu từ mẹ sang con, từ ông bà sang con cháu. Trong các nghi lễ then cầu mùa, then tạ ơn, then giải hạn, những nghệ nhân Then vừa gảy đàn, vừa xóc chùm chuông lắc (chùm xóc nhạc) tạo nên một bản hòa tấu thiêng liêng đầy mê hoặc.",
      "Du khách đến với Nghĩa Tá vào các dịp lễ hội hay đêm sinh hoạt cộng đồng tại nhà sàn sẽ được trực tiếp lắng nghe các nghệ nhân bản địa biểu diễn, thưởng thức chén trà thơm và cùng hòa nhịp vào điệu múa Then truyền thống.",
    ],
    quote:
      "Cây đàn Tính ba dây mang hồn thiêng sông núi. Mỗi cung đàn buông xuống là mỗi lời cầu chúc an lành cho bản làng ta.",
    author: "Ban Biên Tập Văn Hóa Du Lịch Nghĩa Tá",
    source: "Tư liệu điền dã văn hóa dân gian Huyện Định Hóa, Thái Nguyên",
    readTime: 4,
    publishedYear: 2026,
    imageUrl: "/images/culture/hat-then-dan-tinh.jpg",
    thumbnailColor: "#b37322",
    relatedSites: ["ban-lang-tay-nung"],
  },
  {
    id: "kien-truc-nha-san",
    slug: "kien-truc-nha-san",
    title: "Nếp Nhà Sàn Gỗ — Triết Lý Sống Hòa Hợp Thiên Nhiên",
    category: "Kiến Trúc Dân Gian Truyền Thống",
    locationName: "Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên",
    excerpt:
      "Kiến trúc nhà sàn gỗ lợp ngói âm dương của đồng bào Tày, Nùng tại Nghĩa Tá là kiệt tác xây dựng dân gian thích ứng hoàn hảo với khí hậu rừng núi nhiệt đới.",
    contentTeaser:
      "Nhà sàn người Tày ở Nghĩa Tá thường có từ 3 đến 5 gian, dựng trên các cột gỗ lim, nghiến vững chãi. Tầng sàn cao ráo giúp tránh ẩm ướt mùa mưa và thú dữ, đồng thời đón gió mát mùa hè. Mái ngói máng âm dương rêu phong cổ kính tạo nên vẻ đẹp thanh bình đặc trưng cho cảnh sắc thung lũng Định Hóa.",
    fullContent: [
      "Bộ khung nhà sàn được dựng hoàn toàn bằng kỹ thuật mộng gỗ tinh xảo, không sử dụng đinh sắt nhưng vẫn đứng vững trước gió bão qua hàng trăm năm. Cầu thang lên nhà sàn thường có số bậc lẻ (thường là 9 bậc, tượng trưng cho 9 vía của con người theo quan niệm Tày).",
      "Bên trong nhà sàn, bếp lửa luôn được đặt ở vị trí trung tâm, giữ ấm cho cả gia đình trong những ngày đông giá rét và là nơi sinh hoạt, tiếp khách của chủ nhà. Phía trước nhà là hàng hiên rộng thoáng đãng, nơi đặt khung cửi dệt vải chàm và phơi ngô hạt vàng óng.",
      "Ngày nay, nhiều nếp nhà sàn truyền thống tại Nghĩa Tá đã được mở cửa đón du khách trải nghiệm lưu trú du lịch cộng đồng (homestay), đem lại cảm giác bình yên và mộc mạc như trở về nhà.",
    ],
    quote:
      "Ngôi nhà sàn ngẩng nhìn đỉnh núi, cúi trông dòng suối. Cột gỗ cắm sâu vào lòng đất như tấm lòng người Tày thủy chung với bản.",
    author: "Nhóm Bảo Tồn Di Sản Địa Phương",
    source: "Khảo sát kiến trúc truyền thống đồng bào Tày vùng Việt Bắc",
    readTime: 5,
    publishedYear: 2026,
    imageUrl: "/images/culture/nha-san-tay.jpg",
    thumbnailColor: "#1c382b",
    relatedSites: ["ban-lang-tay-nung"],
  },
  {
    id: "le-hoi-long-tong",
    slug: "le-hoi-long-tong",
    title: "Lễ Hội Lồng Tồng — Khúc Hoan Ca Xuống Đồng Đầu Xuân",
    category: "Lễ Hội Truyền Thống",
    locationName: "Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên",
    excerpt:
      "Lễ hội xuống đồng Lồng Tồng đầu xuân là ngày hội văn hóa lớn nhất năm, quy tụ sắc áo chàm rực rỡ và những trò chơi dân gian hào hứng của đồng bào vùng cao.",
    contentTeaser:
      "Vào những ngày đầu xuân tươi mới, khi hoa mận nở trắng rừng và sương xuân giăng kín đỉnh núi, nhân dân Nghĩa Tá tưng bừng mở hội Lồng Tồng (hội xuống đồng). Mọi người cùng cầu chúc cho mưa thuận gió hòa, mùa màng bội thu, ngô đầy bồ, lúa đầy nương, xóm làng ấm no hạnh phúc.",
    fullContent: [
      "Phần Lễ diễn ra trang nghiêm với nghi thức rước mâm cỗ dâng cúng thần Thành hoàng, thần Nông và lễ cày tịch điền mở luống đầu năm. Những thanh niên trai tráng khỏe mạnh dắt trâu cày luống đất đầu tiên, gửi gắm ước mơ về vụ mùa sung túc.",
      "Phần Hội là tâm điểm náo nức với trò tung còn (ném còn) qua vòng tròn dán giấy hồng điều trên ngọn cây tre vút cao. Quả còn ngũ sắc mang theo dải lụa bay lượn trên nền trời xanh biếc; ai ném trúng làm rách vòng giấy còn sẽ mang lại may mắn suốt cả năm cho thôn bản.",
      "Hội Lồng Tồng còn sôi nổi với các trò chơi dân gian như đẩy gậy, kéo co, bịt mắt bắt dê, thi cấy lúa nhanh và thưởng thức hội thi mâm cỗ ẩm thực truyền thống địa phương.",
    ],
    quote:
      "Tung còn cho đứt vòng hồng / Cho mưa thuận gió, cho đồng ngát hương / Trai gái cùng hát giao duyên / Cho lúa trĩu hạt, cho duyên đượm nồng.",
    author: "Trung Tâm Văn Hóa Du Lịch Định Hóa",
    source: "Lễ hội truyền thống các dân tộc Định Hóa, Thái Nguyên",
    readTime: 4,
    publishedYear: 2026,
    imageUrl: "/images/culture/le-hoi-long-tong.jpg",
    thumbnailColor: "#256a42",
    relatedSites: ["ban-lang-tay-nung", "atk-dinh-hoa"],
  },
];

export const travelItineraries = [
  {
    id: "tour-1-day",
    title: "Hành Trình Về Nguồn ATK & Thác Nàng Tiên",
    duration: "1 Ngày (Sáng - Chiều)",
    suitable: "Gia đình, đoàn trường học, cựu chiến binh, du khách yêu lịch sử",
    stops: [
      "Dâng hương tưởng niệm tại Khu Di tích Lịch sử ATK Định Hóa",
      "Khám phá đường mòn liên lạc xuyên rừng đại ngàn Nghĩa Tá",
      "Thưởng thức bữa trưa cơm lam, gà đồi nướng tại nhà sàn bản Tày",
      "Trekking thư giãn và chụp ảnh check-in tại Thác Nàng Tiên",
      "Mua đặc sản chè Thái Nguyên và thổ cẩm bản địa làm quà",
    ],
  },
  {
    id: "tour-2-days",
    title: "Trọn Vẹn Sắc Màu Văn Hóa & Thiên Nhiên Nghĩa Tá",
    duration: "2 Ngày 1 Đêm",
    suitable: "Nhóm bạn trẻ, khách yêu thích nhiếp ảnh & du lịch cộng đồng",
    stops: [
      "Ngày 1: Check-in thung lũng Nghĩa Tá, khám phá nhà sàn cổ, thưởng thức văn nghệ Hát Then đêm bên bếp lửa homestay",
      "Ngày 2: Săn sương sớm trên đồi chè, tắm suối mát Thác Nàng Tiên, tham quan quần thể di tích kháng chiến ATK",
    ],
  },
];
