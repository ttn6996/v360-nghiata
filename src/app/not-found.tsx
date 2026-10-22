import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        className="flex flex-col items-center justify-center min-h-screen pt-16"
        style={{ background: "var(--bg-canvas)" }}
      >
        <div className="text-center max-w-sm px-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: "var(--bg-surface-elevated)",
              border: "1px solid var(--border-subtle)",
            }}
            aria-hidden="true"
          >
            <Search
              size={24}
              strokeWidth={1.5}
              style={{ color: "var(--text-muted)" }}
            />
          </div>
          <p
            className="font-mono text-5xl font-light mb-3"
            style={{ color: "var(--accent-heritage)" }}
            aria-label="Lỗi 404 — Không tìm thấy trang"
          >
            404
          </p>
          <h1
            className="text-h2 mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Không tìm thấy trang
          </h1>
          <p
            className="text-body mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <Link href="/" className="btn-heritage">
            <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" />
            Về trang chủ
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
