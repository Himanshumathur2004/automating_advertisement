#!/usr/bin/env node
/**
 * Post to Dev.to
 * 
 * Usage: node post.js
 * Posts a single article to Dev.to from the queue
 */

const fs = require("fs");
const path = require("path");
const config = require("./config");

// Helper: Normalize dev.to tags
function normalizeTag(tag) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/^#+/, "")
    .replace(/[^a-z0-9]/g, "");
}

// Helper: Get tags for article
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

// Main: Post to dev.to
async function postToDevTo(article) {
  if (!config.apiKey) {
    throw new Error("DEVTO_API_KEY not set");
  }

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
    throw new Error(`Dev.to API error: ${res.status} ${error}`);
  }

  const data = await res.json();
  return {
    success: true,
    id: data.id,
    url: data.url,
    slug: data.slug,
  };
}

// Main execution
async function main() {
  try {
    config.validate();
    
    // Check for article argument or from stdin
    const article = process.argv[2] 
      ? JSON.parse(process.argv[2])
      : {
          title: "Test Post",
          content: "# Hello from Dev.to Assistant\n\nThis is a test post.",
          tags: ["test"],
        };

    console.log(`📝 Posting to Dev.to: "${article.title}"`);
    
    const result = await postToDevTo(article);
    
    console.log(`✅ Posted successfully!`);
    console.log(`   URL: ${result.url}`);
    console.log(`   ID: ${result.id}`);
    
    // Log to data/posted.json
    const posted = {
      timestamp: new Date().toISOString(),
      title: article.title,
      url: result.url,
      id: result.id,
    };
    
    const postedLog = path.join(__dirname, "data", "posted.json");
    const existing = fs.existsSync(postedLog) 
      ? JSON.parse(fs.readFileSync(postedLog, "utf8"))
      : [];
    
    existing.push(posted);
    fs.writeFileSync(postedLog, JSON.stringify(existing, null, 2));
    
    console.log(`📊 Logged to data/posted.json`);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
