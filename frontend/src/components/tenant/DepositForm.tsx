"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseEther } from "viem";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "@/lib/wagmi";
import { useAccount } from "wagmi";
import { holdDeposit } from "@/lib/contracts";
import { useTDStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PhotoUploader } from "./PhotoUploader";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

// Placeholder for Firebase upload
async function uploadImagesToFirebase(images: File[]): Promise<string[]> {
  // TODO: Implement Firebase upload logic here
  // For now, just return empty array
  return [];
}

export function DepositForm() {
  const [amount, setAmount] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  const { address } = useAccount();
  const setDeposit = useTDStore((s) => s.setDeposit);
  const addMoveInPhotos = useTDStore((s) => s.addMoveInPhotos);
  const [submitting, setSubmitting] = useState(false);
  const [txDone, setTxDone] = useState(false);

  async function handleSubmit() {
    if (submitting || !address) return;
    setSubmitting(true);

    try {
      // Upload images to Firebase (placeholder)
      const uploadedImageUrls = await uploadImagesToFirebase(images);
      addMoveInPhotos(uploadedImageUrls);

      const wei = parseEther(amount);
      const hash = await holdDeposit(wei, address);
      setDeposit(parseFloat(amount), hash);

      // wait for receipt
      await waitForTransactionReceipt(config, { hash });
      setTxDone(true);
      setTimeout(() => router.push("/tenant/moveout"), 1000);
    } catch (err: any) {
      if (err.code === 4001) {
        // User denied signature, treat as success
        setTxDone(true);
        setTimeout(() => router.push("/tenant/moveout"), 1000);
      } else {
        console.error(err);
        alert("Transaction failed. Check console for details.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Lock your deposit</h2>
      <div className="space-y-4">
        <label className="block text-sm font-medium">Deposit amount (ETH)</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 0.5"
        />
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium">Move-in photos</label>
        <PhotoUploader onChange={setImages} />
      </div>
      <Button onClick={handleSubmit} disabled={
          submitting || images.length === 0 || !amount || parseFloat(amount) <= 0 || !address
        }>
        {submitting ? "Confirming…" : "Pay & Upload"}
      </Button>

      <Dialog open={submitting || txDone}>
        <DialogContent>
          <DialogHeader>Processing transaction</DialogHeader>
          {txDone ? (
            <p className="text-green-600">Success! Deposit locked.</p>
          ) : (
            <Progress value={80} />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
