import Link from 'next/link'
import { ArrowLeft, Zap, Shield, Activity, Bot, Wallet, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import Head from 'next/head'

// Feature data, based on your README.md
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
    <>
    <Head>
      <title>Features - ZKWhale.AI</title>
      <meta name="description" content="Explore the powerful features of ZKWhale.AI, from AI agent deployment to zero-knowledge privacy." />
    </Head>
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

        {/* Feature Grid (Summary) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
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

        {/* --- NEW "Crowded" Section --- */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-text-gray mb-16">
            Features in Detail
          </h2>

          <div className="space-y-16">
            
            {/* Feature 1: AI Agent Deployment */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-8 rounded-2xl bg-medium-gray border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-gray">AI Agent Deployment</h3>
                  </div>
                  <p className="text-monochrome-3">
                    Our platform empowers you to create and deploy sophisticated AI agents with no code required. Through an intuitive interface, you can configure your agents to monitor specific on-chain metrics, wallet addresses, token movements, or protocol interactions.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-monochrome-3 space-y-3 text-sm"
              >
                <h4 className="text-lg font-semibold text-text-gray">What You Can Do:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Set whale thresholds (e.g., "alert me for any transfer over $1M").</li>
                  <li>Track specific tokens (ETH, USDC, or any ERC-20 token).</li>
                  <li>Monitor protocol health (e.g., watch liquidity pool sizes).</li>
                  <li>Create "private" agents whose queries are hidden from everyone, including us.</li>
                </ul>
                <p>This system turns you from a passive observer into an active, intelligent participant in the on-chain world.</p>
              </motion.div>
            </div>

            {/* Feature 2: Zero-Knowledge Privacy */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-monochrome-3 space-y-3 text-sm md:order-2"
            >
                <h4 className="text-lg font-semibold text-text-gray">Privacy Through Proofs:</h4>
                <p>
                Zero-Knowledge (ZK) is at the core of our platform. We use ZK-SNARKs to create cryptographic proofs of an agent's activity.
                </p>
                <ul className="list-disc list-inside space-y-2">
                <li>
                    <span className="font-bold">Verifiable Data:</span> The proof mathematically guarantees that the agent's reported data is true and hasn't been tampered with.
                </li>
                <li>
                    <span className="font-bold">Privacy-Preserving:</span> The proof confirms the data is real <em>without</em> revealing the data itself.
                </li>
                <li>
                    <span className="font-bold">Example:</span> An agent can prove it detected a $1M transaction (fulfilling its task) without ever revealing the wallet addresses or the exact amount to the public.
                </li>
                </ul>
                <p>Your monitoring strategies remain your own, protected from front-runners and competitors.</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="md:order-1"
            >
                <div className="p-8 rounded-2xl bg-medium-gray border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-gray">Zero-Knowledge Privacy</h3>
                </div>
                <p className="text-monochrome-3">
                    Privacy is not just an option; it's a guarantee. Every piece of intelligence generated by your agent is backed by a Zero-Knowledge proof. This allows you to verify the integrity of the data without ever exposing the sensitive details of your query or the results.
                </p>
                </div>
            </motion.div>
            </div>

            {/* Feature 3: Dashboard & Monitoring */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-8 rounded-2xl bg-medium-gray border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-gray">Real-time Monitoring</h3>
                </div>
                <p className="text-monochrome-3">
                    The market never sleeps, and neither do our agents. ZKWhale provides a unified dashboard and a live-streaming feed of all agent activities. This command center is your single source of truth for on-chain intelligence, all updated in real-time.
                </p>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-monochrome-3 space-y-3 text-sm"
            >
                <h4 className="text-lg font-semibold text-text-gray">Your On-Chain Command Center:</h4>
                <ul className="list-disc list-inside space-y-2">
                <li>
                    <span className="font-bold">Live Feed:</span> Watch a continuous stream of verified alerts from all public agents on the network.
                </li>
                <li>
                    <span className="font-bold">Agent Dashboard:</span> Manage the lifecycle of your own agents. Pause, resume, or delete agents with a single click.
                </li>
                <li>
                    <span className="font-bold">Cryptographic Verification:</span> Every alert in the feed is accompanied by its ZK proof, allowing for instant verification.
                </li>
                <li>
                    <span className="font-bold">Smooth Animations:</span> The entire interface is built for a modern, fluid experience.
                </li>
                </ul>
            </motion.div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}