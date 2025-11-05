import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Activity } from 'lucide-react'

interface FeedItem {
  id: string
  message: string
  timestamp: string
}

export default function LiveFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [isConnected, setIsConnected] = useState(false)

  const sampleMessages = [
    "Agent #0274 detected 120 ETH inflow to 0x9A1f...A2C3 — ZK proof verified.",
    "Agent #1421 is monitoring Axiom yield pools — 3 whales active.",
    "Agent #0938 flagged token migration from Whale 0xA0b2...C3D4 — proof pending.",
    "Agent #1567 analyzing transaction patterns on Pool-X — 47 ETH movement detected.",
    "Agent #2891 monitoring governance voting — Large delegation detected.",
    "Agent #3425 tracking liquidity changes — 250 ETH added to pool.",
    "Agent #4782 watching whale address 0xB1c2...D3E4 — Unusual activity pattern.",
    "Agent #5673 analyzing staking rewards — 500 AXM rewards distributed.",
    "Agent #6234 monitoring bridge transactions — Cross-chain transfer detected.",
    "Agent #7891 tracking portfolio changes — Rebalancing activity observed.",
    "Agent #8456 analyzing yield strategies — Optimizer update detected.",
    "Agent #9123 monitoring MEV opportunities — Front-running attempts blocked."
  ]

  useEffect(() => {
    setIsConnected(true)
    
    // Add initial items
    const initialItems: FeedItem[] = [
      {
        id: '1',
        message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
        timestamp: new Date().toISOString()
      }
    ]
    setFeedItems(initialItems)

    // Add new items periodically
    const interval = setInterval(() => {
      const newItem: FeedItem = {
        id: Date.now().toString(),
        message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
        timestamp: new Date().toISOString()
      }
      
      setFeedItems(prev => [...prev.slice(-10), newItem])
    }, 3000 + Math.random() * 2000) // 3-5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="network-bg bg-dark-gray rounded-2xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
        <h3 className="text-lg font-semibold text-text-gray">Live Agent Feed</h3>
        <Activity size={16} className="text-green-400" />
      </div>
      
      <div className="h-96 overflow-y-auto space-y-3 terminal-feed">
        <AnimatePresence>
          {feedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-medium-gray/50 rounded-lg border border-gray-700/50"
            >
              <div className="flex items-start space-x-3">
                <Shield size={14} className="text-green-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-text-gray leading-relaxed">
                    {item.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <p className="text-xs text-gray-500 text-center">
          Real-time simulation • {feedItems.length} active agents • ZK verified
        </p>
      </div>
    </div>
  )
}