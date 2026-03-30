# Reddit Comment Assistant — Employee Guide

## Building a Fresh Reddit Account from Scratch

### Day 0: Account Setup (5 min)

1. Go to https://reddit.com/register
2. Use a personal-sounding username (not "megallm_marketing")
   - Good: `dev_kush_42`, `ml_tinkerer_99`, `quietcoder_`, `llm_hobbyist`
   - Bad: `megallm_official`, `ai_gateway_team`, `marketing_dept`
3. Pick a profile picture (anime, pet, meme, or default — anything but a logo)
4. Write a 1-line bio that sounds human: "building stuff with llms" or "ml engineer, cat person"
5. Join all 29 target subreddits from the config

### Week 1: Lurk + Light Engagement (10 min/day)

**Goal: 50-100 karma. Establish the account as real.**

Day 1-2: Just upvote posts. Browse r/LocalLLaMA and r/ChatGPT. Get familiar with the vibe.

Day 3-7: Start commenting using the assistant:
```bash
npm start
# Click "Fetch New Posts" → "Draft Comments"
# Review the options, pick the best one, copy & paste to Reddit
```

**Rules for Week 1:**
- Max 3-5 comments per day
- Only comment on posts where you genuinely have something to add
- NEVER mention MegaLLM or any product
- NEVER link to anything
- Pick "direct/short" options (15-30 words) — they feel most natural for new accounts
- Spread across different subreddits (don't camp one sub)

### Week 2: Build Reputation (15 min/day)

**Goal: 200-400 karma. Start being recognized.**

- Increase to 5-8 comments per day
- Start picking "personal experience" options when relevant
- Reply to other people's comments (not just top-level)
- If someone asks a question you know the answer to, give a detailed helpful reply
- Still NO product mentions

### Week 3+: Natural Engagement (15 min/day)

**Goal: 500+ karma. Account is established.**

- Now you can occasionally (1 in 10 comments) mention tools you "use"
- Focus on HIGH PRIORITY tagged posts — these have viral potential
- Pick the highest MegaLLM-score option when all else is equal
- Start posting your own content (share MegaLLM blog posts as "found this useful")

---

## Using the Dashboard

### 1. Start the Assistant
```bash
cd tools/reddit-assistant
MEGALLM_API_KEY=your-key MEGALLM_BASE_URL=https://ai.megallm.io/v1 npm start
```
Open http://localhost:3456

### 2. Daily Workflow

```
Step 1: Click "Fetch New Posts" (grabs trending posts from 29 subreddits)
Step 2: Click "Draft Comments" (generates 3 options per post with scores)
Step 3: Review the queue:
   - Look at the PRIORITY tag first (HIGH = viral potential, post early)
   - Look at the MegaLLM Score (higher = more beneficial for us)
   - Pick ONE option per post (you have 3 choices)
   - Edit if needed — add your own flair
   - Click "Copy & Open Reddit" — pastes to clipboard and opens the thread
Step 4: Paste the comment on Reddit
Step 5: Click "Mark Posted" to track it
```

### 3. Understanding Scores

**Viral Potential (post-level):**
- 🔴 HIGH — Post is gaining traction fast, in a large sub, or on a hot topic. Comment ASAP.
- 🟡 MEDIUM — Decent engagement, relevant topic. Good to comment on.
- ⚪ LOW — Standard post. Comment if the options are good.

**MegaLLM Score (comment-level, 0-100):**
- 70+ — Directly mentions MegaLLM or seeds gateway/routing concepts. Rare, high value.
- 40-69 — Mentions cost optimization, multi-provider, model comparison context. Good.
- 20-39 — General AI/API discussion. Builds karma and presence.
- 0-19 — Off-topic for MegaLLM but good for karma building.

**Always pick the comment you'd actually say.** A natural 20-score comment beats a forced 70-score one.

### 4. Option Styles

Each post gets 4 comment options:
1. **Direct/Short** (15-30 words) — Quick answer or reaction. Best for karma.
2. **Personal Experience** (30-60 words) — "i've been using..." angle. Best for authority.
3. **Unique Perspective** (20-50 words) — Mild disagreement or new angle. Best for discussion/visibility.
4. **Witty/Sarcastic** (10-25 words) — Pure personality. Joke, roast, sarcasm, absurd observation. Makes the account feel like a real human with humor. **Use these ~25% of the time** to build a fun, relatable persona. These aren't about MegaLLM — they're about making the account feel alive.

---

## Do's and Don'ts

### Do:
- Read the post before commenting (don't just copy-paste blindly)
- Edit comments to match your actual voice
- Reply to people who respond to your comments
- Upvote other good comments in the thread
- Take breaks — don't comment at exactly the same time every day

### Don't:
- Don't post all 3 options on the same thread
- Don't comment on every post — pick 5-8 per day max
- Don't use the same opening twice in a row
- Don't comment from multiple accounts on the same post
- Don't copy the comment if it doesn't sound like something you'd say
- Don't post links in your first 2 weeks
- Don't panic if a comment gets downvoted — it happens to everyone
