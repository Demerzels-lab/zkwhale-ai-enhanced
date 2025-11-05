import { NextApiRequest, NextApiResponse } from 'next'
import { Agent, generateMockAgent } from '@/lib/agentsData'

// In-memory store for demo
let userAgents: Agent[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { tokenToTrack, whaleThreshold, timeFrame } = req.body
    
    // Create new agent
    const newAgent: Agent = {
      ...generateMockAgent(true),
      activity: `Monitoring ${tokenToTrack} with threshold ${whaleThreshold}`,
      protocol: timeFrame,
      status: 'active'
    }
    
    userAgents.push(newAgent)
    
    res.status(201).json({ 
      success: true, 
      agent: newAgent,
      message: `Agent #${newAgent.agentId} Deployed. Status: Active 🟢`
    })
  } else if (req.method === 'GET') {
    // Return user agents
    res.status(200).json({ agents: userAgents })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}