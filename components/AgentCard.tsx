import { motion } from 'framer-motion'
import { CheckCircle, Clock, Shield, Eye } from 'lucide-react'
import { Agent } from '@/lib/agentsData'

interface AgentCardProps {
  agent: Agent
  onZKProof?: () => void
}

export default function AgentCard({ agent, onZKProof }: AgentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'monitoring': return 'text-blue-400'
      case 'pending': return 'text-yellow-400'
      case 'paused': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />
      case 'monitoring': return <Eye size={16} />
      case 'pending': return <Clock size={16} />
      case 'paused': return <Clock size={16} />
      default: return <Clock size={16} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="agent-card p-6 rounded-2xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-text-gray">
              Agent #{agent.agentId}
            </span>
            {agent.userCreated && (
              <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                Created
              </span>
            )}
            {agent.private && (
              <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full">
                Private
              </span>
            )}
          </div>
          <div className={`flex items-center space-x-1 text-sm ${getStatusColor(agent.status)}`}>
            {getStatusIcon(agent.status)}
            <span className="capitalize">{agent.status}</span>
          </div>
        </div>
        <div className="zk-badge">
          <Shield size={20} className="text-green-400" />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-text-gray mb-1">Activity</p>
          <p className="text-sm">{agent.activity}</p>
        </div>

        <div>
          <p className="text-sm text-text-gray mb-1">Protocol</p>
          <p className="text-sm">{agent.protocol}</p>
        </div>

        <div>
          <p className="text-sm text-text-gray mb-1">Wallet</p>
          <p className="text-sm font-mono text-xs">
            {agent.wallet.slice(0, 10)}...{agent.wallet.slice(-8)}
          </p>
        </div>

        {agent.amount && (
          <div>
            <p className="text-sm text-text-gray mb-1">Amount</p>
            <p className="text-sm">{agent.amount}</p>
          </div>
        )}

        <div>
          <p className="text-sm text-text-gray mb-1">ZK Proof</p>
          <p className="text-xs font-mono text-gray-400">
            {agent.zkProof.slice(0, 12)}...
          </p>
        </div>

        <div className="pt-3 border-t border-gray-700">
          <button
            onClick={onZKProof}
            className="w-full text-xs py-2 bg-medium-gray hover:bg-light-gray transition-colors rounded-lg text-text-gray"
          >
            Generate ZK Proof
          </button>
        </div>
      </div>
    </motion.div>
  )
}