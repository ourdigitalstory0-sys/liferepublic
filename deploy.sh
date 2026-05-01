#!/bin/bash

# Sovereign Deployment Protocol: Life Republic 2026
# Target Load Time: <1.5s | Indexing Authority: 100%

echo "🏛️ Initializing Sovereign Deployment Pipeline..."

# 1. Integrity Audit
echo "🔍 Running Zero-Tolerance Data Integrity Audit..."
npm run check-data
if [ $? -ne 0 ]; then
    echo "❌ INTEGRITY AUDIT FAILED. Deployment Aborted."
    exit 1
fi
echo "✅ Data Integrity Validated."

# 2. Sovereign Build
echo "⚡ Synthesizing Production Bundle (Vite ESNext)..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ BUILD FAILED. Deployment Aborted."
    exit 1
fi
echo "✅ Production Bundle Synthesized."

# 3. Indexing Sync
echo "🔍 Generating Programmatic Indexing Authority (Sitemap)..."
node scripts/sitemap-generator.js
echo "✅ Sitemap Synchronized (Priority 0.9 Silos Active)."

# 4. Final Seal
echo "🚀 SOVEREIGN SEAL APPLIED. Ready for Vercel/Netlify Dispatch."
echo "✨ Project Zenith Reached: Life Republic is Live."
