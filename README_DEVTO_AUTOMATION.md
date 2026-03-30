# Dev.to Automation

Simple automated posting to Dev.to every 60 seconds.

## Prerequisites

- Node.js 18+
- Dev.to API key
- `npm install` already run

## Setup

### 1. Configure Environment Variables

Edit `.env` and set:

```env
DEVTO_API_KEY=your_devto_api_key_here
DEVTO_USERNAME=your_devto_username
DEVTO_PUBLISH_IMMEDIATELY=true
DEVTO_DEFAULT_TAGS=megallm,viral,trending
```

Get your API key at: https://dev.to/settings/account

### 2. Verify Configuration

```bash
# Check if env vars are loaded
npm run post
# Should show: "No pending posts" (queue is empty initially)
```

## Running Automation

### Option 1: Generate & Auto-Post (Recommended)

**Terminal 1 - Generate content:**
```bash
npm run generate
```

**Terminal 2 - Auto-post every 60 seconds:**
```bash
npm run post:schedule
```

### Option 2: Manual One-Time Post

```bash
npm run post
```

Posts all pending items once, then exits.

## Monitoring

### View pending posts
```powershell
Get-Content ".pipeline-state/post_queue.json" | ConvertFrom-Json | Select-Object -First 5
```

### View posted items
```powershell
Get-Content ".pipeline-state/post_queue.json" | ConvertFrom-Json | Where-Object {$_.status -eq "posted"}
```

### Check last run logs
```powershell
Get-Content ".pipeline-state/last_post.json" | ConvertFrom-Json
```

## Stopping Automation

```bash
# In the terminal running post:schedule, press Ctrl+C
```

Output will show:
```
📊 Scheduler stopped. Summary: Posted X cycles, Total failures: 0
```

## Troubleshooting

**"DEVTO_API_KEY not set"**
- Verify `.env` has correct API key
- Check: `$env:DEVTO_API_KEY` in PowerShell
- Restart terminal to reload `.env`

**No posts being posted**
- Run `npm run generate` to create pending posts
- Check queue: `Get-Content ".pipeline-state/post_queue.json"`
- Verify status is "pending", not "posted" or "failed"

**Connection timeout**
- Check internet connection
- Verify Dev.to API is accessible: `curl https://dev.to/api/articles`

## Configuration Options

Edit these in `.env`:

| Variable | Default | Description |
|----------|---------|-------------|
| `DEVTO_API_KEY` | - | Dev.to API key (required) |
| `DEVTO_USERNAME` | - | Your Dev.to username |
| `DEVTO_PUBLISH_IMMEDIATELY` | true | Auto-publish (true) or draft (false) |
| `DEVTO_DEFAULT_TAGS` | megallm,viral,trending | Comma-separated tags (max 4) |

## Changing Post Interval

Edit `src/scripts/post-scheduler.ts`:

```typescript
const POST_INTERVAL_MS = 60 * 1000; // Change this value

// Examples:
// 30 seconds: 30 * 1000
// 5 minutes: 5 * 60 * 1000
// 1 hour: 60 * 60 * 1000
```

Then run: `npm run post:schedule`

## File Structure

```
.
├── .env                          # Configuration file
├── .pipeline-state/             # State storage
│   ├── post_queue.json          # Pending/posted items
│   └── last_post.json           # Last run details
├── src/
│   ├── scripts/
│   │   ├── post-scheduler.ts    # Scheduler (runs every 60s)
│   │   ├── run-pipeline.ts      # CLI runner
│   │   └── posters/
│   │       └── devto.ts         # Dev.to poster
│   └── workflows/
│       ├── generate.ts          # Content generation
│       └── post.ts              # Post distribution
```

## API Limits

Dev.to free API has no strict rate limits, but:
- Recommended: 1 post per minute
- Max: ~5 posts per 5 minutes without blocking
- See: https://docs.dev.to/api/ for current limits

## Performance

- **Memory**: ~50MB
- **CPU**: Minimal (mostly idle between posts)
- **Network**: ~200KB per post request
- **Uptime**: Continuous until stopped (Ctrl+C)
