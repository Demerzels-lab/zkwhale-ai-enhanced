import { NextApiRequest, NextApiResponse } from 'next'
import { Agent, generateMockAgent } from '@/lib/agentsData'

// In-memory store for demo
let agents: Agent[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Generate new agents periodically for demo
    if (agents.length === 0 || Math.random() > 0.8) {
      agents.push(generateMockAgent())
    }
    
    // Keep only last 25 agents
    agents = agents.slice(-25)
    
    res.status(200).json({ agents })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}