# MegaLLM.io — Complete SEO & AIO execution plan for Claude Code

> Paste this file as `CLAUDE.md` in the root of your Next.js repo.
> Work through phases top-to-bottom. Each phase gate must pass before moving to the next.
> Every task is a direct Claude Code prompt — copy and send as-is.

---

## Context (read before starting)

**Product:** MegaLLM.io — one API for 70+ LLM models, auto-routes to best/cheapest provider with highest uptime.

**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS. No CMS yet.

**Goal:** Organic Google traffic + AI Overview citations + brand awareness. Tonight: ship the programmatic infrastructure. Ongoing: automated content pipeline.

**Proprietary advantage:** Real routing data across 70+ models (latency, cost-per-token, uptime). No competitor has this. Every page must surface it.

**AIO insight:** Comparison tables in HTML `<table>` tags earn 47% higher AI Overview citation rates. Question-format H2 headings are 3.4x more likely to be extracted. Front-load answers in 50–70 words.

---

## Pre-flight: install skills

Run these in your terminal before opening Claude Code. Skills activate automatically based on context — no manual invocation needed once installed.

```bash
# Core SEO & marketing (33 skills — programmatic-seo, seo-audit, schema-markup,
# competitor-alternatives, ai-seo, content-strategy, site-architecture, copywriting, etc.)
npx skills add coreyhaines31/marketingskills

# SEO + GEO lifecycle (20 skills — technical-seo-checker, schema-markup-generator,
# content-quality-auditor, rank-tracker, keyword-researcher, seo-content-writer, etc.)
npx skills add aaron-he-zhu/seo-geo-claude-skills

# Next.js + React performance (react-best-practices, next-best-practices,
# next-cache-components, next-upgrade)
npx skills add vercel-labs/agent-skills
npx skills add vercel-labs/next-skills

# Orchestration + TDD workflow (using-superpowers, brainstorming,
# dispatching-parallel-agents, verification-before-completion)
npx skills add obra/superpowers

# Frontend design pipeline (teach-impeccable, frontend-design, audit, normalize, polish)
npx skills add pbakaus/impeccable

# Web scraping + data extraction
npx -y firecrawl-cli@latest init --all --browser
npx skills add tavily-ai/skills
npx skills add vercel-labs/agent-browser

# AgriciDaniel full SEO audit suite (13 sub-skills, 7 subagents, DataForSEO MCP)
git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git && bash claude-seo/install.sh

# Blog content automation (19 sub-skills, 12 content templates, MDX native)
git clone https://github.com/AgriciDaniel/claude-blog.git && bash claude-blog/install.sh

# Component building
npx skills add anthropics/skills --skill web-artifacts-builder
npx skills add anthropics/skills --skill frontend-design
npx skills add anthropics/skills --skill webapp-testing
npx skills add shadcn/ui

# Testing
npx skills add currents-dev/playwright-best-practices-skill

# Design system + data analysis
npx skills add wshobson/agents --skill tailwind-design-system
npx skills add supercent-io/skills-template --skill data-analysis
npx skills add ReScienceLab/opc-skills --skill seo-geo

# Humanizer — strips AI writing patterns for Google Helpful Content compliance
# Based on Wikipedia's "Signs of AI Writing" — removes "delve", "tapestry",
# em dash overuse, -ing participials, rule-of-three, sycophantic openers
npx skills add https://github.com/softaworks/agent-toolkit --skill humanizer
```

---

## Phase 1 — Foundation & product context (30 min)

**Gate:** product-marketing-context file exists, site structure mapped, gap analysis complete.

---

### Task 1.1 — Establish product context (run this first, every other skill reads it)

