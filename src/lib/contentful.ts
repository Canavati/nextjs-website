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
  featuredImage?: {
    url: string;
    title: string;
  } | null;
  publishDate: string;
  author: {
    name: string;
    avatar?: {
      url: string;
    } | null;
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    order: ['-sys.createdAt'],
  });

  // Debug log to see raw Contentful response
  console.log('Raw Contentful Response:', JSON.stringify(response.items[0]?.fields, null, 2));

  return response.items.map((item: any) => {
    // Get the first image from the images array if it exists
    const image = Array.isArray(item.fields.image) ? item.fields.image[0] : null;
    console.log('Image Data:', image);
    
    return {
      title: item.fields.title,
      slug: item.fields.slug ? formatSlug(item.fields.slug) : formatSlug(item.fields.title),
      content: item.fields.content,
      excerpt: item.fields.excerpt,
      featuredImage: image
        ? {
            url: `https:${image.fields.file.url}`,
            title: image.fields.title,
          }
        : null,
      publishDate: item.fields.publishDate,
      author: {
        name: item.fields.author?.fields?.name ?? 'Unimovil',
        avatar: {
          url: item.fields.author?.fields?.avatar?.fields?.file?.url
            ? `https:${item.fields.author.fields.avatar.fields.file.url}`
            : '/images/logo_crop.png'
        },
      },
    };
  });
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

  const item = response.items[0] as any;
  const image = Array.isArray(item.fields.image) ? item.fields.image[0] : null;

  return {
    title: item.fields.title,
    slug: item.fields.slug ? formatSlug(item.fields.slug) : formatSlug(item.fields.title),
    content: item.fields.content,
    excerpt: item.fields.excerpt,
    featuredImage: image
      ? {
          url: `https:${image.fields.file.url}`,
          title: image.fields.title,
        }
      : null,
    publishDate: item.fields.publishDate,
    author: {
      name: item.fields.author?.fields?.name ?? 'Unimovil',
      avatar: {
        url: item.fields.author?.fields?.avatar?.fields?.file?.url
          ? `https:${item.fields.author.fields.avatar.fields.file.url}`
          : '/images/logo_crop.png'
      },
    },
  };
} 