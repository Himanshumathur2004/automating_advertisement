# Dev.to Assistant

Standalone automation tool for managing and posting articles to Dev.to.

## Structure

```
devto-assistant/
├── config.js           # Configuration loader
├── post.js            # Single post handler
├── schedule.js        # Scheduler (posts every N seconds)
├── queue-manager.js   # Queue viewer/manager
├── test-config.js     # Configuration tester
├── package.json       # Dependencies
├── data/              # Storage
│   ├── queue.json     # Pending/posted items
│   ├── posted.json    # Posted articles log
│   └── backups/       # Queue backups
└── README.md          # This file
```

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Edit `../../.env`:
```env
DEVTO_API_KEY=your_api_key_here
DEVTO_USERNAME=your_username
DEVTO_PUBLISH_IMMEDIATELY=true
DEVTO_DEFAULT_TAGS=megallm,viral,trending
DEVTO_POST_INTERVAL_MS=60000
```

### 3. Test Configuration
```bash
node test-config.js
```

## Usage

### View Queue
```bash
node queue-manager.js view        # Show all items
node queue-manager.js view 20     # Show first 20
node queue-manager.js pending     # Show pending only
node queue-manager.js stats       # Show statistics
```

### Post Single Article
```bash
node post.js '{"title":"Hello","content":"# Hello World"}'
```

### Schedule Auto-Posting
```bash
node schedule.js
```

Automatically posts pending items every 60 seconds (configurable).

## Queue Format

Items in `data/queue.json`:
```json
[
  {
    "id": "post-1",
    "title": "Getting Started with Dev.to API",
    "content": "# Markdown content here",
    "tags": ["dev.to", "api", "automation"],
    "status": "pending",
    "scheduledTime": "2026-03-30T12:00:00.000Z",
    "postedUrl": null,
    "postedId": null,
    "error": null
  }
]
```

### Status Values
- `pending` - Waiting to be posted
- `posting` - Currently posting
- `posted` - Successfully posted
- `failed` - Post failed
- `draft` - Saved as draft on Dev.to

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `DEVTO_API_KEY` | - | Dev.to API key (required) |
| `DEVTO_USERNAME` | - | Your Dev.to username |
| `DEVTO_PUBLISH_IMMEDIATELY` | true | Auto-publish (true) or save as draft (false) |
| `DEVTO_DEFAULT_TAGS` | ai,llm,api | Default tags for articles |
| `DEVTO_POST_INTERVAL_MS` | 60000 | Scheduler interval in milliseconds |
| `DEVTO_VERBOSE` | false | Enable verbose logging |

## Commands

### npm scripts
```bash
npm run post           # Post a single article
npm run schedule       # Start scheduler
npm run queue:view     # View queue
npm run queue:clear    # Clear queue (creates backup)
npm run test          # Test configuration
```

### Direct calls
```bash
node post.js
node schedule.js
node queue-manager.js [command]
node test-config.js
```

## API Integration

Uses Dev.to API v0:
- Endpoint: `https://dev.to/api/articles`
- Auth: API key in `api-key` header
- Rate Limit: No strict limits on free tier

See: https://docs.dev.to/api/

## Logging

Posts are logged to:
- `data/posted.json` - All successfully posted articles
- `data/queue.json` - Current queue state
- `data/*.backup-*` - Queue backups before clearing

## Troubleshooting

**"DEVTO_API_KEY not configured"**
- Check `.env` file in parent directory
- Run: `node test-config.js`

**Posts not posting**
- Check queue status: `node queue-manager.js pending`
- Verify scheduler is running with correct interval
- Check for errors in queue items

**API connection errors**
- Verify internet connection
- Check Dev.to status page
- Try: `curl https://dev.to/api/users/me` with your API key

## Performance

- Memory: ~20MB
- CPU: Minimal (mostly idle between posts)
- Network: ~150KB per post
- Uptime: Continuous until stopped (Ctrl+C)

## Logs

### Last Posted Articles
```bash
tail -10 data/posted.json
```

### Queue Status
```bash
node queue-manager.js stats
```

## Examples

### Add article to queue
```bash
cat > data/queue.json << 'EOF'
[{
  "id": "post-1",
  "title": "My First Dev.to Post",
  "content": "# Hello World\n\nThis is my post.",
  "tags": ["tutorial", "devops"],
  "status": "pending",
  "scheduledTime": "2026-03-30T10:00:00Z",
  "postedUrl": null,
  "postedId": null,
  "error": null
}]
EOF
```

### Start scheduler
```bash
node schedule.js
```

Output:
```
🚀 Starting Dev.to scheduler...
⏱️  Posting interval: every 60 seconds
📍 Press Ctrl+C to stop

⏰ [10:30:45 AM] Posting cycle 1...
   ✅ Posted: 1
⏰ [10:31:45 AM] Posting cycle 2...
   ℹ️  No pending posts
```

## License

MIT
