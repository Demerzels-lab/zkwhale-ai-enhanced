import { NextApiRequest, NextApiResponse } from 'next'
import { 
  getAgents, 
  getAgentStats, 
  updateAgentActivity 
} from '@/lib/agentsData'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get all agents with stats
    const agents = getAgents()
    const stats = getAgentStats()
    
    res.status(200).json({
      agents,
      stats,
      timestamp: new Date().toISOString()
    })
  } else if (req.method === 'POST') {
    // Update agent activity (for real-time simulation)
    const { agentId } = req.body
    
    if (agentId) {
      const updatedAgent = updateAgentActivity(agentId)
      
      if (updatedAgent) {
        res.status(200).json({
          success: true,
          agent: updatedAgent,
          timestamp: new Date().toISOString()
        })
      } else {
        res.status(404).json({
          success: false,
          error: 'Agent not found'
        })
      }
    } else {
      res.status(400).json({
        success: false,
        error: 'Agent ID is required'
      })
    }
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    })
  }
}