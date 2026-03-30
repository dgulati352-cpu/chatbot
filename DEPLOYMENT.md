# Deployment Guide

This guide provides complete instructions for deploying this React + Vite application to GitHub and Vercel.

## Prerequisites

- Node.js 18+ installed locally
- Git installed and configured
- GitHub account
- Vercel account (free tier available)
- API keys for required services

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd anti
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the required variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI API Keys
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_CEREBRAS_API_KEY=your_cerebras_api_key
VITE_GROK_API_KEY=your_grok_api_key

# Offline LLM (Ollama) - Optional for local development
VITE_OFFLINE_LLM_URL=http://localhost:11434
VITE_OFFLINE_LLM_MODEL=llama3.2:3b
VITE_OFFLINE_CEREBRAS_MODEL=llama3.2:3b
VITE_OFFLINE_GPT_MODEL=llama3.2:3b
```

Reference: See `.env.example` for the template.

### 4. Run Development Server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

### 5. Verify Build Locally

```bash
npm run build
npm run preview
```

## GitHub Setup

### 1. Initialize or Update Repository

```bash
# If not already a git repo
git init
git add .
git commit -m "Initial commit: Ready for deployment"
```

### 2. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `anti` (or your preferred name)
3. Do NOT initialize with README, .gitignore, or license (we already have them)

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/anti.git
git branch -M main
git push -u origin main
```

### 4. Configure GitHub Secrets (for CI/CD)

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:

```
VITE_SUPABASE_URL           = your_supabase_url
VITE_SUPABASE_ANON_KEY      = your_supabase_anon_key
VITE_CEREBRAS_API_KEY       = your_cerebras_api_key
VITE_GEMINI_API_KEY         = your_gemini_api_key
VITE_GROK_API_KEY           = your_grok_api_key
VERCEL_TOKEN                = your_vercel_token
VERCEL_ORG_ID               = your_vercel_org_id
VERCEL_PROJECT_ID           = your_vercel_project_id
```

**Note:** To get Vercel secrets:
- `VERCEL_TOKEN`: Create at https://vercel.com/account/tokens
- `VERCEL_ORG_ID`: Found in Vercel dashboard settings
- `VERCEL_PROJECT_ID`: Found in project settings → General

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended for First-Time Setup)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Click **Import Git Repository**
4. Select your GitHub repository `anti`
5. Click **Import**

### Configure Environment Variables in Vercel

1. After import, you'll see **Configure Project**
2. Expand **Environment Variables**
3. Add all required variables:

| Name | Value |
|------|-------|
| VITE_SUPABASE_URL | your_supabase_url |
| VITE_SUPABASE_ANON_KEY | your_supabase_anon_key |
| VITE_CEREBRAS_API_KEY | your_cerebras_api_key |
| VITE_GEMINI_API_KEY | your_gemini_api_key |
| VITE_GROK_API_KEY | your_grok_api_key |
| VITE_OFFLINE_LLM_URL | http://localhost:11434 |
| VITE_OFFLINE_LLM_MODEL | llama3.2:3b |
| VITE_OFFLINE_CEREBRAS_MODEL | llama3.2:3b |
| VITE_OFFLINE_GPT_MODEL | llama3.2:3b |

4. Click **Deploy**
5. Wait for the build to complete (2-5 minutes)
6. Your app is now live! Vercel provides a URL like `https://anti-xxxxx.vercel.app`

### Option 2: Deploy via GitHub Actions (CI/CD)

The repository includes a GitHub Actions workflow that automatically:
- Runs type checking (TypeScript lint)
- Builds the project
- Deploys to Vercel on main branch pushes

This happens automatically when you push to `main` branch.

### Option 3: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Continuous Deployment

After initial setup, continuous deployment is automatic:

1. **Push to main branch** → Automatic build and deployment
2. **Pull requests** → Automatic build verification (no deployment)
3. **Check deployment status** in GitHub (Actions tab) or Vercel dashboard

## Post-Deployment Verification

### 1. Test the Deployed App

