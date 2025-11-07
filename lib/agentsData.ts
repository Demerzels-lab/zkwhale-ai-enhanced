export interface Agent {
  agentId: string
  status: 'active' | 'paused' | 'private'
  activity: string
  protocol: string
  wallet: string
  amount: string
  zkProof: string
  timestamp: string
  threats: string[]
  threatLevel: number
  verificationStatus: 'verified' | 'pending'
  customConfig?: {
    protocol: string
    threshold: string
    timeframe: string
  }
}

const agentTemplates = [
  {
    status: 'active',
    activity: 'Detected 120 ETH inflow',
    protocol: 'Axiom Pool-A',
    threats: ['High volume movement'],
    proof: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12'
  },
  {
    status: 'active', 
    activity: 'Monitoring Axiom yield pools',
    protocol: 'Yield Optimizer',
    threats: ['3 whales actively depositing'],
    proof: '0x2b3c4d5e6f7890abcdef1234567890abcdef123'
  },
  {
    status: 'active',
    activity: 'Flagged token migration',
    protocol: 'DEX Aggregator',
    threats: ['Large token swap detected'],
    proof: '0x3c4d5e6f7890abcdef1234567890abcdef1234'
  },
  {
    status: 'active',
    activity: 'Tracking whale arbitrage',
    protocol: 'Arbitrage Scanner',
    threats: ['Price discrepancy opportunities'],
    proof: '0x4d5e6f7890abcdef1234567890abcdef12345'
  },
  {
    status: 'paused',
    activity: 'Analyzing liquidity patterns',
    protocol: 'Liquidity Monitor',
    threats: ['Low activity detected'],
    proof: '0x5e6f7890abcdef1234567890abcdef123456'
  },
  {
    status: 'active',
    activity: 'Cross-chain whale tracking',
    protocol: 'Bridge Monitor',
    threats: ['Cross-chain movements'],
    proof: '0x6f7890abcdef1234567890abcdef1234567'
  },
  {
    status: 'active',
    activity: 'DeFi position analysis',
    protocol: 'Position Tracker',
    threats: ['Large position changes'],
    proof: '0x7890abcdef1234567890abcdef12345678'
  },
  {
    status: 'private',
    activity: 'Privacy-enhanced monitoring',
    protocol: 'ZK Privacy Layer',
    threats: ['Stealth operations'],
    proof: '0x890abcdef1234567890abcdef123456789'
  }
] as const; 

