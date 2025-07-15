import { Address } from "viem";
import { writeContract } from "wagmi/actions";
import { config } from "./wagmi";

// TODO: Replace with deployed contract address once available
export const TRUST_DEPOSIT_ADDRESS: Address = "0x96d7D54C75C573B1F92224528eD83acA44bf5C3c" as Address;

// Minimal ABI for demo purposes
export const TRUST_DEPOSIT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "tenant", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "holdDeposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tenant", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "releaseDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export async function holdDeposit(amountWei: bigint, tenant: Address) {
  return writeContract(config, {
    address: TRUST_DEPOSIT_ADDRESS,
    abi: TRUST_DEPOSIT_ABI,
    functionName: "holdDeposit",
    value: amountWei,
    args: [tenant, amountWei],
  });
}

export async function releaseDeposit(amountWei: bigint, tenant: Address) {
  return writeContract(config, {
    address: TRUST_DEPOSIT_ADDRESS,
    abi: TRUST_DEPOSIT_ABI,
    functionName: "releaseDeposit",
    args: [tenant, amountWei],
  });
}