```
Create the file .agents/product-marketing-context.md with the following content about MegaLLM.io:

PRODUCT: MegaLLM.io — one unified API for 70+ LLM models. Auto-routes to the best, cheapest provider with the highest uptime across OpenAI, Anthropic, Google, Meta, Mistral, Cohere, and 10+ more providers.

CORE VALUE PROPS:
- Single API call, access any model — no credential juggling across providers
- Intelligent auto-routing: selects cheapest provider for each model at time of request
- Uptime monitoring: automatic failover when a provider goes down
- Cost optimization: can reduce LLM spend by 50–80% vs single-provider
- Real benchmark data from production routing across millions of requests

TARGET AUDIENCE: AI developers, ML engineers, startup CTOs, indie hackers building LLM apps

COMPETITORS: OpenRouter (biggest, ~7M monthly visits), Portkey (enterprise focus), LiteLLM (open source), Helicone (observability), Martian (AI routing research)

COMPETITOR GAPS WE EXPLOIT:
- OpenRouter: huge traffic but no blog, no comparison content, no educational guides
- Portkey: good content but lower traffic, enterprise-only positioning
- LiteLLM: developer mindshare but no marketing engine
- Helicone: aggressive blog but narrower product (observability only)
- None of them publish real production routing data as content

PRIMARY KEYWORDS: LLM gateway, AI gateway, unified LLM API, LLM router, LLM proxy, LLM aggregator, OpenRouter alternative, LiteLLM alternative
SECONDARY KEYWORDS: cheapest GPT-4 API, reduce LLM costs, LLM cost optimization, LLM failover, multi-model AI

POSITIONING: The only LLM gateway that publishes real benchmark data from production routing — not synthetic tests, not third-party estimates. MegaLLM has seen millions of real API calls and knows the actual latency, uptime, and cost-per-token for every provider.
```

---

### Task 1.2 — Audit current codebase

```
Explore the MegaLLM.io Next.js codebase thoroughly. I need a gap analysis covering:

1. All existing routes and page files (list every file in /app and /pages)
2. Current metadata/SEO setup — is there a metadata API, next/head usage, any existing sitemap.ts or robots.txt?
3. Rendering strategy — SSR, SSG, or ISR? Are pages server-rendered or client-only?
4. Whether any programmatic routes exist (/models, /providers, /compare, /blog)
5. Current data layer — is there any structured data for models or providers?
6. Core Web Vitals baseline — check package.json for performance tooling
7. Whether JSON-LD schema exists anywhere

Output a gap analysis table: what exists vs what we need to build in each area.
```

---

### Task 1.3 — Build the model data file

```
Create /data/models.ts exporting an array of LLM model objects typed with this interface:

interface LLMModel {
  slug: string                    // url-safe, e.g. "gpt-4o"
  name: string                    // display name, e.g. "GPT-4o"
  provider: string                // e.g. "openai"
  providerDisplay: string         // e.g. "OpenAI"
  contextWindow: number           // in tokens
  inputPricePer1M: number         // USD
  outputPricePer1M: number        // USD
  description: string             // 2-3 sentences, SEO-optimized
  capabilities: string[]          // ["code generation", "reasoning", "vision", ...]
  strengths: string[]             // what this model is best at
  weaknesses: string[]            // honest limitations
  releaseDate: string             // ISO date
  updatedAt: string               // ISO date — for staleness tracking
  tags: string[]                  // ["fast", "cheap", "reasoning", "multimodal", ...]
  apiDocsUrl: string              // official docs
  isAvailableOnMegaLLM: boolean
}

Seed it with at least 40 real models including: GPT-4o, GPT-4o-mini, GPT-4-turbo, o1, o1-mini, o3, o3-mini, Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus, Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 2.0 Flash, Llama 3.1 405B, Llama 3.1 70B, Llama 3.1 8B, Mistral Large, Mistral Small, Mistral Nemo, Command R+, Command R, Mixtral 8x22B, Gemma 2 27B, Phi-3 Medium, DeepSeek-V3, DeepSeek-R1, Qwen 2.5 72B, Yi-Lightning.

Use accurate current pricing. Cross-reference: GPT-4o is $2.50/$10 per 1M tokens input/output, Claude Sonnet 3.5 is $3/$15, Gemini 1.5 Pro is $1.25/$5, GPT-4o-mini is $0.15/$0.60, Claude Haiku 3.5 is $0.80/$4.

Also create /data/providers.ts with provider metadata (slug, name, description, website, docsUrl, logoUrl, tier: "major"|"mid"|"emerging").
```

---

### Task 1.4 — Create data utility functions

