"use client";

import { useState } from "react";
import { useUpload } from "@/hooks/useUpload";
import { useTDStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { PhotoUploader } from "./PhotoUploader";
import { Button } from "@/components/ui/button";
import { TxDialog } from "./TxDialog";
import { analyzeDamage, AnalysisResponse } from "@/lib/api/ai";

export function MoveOutForm() {
  const [images, setImages] = useState<File[]>([]);
  const { upload, uploading } = useUpload();
  const moveInUrls = useTDStore((s) => s.moveInPhotoUrls);
  const addMoveOutPhotos = useTDStore((s) => s.addMoveOutPhotos);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  async function handleAnalyze() {
    setLoading(true);
    try {
            const afterUrls = await upload(images);
      addMoveOutPhotos(afterUrls);
            const data = await analyzeDamage(moveInUrls, afterUrls);
      setResult(data);
    } catch {
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Move-out inspection</h2>
      <PhotoUploader onChange={setImages} />
      <Button onClick={handleAnalyze} disabled={images.length === 0 || loading || uploading}>
        {loading ? "Analyzing…" : "Analyze & Calculate"}
      </Button>

      {result && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Estimated Charges</h3>
          <ul className="space-y-2 text-sm">
            
          </ul>
          <div className="font-medium flex justify-between text-base">
            <span>Total</span>
            <span>${result.estimatedCostUSD} USD</span>
          </div>
        </div>
      )}

      <TxDialog open={loading} done={false} />
    </Card>
  );
}
