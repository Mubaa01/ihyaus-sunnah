import dotenv from "dotenv";
import axios from "axios";
import db from "./db.js";
import { saveTelegramMessageAsProgramVideo } from "./services/telegramMediaService.js";

dotenv.config();

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

let lastUpdateId = 0;

const pollTelegramMessages = async () => {
  try {
    console.log("📱 Starting Telegram Program Video Polling...");
    console.log(`Channel ID: ${TELEGRAM_CHANNEL_ID}`);

    await db();
    console.log("✅ Database connected");

    // Poll indefinitely
    while (true) {
      try {
        // Get updates from Telegram
        const response = await axios.get(`${TELEGRAM_API_URL}/getUpdates`, {
          params: {
            offset: lastUpdateId + 1,
            limit: 100,
            timeout: 30,
          },
        });

        if (!response.data.ok) {
          console.error("❌ Telegram API error:", response.data);
          continue;
        }

        const updates = response.data.result || [];

        if (updates.length === 0) {
          console.log("⏳ Waiting for new messages...");
          continue;
        }

        console.log(`📬 Received ${updates.length} update(s)`);

        for (const update of updates) {
          lastUpdateId = update.update_id;

          // Check if message exists and has video
          if (
            !update.message ||
            (update.message.chat?.id !== Number(TELEGRAM_CHANNEL_ID) &&
              update.message.channel_post === undefined)
          ) {
            continue;
          }

          const message = update.message || update.channel_post;

          if (!message.video) {
            console.log("⏭️  Skipping non-video message");
            continue;
          }

          console.log("🎬 Processing video message...");
          console.log(`Caption: ${message.caption}`);

          try {
            const result = await saveTelegramMessageAsProgramVideo(message);

            if (result.skipped) {
              console.log(`⏭️  Skipped: ${result.message}`);
              continue;
            }

            console.log(`✅ Video saved to program: ${result.program.title}`);
            console.log(`   Category: ${result.previewVideo}`);
            console.log(`   Title: ${result.previewVideo.title}`);
            console.log(`   Duration: ${result.previewVideo.duration}`);
          } catch (err) {
            console.error(
              `❌ Error processing video: ${err.message}`
            );
            console.error("   Details:", err.details || err.statusCode);
          }
        }
      } catch (err) {
        if (err.code === "ECONNABORTED") {
          console.log("⏳ Long poll timeout (normal behavior)");
        } else {
          console.error("❌ Polling error:", err.message);
          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    }
  } catch (err) {
    console.error("❌ Fatal error:", err);
    process.exit(1);
  }
};

// Start polling
pollTelegramMessages().catch((err) => {
  console.error("❌ Unhandled error:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Stopping polling...");
  process.exit(0);
});
