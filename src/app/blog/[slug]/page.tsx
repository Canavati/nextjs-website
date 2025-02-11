import { getBlogPostBySlug, getBlogPosts } from '@/lib/contentful';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import RichTextRenderer from '@/components/RichTextRenderer';
import BlogPostWrapper from '@/components/blog/BlogPostWrapper';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostWrapper>
      {post.featuredImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-transparent bg-clip-text">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center space-x-3">
            {post.author.avatar && (
              <div className="relative h-12 w-12">
                <Image
                  src={post.author.avatar.url}
                  alt={post.author.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <div className="font-medium text-gray-800">{post.author.name}</div>
              <time className="text-sm text-gray-500">
                {new Date(post.publishDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <RichTextRenderer content={post.content} />
        </div>
      </div>
    </BlogPostWrapper>
  );
} 