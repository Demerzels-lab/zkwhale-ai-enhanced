import { motion } from 'framer-motion'
import { Link } from 'next/link'
import { Bot, Shield, Zap } from 'lucide-react'
import LiveFeed from '@/components/LiveFeed'
import { useEffect, useState } from 'react'

export default function Home() {
  const [agentCount, setAgentCount] = useState(0)
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    // Animated agent count
    const interval = setInterval(() => {
      setAgentCount(prev => {
        if (prev < 847) {
          return prev + Math.floor(Math.random() * 10) + 1
        }
        return prev
      })
    }, 100)

    // Stop counting after 10 seconds
    setTimeout(() => {
      setIsCounting(true)
      clearInterval(interval)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <div className="network-bg">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Bot className="text-white" size={32} />
              <h1 className="text-5xl font-bold text-text-gray glow-text">
                ZKWhale.AI
              </h1>
            </div>
            
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-xl text-text-gray mb-4">
                Thousands of AI Agents are Tracking Axiom Whales — Privately.
              </p>
              <p className="text-lg text-gray-400">
                Join the ZK intelligence layer. Build your private agent today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center space-x-6 mb-12"
            >
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-lg font-mono">{isCounting ? agentCount : '...'}</span>
                <span className="text-gray-400">Active Agents</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Shield size={16} />
                <span className="text-gray-400">ZK Verified</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Zap size={16} />
                <span className="text-gray-400">Real-time</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex justify-center"
            >
              <Link
                href="/create"
                className="bg-white text-dark px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Connect Wallet to Deploy Agent
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8"
            >
              <Link
                href="/dashboard"
                className="inline-block bg-medium-gray text-text-gray px-6 py-3 rounded-lg hover:bg-light-gray transition-colors mr-4"
              >
                View Dashboard
              </Link>
              <Link
                href="/create"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Agent
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Live Feed Section */}
      <div className="container mx-auto px-6 pb-16">
        <LiveFeed />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            ZKWhale.AI — Privacy Meets Intelligence. Powered by Axiom + Zero Knowledge.
          </p>
        </div>
      </footer>
    </div>
  )
}