#!/usr/bin/env node
/**
 * Test Dev.to Configuration
 * 
 * Usage: node test-config.js
 */

const config = require("./config");

console.log("\n🔧 Dev.to Configuration Test\n");

console.log("Configuration values:");
console.log(`  API Key: ${config.apiKey ? "✅ Set" : "❌ Not set"}`);
console.log(`  Username: ${config.username ? "✅ " + config.username : "❌ Not set"}`);
console.log(`  Publish Immediately: ${config.publishImmediately ? "✅ Yes" : "⏸️  Draft mode"}`);
console.log(`  Default Tags: ${config.defaultTags.join(", ")}`);
console.log(`  Post Interval: ${config.postIntervalMs / 1000} seconds`);

console.log("\nValidation:");
try {
  config.validate();
  console.log("✅ Configuration is valid!");
} catch (error) {
  console.error(`❌ Configuration error: ${error.message}`);
  process.exit(1);
}

console.log("\nNext steps:");
console.log("  1. Run: node schedule.js");
console.log("  2. Add items to: data/queue.json");
console.log("  3. Monitor with: node queue-manager.js view\n");
