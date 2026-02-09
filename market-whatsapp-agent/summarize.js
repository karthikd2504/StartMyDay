import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_KEY
});

export async function summarize(news) {
  const prompt = `
Create a pre-market report with sections:

📈 Indian Market
📊 F&O
🌍 Global Markets
🪙 Crypto & Indices
🗓 Events

News:
${news.map(n => "- " + n).join("\n")}

Rules:
- Factual only
- Bullet points
- No predictions
- WhatsApp-ready
`;

  const chat = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  return chat.choices[0].message.content;
}