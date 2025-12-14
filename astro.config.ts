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
// import { rehypeImageProcessor } from './src/plugins/rehype-image-processor.mjs' // ✅ 已停用
import { remarkContainerDirectives } from './src/plugins/remark-container-directives.mjs'
import { remarkLeafDirectives } from './src/plugins/remark-leaf-directives.mjs'
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs'
import { visit } from 'unist-util-visit'

// --- ✨ 修复版：Obsidian 图片自动替换插件 ---
function remarkFixObsidianImages() {
  // ✅ 修复 1: 给 tree 参数加上 : any 类型，解决 ts(7006) 报错
  return (tree: any) => {
    visit(tree, 'image', (node, index, parent) => {
      if (node.url && node.url.includes('dav1.xtyin.com')) {
        const safeUrl = encodeURI(node.url)
        const htmlNode = {
          type: 'html',
          value: `<img src="${safeUrl}" alt="${node.alt || ''}" loading="lazy" style="max-width: 100%; height: auto;" />`
        }
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
      // ✅ 恢复原有的类型断言，防止潜在的类型推断错误
      codes: [...codes] as [string, ...string[]],
    })),
    // ✅ 修复 2: 强制断言 defaultLocale 为 any，解决 ts(2322) 类型不匹配报错
    defaultLocale: defaultLocale as any,
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
      remarkFixObsidianImages, // 自定义插件
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
      // rehypeImageProcessor, // ！
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