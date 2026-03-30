// Dev.to Configuration
// Load from environment variables

require("dotenv").config({ path: "../../.env" });

module.exports = {
  // Dev.to API Configuration
  apiKey: process.env.DEVTO_API_KEY || "",
  username: process.env.DEVTO_USERNAME || "",
  apiUrl: "https://dev.to/api",
  
  // Publishing Configuration
  publishImmediately:
    (process.env.DEVTO_PUBLISH_IMMEDIATELY || "true").toLowerCase() === "true",
  
  // Default Tags
  defaultTags: (process.env.DEVTO_DEFAULT_TAGS || "ai,llm,api").split(","),
  
  // Queue Configuration
  queueFile: "./data/queue.json",
  
  // Scheduler Configuration
  postIntervalMs: parseInt(process.env.DEVTO_POST_INTERVAL_MS || "60000"), // 1 minute default
  
  // Logging
  verbose: (process.env.DEVTO_VERBOSE || "false").toLowerCase() === "true",
  
  // Validation
  isConfigured() {
    return this.apiKey && this.username;
  },
  
  validate() {
    if (!this.apiKey) throw new Error("DEVTO_API_KEY not configured");
    if (!this.username) throw new Error("DEVTO_USERNAME not configured");
  },
};
