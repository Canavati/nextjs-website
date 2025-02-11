import { getBlogPosts } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import BlogCardWrapper from '@/components/blog/BlogCardWrapper';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-transparent bg-clip-text">
        Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <BlogCardWrapper key={post.slug} index={index}>
            <article>
              {post.featuredImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-[#ed54ba] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {post.author.avatar && (
                      <div className="relative h-8 w-8">
                        <Image
                          src={post.author.avatar.url}
                          alt={post.author.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                    <span className="text-sm text-gray-600">{post.author.name}</span>
                  </div>
                  <time className="text-sm text-gray-500">
                    {new Date(post.publishDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </article>
          </BlogCardWrapper>
        ))}
      </div>
    </div>
  );
} 