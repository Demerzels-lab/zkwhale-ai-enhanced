export interface Agent {
  agentId: string
  status: 'active' | 'paused' | 'monitoring' | 'pending'
  activity: string
  wallet: string
  protocol: string
  amount?: string
  zkProof: string
  timestamp: string
  userCreated?: boolean
  private?: boolean
}

export const generateMockAgent = (userCreated = false): Agent => {
  const agentId = String(Math.floor(Math.random() * 9999)).padStart(4, '0')
  const statuses = ['active', 'paused', 'monitoring', 'pending'] as const
  const protocols = ['Pool-X', 'Yield Farm', 'Liquidity Pool', 'Axiom Bridge', 'Governance Token', 'Derivatives']
  const activities = [
    'Detected 120 ETH inflow',
    'Monitoring yield pools',
    'Flagged token migration',
    'Tracking large swap',
    'Watching whale address',
    'Analyzing transaction patterns',
    'Monitoring staking rewards',
    'Tracking governance voting',
    'Watching liquidity changes',
    'Analyzing portfolio shifts'
  ]
  
  const wallets = [
    '0x9A1f1A2C3d4E5F6g7H8I9J0k1l2M3N4O5P6',
    '0xA0b2c3D4e5F6g7H8i9J0k1l2M3N4O5P6Q7',
    '0xB1c2D3e4F5g6H7i8J9k0l1m2N3O4P5Q6R7',
    '0xC2d3E4f5G6h7I8j9K0l1M2n3O4p5Q6r7S8',
    '0xD3e4F5g6H7i8J9k0L1m2N3O4p5Q6r7S8T9'
  ]
  
  return {
    agentId,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    activity: activities[Math.floor(Math.random() * activities.length)],
    wallet: wallets[Math.floor(Math.random() * wallets.length)],
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    amount: `${Math.floor(Math.random() * 1000) + 10} ETH`,
    zkProof: `0x${Math.random().toString(16).substr(2, 16)}${Math.random().toString(16).substr(2, 16)}...`,
    timestamp: new Date().toISOString(),
    userCreated,
    private: Math.random() > 0.7
  }
}

export const generateInitialAgents = (): Agent[] => {
  const agents = []
  
  // Generate 20 initial agents
  for (let i = 0; i < 20; i++) {
    agents.push(generateMockAgent())
  }
  
  // Add a few user-created agents for demo
  for (let i = 0; i < 3; i++) {
    agents.push(generateMockAgent(true))
  }
  
  return agents
}