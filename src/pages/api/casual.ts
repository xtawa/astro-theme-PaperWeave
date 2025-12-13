export const prerender = false

import { parse } from 'node-html-parser'
import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'

// Configuration
// Prioritize process.env for Node.js adapter environment variables
const CHANNEL_USERNAME = process.env.CASUAL_TELEGRAM_CHANNEL || import.meta.env.CASUAL_TELEGRAM_CHANNEL || 'hi_co1sini_casual'
const PROXY_URL = process.env.HTTPS_PROXY || import.meta.env.HTTPS_PROXY || process.env.https_proxy || 'http://127.0.0.1:7890'

interface CasualPost {
  id: string
  content: string
  date: string
  timestamp: number
  images: string[]
  link: string
}

export async function GET() {
  console.log(`[API] Fetching posts from Telegram channel: @${CHANNEL_USERNAME}...`)
  
  if (PROXY_URL) {
    console.log(`[API] Using proxy: ${PROXY_URL}`)
  }

  try {
    const options: any = {}
    if (PROXY_URL) {
      options.agent = new HttpsProxyAgent(PROXY_URL)
    }

    const response = await fetch(`https://t.me/s/${CHANNEL_USERNAME}`, options)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch channel: ${response.statusText}`)
    }

    const html = await response.text()
    const root = parse(html)
    const messages = root.querySelectorAll('.tgme_widget_message_wrap')

    const posts: CasualPost[] = []

    for (const msg of messages) {
      // Skip service messages (like "Channel created", dates, etc.) which usually lack the standard message structure
      // or have specific service classes.
      // In the public web view, "Channel created" might appear as a service message.
      if (msg.querySelector('.tgme_widget_message_service_photo') || msg.classList.contains('service_message')) {
          continue;
      }

      const textElement = msg.querySelector('.tgme_widget_message_text')
      const timeElement = msg.querySelector('.tgme_widget_message_date time')
      const linkElement = msg.querySelector('.tgme_widget_message_date')
      const imageElements = msg.querySelectorAll('.tgme_widget_message_photo_wrap')

      // Filter out empty messages
      if (!textElement && imageElements.length === 0) continue

      const content = textElement ? textElement.innerHTML : ''
      
      // Explicitly filter "Channel created" if it somehow gets parsed as text
      if (content.toLowerCase().includes('channel created')) continue;

      const date = timeElement ? timeElement.getAttribute('datetime') || '' : ''
      const link = linkElement ? linkElement.getAttribute('href') || '' : ''
      const timestamp = date ? new Date(date).getTime() : 0
      
      const images = imageElements.map(img => {
        const style = img.getAttribute('style') || ''
        const match = style.match(/url\('([^']+)'\)/)
        return match ? match[1] : ''
      }).filter(Boolean)

      const id = link.split('/').pop() || String(timestamp)

      posts.push({
        id,
        content,
        date,
        timestamp,
        images,
        link
      })
    }

    // Sort by date descending
    posts.sort((a, b) => b.timestamp - a.timestamp)

    return new Response(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('[API] Error fetching Telegram posts:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch posts', details: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
