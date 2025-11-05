import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'next/link'
import { ArrowLeft, Filter, Bot, Plus } from 'lucide-react'
import AgentCard from '@/components/AgentCard'
import ProofModal from '@/components/ProofModal'
import { Agent } from '@/lib/agentsData'

type FilterType = 'all' | 'active' | 'paused' | 'private'

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(true) // Always connected for demo

  useEffect(() => {
    // Fetch user agents
    fetchAgents()
  }, [])

  useEffect(() => {
    // Apply filter
    let filtered = agents
    if (filter === 'private') {
      filtered = agents.filter(agent => agent.private)
    } else if (filter === 'active' || filter === 'paused') {
      filtered = agents.filter(agent => agent.status === filter)
    }
    setFilteredAgents(filtered)
  }, [agents, filter])

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/deploy')
      const data = await response.json()
      setAgents(data.agents || [])
    } catch (error) {
      console.error('Failed to fetch agents:', error)
    }
  }

  const handleZKProof = (agent: Agent) => {
    setSelectedAgent(agent)
    setIsModalOpen(true)
  }

  const getFilterCount = (filterType: FilterType) => {
    if (filterType === 'all') return agents.length
    if (filterType === 'private') return agents.filter(a => a.private).length
    return agents.filter(a => a.status === filterType).length
  }

  const FilterButton = ({ type, label, count }: { type: FilterType, label: string, count: number }) => (
    <button
      onClick={() => setFilter(type)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        filter === type
          ? 'bg-blue-600 text-white'
          : 'bg-medium-gray text-gray-300 hover:bg-light-gray'
      }`}
    >
      {label} ({count})
    </button>
  )

  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </Link>
            <div className="h-6 w-px bg-gray-700" />
            <div className="flex items-center space-x-2">
              <Bot className="text-white" size={24} />
              <h1 className="text-2xl font-bold text-text-gray">Agent Dashboard</h1>
            </div>
          </div>

          <Link
            href="/create"
            className="bg-white text-dark px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Deploy Agent
          </Link>
        </div>

        
          <>
            {/* Stats and Actions */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className="bg-medium-gray p-4 rounded-xl">
                  <div className="text-2xl font-bold text-text-gray">{agents.length}</div>
                  <div className="text-sm text-gray-400">Total Agents</div>
                </div>
                <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">
                    {agents.filter(a => a.status === 'active').length}
                  </div>
                  <div className="text-sm text-green-400">Active</div>
                </div>
                <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">
                    {agents.filter(a => a.private).length}
                  </div>
                  <div className="text-sm text-blue-400">Private</div>
                </div>
              </div>

              <Link
                href="/create"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Deploy New Agent</span>
              </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-8">
              <Filter className="text-gray-400" size={18} />
              <div className="flex space-x-2">
                <FilterButton type="all" label="All" count={getFilterCount('all')} />
                <FilterButton type="active" label="Active" count={getFilterCount('active')} />
                <FilterButton type="paused" label="Paused" count={getFilterCount('paused')} />
                <FilterButton type="private" label="Private" count={getFilterCount('private')} />
              </div>
            </div>

            {/* Agents Grid */}
            {filteredAgents.length === 0 ? (
              <div className="text-center py-16">
                <Bot size={64} className="text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-text-gray mb-2">
                  {filter === 'all' ? 'No agents yet' : `No ${filter} agents`}
                </h2>
                <p className="text-gray-400 mb-6">
                  {filter === 'all' 
                    ? 'Deploy your first AI agent to start tracking whale wallets'
                    : `No agents match the ${filter} filter`
                  }
                </p>
                <Link
                  href="/create"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Create Agent</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent, index) => (
                  <motion.div
                    key={agent.agentId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AgentCard
                      agent={agent}
                      onZKProof={() => handleZKProof(agent)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ZK Proof Modal */}
        {selectedAgent && (
          <ProofModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            agentId={selectedAgent.agentId}
            zkProof={selectedAgent.zkProof}
      </div>
    </div>
  )
}