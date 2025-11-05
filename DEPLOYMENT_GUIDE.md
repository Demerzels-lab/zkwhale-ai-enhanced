# 🚀 ZKWhale.AI Deployment Guide - Vercel

## 📋 Prerequisites

### ✅ Yang sudah diperbaiki:
1. **vercel.json** - Konfigurasi sudah diupdate ke format modern
2. **next.config.js** - Optimasi untuk production deployment
3. **Wagmi Configuration** - Chains dan project ID sudah diperbaiki
4. **Environment Variables** - Template sudah disediakan

## 🔧 Manual Deployment Steps - Vercel

### Step 1: Login ke Vercel
1. Buka [vercel.com](https://vercel.com)
2. Login dengan akun GitHub Anda

### Step 2: Import Repository
1. Klik **"Add New"** → **"Project"**
2. Pilih **"Import Git Repository"**
3. Authorize GitHub jika belum
4. Cari dan pilih repository: `Demerzels-lab/zkwhale-ai`
5. Klik **"Import"**

### Step 3: Konfigurasi Project
**Framework Preset:** Next.js (akan auto-detect)

**Build Configuration:**
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

**Root Directory:** `./` (root)

**Environment Variables (Optional):**
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```
> **Note:** Untuk demo, ini tidak wajib. Wallet connect akan menggunakan fallback.

### Step 4: Deploy
1. Klik **"Deploy"**
2. Tunggu proses build (2-5 menit)
3. Jika sukses, akan ada URL yang disediakan

## 🔍 Build Troubleshooting

### Jika Build Gagal:

#### Error: "Module not found"
**Penyebab:** Missing dependencies atau import errors
**Solusi:**
- Refresh deployment
- Pastikan repository up-to-date di branch `main`

#### Error: "TypeScript compilation failed"
**Penyebab:** TypeScript errors
**Solusi:**
- Check console untuk error details
- Fix type errors di code
- atau set `typescript: { ignoreBuildErrors: true }` di next.config.js

#### Error: "Build timed out"
**Penyebab:** Build process terlalu lama
**Solusi:**
- Rebuild project
- Check network connection

#### Error: "Out of memory"
**Penyebab:** Build process menggunakan terlalu banyak RAM
**Solusi:**
- Tunggu sebentar dan coba deploy ulang
- Vercel akan otomatis optimize

## 📱 Post-Deployment Testing

### Checklist:
- [ ] **Homepage loads** - Pastikan index page muncul
- [ ] **Navigation works** - Test menu dan routing
- [ ] **Live Feed updates** - Check real-time agent updates
- [ ] **Agent Creation** - Test form submission
- [ ] **Dashboard access** - Check agent management
- [ ] **ZK Proof Modal** - Test modal functionality
- [ ] **Responsive design** - Test di mobile/desktop

### Fitur Demo (Normal jika tidak working):
- 🔗 **Wallet Connect** - Akan muncul tapi tidak connect (ini normal untuk demo)
- 📡 **Real-time Data** - Menggunakan mock data (ini normal)
- 🏦 **Web3 Actions** - Tidak ada blockchain interaction (ini normal)

## 🛠️ Environment Variables Guide

### Production Variables (Optional):
```bash
# WalletConnect untuk real wallet connection (opsional)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Custom RPC URLs (opsional)
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-key

# Analytics (opsional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
```

### Development Variables:
Copy `.env.example` ke `.env.local` untuk local development

## 🚨 Common Issues & Solutions

### Issue 1: "Page Not Found"
**Solution:** Pastikan routing bekerja, cek Next.js config

### Issue 2: "Build Failed"
**Solution:** 
- Check console output untuk error details
- Pastikan semua dependencies compatible
- Rebuild dari GitHub

### Issue 3: "Slow Loading"
**Solution:** 
- Check Vercel build logs
- Optimize images dan assets
- Enable Vercel Analytics

### Issue 4: "External Scripts Loading"
**Solution:** 
- Ini normal untuk demo dengan external dependencies
- Will work setelah production build

## 📞 Support

Jika masih ada masalah:

1. **Check Build Logs** di Vercel dashboard
2. **Test locally** dengan `npm run build`
3. **Check repository** di branch `main`
4. **Ensure dependencies** up-to-date

## 🎯 Expected Result

Setelah deployment berhasil:
- ✅ Website accessible via Vercel URL
- ✅ All pages working (home, dashboard, create agent)
- ✅ Live feed updating dengan mock data
- ✅ Agent creation form working
- ✅ ZK proof modal functional
- ✅ Responsive design working
- ⚠️ Wallet connect appear but not functional (normal for demo)

---

**Deployment akan berhasil jika semua konfigurasi sudah benar!** 🚀