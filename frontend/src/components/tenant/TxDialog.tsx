"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export function TxDialog({ open, done }: { open: boolean; done: boolean }) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>Processing transaction</DialogHeader>
        {done ? (
          <p className="text-green-600">Transaction confirmed!</p>
        ) : (
          <Progress value={70} />
        )}
      </DialogContent>
    </Dialog>
  );
}
