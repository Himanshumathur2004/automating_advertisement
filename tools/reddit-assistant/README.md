# Reddit Comment Assistant

AI-powered tool that helps you write helpful Reddit comments. Fetches trending posts from AI/ML subreddits, drafts thoughtful responses, and lets you review before posting.

## Setup (2 minutes)

```bash
# 1. Install
cd tools/reddit-assistant
npm install

# 2. Edit config.js — add your API key
# Open config.js and set:
#   apiKey: "your-megallm-api-key"

# 3. Run
npm start
# Open http://localhost:3456
```

## How It Works

1. **Fetch Posts** — Pulls trending posts from 13 AI/ML subreddits (no Reddit auth needed)
2. **Draft Comments** — AI writes helpful, natural-sounding responses
3. **Review & Edit** — You approve, edit, or skip each comment
4. **Copy & Post** — One click copies text + opens the Reddit thread

## The Workflow (15 min/day)

```
Morning:
1. Open http://localhost:3456
2. Click "Fetch New Posts" (30 sec)
3. Click "Draft Comments" (1-2 min)
4. Review 8 drafts, edit ones that need tweaking (5-10 min)
5. Copy & paste the good ones into Reddit (5 min)
6. Click "Mark Posted" for each one you posted
```

## For Friends

To share this tool:
1. Zip the `reddit-assistant` folder
2. Send it to them
3. They edit `config.js` with their own API key
4. They run `npm install && npm start`

Each person uses their own Reddit account on their own computer. The tool just helps draft comments faster.

## Configuration

Edit `config.js` to customize:
- **Subreddits** — which communities to monitor
- **Product** — what to subtly build authority for (only mentioned ~10% of the time)
- **Comment style** — word count, tone, posting limits
- **Model** — which AI model to use for drafting

## Tips for Building Karma

- Answer questions directly — don't hedge
- Share specific numbers and model names
- Disagree respectfully when you have a better take
- Add code snippets in technical subreddits
- Post during US business hours (9am-5pm EST) for max visibility
- Start with r/LocalLLaMA and r/LLMDevs — most welcoming to new accounts
