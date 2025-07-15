import { create } from "zustand";

export interface DamageItem {
  area: string;
  severity: string;
  cost: number;
  notes?: string;
}

interface TrustDepositState {
  depositAmount?: number; // MATIC / ETH
  depositTxHash?: string;
  moveInPhotoUrls: string[];
  moveOutPhotoUrls: string[];
  analysis?: {
    items: DamageItem[];
    totalCost: number;
  };
  refundTxHash?: string;

  // Actions
  setDeposit(amount: number, txHash: string): void;
  addMoveInPhotos(urls: string[]): void;
  addMoveOutPhotos(urls: string[]): void;
  setAnalysis(items: DamageItem[], total: number): void;
  setRefundTx(hash: string): void;
  reset(): void;
}

export const useTDStore = create<TrustDepositState>((set) => ({
  moveInPhotoUrls: [],
  moveOutPhotoUrls: [],

  setDeposit: (amount, txHash) => set({ depositAmount: amount, depositTxHash: txHash }),
  addMoveInPhotos: (urls) => set((s) => ({ moveInPhotoUrls: [...s.moveInPhotoUrls, ...urls] })),
  addMoveOutPhotos: (urls) => set((s) => ({ moveOutPhotoUrls: [...s.moveOutPhotoUrls, ...urls] })),
  setAnalysis: (items, total) => set({ analysis: { items, totalCost: total } }),
  setRefundTx: (hash) => set({ refundTxHash: hash }),
  reset: () =>
    set({
      depositAmount: undefined,
      depositTxHash: undefined,
      moveInPhotoUrls: [],
      moveOutPhotoUrls: [],
      analysis: undefined,
      refundTxHash: undefined,
    }),
}));
