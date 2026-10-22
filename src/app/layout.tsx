import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://v360-nghiata.vn"),
  title: {
    default: "V360 Nghĩa Tá — Khám Phá Di Sản & Cảnh Quan Định Hóa, Thái Nguyên",
    template: "%s | V360 Nghĩa Tá",
  },
  description:
    "Khám phá không gian 360° và di sản văn hóa lịch sử của xã Nghĩa Tá, huyện Định Hóa, tỉnh Thái Nguyên — vùng đất căn cứ địa cách mạng ATK và thắng cảnh thiên nhiên hùng vĩ.",
  keywords: [
    "Nghĩa Tá",
    "Định Hóa",
    "Thái Nguyên",
    "ATK Định Hóa",
    "Thác Nàng Tiên",
    "du lịch Thái Nguyên",
    "di sản văn hóa",
    "360 độ",
    "tour ảo 360",
    "Tày",
    "Nùng",
    "nhà sàn",
    "Hát Then Đàn Tính",
  ],
  authors: [{ name: "UBND Xã Nghĩa Tá, Định Hóa, Thái Nguyên" }],
  creator: "V360 Nghĩa Tá",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "V360 Nghĩa Tá — Khám Phá Di Sản & Cảnh Quan Định Hóa, Thái Nguyên",
    description:
      "Hành trình khám phá không gian 360° và di sản văn hóa lịch sử xã Nghĩa Tá, huyện Định Hóa, tỉnh Thái Nguyên.",
    siteName: "V360 Nghĩa Tá",
    images: [
      {
        url: "/images/hero/hero-nghia-ta.jpg",
        width: 1200,
        height: 630,
        alt: "V360 Nghĩa Tá, Định Hóa, Thái Nguyên",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "V360 Nghĩa Tá — Khám Phá Di Sản Định Hóa, Thái Nguyên",
    description: "Tour ảo 360° và bản đồ di sản văn hóa Nghĩa Tá, Định Hóa, Thái Nguyên.",
    images: ["/images/hero/hero-nghia-ta.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
