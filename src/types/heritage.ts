// ============================================================
// V360 NGHĨA TÁ — TypeScript Data Models
// Xã Nghĩa Tá, Huyện Định Hóa, Tỉnh Thái Nguyên
// ============================================================

export type HeritageSiteCategory =
  | "lich-su-cach-mang"   // Di tích Lịch sử Cách mạng (ATK Định Hóa)
  | "thang-canh-tu-nhien" // Danh lam Thắng cảnh Tự nhiên
  | "van-hoa-ban-lang";   // Bản sắc Văn hóa Bản làng Tày - Nùng

export interface GpsCoordinates {
  lat: number;
  lng: number;
  altitude?: number;
}

export interface TravelTips {
  bestTime: string;
  duration: string;
  transportation: string;
  ticket?: string;
  preparation?: string;
}

export interface HeritageSite {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: HeritageSiteCategory;
  locationName: string;
  coordinates?: GpsCoordinates;
  description: string;
  historicalContext?: string;
  imageUrl: string;
  gallery?: string[];
  thumbnailColor: string;
  panoramaSceneId?: string;
  visitingNotes?: string;
  travelTips?: TravelTips;
  highlights?: string[];
  readTime?: number;
}

export interface PanoramaHotspot {
  id: string;
  yaw: number;   // degrees (-180 to 180)
  pitch: number; // degrees (-90 to 90)
  label: string;
  description?: string;
  linkedSceneId?: string;
  thumbnailUrl?: string;
  distance?: string;
  iconType?: "monument" | "waterfall" | "village" | "forest" | "scroll" | "info" | "viewpoint" | "walk";
}

export interface PanoramaScene {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  category?: string;
  equirectangularImageUrl: string;
  initialYaw: number;
  initialPitch: number;
  initialFov?: number;
  hotspots: PanoramaHotspot[];
  linkedSiteSlug?: string;
  mapCoords?: { x: number; y: number };
  audioNarration?: {
    title: string;
    speaker: string;
    duration: string;
    script: string;
  };
  gallery?: string[];
  historicalDetails?: {
    overview: string;
    significance: string;
    visitingGuide: string;
  };
}

export interface CulturalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  locationName: string;
  excerpt: string;
  contentTeaser: string;
  fullContent?: string[];
  author: string;
  source: string;
  readTime: number;
  publishedYear?: number;
  imageUrl: string;
  thumbnailColor: string;
  quote?: string;
  relatedSites?: string[];
}
