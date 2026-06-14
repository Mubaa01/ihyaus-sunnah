# Telegram Program Video Polling - Test Guide

## 📝 Caption Format

Post videos to your Telegram channel with captions in this format:

```
program_video
title: Video Title Here
program: Program Name
category: Category Name
duration: MM:SS
description: Optional description
```

## ✅ Valid Test Samples

### Sample 1: Quran Studies - Basic Level
```
program_video
title: Introduction to Quran Recitation
program: Quranic Studies
category: Basic Level
duration: 12:45
description: Learn the basics of Quran recitation with proper Tajweed rules
```

### Sample 2: Islamic Studies - Intermediate
```
program_video
title: Understanding Islamic Finance
program: Islamiyyah
category: Intermediate Level
duration: 18:30
description: Practical guide to Islamic banking and financing principles
```

### Sample 3: Youth Development - Foundation
```
program_video
title: Building Strong Character
program: Youth Development
category: Foundation
duration: 10:15
description: Character development workshop for young adults
```

### Sample 4: Community - Advanced
```
program_video
title: Community Leadership Excellence
program: Community
category: Advanced
duration: 25:00
description: Training on effective community leadership and management
```

### Sample 5: Tahfeez - Beginner
```
program_video
title: Memorization Techniques
program: Tahfeez
category: Beginner
duration: 15:20
description: Effective methods for Quran memorization
```

## 🚀 Running the Polling Command

### Start the Polling Service

```bash
npm run telegram:poll-programs
```

### Expected Output

```
📱 Starting Telegram Program Video Polling...
Channel ID: -100XXXXXXXXXX
✅ Database connected
⏳ Waiting for new messages...
```

### When You Post a Video

```
📬 Received 1 update(s)
🎬 Processing video message...
Caption: program_video
title: Introduction to Quran Recitation
program: Quranic Studies
category: Basic Level
duration: 12:45
description: Learn the basics of Quran recitation with proper Tajweed rules
✅ Video saved to program: Quranic Studies
   Category: [object Object]
   Title: Introduction to Quran Recitation
   Duration: 12:45
```

## 📋 Required Fields

- **title** (required): Video title
- **program** (required): Program name (must exist in database)
- **category** (required): Category name within the program
- **duration** (optional): Video duration in MM:SS format (default: 0:00)
- **description** (optional): Video description

## ⚙️ Setup Instructions

### 1. Ensure Environment Variables

Create/Update `.env` file:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHANNEL_ID=-100XXXXXXXXXX  # Your channel ID (starts with -100)
MONGODB_URI=mongodb://localhost:27017/ihyaus-sunnah
```

### 2. Create Test Programs (if not exist)

Run seed script:

```bash
npm run seed:50
```

Or create manually via admin panel with these programs:
- Quranic Studies
- Islamiyyah
- Youth Development
- Community
- Tahfeez
- Majlis
- Western Education
- Media
- Research

### 3. Create Categories in Each Program

Using the admin form, create categories like:
- Basic Level
- Intermediate Level
- Advanced Level
- Foundation
- Beginner

### 4. Start Polling

```bash
npm run telegram:poll-programs
```

The service will run indefinitely, listening for new messages.

## 🧪 Testing Checklist

- [ ] Environment variables set correctly
- [ ] MongoDB is running
- [ ] Programs exist in database
- [ ] Categories exist in programs
- [ ] Telegram bot token is valid
- [ ] Channel ID is correct
- [ ] Bot is member of the channel
- [ ] Post a test video with proper caption format
- [ ] Check console for success message
- [ ] Verify video appears in program via API
- [ ] Check admin dashboard for video display

## 🔍 Troubleshooting

### Error: "Program not found: Quranic Studies"
- **Solution**: Create the program in database first

### Error: "Category not found in program: Basic Level"
- **Solution**: Add the category to the program

### Error: "Telegram message does not contain supported media"
- **Solution**: Make sure you're posting a video file (not just text)

### No messages received
- **Solution**: 
  - Check bot token is correct
  - Check bot is member of channel
  - Check channel ID is correct (should start with -100)
  - Try sending a test message manually

## 📊 API to Check Videos

After posting, verify via API:

```bash
GET http://localhost:4000/api/programs/:programSlug
```

Response will include:
```json
{
  "categories": [
    {
      "title": "Basic Level",
      "previewVideos": [
        {
          "title": "Introduction to Quran Recitation",
          "duration": "12:45",
          "thumbnail": "...",
          "provider": "telegram",
          "mediaId": "...",
          "telegramFileId": "..."
        }
      ]
    }
  ]
}
```

## 💡 Pro Tips

1. **Batch Processing**: Post multiple videos with different programs/categories
2. **Auto-retry**: Service handles network issues automatically
3. **Max 3 Videos**: Only 3 latest videos per category are stored
4. **Media Library**: Videos also appear in media library for reuse
5. **Long Polling**: Service uses 30-second timeout for efficient updates

## 🛑 Stop Polling

Press `Ctrl+C` in terminal to gracefully stop the service.

## 📝 Caption Line Requirements

Each line must follow this format:
```
Field Name: Value
```

- **Field Name**: Use proper case (e.g., "title", "program")
- **Colon**: Must have `: ` (colon + space)
- **Value**: Trim whitespace automatically

Invalid examples:
```
❌ title:Video Name (missing space after colon)
❌ Title: Video Name (uppercase field name)
❌ title Video Name (no colon)
```

