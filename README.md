# Retypeset
test
![Cover Image](assets/images/v1/retypeset-en-desktop.webp)
![Cover Image](assets/images/v1/retypeset-en-mobile.webp)

[简体中文](assets/docs/README.zh.md)｜[繁体中文](assets/docs/README.zh-tw.md)｜[日本語](assets/docs/README.ja.md)｜[Español](assets/docs/README.es.md)｜[Français](assets/docs/README.fr.md)｜[Русский](assets/docs/README.ru.md)

Retypeset is a static blog theme based on the [Astro](https://astro.build/) framework. Inspired by [Typography](https://astro-theme-typography.vercel.app/), Retypeset establishes a new visual standard and reimagines the layout of all pages, creating a reading experience reminiscent of paper books, reviving the beauty of typography. Details in every sight, elegance in every space.

## Demo

- [Retypeset](https://retypeset.radishzz.cc/en/)
- [Retipografía](https://retypeset.radishzz.cc/es/)
- [Переверстка](https://retypeset.radishzz.cc/ru/)
- [重新编排](https://retypeset.radishzz.cc/)
- [重新編排](https://retypeset.radishzz.cc/zh-tw/)
- [再組版](https://retypeset.radishzz.cc/ja/)

## Features

- Built with Astro and UnoCSS
- Support for SEO, Sitemap, OpenGraph, RSS, MDX, LaTeX, Mermaid, and TOC
- i18n support
- Light / Dark mode
- Elegant view transitions
- Rich theme customization
- Optimized typography
- Responsive design
- Comment system

## Modifications

This version includes several enhancements over the original Retypeset theme:

- **Casual Page (`/casual`)**: Fetches and displays real-time content from a public Telegram Channel.
- **Statistics Page (`/stats`)**: A dashboard featuring:
    - **Timeline**: Chronological archive of all posts.
    - **Word Count**: Total articles and words (CJK supported).
    - **Top Tags**: Most frequently used tags.
    - **Typewriter Effect**: Displays random quotes from your articles (tagged with `#好词好句`).
- **Search**: Full-text search powered by [Algolia DocSearch](https://docsearch.algolia.com/) (free for open-source/technical blogs).

## Algolia DocSearch Setup

To enable search functionality, follow these steps:

### 1. Apply for DocSearch

1. Go to [Algolia DocSearch](https://docsearch.algolia.com/apply/) and apply for free access.
2. You'll receive an email with your credentials once approved (usually within 24-48 hours).

### 2. Configure your credentials

Open `src/config.ts` and add your Algolia credentials in the `search` section:

```typescript
search: {
  algolia: {
    enabled: true, // Set to true to enable search
    appId: 'YOUR_APP_ID', // Your Algolia Application ID
    apiKey: 'YOUR_SEARCH_API_KEY', // Your Search-Only API Key (NOT Admin API Key)
    indexName: 'YOUR_INDEX_NAME', // Your Algolia Index Name
  },
},
```

### 3. Alternative: Create your own Algolia index

If you don't want to wait for DocSearch approval, you can create your own Algolia account:

1. Sign up at [Algolia](https://www.algolia.com/)
2. Create a new application and index
3. Use the [Algolia Crawler](https://www.algolia.com/products/search-and-discovery/crawler/) or [algolia-docsearch-scraper](https://github.com/algolia/docsearch-scraper) to index your site
4. Use your credentials in `src/config.ts`

> **Note**: The Search-Only API Key is safe to expose in client-side code. Never use your Admin API Key!
- **Post Copyright**: Automatically appends copyright information and license to the end of every post.
- **Deployment Ready**: Pre-configured with `@astrojs/vercel` for easy deployment.

## Typewriter Effect

The Statistics page (`/stats`) features a typewriter effect that displays a random sentence from your blog posts.

- **How it works**: It automatically extracts sentences from any post tagged with `好词好句` (or `Good Quotes`).
- **Default**: If no posts have this tag, it will display a default inspirational quote.
- **Customization**: Simply add the tag `好词好句` to any Markdown post frontmatter to include its content in the quote pool.

## Performance

<br>
<p align="center">
  <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fretypeset.radishzz.cc%2Fen%2F&form_factor=desktop">
    <img width="710" alt="Retypeset Lighthouse Score" src="assets/images/retypeset-lighthouse-score.svg">
  <a>
</p>

## Getting Started

1. [Fork](https://github.com/radishzzz/astro-theme-retypeset/fork) this repository, or use this template to create a new repository.
2. Run the following commands in your terminal:

   ```bash
   # Clone the repository
   git clone <repository-url>

   # Navigate to the project directory
   cd <repository-name>

   # Install pnpm globally (if not already installed)
   npm install -g pnpm

   # Install dependencies
   pnpm install

   # Start the development server
   pnpm dev
   ```

3. Refer to the [Theme Guide](https://retypeset.radishzz.cc/en/posts/theme-guide/) to customize your blog and create new posts.

## Deployment

This project is configured for **Vercel** out of the box.

### 1. Deploy to Vercel

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Vercel will detect Astro and configure the build settings automatically.

### 2. Environment Variables

For the **Casual Page** to work, you must set the following environment variable in Vercel project settings:

-   `CASUAL_TELEGRAM_CHANNEL`: Your public Telegram channel username (e.g., `my_blog_channel`).

**Note**: Vercel's serverless functions can access Telegram directly, so `HTTPS_PROXY` is usually **not** required for production. However, for local development in restricted regions, you may need to set `HTTPS_PROXY` in your local `.env` or shell.

&emsp;[![Deploy to Netlify](assets/images/deploy-netlify.svg)](https://app.netlify.com/start) [![Deploy to Vercel](assets/images/deploy-vercel.svg)](https://vercel.com/new)

## Updates

Retypeset releases [new features](https://github.com/radishzzz/astro-theme-retypeset/issues/18) from time to time. Simply run `pnpm update-theme` to update the theme. If you encounter merge conflicts, please refer to [this video](https://youtu.be/lz5OuKzvadQ?si=sH_ALNgqxrYqNVQT) for manual resolution.

## Credits

- [Typography](https://github.com/moeyua/astro-theme-typography)
- [Fuwari](https://github.com/saicaca/fuwari)
- [Redefine](https://github.com/EvanNotFound/hexo-theme-redefine)
- [AstroPaper](https://github.com/satnaing/astro-paper)
- [heti](https://github.com/sivan/heti)
- [EarlySummerSerif](https://github.com/GuiWonder/EarlySummerSerif)

## Star History

<p align="center">
<a href="https://star-history.com/#radishzzz/astro-theme-retypeset&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=radishzzz/astro-theme-retypeset&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=radishzzz/astro-theme-retypeset&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=radishzzz/astro-theme-retypeset&type=Date" />
  </picture>
</p>