```bash
# Use your Vercel URL or custom domain
open https://your-app-name.vercel.app
```

Verify:
- ✅ Page loads without errors
- ✅ UI renders correctly
- ✅ API calls work (check browser console)
- ✅ Environment variables are loaded

### 2. Check Logs

**Vercel Logs:**
1. Go to your project on Vercel
2. Click **Deployments** to see build/runtime logs
3. Look for errors or warnings

**Browser Console:**
- Press F12 in your browser
- Check Console tab for JavaScript errors

### 3. Test API Connectivity

If your app uses external APIs:
1. Open browser DevTools (F12)
2. Try using API features
3. Check Network tab for API calls
4. Verify API responses

## Troubleshooting

### Build Fails on Vercel

**Problem:** `npm run build` fails
- **Solution 1:** Check environment variables are set in Vercel dashboard
- **Solution 2:** Review build logs in Vercel → Deployments → Build logs
- **Solution 3:** Run `npm run build` locally to reproduce

### Build Hangs or Times Out

**Problem:** Build takes >10 minutes or times out
- **Solution:** Check for large dependencies or infinite loops
- **Workaround:** Increase build timeout in Vercel project settings

### Environment Variables Not Loading

**Problem:** `process.env` or `import.meta.env` returns undefined
- **Solution 1:** Verify variable names use `VITE_` prefix
- **Solution 2:** Check variables are set in Vercel → Settings → Environment Variables
- **Solution 3:** Ensure deploy is fresh after setting variables

### App Loads but Features Don't Work

**Problem:** App renders but API calls fail
- **Solution 1:** Verify API endpoints are correct (no localhost URLs)
- **Solution 2:** Check CORS configuration
- **Solution 3:** Verify API keys are valid and not expired

### Large Chunk Warnings

**Warning:** "Some chunks are larger than 500 kB"
- **Impact:** None - site still works, just slower initial load
- **Fix (optional):** Implement code splitting with dynamic imports

## Custom Domain

To add a custom domain:

1. Go to Vercel project → Settings → Domains
2. Click **Add** → Enter your domain
3. Update DNS records at your domain registrar
4. Wait for DNS propagation (up to 48 hours)

See: [Vercel Custom Domains Guide](https://vercel.com/docs/concepts/projects/domains/add-a-domain)

## Rollback Previous Deployment

If something breaks:

1. Go to Vercel → Deployments
2. Find the previous working deployment
3. Click the **3-dot menu** → Promote to Production
4. Deployment is reverted instantly

## Update Deployment After Code Changes

### Via GitHub (Automatic)

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel automatically builds and deploys.

### Manual Update

```bash
cd project-directory
git pull origin main
git push origin main
```

## Environment Variables Renewal

If API keys expire:

1. Update `.env` file locally
2. Update GitHub Secrets in **Settings** → **Secrets and variables**
3. Update Vercel environment variables in **Settings** → **Environment Variables**
4. Trigger a new deployment:
   - Via GitHub: Push a commit
   - Via Vercel: Click "Redeploy"

## Monitoring

### View Real-Time Logs

```bash
# Using Vercel CLI
vercel logs --follow
```

### Check Error Rate

- Vercel Dashboard → Analytics
- Look for 4xx/5xx errors

### Performance Monitoring

- Vercel → Analytics → Performance
- Check Core Web Vitals

## Security Best Practices

✅ **Always:**
- Keep API keys in environment variables, never in code
- Use `.gitignore` to exclude `.env` file
- Rotate API keys regularly
- Use GitHub branch protection on main

❌ **Never:**
- Commit `.env` file
- Share API keys in issues or PRs
- Store secrets in code comments
- Use development keys in production

## Support Resources

- [Vite Documentation](https://vitejs.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Quick Reference Commands

```bash
# Local development
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Type check with TypeScript

# Deployment
git push origin main # Push changes (triggers auto-deploy)
vercel --prod        # Deploy via CLI
vercel --prod --yes  # Deploy without confirmation
```

---

**Last Updated:** March 2026
**Vite Version:** 6.2.0
**Node Version Required:** 18+
