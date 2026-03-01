import * as yaml from 'js-yaml';
import { BlogPost } from '../types';

// Registry of Blog Post Slugs
// In a static setup without a backend API to list files, we define the list of files to load here.
// This matches the filenames in your 'content/posts/' directory.
const POST_SLUGS = [
  'evolution-of-rpa',
  'investing-mindset'
];

/**
 * Asynchronously fetches all blog posts defined in POST_SLUGS.
 */
export async function fetchAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  for (const slug of POST_SLUGS) {
    try {
      // Fetch the markdown file from the file system (via HTTP request)
      const response = await fetch(`/content/posts/${slug}.md`);
      
      if (!response.ok) {
        console.warn(`Failed to fetch post: ${slug} (Status: ${response.status})`);
        continue;
      }

      const rawContent = await response.text();
      const { attributes, body } = parseFrontmatter(rawContent);
      
      if (attributes.published) {
        posts.push({
          slug,
          title: attributes.title,
          date: attributes.date,
          description: attributes.description,
          tags: attributes.tags || [],
          published: attributes.published,
          content: body
        });
      }
    } catch (error) {
      console.error(`Error loading post ${slug}:`, error);
    }
  }

  // Sort by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Simple Frontmatter Parser
function parseFrontmatter(text: string): { attributes: any, body: string } {
  const pattern = /^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+([\s\S]*)$/;
  const match = text.match(pattern);

  if (match) {
    try {
      const attributes = yaml.load(match[1]);
      const body = match[2];
      return { attributes, body };
    } catch (e) {
      console.error("Failed to parse YAML frontmatter", e);
      return { attributes: {}, body: text };
    }
  }
  
  // Return empty attributes if no frontmatter found
  return { attributes: {}, body: text };
}