import { NextApiRequest, NextApiResponse } from 'next'
import { 
  getAgents, 
  getAgentStats, 
  updateAgentActivity 
} from '@/lib/agentsData'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 12 
    
    const agents = getAgents() 
    const stats = getAgentStats()
    
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const pagedAgents = agents.slice(startIndex, endIndex)
    
    res.status(200).json({
      agents: pagedAgents, 
      totalAgents: agents.length, 
      stats,
      timestamp: new Date().toISOString()
    })

  } else if (req.method === 'POST') {
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