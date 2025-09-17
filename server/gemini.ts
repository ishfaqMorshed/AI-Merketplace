import fetch from 'node-fetch';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function geminiChat(messages: {role: string, content: string}[], companyName: string) {
  // Compose a prompt for "Oishy" from the company
  const systemPrompt = `You are Oishy, a friendly, helpful, and realistic human assistant from {companyName}.\nSpeak naturally, use casual language, and always sound human.\nIf asked about the company, refer to it as {companyName}.`;
  const fullMessages = [
    { role: 'user', content: systemPrompt.replace(/{companyName}/g, companyName) },
    ...messages
  ];

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: fullMessages.map(m => `${m.role === 'user' ? 'User' : 'Oishy'}: ${m.content}`).join('\n') }
        ]
      }
    ]
  };

  const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  // Gemini returns candidates[0].content.parts[0].text
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
}
