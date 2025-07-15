import { useEffect, useState } from "react";
import { waitForTransactionReceipt } from "wagmi/actions";
import { wagmiConfig } from "@/lib/wagmi";

export function useTxStatus(txHash?: string) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!txHash) return;

    (async () => {
      try {
        await waitForTransactionReceipt(wagmiConfig, { hash: txHash as `0x${string}` });
        setConfirmed(true);
      } catch (err) {
        console.error("waitForTransactionReceipt", err);
      }
    })();
  }, [txHash]);

  return confirmed;
}
