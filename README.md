# Gemini AI Chatbot Web App

A modern, minimal chat interface with voice input powered by Google Gemini API.


<img width="800" height="677" alt="image" src="https://github.com/user-attachments/assets/0cb1699f-bb4d-4ad6-a719-d2da59192c87" />

## ✨ Features

- Text-based conversation with Gemini 2.5 Pro
- Voice input via Web Speech API (RU)
- Animated mic recording indicator
- AI "thinking" animation
- Smooth transitions from welcome screen to chat
- Styled using Tailwind CSS + Framer Motion

<img width="700" height="677" alt="image" src="https://github.com/user-attachments/assets/dcff1111-a880-480f-9df4-de7d5d1487db" />

## 🚀 Technologies Used

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- API: `@google/generative-ai`
- Animations: Framer Motion

## 🛠 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ChatBot-WEB.git
cd ChatBot-WEB
```

### 2. Setup the server

```bash
cd server
npm install
```

Create a `.env` file:

```
GEMINI_API_KEY=your_google_gemini_key_here
```

Run the server:

```bash
node index.js
```

### 3. Setup the client

```bash
cd ../client
npm install
npm run dev
```

Visit `http://localhost:5173`

---

