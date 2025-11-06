import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Filter, Bot, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import AgentCard from '@/components/AgentCard'
import ProofModal from '@/components/ProofModal'
import { Agent } from '@/lib/agentsData'

type FilterType = 'all' | 'active' | 'paused' | 'private'
const AGENTS_PER_PAGE = 12 

const FilterButton = ({ type, label, count, activeFilter, setFilter }: { 
  type: FilterType, 
  label: string, 
  count: number, 
  activeFilter: FilterType,
  setFilter: (type: FilterType) => void 
}) => (
  <button
    onClick={() => setFilter(type)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      activeFilter === type
        ? 'bg-blue-600 text-white'
        : 'bg-medium-gray text-gray-300 hover:bg-light-gray'
    }`}
  >
    {label} ({count})
  </button>
)

export default function Dashboard() {
  const [allAgents, setAllAgents] = useState<Agent[]>([]) 
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]) 
  const [pagedAgents, setPagedAgents] = useState<Agent[]>([]) 
  
  const [filter, setFilter] = useState<FilterType>('all')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [totalAgents, setTotalAgents] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const totalPages = Math.ceil(filteredAgents.length / AGENTS_PER_PAGE)

  useEffect(() => {
    const fetchAllAgents = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/agents?page=1&limit=5000') 
        const data = await response.json()
        setAllAgents(data.agents || [])
        setTotalAgents(data.agents.length || 0)
      } catch (error) {
        console.error('Failed to fetch agents:', error)
      }
      setIsLoading(false)
    }
    fetchAllAgents()
  }, [])

  useEffect(() => {
    let filtered = allAgents
    if (filter === 'private') {
      filtered = allAgents.filter(agent => agent.status === 'private')
    } else if (filter === 'active' || filter === 'paused') {
      filtered = allAgents.filter(agent => agent.status === filter)
    }
    setFilteredAgents(filtered)
    setCurrentPage(1) 
  }, [allAgents, filter])

  useEffect(() => {
    const startIndex = (currentPage - 1) * AGENTS_PER_PAGE
    const endIndex = currentPage * AGENTS_PER_PAGE
    setPagedAgents(filteredAgents.slice(startIndex, endIndex))
  }, [filteredAgents, currentPage])

  const handleZKProof = (agent: Agent) => {
    setSelectedAgent(agent)
    setIsModalOpen(true)
  }

  const getFilterCount = (filterType: FilterType) => {
    if (filterType === 'all') return allAgents.length
    if (filterType === 'private') return allAgents.filter(a => a.status === 'private').length
    return allAgents.filter(a => a.status === filterType).length
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

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
              <h1 className="hidden md:block text-2xl font-bold text-text-gray">Agent Dashboard</h1>
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
          <div className="flex flex-wrap items-center mb-8">
            <div className="flex items-center space-x-4"> 
              <div className="bg-medium-gray p-4 rounded-xl">
                <div className="text-2xl font-bold text-text-gray">{allAgents.length}</div>
                <div className="text-sm text-gray-400">Total Agents</div>
              </div>
              <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">
                  {allAgents.filter(a => a.status === 'active').length}
                </div>
                <div className="text-sm text-green-400">Active</div>
              </div>
              <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">
                  {allAgents.filter(a => a.status === 'private').length}
                </div>
                <div className="text-sm text-blue-400">Private</div>
              </div>
            </div>
          </div>


          {/* Filters */}
          <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-2">
            <Filter className="text-gray-400 flex-shrink-0" size={18} />
            <div className="flex space-x-2">
              <FilterButton type="all" label="All" count={getFilterCount('all')} activeFilter={filter} setFilter={setFilter} />
              <FilterButton type="active" label="Active" count={getFilterCount('active')} activeFilter={filter} setFilter={setFilter} />
              <FilterButton type="paused" label="Paused" count={getFilterCount('paused')} activeFilter={filter} setFilter={setFilter} />
              <FilterButton type="private" label="Private" count={getFilterCount('private')} activeFilter={filter} setFilter={setFilter} />
            </div>
          </div>

          {/* Agents Grid */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-gray-400">Loading agents...</p>
            </div>
          ) : pagedAgents.length === 0 ? (
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pagedAgents.map((agent, index) => (
                  <motion.div
                    key={agent.agentId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }} 
                  >
                    <AgentCard
                      agent={agent}
                      onZKProof={() => handleZKProof(agent)}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-700">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-medium-gray text-text-gray rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-gray transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-2 px-4 py-2 bg-medium-gray text-text-gray rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-gray transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
        </>

        {/* ZK Proof Modal */}
        {selectedAgent && (
          <ProofModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            agentId={selectedAgent.agentId}
            zkProof={selectedAgent.zkProof}
          />
        )}
      </div>
    </div>
  )
}