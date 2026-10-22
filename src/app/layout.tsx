import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "V360 Nghĩa Tá — Khám Phá Di Sản & Cảnh Quan Bắc Kạn",
    template: "%s | V360 Nghĩa Tá",
  },
  description:
    "Khám phá không gian 360° và di sản văn hóa lịch sử của xã Nghĩa Tá, huyện Chợ Đồn, tỉnh Bắc Kạn — vùng đất cách mạng ATK và thiên nhiên Tây Bắc hùng vĩ.",
  keywords: [
    "Nghĩa Tá",
    "Chợ Đồn",
    "Bắc Kạn",
    "du lịch",
    "di sản văn hóa",
    "360 độ",
    "ATK",
    "Tày",
    "Nùng",
    "tour ảo",
  ],
  authors: [{ name: "V360 Nghĩa Tá Project" }],
  creator: "V360 Nghĩa Tá",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "V360 Nghĩa Tá — Khám Phá Di Sản & Cảnh Quan",
    description:
      "Hành trình khám phá không gian 360° và di sản văn hóa lịch sử xã Nghĩa Tá, Bắc Kạn.",
    siteName: "V360 Nghĩa Tá",
  },
  twitter: {
    card: "summary_large_image",
    title: "V360 Nghĩa Tá — Khám Phá Di Sản",
    description: "Tour ảo 360° và bản đồ di sản văn hóa Nghĩa Tá, Bắc Kạn.",
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
