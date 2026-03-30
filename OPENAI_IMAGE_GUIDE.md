# OpenAI DALL-E 3 Image Generation Integration

## Overview

Your project now supports **OpenAI DALL-E 3** for high-quality image generation. The service is fully integrated and ready to use.

## Setup

### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/account/api-keys
2. Create a new API key (format: `sk-...`)
3. Copy the key

### 2. Add to Your Environment

**Local Development:**
Add to `d:\anti\.env`:
```
VITE_OPENAI_API_KEY=sk-your-key-here
```

**Vercel Deployment:**
1. Go to your Vercel project settings
2. Settings → Environment Variables
3. Add:
   ```
   VITE_OPENAI_API_KEY = sk-your-key-here
   ```

## Usage Examples

### Basic Image Generation

```typescript
import { generateImageDallE3 } from '@/services/openai-image';

// Generate a single image
const images = await generateImageDallE3(
  "A serene mountain landscape at sunset"
);

console.log(images[0].url); // Get the image URL
console.log(images[0].revisedPrompt); // OpenAI's optimized prompt
```

### With Options

```typescript
const images = await generateImageDallE3(
  "A futuristic city skyline",
  {
    size: '1792x1024',        // 'square' (1024x1024), 'portrait' (1024x1792), 'landscape' (1792x1024)
    quality: 'hd',            // 'standard' or 'hd' (hd costs 2x more)
    style: 'vivid'            // 'vivid' or 'natural'
  }
);
```

### Streaming Progress (for UI updates)

```typescript
import { generateImageStreamDallE3 } from '@/services/openai-image';

// Display progress as image generates
for await (const update of generateImageStreamDallE3("A beautiful ocean sunset")) {
  console.log(update.status);     // "Preparing request...", etc
  console.log(update.progress);   // 0-100
  
  if (update.image) {
    console.log("Image ready!", update.image.url);
  }
}
```

### Batch Generation

```typescript
import { generateImagesDallE3Batch } from '@/services/openai-image';

const prompts = [
  "A mountain landscape",
  "An urban city street",
  "A forest scene"
];

const results = await generateImagesDallE3Batch(prompts);

// results is a Map<string, GeneratedImage>
results.forEach((image, prompt) => {
  console.log(`Generated: ${image.revisedPrompt}`);
  console.log(`URL: ${image.url}`);
});
```

### Enhance Prompts

```typescript
import { enhancePromptForDallE3 } from '@/services/openai-image';

const prompt = "A cat sitting on a table";
const enhanced = enhancePromptForDallE3(prompt);
// Returns: "high quality, professional, A cat sitting on a table"
```

### Check if API Key is Valid

```typescript
import { isOpenAIKeyConfigured } from '@/services/openai-image';

if (isOpenAIKeyConfigured()) {
  // API key is configured
  console.log("OpenAI API is ready!");
}
```

## React Component Example

```typescript
import { useState } from 'react';
import { generateImageStreamDallE3 } from '@/services/openai-image';

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    setLoading(true);
    setProgress(0);

    for await (const update of generateImageStreamDallE3(prompt)) {
      setProgress(update.progress);
      if (update.image) {
        setImage(update.image.url);
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe an image..."
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? `Generating... ${progress}%` : 'Generate'}
      </button>
      {image && <img src={image} alt="Generated" />}
    </div>
  );
}
```

## Image Sizes & Costs

| Size | Format | Use Case | Cost |
|------|--------|----------|------|
| 1024x1024 | Square | Default, portraits | $0.04 |
| 1792x1024 | Landscape | Wide scenes | $0.08 |
| 1024x1792 | Portrait | Tall images | $0.08 |

## Quality Levels

- **standard** ($0.04-0.08): Good quality, faster
- **hd** ($0.08-0.16): Superior quality, more detailed

## Tips for Best Results

1. **Be specific:** "A serene Japanese garden with a wooden bridge and koi pond" > "A garden"
2. **Include style:** Add "oil painting", "watercolor", "digital art", "photography"
3. **Add details:** Mention lighting, mood, colors, composition
4. **Use quality keywords:** "high quality", "professional", "detailed", "masterpiece"

### Good Prompts
- "A cozy bookstore with warm lighting and wooden shelves, watercolor painting style"
- "A futuristic space station orbiting Mars, cinematic photography, extremely detailed"
- "A medieval fantasy castle on a cliff, dramatic sunset lighting, oil painting"

### Avoid
- Avoid asking for real people (celebrities, politicians)
- Avoid violent or disturbing content
- Avoid text in images (DALL-E struggles with text)
- Keep under 4000 characters

## Error Handling

```typescript
import { generateImageDallE3 } from '@/services/openai-image';

try {
  const images = await generateImageDallE3("A beautiful landscape");
  console.log(images[0].url);
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('API key')) {
      console.log("API key not configured");
    } else if (error.message.includes('rate')) {
      console.log("Rate limit exceeded - wait a moment and try again");
    } else {
      console.log("Error:", error.message);
    }
  }
}
```

## API Rate Limits

Free Tier:
- Limited API calls
- 10 requests per minute

Paid Tier:
- Pay per image
- Higher rate limits
- Depends on account tier

## Common Issues

### "API key not configured"
- Add `VITE_OPENAI_API_KEY` to `.env`
- Make sure it starts with `sk-`
- Restart dev server

### "Invalid API request"
- Check API key is valid and active
- Verify you have credits
- Check prompt length (max 4000 characters)

### "Rate limit exceeded"
- Wait a few seconds before retrying
- Implement exponential backoff for retries
- Consider batch processing with delays

### "Invalid image size"
- Use only: `1024x1024`, `1792x1024`, or `1024x1792`
- DALL-E 3 doesn't support custom sizes

## Integration with Chat

To add image generation to your chat app:

```typescript
// In App.tsx, add image generation as a feature
if (userMessage.includes("generate image") || userMessage.includes("create image")) {
  const prompt = userMessage.replace(/generate|create/gi, '').trim();
  const images = await generateImageDallE3(prompt);
  // Display image in chat
}
```

## Files Changed

- ✅ `.env.example` - Added `VITE_OPENAI_API_KEY`
- ✅ `vite.config.ts` - Added OpenAI environment variable support
- ✅ `vercel.json` - Added OpenAI secret mapping
- ✅ `src/vite-env.d.ts` - Added TypeScript types
- ✅ `src/services/openai-image.ts` - **NEW** - Complete image generation service

## Testing Locally

```bash
# 1. Add API key to .env
echo "VITE_OPENAI_API_KEY=sk-your-key-here" >> .env

# 2. Start dev server
npm run dev

# 3. Test in browser console
import { generateImageDallE3 } from './src/services/openai-image';
await generateImageDallE3("A sunset over mountains");
```

## Deployment

```bash
# 1. Add secret to Vercel (Settings → Environment Variables)
VITE_OPENAI_API_KEY = sk-your-key-here

# 2. Deploy
git push origin main

# Done! Image generation works on Vercel
```

## Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [DALL-E 3 Guide](https://platform.openai.com/docs/guides/images)
- [Prompt Engineering Tips](https://platform.openai.com/docs/guides/prompt-engineering)

---

**Ready to use!** Start with `generateImageDallE3()` in your code. 🎨
