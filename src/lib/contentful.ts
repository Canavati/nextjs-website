import { createClient } from 'contentful';
import { formatSlug } from './utils';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: {
    url: string;
    title: string;
  };
  publishDate: string;
  author: {
    name: string;
    avatar?: {
      url: string;
    };
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    order: '-fields.publishDate',
  });

  return response.items.map((item: any) => ({
    title: item.fields.title,
    slug: item.fields.slug ? formatSlug(item.fields.slug) : formatSlug(item.fields.title),
    content: item.fields.content,
    excerpt: item.fields.excerpt,
    featuredImage: item.fields.featuredImage?.fields
      ? {
          url: `https:${item.fields.featuredImage.fields.file.url}`,
          title: item.fields.featuredImage.fields.title,
        }
      : null,
    publishDate: item.fields.publishDate,
    author: {
      name: item.fields.author?.fields.name,
      avatar: item.fields.author?.fields.avatar?.fields
        ? {
            url: `https:${item.fields.author.fields.avatar.fields.file.url}`,
          }
        : undefined,
    },
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const formattedSlug = formatSlug(decodeURIComponent(slug));
  
  const response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': formattedSlug,
    limit: 1,
  });

  if (!response.items.length) {
    return null;
  }

  const item = response.items[0];
  return {
    title: item.fields.title,
    slug: item.fields.slug ? formatSlug(item.fields.slug) : formatSlug(item.fields.title),
    content: item.fields.content,
    excerpt: item.fields.excerpt,
    featuredImage: item.fields.featuredImage?.fields
      ? {
          url: `https:${item.fields.featuredImage.fields.file.url}`,
          title: item.fields.featuredImage.fields.title,
        }
      : null,
    publishDate: item.fields.publishDate,
    author: {
      name: item.fields.author?.fields.name,
      avatar: item.fields.author?.fields.avatar?.fields
        ? {
            url: `https:${item.fields.author.fields.avatar.fields.file.url}`,
          }
        : undefined,
    },
  };
} 