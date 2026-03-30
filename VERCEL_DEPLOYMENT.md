# Vercel Deployment Guide

## Fixed Issues

✅ Fixed TypeScript path aliases (`@/` now correctly points to `src/`)
✅ Fixed vite.config.ts environment variable handling for Vercel build environment
✅ Updated build configuration for optimal Vercel deployment

## Required Environment Variables

For Vercel deployment, you need to set these environment variables in your Vercel project:

### In Vercel Dashboard:

1. Go to your project **Settings** → **Environment Variables**
2. Add these variables (values should match your `.env` file):

```
GEMINI_API_KEY = "AIzaSyDX5Gk2hogxlzPoQL8e6tfoDQKlTzGDF5Y"
CEREBRAS_API_KEY = "csk-28kt5wvy25665x25563v5vwtt3c8ef8wrkdh3rdjet8k65c4"
GROK_API_KEY = "Your-Grok-API-Key-Here"
```

**Important:** These values will be available during build time AND runtime.

## Steps to Deploy

1. **Set Environment Variables in Vercel:**
   - Go to your Vercel project
   - Settings → Environment Variables
   - Add each API key as shown above

2. **Trigger a New Build:**
   - Go to Deployments tab
   - Click "Redeploy" on the latest failed deployment OR
   - Push a new commit to trigger auto-deployment

3. **Verify Build Success:**
   - Wait for the build to complete
   - Check Build Logs for any errors
   - Should see success message

## Build Configuration

Your `vercel.json` specifies:
- **Build Command:** `npm run build`
- **Output Directory:** `dist/` (Vite output)
- **Install Command:** `npm install`

## Troubleshooting

If build still fails:

1. **Check environment variables are set** - Ensure all three API keys are in Vercel Settings
2. **Rebuild after setting vars** - Vercel caches environment variables; redeploy after adding them
3. **Check Build Logs** - Go to Deployments → Click failed build → View Logs
4. **Local build works?** - Run `npm run build` locally to verify configuration

## Notes

- The `vite.config.ts` now properly loads variables from environment
- Path aliases (`@/...`) will work correctly in deployed app
- API keys are embedded at build time, not runtime (for this setup)

---

**Built on:** March 27, 2026
