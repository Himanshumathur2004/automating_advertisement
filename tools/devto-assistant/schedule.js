#!/usr/bin/env node
/**
 * Dev.to Scheduler
 * 
 * Usage: node schedule.js
 * Posts to Dev.to every N seconds from queue
 */

const fs = require("fs");
const path = require("path");
const config = require("./config");

let postCount = 0;
let failureCount = 0;

// Read queue
function readQueue() {
  const queuePath = path.join(__dirname, config.queueFile);
  if (!fs.existsSync(queuePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(queuePath, "utf8"));
}

// Write queue
function writeQueue(queue) {
  const queuePath = path.join(__dirname, config.queueFile);
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
}

// Get pending items
function getPending() {
  const queue = readQueue();
  return queue.filter(
    (item) =>
      item.status === "pending" &&
      new Date(item.scheduledTime) <= new Date()
  );
}

// Normalize tags
function normalizeTag(tag) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/^#+/, "")
    .replace(/[^a-z0-9]/g, "");
}

function getTags(defaultTags = []) {
  const normalized = config.defaultTags
    .map(normalizeTag)
    .filter((tag) => tag.length > 0);
  const custom = (defaultTags || [])
    .map(normalizeTag)
    .filter((tag) => tag.length > 0);

  const combined = Array.from(new Set([...normalized, ...custom])).slice(0, 4);
  return combined.length > 0 ? combined : ["ai", "llm"];
}

// Post to dev.to
async function postToDevTo(article) {
  const res = await fetch(`${config.apiUrl}/articles`, {
    method: "POST",
    headers: {
      "api-key": config.apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      article: {
        title: article.title || "Dev.to Update",
        body_markdown: article.content,
        published: config.publishImmediately,
        tags: getTags(article.tags),
      },
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`${res.status}: ${error}`);
  }

  const data = await res.json();
  return {
    id: data.id,
    url: data.url,
  };
}

// Post cycle
async function postCycle() {
  try {
    const now = new Date().toLocaleTimeString();
    console.log(`\n⏰ [${now}] Posting cycle ${++postCount}...`);

    const pending = getPending();

    if (pending.length === 0) {
      console.log(`   ℹ️  No pending posts`);
      return;
    }

    const queue = readQueue();
    let posted = 0;

    for (const item of pending) {
      try {
        const result = await postToDevTo(item);
        item.status = "posted";
        item.postedId = result.id;
        item.postedUrl = result.url;
        item.postedAt = new Date().toISOString();
        posted++;
      } catch (error) {
        console.error(`   Error posting "${item.title}": ${error.message}`);
        item.status = "failed";
        item.error = error.message;
        failureCount++;
      }
    }

    writeQueue(queue);

    if (posted > 0) {
      console.log(`   ✅ Posted: ${posted}`);
    }
    if (failureCount > 0) {
      console.log(`   ⚠️  Failed: ${failureCount}`);
    }
  } catch (error) {
    console.error(`Error during posting cycle: ${error.message}`);
  }
}

// Main
async function startScheduler() {
  try {
    config.validate();
  } catch (error) {
    console.error(`❌ Configuration error: ${error.message}`);
    process.exit(1);
  }

  console.log("🚀 Starting Dev.to scheduler...");
  console.log(`⏱️  Posting interval: every ${config.postIntervalMs / 1000} seconds`);
  console.log("📍 Press Ctrl+C to stop\n");

  // Post immediately on startup
  await postCycle();

  // Then schedule recurring posts
  setInterval(postCycle, config.postIntervalMs);

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log(
      `\n\n📊 Scheduler stopped. Summary: ${postCount} cycles, ${failureCount} failures`
    );
    process.exit(0);
  });
}

startScheduler();
