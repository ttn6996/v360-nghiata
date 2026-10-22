import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  variable: "--font-display",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://v360-nghiata.vn"),
  title: {
    default: "Nghĩa Tá — Khám Phá Di Sản & Cảnh Quan Định Hóa, Thái Nguyên",
    template: "%s | Nghĩa Tá · Định Hóa",
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
    "Khám phá toàn cảnh",
    "Tày",
    "Nùng",
    "nhà sàn",
    "Hát Then Đàn Tính",
  ],
  authors: [{ name: "UBND Xã Nghĩa Tá, Định Hóa, Thái Nguyên" }],
  creator: "UBND Xã Nghĩa Tá, Định Hóa, Thái Nguyên",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Nghĩa Tá — Khám Phá Di Sản & Cảnh Quan Định Hóa, Thái Nguyên",
    description:
      "Hành trình khám phá không gian 360° và di sản văn hóa lịch sử xã Nghĩa Tá, huyện Định Hóa, tỉnh Thái Nguyên.",
    siteName: "Du Lịch Nghĩa Tá",
    images: [
      {
        url: "/images/hero/hero-nghia-ta.jpg",
        width: 1200,
        height: 630,
        alt: "Nghĩa Tá, Định Hóa, Thái Nguyên",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nghĩa Tá — Khám Phá Di Sản Định Hóa, Thái Nguyên",
    description:
      "Khám phá toàn cảnh và bản đồ di sản văn hóa Nghĩa Tá, Định Hóa, Thái Nguyên.",
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
      <body className={`${playfair.variable} ${beVietnamPro.variable}`}>
        {children}
      </body>
    </html>
  );
}
