import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import Compress from 'astro-compress'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import rehypeMermaid from 'rehype-mermaid'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkMath from 'remark-math'
import UnoCSS from 'unocss/astro'
import { base, defaultLocale, themeConfig } from './src/config'
import { langMap } from './src/i18n/config'
import { rehypeCodeCopyButton } from './src/plugins/rehype-code-copy-button.mjs'
import { rehypeExternalLinks } from './src/plugins/rehype-external-links.mjs'
import { rehypeHeadingAnchor } from './src/plugins/rehype-heading-anchor.mjs'
// import { rehypeImageProcessor } from './src/plugins/rehype-image-processor.mjs' // 已停用
import { remarkContainerDirectives } from './src/plugins/remark-container-directives.mjs'
import { remarkLeafDirectives } from './src/plugins/remark-leaf-directives.mjs'
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs'
import { visit } from 'unist-util-visit' // 引入工具库

// --- ✨ 新增：自定义插件，专门处理 Obsidian 图片 ---
function remarkFixObsidianImages() {
  return (tree) => {
    visit(tree, 'image', (node, index, parent) => {
      // 检查图片 URL 是否包含你的 WebDAV 域名
      if (node.url && node.url.includes('dav1.xtyin.com')) {
        // 1. 修复空格和中文导致的解析错误 (encodeURI)
        const safeUrl = encodeURI(node.url)
        
        // 2. 将 Markdown 图片节点替换为纯 HTML 节点
        // 这样 Astro 就不会尝试去下载或优化它，直接渲染
        const htmlNode = {
          type: 'html',
          value: `<img src="${safeUrl}" alt="${node.alt || ''}" loading="lazy" style="max-width: 100%; height: auto;" />`
        }

        // 替换掉原有的节点
        parent.children.splice(index, 1, htmlNode)
      }
    })
  }
}
// ----------------------------------------------------

const { url: site } = themeConfig.site
const { imageHostURL } = themeConfig.preload ?? {}
const imageConfig = imageHostURL
  ? { image: { domains: [imageHostURL], remotePatterns: [{ protocol: 'https' }] } }
  : {}

export default defineConfig({
  adapter: vercel(),
  site,
  base,
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  ...imageConfig,
  i18n: {
    locales: Object.entries(langMap).map(([path, codes]) => ({
      path,
      codes: [...codes],
    })),
    defaultLocale,
  },
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    mdx(),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),
    sitemap(),
    Compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: false,
    }),
  ],
  markdown: {
    remarkPlugins: [
      // 注册新插件
      remarkFixObsidianImages, 
      remarkDirective,
      remarkMath,
      remarkContainerDirectives,
      remarkLeafDirectives,
      remarkReadingTime,
    ],
    rehypePlugins: [
      rehypeKatex,
      [rehypeMermaid, { strategy: 'pre-mermaid' }],
      rehypeSlug,
      rehypeHeadingAnchor,
      // rehypeImageProcessor, // 确保这个继续保持注释状态
      rehypeExternalLinks,
      rehypeCodeCopyButton,
    ],
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  vite: {
    plugins: [
      {
        name: 'prefix-font-urls-with-base',
        transform(code, id) {
          if (!id.endsWith('src/styles/font.css')) {
            return null
          }
          return code.replace(/url\("\/fonts\//g, `url("${base}/fonts/`)
        },
      },
    ],
  },
  devToolbar: {
    enabled: false,
  },
})