```
Create /lib/models.ts with these typed utility functions:

- getModelBySlug(slug: string): LLMModel | undefined
- getAllModels(): LLMModel[]
- getAllModelSlugs(): string[]
- getModelsByProvider(providerSlug: string): LLMModel[]
- getModelsByTag(tag: string): LLMModel[]
- getComparisonPair(slugA: string, slugB: string): { modelA: LLMModel, modelB: LLMModel } | null
- getCheapestForTask(task: string): LLMModel[]
- getSortedByPrice(direction: "asc" | "desc"): LLMModel[]
- getTopNByContextWindow(n: number): LLMModel[]

Create /lib/seo.ts with:

- generateModelMetadata(model: LLMModel): Metadata — for Next.js metadata API
- generateComparisonMetadata(a: LLMModel, b: LLMModel): Metadata
- generateProviderMetadata(provider: Provider): Metadata
- generateCanonicalUrl(path: string): string — use https://megallm.io as base
- generateBreadcrumbs(segments: {label: string, href: string}[]): BreadcrumbList JSON-LD
- generateModelSchema(model: LLMModel): SoftwareApplication JSON-LD
- generateFAQSchema(faqs: {q: string, a: string}[]): FAQPage JSON-LD
- generateOrganizationSchema(): Organization JSON-LD
- generateWebSiteSchema(): WebSite JSON-LD

All functions should use Next.js 14 App Router types and conventions.
```

---

## Phase 2 — Programmatic SEO pages (60 min)

**Gate:** 40+ model pages, 50+ comparison pages, 5+ provider pages all rendering with correct metadata and schema.

---

### Task 2.1 — Individual model pages

```
Create /app/models/[slug]/page.tsx using Next.js 14 App Router.

Requirements:
- generateStaticParams() returning all model slugs
- generateMetadata() producing: title "[Model Name] API — Pricing, Specs & Integration | MegaLLM", description targeting "[model name] API pricing" and "[model name] API key" keywords, canonical URL, og:image
- Page structure (in this exact order for AIO optimization):
  1. H1: "[Model Name] API"
  2. Lead paragraph (50-70 words, front-loaded answer): directly answers "what is [model] and what does it cost"
  3. Key stats strip: context window, input price, output price, provider — displayed as <dl> or a stats grid
  4. HTML <table> with <thead>/<th scope="col"> for specs comparison (NOT divs — tables get 47% higher AIO citation rates)
  5. "How to use [Model] via MegaLLM" section with working code snippet
  6. H2 "What is [Model Name] best for?" — answer in 40-60 words, then bullet capabilities
  7. H2 "How much does [Model Name] API cost?" — pricing breakdown with example token calculations
  8. H2 "How does [Model Name] compare to alternatives?" — 3 comparison links to /compare pages
  9. FAQ section (4 Q&As in FAQPage schema format, each answer 40-60 words, question-format H3s)
  10. CTA: "Access [Model] via MegaLLM's unified API"

JSON-LD schemas: SoftwareApplication, FAQPage, BreadcrumbList — all in <script type="application/ld+json">

Also create:
- /app/models/page.tsx — index page listing all models with filtering by provider/tag
- /components/ModelSpecsTable.tsx — reusable HTML table component
- /components/ModelCodeExample.tsx — code snippet with copy button
- /components/FAQSection.tsx — renders FAQ schema + display simultaneously
```

---

### Task 2.2 — Provider pages

```
Create /app/providers/[slug]/page.tsx.

Requirements:
- generateStaticParams() for all providers
- generateMetadata() targeting "[Provider] API models" and "[Provider] LLM pricing"
- Page structure:
  1. H1: "[Provider] API Models on MegaLLM"
  2. Lead paragraph (50-70 words): what the provider offers and why access via MegaLLM
  3. HTML <table> listing all provider models: name, context window, input price, output price, best use case — sortable columns
  4. H2 "Which [Provider] model should I use?" — decision guide
  5. H2 "How much does [Provider] API cost?" — pricing breakdown
  6. H2 "[Provider] API uptime and reliability" — MegaLLM routing advantage
  7. FAQ section (3 Q&As)

JSON-LD: Organization (for the provider), FAQPage, BreadcrumbList

Also create /app/providers/page.tsx — provider index with cards showing each provider's model count and price range.
```

---

### Task 2.3 — Model comparison pages (highest-traffic opportunity)

