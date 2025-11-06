import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Zap, Shield, Activity, ArrowRight, Wallet, Cpu } from 'lucide-react';
import LiveFeed from '../components/LiveFeed';
import { Twitter } from 'lucide-react';

export default function Home() {
  const [agents, setAgents] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, paused: 0, private: 0, verified: 0, pending: 0 });
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  // Fetch agents data
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/agents');
        const data = await response.json();
        setAgents(data.agents || []);
        setStats(data.stats || {});
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
    const interval = setInterval(fetchAgents, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Simulate wallet connection
  const connectWallet = () => {
    // Mock wallet connection
    setConnectedWallet('0x9A...B2C3');
    // Generate mock ZK identity
    console.log('Mock ZK Identity Generated:', {
      wallet: connectedWallet,
      zkHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      privacyLevel: 'verified'
    });
  };

  return (
    <>
      <Head>
        <title>ZKWhale.AI - Stealth Intelligence Network</title>
        <meta name="description" content="Deploy private AI agents to track whale wallets on Axiom using Zero-Knowledge proofs for privacy and verifiable analytics." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-monochrome-0 network-grid">
        {/* Header */}
        <header className="relative z-10 p-6">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left Section: Logo */}
            <div className="flex items-center space-x-3">
              <div className="rounded-lg flex items-center justify-center">
                <img src="/logo.jpeg" alt="ZKWhale.AI Logo" className="w-20 h-20" />
              </div>
              <span className="hidden md:block text-xl font-bold text-monochrome-4">ZKWhale.AI</span>
            </div>

            {/* Middle Section: Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-monochrome-3 hover:text-monochrome-4 transition-colors">
                Dashboard
              </Link>
              <Link href="/create" className="text-monochrome-3 hover:text-monochrome-4 transition-colors">
                Deploy Agent
              </Link>
              <a href="#features" className="text-monochrome-3 hover:text-monochrome-4 transition-colors">
                Features
              </a>
            </div>

            {/* Right Section: Wallet + Social Links */}
            <div className="flex items-center space-x-4">
              {/* GitHub Link */}
              <a
                href="https://github.com/Demerzels-lab/zkwhale-ai-enhanced"
                target="_blank"
                rel="noopener noreferrer"
                className="text-monochrome-3 hover:text-monochrome-4 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.832.092-.647.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.03-2.682-.103-.253-.447-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.8c.85.004 1.705.115 2.504.337 1.91-1.296 2.75-1.026 2.75-1.026.545 1.377.2 2.394.098 2.647.64.7 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.937.36.31.682.92.682 1.852 0 1.337-.012 2.417-.012 2.745 0 .268.18.579.688.481A10.002 10.002 0 0 0 22 12c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* X (Twitter) Link */}
              <a
                href="https://x.com/zkwhaleai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-monochrome-3 hover:text-monochrome-4 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>

              {/* Wallet Connection */}
              {!connectedWallet ? (
                <button
                  onClick={connectWallet}
                  className="flex items-center space-x-2 px-4 py-2 bg-monochrome-1 hover:bg-monochrome-2 text-monochrome-4 hover:text-white rounded-lg transition-all duration-200 border border-monochrome-2/50 hover:border-monochrome-4/50"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400 font-mono">{connectedWallet}</span>
                  </div>
                  <span className="text-xs text-green-400">ZK Identity Verified</span>
                </div>
              )}
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-monochrome-4 mb-6 leading-tight">
                <span className="block">Thousands of AI Agents</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-monochrome-4 to-monochrome-3">
                  are Tracking Axiom Whales
                </span>
                <span className="block text-3xl md:text-4xl font-normal text-monochrome-3 mt-4">
                  — Privately.
                </span>
              </h1>
              
              <p className="text-xl text-monochrome-3 max-w-3xl mx-auto mb-8">
                Join the ZK intelligence layer. Build your private agent today and access verifiable whale tracking with zero-knowledge privacy guarantees.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <button
                onClick={connectWallet}
                className="flex items-center space-x-3 px-8 py-4 bg-monochrome-4 text-monochrome-0 rounded-xl font-semibold text-lg hover:bg-monochrome-3 transition-all duration-200 transform hover:scale-105"
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet to Deploy Agent</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <Link href="/dashboard">
                <button className="flex items-center space-x-3 px-8 py-4 border border-monochrome-4/20 text-monochrome-4 hover:text-white hover:border-monochrome-4/50 rounded-xl font-semibold text-lg transition-all duration-200">
                  <Cpu className="w-5 h-5" />
                  <span>View Dashboard</span>
                </button>
              </Link>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-monochrome-4">{stats.active || 0}</div>
                <div className="text-sm text-monochrome-3">Active Agents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-monochrome-4">{stats.total || 0}</div>
                <div className="text-sm text-monochrome-3">Total Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-monochrome-4">{stats.verified || 0}</div>
                <div className="text-sm text-monochrome-3">ZK Verified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-monochrome-4">24/7</div>
                <div className="text-sm text-monochrome-3">Monitoring</div>
              </div>
            </motion.div>
          </div>

          {/* Animated Network Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-monochrome-4/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </section>

        {/* Live Feed Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-monochrome-4 mb-6">Real-Time Intelligence</h2>
              <LiveFeed />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-monochrome-4 mb-6">Platform Overview</h2>
              
              {/* Feature Cards */}
              <div className="grid gap-4">
                <div className="glass rounded-xl p-6 hover:glass-dark transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-monochrome-4 mb-2">Zero-Knowledge Verification</h3>
                      <p className="text-sm text-monochrome-3">
                        Every agent output includes cryptographic proof of data integrity without exposing sensitive information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 hover:glass-dark transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-monochrome-4 mb-2">Autonomous AI Agents</h3>
                      <p className="text-sm text-monochrome-3">
                        Intelligent agents that operate independently, monitoring whale wallets across the Axiom ecosystem.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 hover:glass-dark transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-monochrome-4 mb-2">Real-Time Analytics</h3>
                      <p className="text-sm text-monochrome-3">
                        Live feed of whale activities with AI-generated insights and threat level assessments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-monochrome-2/20 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="rounded-lg flex items-center justify-center">
                <img src="/logo.jpeg" alt="ZKWhale.AI Logo" className="w-20 h-20" />
              </div>
              <span className="text-lg font-bold text-monochrome-4">ZKWhale.AI</span>
            </div>
            <p className="text-monochrome-3 text-sm mb-4">
              Privacy Meets Intelligence. Powered by Axiom + Zero Knowledge.
            </p>
            <p className="text-xs text-monochrome-4">
              © 2025 ZKWhale.AI. All rights reserved. Built for the future of decentralized privacy.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}