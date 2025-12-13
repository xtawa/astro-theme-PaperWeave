---
title: vercel部署时遇到ERR_INVAILD_THIS的解决方法
published: 2025-12-06T00:00:00
description: 通过指定使用pnpm版本和启用vercel的实验性功能来解决ERR_INVAILD_THIS问题
updated: ""
tags:
  - blog
  - 技术
  - Vercel
  - Astro
draft: false
pin: 0
toc: true
lang: ""
abbrlink: vercel-solution-pnpm
share: true
---

在Vercel部署Astro时，遇到 ERR_INVAILD_THIS 错误
![](https://r2.xtyin.com/images/72c8c8c7764ed2a9819a648071477d6d.png)

<details>
<summary>点此展开完整错误日志</summary>

20:05:56.017 Running build in Washington, D.C., USA (East) – iad1
20:05:56.018 Build machine configuration: 2 cores, 8 GB
20:05:56.238 Cloning [github.com/xtawa/twilight](http://github.com/xtawa/twilight) (Branch: main, Commit: 729e4e8)
20:05:56.239 Previous build caches not available.
20:05:57.514 Cloning completed: 1.276s
20:05:57.899 Warning: Due to "engines": { "node": ">=20.0.0" } in your `package.json` file, the Node.js Version defined in your Project Settings ("20.x") will not apply, Node.js Version "24.x" will be used instead. Learn More: [http://vercel.link/node-version](http://vercel.link/node-version)
20:05:57.902 Warning: Detected "engines": { "node": ">=20.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: [http://vercel.link/node-version](http://vercel.link/node-version)
20:05:57.902 Running "vercel build"
20:05:58.346 Vercel CLI 49.0.0
20:05:59.013 Warning: Due to "engines": { "node": ">=20.0.0" } in your `package.json` file, the Node.js Version defined in your Project Settings ("20.x") will not apply, Node.js Version "24.x" will be used instead. Learn More: [http://vercel.link/node-version](http://vercel.link/node-version)
20:05:59.014 Warning: Detected "engines": { "node": ">=20.0.0" } in your `package.json` that will automatically upgrade when a new major Node.js Version is released. Learn More: [http://vercel.link/node-version](http://vercel.link/node-version)
20:05:59.018 Running "install" command: `pnpm install`...
20:06:00.857  WARN  GET [https://registry.npmjs.org/@astrojs%2Fts-plugin](https://registry.npmjs.org/@astrojs%2Fts-plugin) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.858  WARN  GET [https://registry.npmjs.org/@iconify-json%2Fic](https://registry.npmjs.org/@iconify-json%2Fic) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.859  WARN  GET [https://registry.npmjs.org/@iconify-json%2Fmdi](https://registry.npmjs.org/@iconify-json%2Fmdi) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.859  WARN  GET [https://registry.npmjs.org/@rollup%2Fplugin-yaml](https://registry.npmjs.org/@rollup%2Fplugin-yaml) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.860  WARN  GET [https://registry.npmjs.org/@types%2Fhast](https://registry.npmjs.org/@types%2Fhast) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.860  WARN  GET [https://registry.npmjs.org/@types%2Fmarkdown-it](https://registry.npmjs.org/@types%2Fmarkdown-it) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.861  WARN  GET [https://registry.npmjs.org/@types%2Fmdast](https://registry.npmjs.org/@types%2Fmdast) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.862  WARN  GET [https://registry.npmjs.org/@types%2Fsanitize-html](https://registry.npmjs.org/@types%2Fsanitize-html) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.862  WARN  GET [https://registry.npmjs.org/postcss-import](https://registry.npmjs.org/postcss-import) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.862  WARN  GET [https://registry.npmjs.org/postcss-nesting](https://registry.npmjs.org/postcss-nesting) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.862  WARN  GET [https://registry.npmjs.org/@astrojs%2Fcheck](https://registry.npmjs.org/@astrojs%2Fcheck) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.863  WARN  GET [https://registry.npmjs.org/@astrojs%2Fcloudflare](https://registry.npmjs.org/@astrojs%2Fcloudflare) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.863  WARN  GET [https://registry.npmjs.org/@astrojs%2Frss](https://registry.npmjs.org/@astrojs%2Frss) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.863  WARN  GET [https://registry.npmjs.org/@astrojs%2Fsitemap](https://registry.npmjs.org/@astrojs%2Fsitemap) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.863  WARN  GET [https://registry.npmjs.org/@biomejs%2Fbiome](https://registry.npmjs.org/@biomejs%2Fbiome) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:00.863  WARN  GET [https://registry.npmjs.org/@astrojs%2Fsvelte](https://registry.npmjs.org/@astrojs%2Fsvelte) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:06:10.858  WARN  GET [https://registry.npmjs.org/@astrojs%2Fts-plugin](https://registry.npmjs.org/@astrojs%2Fts-plugin) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.860  WARN  GET [https://registry.npmjs.org/@iconify-json%2Fic](https://registry.npmjs.org/@iconify-json%2Fic) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.860  WARN  GET [https://registry.npmjs.org/@iconify-json%2Fmdi](https://registry.npmjs.org/@iconify-json%2Fmdi) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.860  WARN  GET [https://registry.npmjs.org/@rollup%2Fplugin-yaml](https://registry.npmjs.org/@rollup%2Fplugin-yaml) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.860  WARN  GET [https://registry.npmjs.org/@types%2Fhast](https://registry.npmjs.org/@types%2Fhast) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.861  WARN  GET [https://registry.npmjs.org/@types%2Fmarkdown-it](https://registry.npmjs.org/@types%2Fmarkdown-it) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.861  WARN  GET [https://registry.npmjs.org/@types%2Fmdast](https://registry.npmjs.org/@types%2Fmdast) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.861  WARN  GET [https://registry.npmjs.org/@types%2Fsanitize-html](https://registry.npmjs.org/@types%2Fsanitize-html) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.861  WARN  GET [https://registry.npmjs.org/postcss-import](https://registry.npmjs.org/postcss-import) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.861  WARN  GET [https://registry.npmjs.org/postcss-nesting](https://registry.npmjs.org/postcss-nesting) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.862  WARN  GET [https://registry.npmjs.org/@astrojs%2Fcheck](https://registry.npmjs.org/@astrojs%2Fcheck) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.862  WARN  GET [https://registry.npmjs.org/@astrojs%2Fcloudflare](https://registry.npmjs.org/@astrojs%2Fcloudflare) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.862  WARN  GET [https://registry.npmjs.org/@astrojs%2Frss](https://registry.npmjs.org/@astrojs%2Frss) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.863  WARN  GET [https://registry.npmjs.org/@astrojs%2Fsitemap](https://registry.npmjs.org/@astrojs%2Fsitemap) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.863  WARN  GET [https://registry.npmjs.org/@biomejs%2Fbiome](https://registry.npmjs.org/@biomejs%2Fbiome) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:06:10.863  WARN  GET [https://registry.npmjs.org/@astrojs%2Fsvelte](https://registry.npmjs.org/@astrojs%2Fsvelte) error (ERR_INVALID_THIS). Will retry in 1 minute. 1 retries left.
20:07:10.865  WARN  GET [https://registry.npmjs.org/@astrojs%2Ftailwind](https://registry.npmjs.org/@astrojs%2Ftailwind) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.866  ERR_PNPM_META_FETCH_FAIL  GET [https://registry.npmjs.org/@astrojs%2Fts-plugin:](https://registry.npmjs.org/@astrojs%2Fts-plugin:) Value of "this" must be of type URLSearchParams
20:07:10.867  WARN  GET [https://registry.npmjs.org/@astrojs%2Fvercel](https://registry.npmjs.org/@astrojs%2Fvercel) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.868  WARN  GET [https://registry.npmjs.org/@elog%2Fcli](https://registry.npmjs.org/@elog%2Fcli) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.868  WARN  GET [https://registry.npmjs.org/@expressive-code%2Fcore](https://registry.npmjs.org/@expressive-code%2Fcore) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.869  WARN  GET [https://registry.npmjs.org/@expressive-code%2Fplugin-collapsible-sections](https://registry.npmjs.org/@expressive-code%2Fplugin-collapsible-sections) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.869  WARN  GET [https://registry.npmjs.org/@expressive-code%2Fplugin-line-numbers](https://registry.npmjs.org/@expressive-code%2Fplugin-line-numbers) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.870  WARN  GET [https://registry.npmjs.org/@fancyapps%2Fui](https://registry.npmjs.org/@fancyapps%2Fui) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.870  WARN  GET [https://registry.npmjs.org/@fontsource-variable%2Fjetbrains-mono](https://registry.npmjs.org/@fontsource-variable%2Fjetbrains-mono) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.871  WARN  GET [https://registry.npmjs.org/@fontsource%2Froboto](https://registry.npmjs.org/@fontsource%2Froboto) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.871  WARN  GET [https://registry.npmjs.org/@iconify-json%2Ffa6-brands](https://registry.npmjs.org/@iconify-json%2Ffa6-brands) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.871  WARN  GET [https://registry.npmjs.org/@iconify-json%2Ffa6-regular](https://registry.npmjs.org/@iconify-json%2Ffa6-regular) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.873  WARN  GET [https://registry.npmjs.org/@iconify-json%2Ffa6-solid](https://registry.npmjs.org/@iconify-json%2Ffa6-solid) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.874  WARN  GET [https://registry.npmjs.org/@iconify-json%2Fmaterial-symbols](https://registry.npmjs.org/@iconify-json%2Fmaterial-symbols) error (ERR_INVALID_THIS). Will retry in 10 seconds. 2 retries left.
20:07:10.887 Error: Command "pnpm install" exited with 1


</details>


## 问题分析


Vercel使用的pnpm/npm版本可能有异常断流问题，需要升级版本.


## 解决方案


1.在 package.json 中指定：


```json
"packageManager": "pnpm@10.24.0"
```


2.在Vercel中 Settings-Build and development指定Node版本为最新


3.添加环境变量 


```plain text
ENABLE_EXPERIMENTAL_COREPACK=1
```


然后Redeploy就行了.