```
Create /app/compare/[comparison]/page.tsx.

The [comparison] param format is "[model-a]-vs-[model-b]".

Requirements:
- Parse the param: split on "-vs-", look up both models, 404 if either not found
- Canonical logic: always canonicalize to alphabetical order — "claude-3-5-sonnet-vs-gpt-4o" and "gpt-4o-vs-claude-3-5-sonnet" both point to the same canonical URL
- generateStaticParams() for top 100 pairs: all combinations of GPT-4o, GPT-4o-mini, Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus, Gemini 1.5 Pro, Gemini 1.5 Flash, Mistral Large, Mistral Small, Llama 3.1 405B, Llama 3.1 70B, DeepSeek-V3, Command R+
- generateMetadata(): title "[Model A] vs [Model B]: API Pricing, Performance & Comparison | MegaLLM", description targeting "[model A] vs [model B]" keyword

Page structure:
  1. H1: "[Model A] vs [Model B]: Complete API Comparison"
  2. Lead paragraph (50-70 words): direct verdict — which is better for what
  3. HTML <table> side-by-side: Context Window | Input Price | Output Price | Provider | Best For | Speed — use <th scope="col"> headers
  4. H2 "When should you use [Model A]?" — 60-80 words with specific use cases
  5. H2 "When should you use [Model B]?" — 60-80 words with specific use cases
  6. H2 "Which is cheaper: [Model A] or [Model B]?" — cost comparison with real token calculations (1M input tokens, 1M output tokens, monthly at 10M tokens)
  7. H2 "Performance comparison: [Model A] vs [Model B]" — benchmark data if available
  8. H2 "How to switch between [Model A] and [Model B]" — MegaLLM code example showing same prompt to both
  9. Verdict section: clear recommendation
  10. FAQ section (5 Q&As targeting long-tail comparison queries)
  11. "Compare more models" links to related comparisons

JSON-LD: FAQPage, BreadcrumbList, two SoftwareApplication schemas (one per model)

Create /app/compare/page.tsx — comparison index with popular pairs, search functionality.
```

---

## Phase 3 — Technical SEO infrastructure (30 min)

**Gate:** Sitemap live, robots.txt configured, AI crawlers explicitly allowed, schema on every page, llms.txt created.

---

### Task 3.1 — Dynamic sitemap

```
Create /app/sitemap.ts using Next.js App Router sitemap generation.

Include all these URL groups with correct priorities and changeFrequency:
- Homepage: priority 1.0, changeFrequency "daily"
- /models (index): priority 0.9, changeFrequency "weekly"
- /models/[slug] (all 40+ models): priority 0.8, changeFrequency "weekly"
- /providers (index): priority 0.8, changeFrequency "weekly"
- /providers/[slug] (all providers): priority 0.7, changeFrequency "weekly"
- /compare (index): priority 0.9, changeFrequency "weekly"
- /compare/[comparison] (all generated pairs): priority 0.9, changeFrequency "weekly"
- /blog (index): priority 0.8, changeFrequency "daily"
- /blog/[slug] (any existing posts): priority 0.8, changeFrequency "monthly"
- /pricing: priority 0.9, changeFrequency "weekly"

Include lastModified dates. Import model and provider data to generate all dynamic URLs programmatically.

Also create /app/robots.txt that:
- Allows all agents including GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Googlebot
- Disallows /dashboard, /api, /admin, /_next
- Points to the sitemap URL
- Does NOT block any AI crawlers — we want maximum AI discoverability
```

---

### Task 3.2 — Global schema and metadata

```
Add to /app/layout.tsx:

1. Set metadataBase to new URL("https://megallm.io")
2. Default metadata object with: title template "%s | MegaLLM — Unified LLM API", default title "MegaLLM — One API for 70+ AI Models", default description targeting "LLM gateway" and "unified LLM API", og:type "website", twitter:card "summary_large_image", og:image pointing to /og-default.png

3. Inject these JSON-LD schemas in the root layout (inside <head> via Script or direct script tags):

Organization schema:
{
  "@type": "Organization",
  "name": "MegaLLM",
  "url": "https://megallm.io",
  "description": "Unified LLM API gateway — one API for 70+ AI models with automatic routing to the best, cheapest provider",
  "sameAs": [
    "https://github.com/megallm",
    "https://twitter.com/megallm",
    "https://linkedin.com/company/megallm"
  ]
}

WebSite schema with SearchAction:
{
  "@type": "WebSite",
  "name": "MegaLLM",
  "url": "https://megallm.io",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://megallm.io/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

Create /components/JsonLd.tsx — a reusable component that accepts any JSON-LD object and renders it as <script type="application/ld+json"> with proper serialization and no XSS risk.
```

