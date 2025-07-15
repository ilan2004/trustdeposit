'use client'

import { wagmiAdapter, projectId } from '@/lib/wagmi'
import { createAppKit } from '@reown/appkit/react'
import { polygonAmoy } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: "TrustDeposit",
  description: "Secure rental deposits on-chain",
  url: "https://trustdeposit.xyz",
  icons: ["https://trustdeposit.xyz/icon.png"]
}

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [polygonAmoy],
  defaultNetwork: polygonAmoy,
  metadata,
  features: {
    analytics: true,
    socials: ['google', 'x', 'github', 'discord', 'apple'],
  },
  themeMode: 'light'
})

export default function AppKitProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}