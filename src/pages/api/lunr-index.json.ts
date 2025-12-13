import { readFileSync } from 'node:fs';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import lunr from 'lunr';

export const prerender = true; // Essential to generate a static .json file during build

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('posts');
  const allAbouts = await getCollection('about');
  const allCasual = await getCollection('casual');

  const documents: { id: string; title: string; content: string; url: string; lang: string; }[] = [];

  // Helper to get content
  const getContent = (filePath?: string) => {
    if (!filePath) return '';
    try {
      const fileContent = readFileSync(filePath, 'utf-8');
      // Strip frontmatter
      return fileContent.replace(/^---\n[\s\S]*?\n---\n/, '');
    } catch (e) {
      console.error(`Error reading file ${filePath}:`, e);
      return '';
    }
  };

  // Process posts
  for (const post of allPosts) {
    documents.push({
      id: post.id,
      title: post.data.title,
      content: getContent(post.filePath),
      url: `/posts/${post.id}`,
      lang: post.id.split('/')[0],
    });
  }

  // Process about pages
  for (const about of allAbouts) {
    documents.push({
      id: about.id,
      title: about.data.title || 'About',
      content: getContent(about.filePath),
      url: `/about/${about.id}`,
      lang: about.id.split('/')[0],
    });
  }

  // Process casual content
  for (const casual of allCasual) {
    documents.push({
      id: casual.id,
      title: casual.data.title || 'Casual',
      content: getContent(casual.filePath),
      url: `/casual/${casual.id}`,
      lang: casual.id.split('/')[0],
    });
  }

  const idx = lunr(function (this: lunr.Builder) {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('content');
    this.field('lang');

    documents.forEach((doc) => {
      this.add(doc);
    });
  });

  const serializedIdx = JSON.stringify(idx);
  const serializedDocs = JSON.stringify(documents); // We also need the documents for displaying results

  // Combine index and documents into a single JSON object for easier fetching on client
  const searchData = {
    index: serializedIdx,
    documents: serializedDocs,
  };

  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
