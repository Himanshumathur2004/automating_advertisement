# Dev.to Automated Posting Setup

## What's Been Configured

### 1. **Dev.to Only Platform Distribution**
   - **File Modified:** `src/lib/pipeline/distribution.ts`
   - **Change:** Modified `assignDistribution()` function to only target:
     - `blog` (your own site)
     - `devto` (dev.to platform)
   - **Result:** All social platforms (Twitter/X, LinkedIn, Reddit, HackerNews) are SKIPPED
   - **No rotation:** Every post goes to dev.to consistently (not rotating through platforms)

### 2. **Automated Post Scheduler**
   - **File Created:** `src/scripts/post-scheduler.ts`
   - **Package Script:** `npm run post:schedule`
   - **Interval:** Every **60 seconds (1 minute)**
   - **Behavior:**
     - Posts all pending posts in queue to dev.to via API
     - Logs results with timestamp
     - Continues running until stopped (Ctrl+C)
     - Shows: Posted count, Failed count, and cycle number

## How to Use

### Generate New Posts (Dev.to Only)
```bash
npm run generate
```
- Creates blog variants for dev.to
- Generates 2 posts per content item:
  1. Blog version (for your site)
  2. Dev.to version (optimized for dev.to)
- No social posts are generated

### Start Automated Posting every 1 Minute
```bash
npm run post:schedule
```
- Immediately post any pending posts
- Then posts every 60 seconds
- Stop: Press `Ctrl+C`

### Manual Single Post
```bash
npm run post
```
- Posts all pending items once and exits
- Useful for testing

## Pipeline Flow

```
ANALYZE (fetch topics)
  ↓
GENERATE (blog + devto variants only, no social)
  ↓
POSTS QUEUED in post_queue.json
  ↓
POST SCHEDULER (every 1 minute)
  ↓
Posted to:
  - Dev.to ✅
  - Your Blog ✅
  - Social Platforms ❌ (skipped)
```

## Monitoring

### Check Pending Posts
```powershell
$posts = Get-Content ".pipeline-state/post_queue.json" | ConvertFrom-Json
$pending = @($posts | Where-Object {$_.status -eq "pending"})
Write-Host "Pending posts: $($pending.Count)"
```

### View Last Generation
```powershell
Get-Content ".pipeline-state/last_generate.json" | ConvertFrom-Json
```

### View Last Post Run
```powershell
Get-Content ".pipeline-state/last_post.json" | ConvertFrom-Json
```

## Important Notes

1. **Dev.to API Key Required**
   - Must be set: `DEVTO_API_KEY=TxAV9ALnjqmX3DAWvxkd2BSX`
   - Auto-publishes immediately: `DEVTO_PUBLISH_IMMEDIATELY=true`
   - Tags applied: megallm, viral, treanding

2. **Queue Management**
   - Posts persist in queue until marked as "posted"
   - Status values: pending, posting, posted, failed
   - The scheduler will retry failed posts

3. **Scheduling Interval**
   - To change from 1 minute, edit `src/scripts/post-scheduler.ts`
   - Line: `const POST_INTERVAL_MS = 60 * 1000;` (in milliseconds)
   - Examples: 
     - 30 seconds: `30 * 1000`
     - 2 minutes: `2 * 60 * 1000`
     - 5 minutes: `5 * 60 * 1000`

4. **Running Background Services**
   - To run both generate and post:scheduler together:
     ```bash
     # Terminal 1: Generate content continuously
     npm run generate
     
     # Terminal 2: Post every 1 minute
     npm run post:schedule
     ```

## Example Output

```
🚀 Starting post scheduler...
⏱️  Posting interval: every 60 seconds
📍 Press Ctrl+C to stop

⏰ [10:30:45] Posting cycle 1...
10:30:45 ✅ Posted: 2, Failed: 0
⏰ [10:31:45] Posting cycle 2...
10:31:45 ℹ️  No pending posts
⏰ [10:32:45] Posting cycle 3...
10:32:45 ✅ Posted: 1, Failed: 0
```

## Troubleshooting

**Scheduler running but no posts?**
- Check: `json Get-Content ".pipeline-state/post_queue.json" | ConvertFrom-Json | Where {$_.status -eq "pending"}`
- Run `npm run generate` to create new posts

**Posts failing with "Not logged in to Dev.to"?**
- Verify: `$env:DEVTO_API_KEY` is set correctly
- Check: Dev.to credentials in `.env` file

**Want to revert to multi-platform posting?**
- Reset `src/lib/pipeline/distribution.ts` to use rotation:
  ```typescript
  export function assignDistribution(contentType: string) {
    const blogTargets: Platform[] = ["blog"];
    const externalBlogs = BLOG_PLATFORMS.filter(p => p !== "blog");
    const selectedBlog = externalBlogs[_blogRotationIndex % externalBlogs.length];
    blogTargets.push(selectedBlog);
    _blogRotationIndex++;
    // ... rest of social logic
  }
  ```

## Start Automation Now

1. **Terminal 1 - Generate content:**
   ```bash
   npm run generate
   ```

2. **Terminal 2 - Auto-post every 1 minute:**
   ```bash
   npm run post:schedule
   ```

Done! ✅ Your posts will automatically post to Dev.to every 60 seconds.
