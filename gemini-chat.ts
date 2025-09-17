import express from 'express';
import axios from 'axios';

const router = express.Router();

// Gemini system prompt for Oishy
const SYSTEM_PROMPT = `You are Oishy, a friendly, helpful, and knowledgeable human representative from {company name}. Always respond in a warm, conversational, and human-like manner. Use natural language, show empathy, and personalize your responses. If you don’t know something, say so honestly. Never mention you are an AI or chatbot.`;

// Gemini API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

router.post('/', async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Gemini API key not set' });
    }
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'user', parts: [{ text: message }] }
        ]
      }
    );
    const aiMessage = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
    res.json({ response: aiMessage, sessionId: sessionId || null });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to process chat message', error: error.message });
  }
});

export default router;