---

### Task 3.3 — llms.txt + AI crawler file

```
Create /public/llms.txt following the emerging llms.txt specification.

Content should include:
- Product name and one-sentence description
- Primary purpose
- Key URL patterns with descriptions:
  /models/{slug} — Individual model pages with pricing, specs, and API examples
  /compare/{model-a}-vs-{model-b} — Side-by-side model comparisons with pricing tables
  /providers/{slug} — All models from a single AI provider
  /blog — Technical guides, pricing analyses, and LLM comparison articles
- Data freshness note (pricing updated weekly from provider APIs)
- Usage permissions (may be cited, crawled, indexed)
- Contact for AI system operators

Also audit every comparison table in the entire codebase and replace any div-based tables with proper semantic HTML:
- <table> wrapper
- <thead> with <tr><th scope="col"> for every column header
- <tbody> with <tr><td> for data rows
- caption or aria-label describing the table

This is the single highest-impact technical change for AI Overview citations.
```

---

## Phase 4 — Blog content layer (45 min)

**Gate:** MDX blog live with correct schema, 3 seed posts published, content calendar planned.

---

### Task 4.1 — MDX blog setup

```
Set up an MDX-powered blog at /blog using next-mdx-remote or @next/mdx.

Create this structure:
/content/blog/           ← MDX files live here
/app/blog/page.tsx       ← Blog index
/app/blog/[slug]/page.tsx ← Individual post pages
/lib/blog.ts             ← Blog utilities
/components/MDXContent.tsx ← MDX renderer

BlogPost frontmatter type:
interface BlogFrontmatter {
  title: string
  slug: string
  description: string         // 150-160 chars, for meta description
  publishedAt: string         // ISO date
  updatedAt: string           // ISO date — update this when content changes
  tags: string[]
  author: string
  authorUrl?: string
  ogImage?: string
  featured?: boolean
}

/app/blog/[slug]/page.tsx must:
- Generate Article JSON-LD with headline, author (Person schema with sameAs), datePublished, dateModified, image
- Set og:type to "article" and article:published_time, article:modified_time
- Set canonical URL
- Show updatedAt date prominently (recency = more AIO citations)

/lib/blog.ts must export:
- getAllPosts(): BlogFrontmatter[]
- getPostBySlug(slug: string): { frontmatter, content }
- getRelatedPosts(slug: string, limit: number): BlogFrontmatter[]
```

---

### Task 4.2 — Three seed blog posts (highest-priority content)

```
Create these three MDX files in /content/blog/. Each post must follow the AIO-optimized structure: front-loaded answer in the first paragraph, question-format H2 headings, HTML comparison tables (NOT markdown tables), FAQ section at the end.

POST 1: /content/blog/llm-api-pricing-guide-2026.mdx
Title: "LLM API Pricing Guide 2026: Every Model, Every Provider, Compared"
Target keywords: "LLM API pricing", "cheapest LLM API", "GPT-4 API cost"
Structure:
- Lede: direct answer — which model is cheapest for most use cases, right now
- HTML table: all 40 models, input price, output price, context window, provider
- Section: "What does LLM pricing actually mean?" — explain tokens, input vs output
- Section: "Which LLM API is cheapest for my use case?" — by use case (chatbot, RAG, code, vision)
- Section: "How to reduce LLM API costs" — MegaLLM routing advantage
- FAQ: 5 questions (how much does GPT-4 API cost, is Claude API cheaper than OpenAI, etc.)
Minimum 2,500 words. Write as a technical peer — opinionated, specific, no AI slop patterns.

POST 2: /content/blog/what-is-an-llm-gateway.mdx
Title: "What Is an LLM Gateway? (And Why Every AI App Needs One)"
Target keywords: "LLM gateway", "AI gateway", "what is LLM gateway"
Structure:
- Lede: direct 2-sentence definition
- Section: "The problem LLM gateways solve" — concrete pain (API key sprawl, downtime, cost)
- Section: "How an LLM gateway works" — architecture with a clear text diagram
- Section: "LLM gateway vs direct API: when each makes sense"
- HTML table: feature comparison across MegaLLM, OpenRouter, Portkey, LiteLLM, Helicone
- Section: "How to get started with an LLM gateway in 5 minutes" — code example
- FAQ: 4 questions
Minimum 2,000 words.

POST 3: /content/blog/openrouter-alternative.mdx
Title: "The Best OpenRouter Alternatives in 2026 (Honest Comparison)"
Target keywords: "OpenRouter alternative", "OpenRouter alternatives"
Structure:
- Lede: direct verdict — best alternative for different use cases
- HTML table: OpenRouter vs MegaLLM vs Portkey vs LiteLLM vs Helicone — features, pricing, model count, routing intelligence
- Section for each alternative: what it's good for, what it's bad for, pricing
- Section: "When MegaLLM is the right choice" — specific use cases
- FAQ: 4 questions
Minimum 2,200 words.

After writing each post, run the humanizer skill to strip any AI writing patterns before saving.
```

