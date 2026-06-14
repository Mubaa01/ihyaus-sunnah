import dotenv from "dotenv";
import connectDB from "./db.js";
import { saveTelegramMessageAsResearch } from "./services/telegramResearchService.js";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("TELEGRAM_BOT_TOKEN is missing from .env");
  process.exit(1);
}

await connectDB();

let offset = 0;

console.log("Telegram research polling started. Press Ctrl+C to stop.");

const poll = async () => {
  const url = new URL(`https://api.telegram.org/bot${token}/getUpdates`);
  url.searchParams.set("timeout", "25");
  url.searchParams.set("allowed_updates", JSON.stringify(["message", "channel_post"]));
  if (offset) url.searchParams.set("offset", String(offset));

  const response = await fetch(url);
  const payload = await response.json();

  if (!payload.ok) {
    throw new Error(payload.description || "Telegram getUpdates failed");
  }

  for (const update of payload.result) {
    offset = update.update_id + 1;
    const message = update.channel_post || update.message;
    if (!message) continue;

    try {
      const result = await saveTelegramMessageAsResearch(message);
      if (result.skipped) {
        console.log(`[skip] ${result.message}`);
      } else {
        console.log(`[saved] ${result.research.title}`);
      }
    } catch (error) {
      console.error(`[error] ${error.message}`);
    }
  }
};

while (true) {
  try {
    await poll();
  } catch (error) {
    console.error(`[poll] ${error.message}`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
