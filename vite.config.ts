import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', ['VITE_', 'GEMINI_', 'CEREBRAS_', 'GROK_', 'NVIDIA_', 'OPENAI_']);
  
  return {
    plugins: [react(), tailwindcss()],
    envPrefix: ['VITE_', 'GEMINI_', 'CEREBRAS_', 'GROK_', 'NVIDIA_', 'OPENAI_'],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
      'process.env.CEREBRAS_API_KEY': JSON.stringify(env.CEREBRAS_API_KEY || ''),
      'process.env.GROK_API_KEY': JSON.stringify(env.GROK_API_KEY || ''),
      'process.env.NVIDIA_API_KEY': JSON.stringify(env.NVIDIA_API_KEY || ''),
      'process.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: true,
    },
  };
});