---

### Task 4.3 — Content calendar

```
Using the content-strategy skill and the product-marketing-context file, create /docs/content-calendar.md with a 3-month editorial calendar.

The calendar must include:
- 2 posts per week (one comparison/programmatic, one educational)
- Each post mapped to: target keyword cluster, content type, estimated traffic potential (low/mid/high), priority (P0/P1/P2)
- Month 1 focus: foundational SEO pillars (pricing guides, gateway education, core comparisons)
- Month 2 focus: competitor comparison content (alternatives pages for every major competitor)
- Month 3 focus: use-case content (best model for X) and technical deep-dives
- AIO optimization flag on posts most likely to earn AI Overview citations
- Note which posts should be published within 24 hours of a new model release (rapid response content)

Also plan: quarterly "State of LLM APIs" report with original pricing trend data — this is the linkable asset strategy.
```

---

## Phase 5 — Validation (30 min)

**Gate:** SEO audit score >80, all schemas valid, no broken links, Core Web Vitals passing.

---

### Task 5.1 — Full SEO audit

```
Run a complete SEO audit of the MegaLLM.io Next.js codebase.

Check every page type (model page, comparison page, provider page, blog post, homepage) for:

Technical:
- [ ] SSR/SSG confirmed — no client-only rendering of SEO-critical content
- [ ] Title tag present and unique (50-60 chars)
- [ ] Meta description present and unique (150-160 chars)
- [ ] Canonical URL present and correct
- [ ] og:title, og:description, og:image, og:type all set
- [ ] twitter:card set
- [ ] JSON-LD schema present and valid (check @type, required fields)
- [ ] robots.txt allows all AI crawlers
- [ ] XML sitemap includes all programmatic URLs
- [ ] No duplicate titles or descriptions across pages
- [ ] All internal links use Next.js <Link>, not raw <a> tags
- [ ] All images have alt text
- [ ] No console errors in development mode

AIO-specific:
- [ ] Comparison tables use <table><thead><th scope="col"> (NOT divs)
- [ ] H2 headings are question-formatted on all content pages
- [ ] First paragraph answers the primary query in 50-70 words
- [ ] FAQ sections present on all model and comparison pages
- [ ] FAQPage JSON-LD matches visible FAQ content
- [ ] updatedAt dates are accurate and recent

Performance:
- [ ] No waterfalls — data fetched server-side, not client-side in useEffect
- [ ] Images use next/image with width/height
- [ ] No unused imports or large client bundles on content pages

Output a report to /docs/seo-audit-report.md with pass/fail for each check and specific fixes needed.
```

---

### Task 5.2 — Automated SEO validation script

```
Create /scripts/seo-audit.ts — a Node.js script that crawls the local Next.js dev server and validates SEO automatically.

The script should:
1. Start by reading all routes from the sitemap
2. Fetch each URL and parse the HTML
3. Check for: <title>, <meta name="description">, canonical <link>, og:title, og:description, at least one <h1>, JSON-LD script tag, <table> elements on comparison pages
4. Count pages that pass vs fail each check
5. Flag: duplicate titles, missing descriptions, missing schema, comparison pages using divs instead of tables
6. Output /scripts/output/seo-report.json (machine-readable) and print a human summary to console

Make it runnable with: npx ts-node scripts/seo-audit.ts

Also create /scripts/validate-schemas.ts that:
- Reads all JSON-LD from the built pages
- Validates required fields for each @type
- Confirms FAQPage questions match visible H3 content
- Reports any schema errors
```

