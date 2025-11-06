import Link from 'next/link'
import { ArrowLeft, Zap, Shield, Activity, Bot, Wallet, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Bot,
    title: "AI Agent Deployment",
    description: "Create and deploy private AI agents to monitor specific tokens and whale thresholds.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Shield,
    title: "Zero-Knowledge Privacy",
    description: "All agent activities are protected with ZK proofs for complete privacy.",
    color: "text-green-400",
    bgColor: "bg-green-500/10"
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Live feed of agent activities with cryptographic verification.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Cpu,
    title: "Agent Dashboard",
    description: "A comprehensive dashboard to manage all of your deployed AI agents.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10"
  },
  {
    icon: Wallet,
    title: "Wallet Integration",
    description: "Connect your wallet seamlessly with RainbowKit to deploy and manage agents.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Live agent activity feed with smooth, modern animations.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10"
  },
]

export default function FeaturePage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-12">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
          <div className="h-6 w-px bg-gray-700" />
          <div className="flex items-center space-x-2">
            <Zap className="text-white" size={24} />
            <h1 className="text-2xl font-bold text-text-gray">Platform Features</h1>
          </div>
        </div>

        {/* Feature Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="glass rounded-xl p-6 hover:glass-dark transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-monochrome-4 mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-monochrome-3">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}