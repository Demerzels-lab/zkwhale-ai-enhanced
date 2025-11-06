import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Bot, Zap, Shield, AlertCircle, CheckCircle } from 'lucide-react'

interface FormData {
  tokenToTrack: string
  whaleThreshold: string
  timeFrame: string
  agentName: string
  private: boolean
}

export default function CreateAgent() {
  const [formData, setFormData] = useState<FormData>({
    tokenToTrack: '',
    whaleThreshold: '',
    timeFrame: '',
    agentName: '',
    private: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [newAgentId, setNewAgentId] = useState('')

  const tokenOptions = [
    'AXM', 'ETH', 'USDC', 'DAI', 'USDT', 'WBTC', 'LINK', 'UNI',
    'Custom Token Address', 'Protocol (Pool-X, Farm-Y)', 'Governance Token'
  ]

  const thresholdOptions = [
    '≥ 10 ETH', '≥ 50 ETH', '≥ 100 ETH', '≥ 500 ETH', '≥ 1000 ETH',
    '≥ $10,000 USD', '≥ $50,000 USD', '≥ $100,000 USD', 'Custom Amount'
  ]

  const timeFrameOptions = [
    '24 hours', '7 days', '30 days', 'Real-time monitoring', 'Custom timeframe'
  ]

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Note: The original API uses 'protocol', 'threshold', 'timeframe'
    // We are sending 'tokenToTrack' as 'protocol' to match the API
    const deployData = {
      protocol: formData.tokenToTrack,
      threshold: formData.whaleThreshold,
      timeframe: formData.timeFrame
    }

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deployData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setNewAgentId(result.agent.agentId)
        
        // Reset form
        setFormData({
          tokenToTrack: '',
          whaleThreshold: '',
          timeFrame: '',
          agentName: '',
          private: false
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
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
            <h1 className="text-2xl font-bold text-text-gray">Deploy AI Agent</h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-gray rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="text-yellow-400" size={24} />
              <h2 className="text-xl font-semibold text-text-gray">Agent Configuration</h2>
            </div>

            {/* This is the new, cleaned-up form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Agent Name */}
              <div>
                <label className="block text-sm font-medium text-text-gray mb-2">
                  Agent Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.agentName}
                  onChange={(e) => handleInputChange('agentName', e.target.value)}
                  placeholder="My Whale Tracker #1"
                  className="w-full px-4 py-3 bg-medium-gray border border-gray-700 rounded-lg text-text-gray placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Token/Protocol to Track */}
              <div>
                <label className="block text-sm font-medium text-text-gray mb-2">
                  Token/Protocol to Track *
                </label>
                <select
                  value={formData.tokenToTrack}
                  onChange={(e) => handleInputChange('tokenToTrack', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-medium-gray border border-gray-700 rounded-lg text-text-gray focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select token or protocol...</option>
                  {tokenOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Whale Threshold */}
              <div>
                <label className="block text-sm font-medium text-text-gray mb-2">
                  Whale Threshold *
                </label>
                <select
                  value={formData.whaleThreshold}
                  onChange={(e) => handleInputChange('whaleThreshold', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-medium-gray border border-gray-700 rounded-lg text-text-gray focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select threshold...</option>
                  {thresholdOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Frame */}
              <div>
                <label className="block text-sm font-medium text-text-gray mb-2">
                  Time Frame *
                </label>
                <select
                  value={formData.timeFrame}
                  onChange={(e) => handleInputChange('timeFrame', e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-medium-gray border border-gray-700 rounded-lg text-text-gray focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select timeframe...</option>
                  {timeFrameOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Private Agent Toggle */}
              <div className="flex items-center justify-between p-4 bg-medium-gray rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-text-gray">Private Agent</h4>
                  <p className="text-xs text-gray-400">Only you can see this agent's data</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleInputChange('private', !formData.private)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formData.private ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      formData.private ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* ZK Verification Notice */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="text-green-400 mt-1" size={16} />
                  <div>
                    <h4 className="text-sm font-medium text-green-400 mb-1">ZK Privacy Guarantee</h4>
                    <p className="text-xs text-gray-400">
                      All agent activities are protected with zero-knowledge proofs. 
                      Your monitoring patterns remain private and untraceable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.tokenToTrack || !formData.whaleThreshold || !formData.timeFrame}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deploying Agent...</span>
                  </>
                ) : (
                  <>
                    <Bot size={18} />
                    <span>Deploy AI Agent</span>
                  </>
                )}
              </button>
            </form>
            
          </motion.div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center"
            >
              <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                Agent #{newAgentId} Deployed Successfully!
              </h3>
              <p className="text-gray-400 mb-6">
                Status: Active 🟢 • Your AI agent is now monitoring Axiom whale wallets
              </p>
              <div className="flex space-x-4 justify-center">
                <Link
                  href="/dashboard"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Dashboard
                </Link>
                <button
                  onClick={() => {
                    setSubmitStatus('idle')
                    setNewAgentId('')
                  }}
                  className="bg-medium-gray text-text-gray px-6 py-3 rounded-lg hover:bg-light-gray transition-colors"
                >
                  Deploy Another
                </button>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center"
            >
              <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-red-400 mb-2">
                Deployment Failed
              </h3>
              <p className="text-gray-400 mb-6">
                There was an error deploying your agent. Please try again.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}