// Generate random whale wallet addresses
function generateWalletAddress(): string {
  const prefixes = ['0x9A', '0xB0', '0xC1', '0xD2', '0xE3', '0xA0', '0xF1']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const chars = '0123456789abcdef'
  let result = prefix
  for (let i = 2; i < 42; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Generate random agent ID
function generateAgentId(): string {
  const num = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
  return num
}

// Generate random amounts for activities
function generateAmount(): string {
  const units = ['ETH', 'USDC', 'DAI', 'WBTC', 'AXIOM']
  const unit = units[Math.floor(Math.random() * units.length)]
  const amount = (Math.random() * 1000 + 10).toFixed(1)
  return `${amount} ${unit}`
}

// Mock agents data
let agents: Agent[] = []
let agentCounter = 1

// Initialize mock agents
function initializeAgents() {
  agents = []
  for (let i = 0; i < 1654; i++) {
    const template = agentTemplates[Math.floor(Math.random() * agentTemplates.length)]
    agents.push({
      agentId: generateAgentId(),
      status: template.status, 
      activity: template.activity,
      wallet: generateWalletAddress(),
      protocol: template.protocol,
      amount: generateAmount(),
      zkProof: template.proof,
      timestamp: new Date().toISOString(),
      threats: [...template.threats], 
      threatLevel: Math.floor(Math.random() * 10) + 1,
      verificationStatus: Math.random() > 0.8 ? 'pending' : 'verified'
    })
  }
}

// Get all agents
export function getAgents(): Agent[] {
  return agents
}

// Get single agent by ID
export function getAgent(agentId: string): Agent | undefined {
  return agents.find(agent => agent.agentId === agentId)
}

// Create new agent
export function createAgent(agentData: { protocol?: string; threshold?: string; timeframe?: string }): Agent {
  const template = agentTemplates[Math.floor(Math.random() * agentTemplates.length)]
  const newAgent: Agent = {
    agentId: generateAgentId(),
    status: 'active', // New agents are 'active' by default
    activity: `Monitoring ${agentData.protocol}`,
    wallet: generateWalletAddress(),
    protocol: agentData.protocol || 'Custom Protocol',
    amount: generateAmount(),
    zkProof: `0x${Math.random().toString(16).substr(2, 40)}`,
    timestamp: new Date().toISOString(),
    threats: [`Threshold: ≥${agentData.threshold} ETH`, `Timeframe: ${agentData.timeframe}`],
    threatLevel: Math.floor(Math.random() * 10) + 1,
    verificationStatus: 'verified',
    customConfig: {
      protocol: agentData.protocol || 'Custom Protocol',
      threshold: agentData.threshold || '100',
      timeframe: agentData.timeframe || '24h'
    }
  }
  
  agents.unshift(newAgent)
  return newAgent
}

// Update agent activity
export function updateAgentActivity(agentId: string): Agent | undefined {
  const agent = agents.find(a => a.agentId === agentId)
  if (agent) {
    const activities = [
      'Detected large transaction',
      'Whale position updated',
      'New liquidity event',
      'Price movement detected',
      'Trading pattern identified',
      'Yield farming activity',
      'Governance proposal impact',
      'Cross-protocol movement'
    ]
    
    agent.activity = activities[Math.floor(Math.random() * activities.length)]
    agent.amount = generateAmount()
    agent.timestamp = new Date().toISOString()
    agent.zkProof = `0x${Math.random().toString(16).substr(2, 40)}`
    agent.threatLevel = Math.floor(Math.random() * 10) + 1
  }
  return agent
}

// Get agent statistics
export function getAgentStats() {
  return {
    total: agents.length,
    active: agents.filter(a => a.status === 'active').length,
    paused: agents.filter(a => a.status === 'paused').length,
    private: agents.filter(a => a.status === 'private').length,
    verified: agents.filter(a => a.verificationStatus === 'verified').length,
    pending: agents.filter(a => a.verificationStatus === 'pending').length
  }
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
  setInterval(() => {
    // Update 1-3 random agents with new activity
    const updateCount = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < updateCount; i++) {
      const activeAgents = agents.filter(a => a.status === 'active')
      if (activeAgents.length > 0) {
        const randomAgent = activeAgents[Math.floor(Math.random() * activeAgents.length)]
        updateAgentActivity(randomAgent.agentId)
      }
    }
  }, 3000) // Update every 3 seconds
}

// Generate ZK proof (mock)
export function generateZKProof(agentData: { agentId: string }) {
  const timestamp = new Date().toISOString()
  const agentHash = Buffer.from(agentData.agentId).toString('hex')
  const proofData = `${agentHash}:${timestamp}:${Math.random().toString(36)}`
  
  return {
    proofHash: `0x${Buffer.from(proofData).toString('hex').substring(0, 40)}`,
    timestamp,
    verification: 'verified',
    verificationHash: `0x${Math.random().toString(16).substr(2, 40)}`
  }
}

// Initialize agents and start simulation
initializeAgents()
simulateRealTimeUpdates()

// Legacy export for backward compatibility
export const generateInitialAgents = (): Agent[] => {
  return agents
}

export const generateMockAgent = (userCreated = false): Agent => {
  const template = agentTemplates[Math.floor(Math.random() * agentTemplates.length)]
  return {
    agentId: generateAgentId(),
    status: template.status,
    activity: template.activity,
    wallet: generateWalletAddress(),
    protocol: template.protocol,
    amount: generateAmount(),
    zkProof: template.proof,
    timestamp: new Date().toISOString(),
    threats: [...template.threats], 
    threatLevel: Math.floor(Math.random() * 10) + 1,
    verificationStatus: Math.random() > 0.8 ? 'pending' : 'verified'
  }
}