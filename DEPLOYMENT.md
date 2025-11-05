# 🚀 Deployment Guide for ZKWhale.AI

## Quick Deploy Options

### Option 1: Vercel (Recommended)

1. **Deploy from GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub account
   - Select the `zkwhale-ai` repository: `https://github.com/Demerzels-lab/zkwhale-ai`
   - Click "Deploy"

2. **Or using Vercel CLI (Local)**
   ```bash
   # Clone the repo locally
   git clone https://github.com/Demerzels-lab/zkwhale-ai.git
   cd zkwhale-ai

   # Install dependencies
   npm install

   # Deploy to Vercel
   npx vercel --prod
   ```

### Option 2: Netlify

1. **Deploy from GitHub**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the `zkwhale-ai` repository
   - Build command: `npm run build`
   - Publish directory: `.next`

### Option 3: Local Development

1. **Clone and run locally**
   ```bash
   git clone https://github.com/Demerzels-lab/zkwhale-ai.git
   cd zkwhale-ai

   # Install dependencies
   npm install

   # Run development server
   npm run dev
   ```

2. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Git (for cloning)

## 🔧 Environment Variables

No environment variables required for basic functionality. The app uses mock data for demonstration.

## 🎯 Features to Test

After deployment, test these features:

1. **Home Page**
   - Animated agent counter
   - Live feed with real-time updates
   - Wallet connection button

2. **Agent Dashboard**
   - Connect wallet (RainbowKit modal)
   - View agent statistics
   - Filter agents by status

3. **Create Agent**
   - Deploy new AI agents
   - Configure tracking parameters
   - Private/public toggle

4. **ZK Proofs**
   - Generate mock ZK proofs
   - Verification modals
   - Copy proof hashes

## 🌐 Post-Deployment

After successful deployment, the site will be available at:
- Vercel: `https://zkwhale-ai.vercel.app`
- Custom domain (if configured)

## 🔧 Troubleshooting

**Build Issues:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

**Dependencies Issues:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**API Routes Not Working:**
- Ensure Next.js API routes are properly configured
- Check that pages/api/ directory exists
- Verify server-side functionality requirements

## 📞 Support

For deployment issues, check:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- GitHub repository issues page