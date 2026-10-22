// ============================================================
// V360 NGHĨA TÁ — TypeScript Data Models
// All heritage data must be verified or clearly labeled as demo.
// ============================================================

export type VerificationStatus = "verified" | "demo";

export type HeritageSiteCategory =
  | "lich-su-cach-mang"   // Lịch sử Cách mạng (ATK)
  | "thang-canh-tu-nhien" // Danh lam Thắng cảnh Tự nhiên
  | "van-hoa-ban-lang";   // Không gian Văn hóa Bản làng

export interface GpsCoordinates {
  lat: number;
  lng: number;
  altitude?: number; // meters above sea level, if known
}

export interface HeritageSite {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: HeritageSiteCategory;
  status: VerificationStatus;
  coordinates?: GpsCoordinates;
  description: string;
  historicalContext?: string;
  thumbnailColor: string; // CSS color used for placeholder gradient
  panoramaSceneId?: string; // Links to PanoramaScene.id
  visitingNotes?: string;
  readTime?: number; // minutes
}

export interface PanoramaHotspot {
  id: string;
  yaw: number;   // degrees
  pitch: number; // degrees
  label: string;
  description?: string;
  linkedSceneId?: string;
}

export interface PanoramaScene {
  id: string;
  title: string;
  subtitle?: string;
  status: VerificationStatus;
  equirectangularImageUrl: string; // placeholder URL or real asset path
  initialYaw: number;   // default view yaw
  initialPitch: number; // default view pitch
  hotspots: PanoramaHotspot[];
  linkedSiteId?: string;
}

export interface CulturalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  contentTeaser: string; // First paragraph or representative text
  author: string;
  source: string; // e.g. "Tổng hợp dữ liệu cộng đồng địa phương"
  readTime: number; // minutes
  status: VerificationStatus;
  publishedYear?: number;
  thumbnailColor: string;
}
