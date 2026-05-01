# Sovereign Maintenance Monograph: Life Republic 2026

This document serves as the high-fidelity technical manual for the long-term maintenance and scaling of the Life Republic digital ecosystem.

## 🔑 1. Credential Rotation Protocols
To maintain project sovereignty, rotate the following API keys every 180 days:

- **Gemini AI (Vision Lab)**: Update `VITE_GEMINI_API_KEY` in `.env`.
- **Supabase (Sovereign Vault)**: Update `VITE_SUPABASE_ANON_KEY` and ensure RLS policies are locked to the production domain.
- **FormSubmit (Dispatch)**: The primary lead relay is `propsmartrealty@gmail.com`. If changing, update `email.ts` and verify the new address via the FormSubmit activation email.

## 🏗️ 2. New Sector Onboarding
When adding a new residential cluster (e.g., Sector R20):

1.  **Data Registry**: Add the sector metadata to `src/data/sectors.json` under the appropriate category.
2.  **Product Cluster**: Define the project specifications in `src/data/projects.ts`.
3.  **Visual Synthesis**: Ensure a high-resolution hero image is placed in `public/images/gallery/` and the path is correctly mapped.
4.  **Integrity Check**: Run `npm run check-data` (or `node scripts/check_project_data.js`) to verify the new route.

## 📧 3. Triple-Redundant Pipeline
The lead pipeline is engineered for 100% deliverability:

- **Tier 1 (Email)**: Direct SMTP dispatch via FormSubmit.
- **Tier 2 (Vault)**: Persistent indexing in the Supabase `leads` table with behavioral metadata.
- **Tier 3 (Fallback)**: Local browser persistence and console-fallback for manual recovery if network synthesis fails.

**Maintenance**: Regularly audit the Supabase `leads` table for **Sentiment Analysis** trends to refine sales scripts.

## 📈 4. Financial & ROI Calibration
The `ROICalculator.tsx` uses 2026 Metro-adjusted weights. If the Hinjewadi infrastructure timeline shifts:
- Update the `appreciationRates` constant in `ROICalculator.tsx`.
- Recalibrate the "Sovereign Verdict" thresholds to match new market realities.

## 🔍 5. Search Engine Dominance
- **Sitemap**: Run `node scripts/sitemap-generator.js` after adding any new sectors to update the `sitemap.xml`.
- **Canonical Silos**: Ensure all new routes use the `SEO.tsx` component with the hardened canonical URL protocol.

---
**Sovereign Status: PRODUCTION HARDENED**
*Last Audit: May 2026*
*Lead Rating System: ACTIVE (1-5 Stars)*
*Neural Intelligence: SYNCHRONIZED*