---

### Task 5.3 — E2E tests for programmatic pages

```
Write Playwright E2E tests for the most critical pages. Use the playwright-best-practices skill.

Test suite: /tests/seo.spec.ts

Tests to write:
1. Model page test: visit /models/gpt-4o, assert H1 exists, assert <table> with <th scope="col"> exists, assert JSON-LD script tag with @type SoftwareApplication, assert FAQ section renders
2. Comparison page test: visit /compare/gpt-4o-vs-claude-3-5-sonnet, assert canonical URL is alphabetical order, assert comparison table has both model names as columns, assert FAQPage schema, assert verdict section
3. Provider page test: visit /providers/openai, assert model table renders all OpenAI models, assert JSON-LD
4. Sitemap test: fetch /sitemap.xml, assert it returns 200, assert it contains model and comparison URLs, assert all URLs return 200
5. Robots test: fetch /robots.txt, assert GPTBot, ClaudeBot, PerplexityBot are all allowed
6. Schema validation: for each page type, parse JSON-LD and assert required @type fields are present

Run with: npx playwright test tests/seo.spec.ts
```

---

## Phase 6 — Automated pricing data pipeline (ongoing)

**Gate:** Scraping workflow runs without errors, pricing data stays current within 7 days.

---

### Task 6.1 — Scrape competitor pricing pages

```
Use the firecrawl skill to build a pricing data scraper.

Create /scripts/scrape-pricing.ts that uses Firecrawl to extract current pricing from:
- https://openai.com/api/pricing
- https://www.anthropic.com/pricing
- https://ai.google.dev/pricing
- https://mistral.ai/pricing
- https://cohere.com/pricing
- https://openrouter.ai/models (competitor price comparison)

For each page:
firecrawl scrape [URL] --formats markdown --output .firecrawl/[provider].md

Then parse the markdown output to extract: model name, input price per 1M tokens, output price per 1M tokens.

Compare extracted prices against /data/models.ts and output a diff: which models have changed prices, which new models were found, which models are missing from our data.

Save the diff to /scripts/output/pricing-diff.json with timestamp.

Make it runnable with: npx ts-node scripts/scrape-pricing.ts
```

---

### Task 6.2 — Model data staleness checker

```
Create /scripts/check-staleness.ts that:

1. Reads /data/models.ts
2. Finds any model where updatedAt is more than 30 days ago
3. Finds any model where inputPricePer1M or outputPricePer1M is 0 or null
4. Checks if any models released in the last 90 days are missing from the file
5. Outputs a TODO list: which models need price verification, which new models to add
6. Outputs /scripts/output/staleness-report.json

Add this to package.json scripts:
"check-data": "npx ts-node scripts/check-staleness.ts"
"scrape-pricing": "npx ts-node scripts/scrape-pricing.ts"
"seo-audit": "npx ts-node scripts/seo-audit.ts"

Also add a README section at /docs/data-maintenance.md explaining the weekly data update workflow:
1. Run npm run scrape-pricing
2. Review pricing-diff.json
3. Update /data/models.ts manually with verified prices
4. Run npm run check-staleness to confirm no gaps
5. Commit — programmatic pages automatically reflect new data on next deploy
```

---

## Phase 7 — Content humanization pipeline (every post, every page)

**Gate:** Zero AI writing patterns in any published content.

---

### Task 7.1 — Humanize all generated content

```
Use the humanizer skill to review and rewrite every piece of content generated in this build.

For each of the following, paste the content and send through humanizer:
1. All three blog posts from Task 4.2
2. The description field for every model in /data/models.ts
3. The "when to use" sections in comparison pages
4. The landing page copy if any was generated

Humanizer removes these AI patterns — verify none remain:
- "serves as a testament", "stands as", "marks a pivotal"
- "tapestry", "delve", "vibrant", "pivotal", "landscape" (abstract), "underscore"
- -ing participial phrases tacked onto sentences ("ensuring that...", "highlighting...")
- Em dash overuse (—) — replace with commas or restructure
- Rule-of-three constructions ("innovative, inspiring, and impactful")
- Negative parallelisms ("It's not just X, it's Y")
- Vague attributions ("experts believe", "industry observers note")
- Generic positive conclusions ("exciting times lie ahead")
- Bold emphasis on mid-sentence phrases

After humanizing, check that content still:
- Has a clear opinion/verdict (not just neutral reporting)
- Varies sentence length (mix of short and long)
- Uses specific numbers and examples instead of vague claims
- Reads naturally when spoken aloud

Run humanizer as the last step before any content is committed.
```

