/**
 * Client-side helper to call backend Gemini damage analysis.
 */
export type AnalysisResponse = {
  damaged: boolean;
  estimatedCostUSD: number;
  tenantShareWei?: string;
};

export async function analyzeDamage(beforeUrls: string[], afterUrls: string[]): Promise<AnalysisResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analyze-damage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ beforeUrls, afterUrls }),
  });

  if (!res.ok) throw new Error("AI analysis failed");
  return (await res.json()) as AnalysisResponse;
}

export interface DamageItem {
  area: string;
  severity: "low" | "medium" | "high";
  cost: number;
  notes?: string;
}


