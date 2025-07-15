import { useState } from "react";
import { analyzeDamage, AnalysisResponse } from "@/lib/api/ai";

export function useAiAnalyze() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  async function analyze(before: string[], after: string[]) {
    setLoading(true);
    // in real impl, send URLs instead of files
    try {
      // TODO: Convert before/after URLs to File objects or adjust API
      console.log('Analyzing damage:', { before, after });
      const fakeFiles = [] as File[]; // TODO adjust
      const res = await analyzeDamage(fakeFiles);
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return { analyze, loading, result };
}
