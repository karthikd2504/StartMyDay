import Parser from "rss-parser";
const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "Mozilla/5.0"
  }
});

export async function fetchNews() {
  const feeds = [
    "https://www.moneycontrol.com/rss/marketreports.xml",
    "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
    "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^NSEI&region=IN&lang=en-IN",
    "https://www.coindesk.com/arc/outboundfeeds/rss/"
  ];

  let news = [];

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      news.push(...feed.items.slice(0, 4).map(i => i.title));
    } catch (err) {
      console.log("⚠️ RSS skipped:", url);
    }
  }

  if (news.length === 0) {
    news.push("No major market-moving news found.");
  }

  return news;
}