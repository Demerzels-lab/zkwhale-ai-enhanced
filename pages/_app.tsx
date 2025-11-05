import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// Only initialize wagmi/rainbowkit if environment variables are available
let config: any = null
let isWagmiEnabled = false

try {
  if (process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
    const { WagmiConfig } = require('wagmi')
    const { getDefaultConfig, RainbowKitProvider } = require('@rainbow-me/rainbowkit')
    const { mainnet, polygon, optimism, arbitrum } = require('wagmi/chains')
    
    config = getDefaultConfig({
      appName: 'ZKWhale.AI',
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
      chains: [mainnet, polygon, optimism, arbitrum],
      ssr: false,
    })
    isWagmiEnabled = true
  }
} catch (error) {
  console.log('Wagmi not available, running in demo mode')
}

function AppWrapper({ Component, pageProps }: AppProps) {
  if (isWagmiEnabled && config) {
    const { WagmiConfig, RainbowKitProvider } = require('wagmi')
    return (
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    )
  }
  
  return <Component {...pageProps} />
}

export default AppWrapper