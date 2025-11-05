import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, CheckCircle, Shield } from 'lucide-react'
import { useState } from 'react'

interface ProofModalProps {
  isOpen: boolean
  onClose: () => void
  agentId: string
  zkProof: string
}

export default function ProofModal({ isOpen, onClose, agentId, zkProof }: ProofModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(zkProof)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-dark-gray border border-gray-700 rounded-2xl p-6 w-full max-w-md"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Shield className="text-green-400" size={20} />
              <h3 className="text-lg font-semibold text-text-gray">ZK Proof Generated</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">Verification Successful</span>
            </div>

            <div className="bg-medium-gray p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-gray">Agent ID</span>
                <span className="text-sm font-mono">#{agentId}</span>
              </div>
              
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-gray">ZK Proof Hash</span>
                  <button
                    onClick={handleCopy}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={12} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs font-mono text-gray-400 break-all">
                  {zkProof}
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
              <p className="text-xs text-blue-400">
                📋 Proof Details:
              </p>
              <ul className="text-xs text-gray-400 mt-2 space-y-1">
                <li>• Zero-knowledge proof of agent activity</li>
                <li>• Cryptographic verification included</li>
                <li>• Privacy-preserving data integrity</li>
                <li>• Immutable audit trail</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={onClose}
                className="w-full py-2 bg-medium-gray hover:bg-light-gray transition-colors rounded-lg text-text-gray text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}