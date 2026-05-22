# Telegram Media Library Setup

This project can use Telegram as the media source while MongoDB stores only metadata and Telegram references.

## Environment Variables

Add these to the backend `.env` file:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_WEBHOOK_SECRET=choose-a-long-random-secret
```

`TELEGRAM_WEBHOOK_SECRET` is optional, but recommended. Telegram sends it back in the
`x-telegram-bot-api-secret-token` header so the backend can reject unknown webhook calls.

## Telegram Channel Workflow

1. Create a private Telegram channel, for example `Ihyaus Sunnah Media Store`.
2. Add your bot to the channel as an admin.
3. Upload one media file per post.
4. Use this caption format:

```text
TITLE: Tafsir of Surah Al-Fatiha
TYPE: video
CATEGORY: Tafsir
STAFF: Sheikh Ahmad
PLAYLIST: Qur'an Explanation Series
VISIBILITY: public
TAGS: tafsir, quran, fatiha
DESCRIPTION: Optional longer description
THUMBNAIL: Optional image URL
```

Required fields:

```text
TITLE
TYPE
CATEGORY
PLAYLIST
```

Allowed `TYPE` values:

```text
video
audio
short
student
```

Allowed `VISIBILITY` values:

```text
public
private
```

The `STAFF` value should match a senior staff name in the website admin. `TRUSTEE` is still accepted for older captions. If it is empty or no matching staff is found, the media is saved as unassigned/general content.

## Backend Webhook Endpoint

The webhook endpoint is:

```text
POST /api/media/telegram/webhook
```

Example Telegram webhook registration:

```text
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://your-domain.com/api/media/telegram/webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>
```

## Local Development Without ngrok

If you are running the backend locally and do not want to use a public tunnel, use Telegram polling instead.

First, make sure no webhook is active:

```text
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/deleteWebhook
```

Then run this in the backend folder:

```powershell
npm run telegram:poll
```

Keep that terminal open while uploading media to the Telegram channel. The polling script reads new channel posts from Telegram and saves them to MongoDB Atlas.

## Playback

The frontend does not store or expose the bot token. For Telegram media, it calls:

```text
GET /api/media/:id/telegram-url
```

The backend asks Telegram for a fresh temporary file URL and returns it to the player.
