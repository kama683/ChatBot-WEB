// Express server that connects to Google Gemini API and returns AI-generated responses.

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini client with API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /chat — receives user message and returns Gemini response
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    res.status(500).json({ error: "Error contacting Gemini API" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
