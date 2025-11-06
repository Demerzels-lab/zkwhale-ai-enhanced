import { NextApiRequest, NextApiResponse } from 'next'
import { generateZKProof } from '@/lib/agentsData'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { agentId, agentData } = req.body
    
    if (!agentId) {
      return res.status(400).json({
        success: false,
        error: 'Agent ID is required'
      })
    }
    
    try {
      const zkProof = generateZKProof(agentData || { agentId })
      
      res.status(200).json({
        success: true,
        zkProof,
        agentId,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to generate ZK proof',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    })
  }
}