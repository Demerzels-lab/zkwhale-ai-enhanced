import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createConfig } from 'wagmi'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'

const config = getDefaultConfig({
  appName: 'ZKWhale.AI',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}