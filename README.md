# DEEPTHINK AI Pro

DEEPTHINK AI Pro is a high-performance, enterprise-grade AI chat application built with React, Tailwind CSS, and powered by Google's Gemini AI and Firebase.

## 🚀 Features

- **Multi-Engine Support**: Switch between Gemma 3 27B, Cerebras Llama 3.1, GPT-oss 120B, Grok-1, and Blackbox AI.
- **Cloud Persistence**: Full integration with Firebase Authentication and Firestore for real-time data sync.
- **Multimodal Input**: Upload images, documents, folders, and use your camera for AI analysis.
- **Offline LLM Mode**: Run a local model through Ollama without internet or cloud API keys.
- **Hybrid Availability**: If local Ollama is unavailable, chats can fall back to online inference, and online failures can fall back to local mode.
- **Google Search Grounding**: Real-time information retrieval for accurate and up-to-date responses.
- **Professional UI**: Sleek dark theme with smooth animations and optimized performance.
- **Secure Auth**: Login with Google or Phone Number + OTP.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **AI**: Google Gemini API (`@google/genai`)
- **Backend**: Firebase (Auth, Firestore)
- **Icons**: Lucide React
- **Markdown**: React Markdown

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/dg-chat.git
cd dg-chat
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your API keys:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_OFFLINE_LLM_URL=http://localhost:11434
VITE_OFFLINE_LLM_MODEL=llama3.2:3b
VITE_OFFLINE_CEREBRAS_MODEL=llama3.2:3b
VITE_OFFLINE_GPT_MODEL=llama3.2:3b
```

### 4.1 Offline LLM Setup (Ollama)
Install Ollama and pull a local model:

```bash
ollama pull llama3.2:3b
ollama serve
```

Then select **Offline LLM (Ollama)** in the app model selector.

### 5. Firebase Configuration
Ensure your `firebase-applet-config.json` is correctly populated with your Firebase project details.

### 6. Run the Development Server
```bash
npm run dev
```

## 🛡️ Security Rules
Deploy the provided `firestore.rules` to your Firebase project to ensure data privacy and security.

## 📄 License
MIT License
