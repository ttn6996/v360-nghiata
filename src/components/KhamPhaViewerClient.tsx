"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import InteractivePanoramaViewer from "@/components/InteractivePanoramaViewer";
import { panoramaScenes } from "@/data/mockData";

export default function KhamPhaViewerClient() {
  const searchParams = useSearchParams();
  const initialScene = searchParams.get("scene") || undefined;

  return (
    <InteractivePanoramaViewer
      scenes={panoramaScenes}
      initialSceneId={initialScene}
      isStandalonePage={true}
      height="100vh"
      showSceneThumbnails={true}
    />
  );
}