---

## Post-launch checklist (do tonight before sleeping)

```
Complete these steps after all phases are done:

[ ] Submit sitemap to Google Search Console: https://search.google.com/search-console
    - Add property for megallm.io
    - Submit /sitemap.xml
    - Request indexing for homepage, /models, /compare, /blog

[ ] Verify schema in Google Rich Results Test:
    - Test one model page URL
    - Test one comparison page URL
    - Confirm FAQPage and SoftwareApplication are detected

[ ] Run final SEO audit: npm run seo-audit
    - All pages should pass title, description, canonical, schema checks
    - Fix any P0 failures before submitting to Search Console

[ ] Check robots.txt live at https://megallm.io/robots.txt
    - Confirm GPTBot, ClaudeBot, PerplexityBot are not blocked

[ ] Verify sitemap at https://megallm.io/sitemap.xml
    - Should return 200 with valid XML
    - Should list 100+ URLs covering models, comparisons, providers, blog

[ ] Directory submissions (do manually — one-time, 2–3 hour task):
    Priority Tier 1 (do tonight): Product Hunt, There's An AI For That, Futurepedia, AlternativeTo, G2, Capterra
    Priority Tier 2 (this week): TopAI.tools, Toolify.ai, SaaSHub, BetaList, DevHunt, Indie Hackers, FutureTools, Dang.ai

[ ] Set up Google Search Console email alerts for:
    - Coverage errors (indexing failures)
    - Manual actions
    - Core Web Vitals failures
```

---

## Ongoing weekly workflow

Run this every Monday:

```bash
# Step 1: Check data freshness
npm run check-staleness

# Step 2: Scrape current provider pricing
npm run scrape-pricing

# Step 3: Review pricing-diff.json, update /data/models.ts manually with verified prices

# Step 4: Run SEO audit to catch regressions
npm run seo-audit

# Step 5: In Claude Code — generate this week's content
# /blog write "best model for [use case] in 2026" --template comparison
# Run humanizer on output
# Publish

# Step 6: Check Search Console for new impressions on model/comparison pages
```

---

## Skill quick-reference

| What you want to do | Skill invocation |
|---|---|
| Generate programmatic pages | Say "create programmatic SEO pages for..." |
| Write a blog post | `/blog write "[topic]"` |
| Plan content calendar | `/blog calendar` |
| Run SEO audit | Say "audit SEO" or "run technical SEO check" |
| Check AI Overview optimization | `/seo:check-technical [URL]` |
| Generate schema | `/seo:generate-schema [type]` |
| Strip AI writing patterns | Say "humanize this content" |
| Scrape a pricing page | `firecrawl scrape [URL] -o output.md` |
| Research competitor pricing | `tvly research "LLM pricing 2026" --model pro` |
| Open JS-rendered page | `agent-browser open [URL] && snapshot` |
| Analyze pricing data | Say "analyze this pricing data" (triggers data-analysis) |
| Design a component | Say "design a pricing comparison table" (triggers impeccable + web-artifacts-builder) |
| Validate content quality | `/seo:audit-page [URL]` (triggers content-quality-auditor) |

---

## Key numbers to remember

- **Tables with `<th scope="col">`** → 47% higher AIO citation rate vs div tables
- **Question-format H2s** → 3.4x more likely to be extracted by AI systems
- **Front-loaded answers** → first paragraph answers query in 50–70 words
- **Content freshness** → pages updated within 3 months average 6 citations vs 3.6 for stale pages
- **Article length** → 2,900+ words average 5.1 citations vs 3.2 for shorter content
- **FAQ sections** → cited even from deep-page positions (only exception to top-of-page rule)
- **Comparison articles** → capture ~33% of all AI citations
- **AIO conversion** → AI-referred visitors convert 23x higher than standard organic

---

*Built from: skills.sh audit (200+ skills), competitive analysis of OpenRouter/Portkey/LiteLLM/Helicone/Martian, AIO citation research across 100+ SERP studies, and MegaLLM's proprietary routing data advantage.*
