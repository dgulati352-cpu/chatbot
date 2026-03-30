# Quick Start: Deploy to Vercel in 5 Minutes

## TL;DR - Fastest Path

```bash
# 1. Push code to GitHub (or create new repo)
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main

# 2. Go to https://vercel.com/new
# 3. Import your GitHub repo
# 4. Add environment variables (see below)
# 5. Click "Deploy" ✨

# Done! Your app is live
```

## Environment Variables Required

Copy these from your `.env` file and paste into Vercel dashboard:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_CEREBRAS_API_KEY
VITE_GEMINI_API_KEY
VITE_GROK_API_KEY
```

**Where to add them in Vercel:**
1. After clicking "Import" on your repo
2. See "Environment Variables" section
3. Click "Add New"
4. Paste each variable name and value

## Deployment Methods

### ✨ Easiest: Vercel Web UI
1. Visit https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Add environment variables
5. Click "Deploy"
⏱️ Time: ~5 minutes

### 🚀 Fast: GitHub Integration
1. Push code to GitHub
2. Vercel auto-deploys every push
3. Setup details in DEPLOYMENT.md
⏱️ Time: Just push!

### 💻 Manual: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```
⏱️ Time: 2 minutes

## Verify Deployment Works

After deployment:
1. Click the Vercel link in the dashboard
2. App should load in your browser
3. All features should work normally
4. Check browser console (F12) for errors

## If It Fails

### Build Failed?
- Go to Vercel → Deployments → View Build Log
- Check for error messages
- Most common: Missing environment variables

### App Loads but Doesn't Work?
- Press F12 in browser
- Check Console tab for errors
- Likely: API keys missing or wrong

### Still Stuck?
- See full troubleshooting in `DEPLOYMENT.md`
- Check GitHub Actions logs
- Run `npm run build` locally to reproduce

## Update After Deploy

Every time you push to main branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel automatically redeploys! ✨

## Get Your Live URL

After successful deployment:
- Vercel gives you a URL like `https://my-app-xyz123.vercel.app`
- Add custom domain in Vercel Settings → Domains

## Next Steps

← See `DEPLOYMENT.md` for detailed guide
← See `DEPLOYMENT_READINESS.md` for status report

---

**Status:** ✅ Ready to deploy  
**Estimated Time:** 5 minutes  
**Difficulty:** Easy  
