import { fetchNews } from "./fetchNews.js";
import { summarize } from "./summarize.js";
import { sendWhatsApp } from "./sendWhatsApp.js";

try {
  const news = await fetchNews();
  const summary = await summarize(news);
  await sendWhatsApp(summary);
  console.log("✅ WhatsApp message sent");
} catch (err) {
  console.error("❌ Agent failed:", err.message);
}