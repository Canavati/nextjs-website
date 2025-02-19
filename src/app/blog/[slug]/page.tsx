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
    <main className="min-h-[calc(100vh-var(--top-bar-height))] relative overflow-hidden -mt-[var(--header-height)]">
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#292cf6]/10 via-[#1a1f35]/40 to-[#292cf6]/20" />

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Waves */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(45deg, var(--quinary), var(--quaternary), var(--quinary), var(--secondary))',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 20s linear infinite alternate',
          }}
        />

        {/* Enhanced Floating Particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 
                ? 'w-1 h-1 bg-gradient-to-r from-[#292cf6] to-[#51fcff]' 
                : i % 3 === 1
                ? 'w-2 h-2 bg-gradient-to-r from-[#51fcff] to-[#292cf6]'
                : 'w-3 h-3 bg-gradient-to-r from-[#292cf6] to-[#51fcff]'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              animation: `float-up ${10 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Mesh Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--quinary)_0%,_transparent_70%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--quaternary)_0%,_transparent_70%)] opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="pt-[calc(var(--header-height)+2rem)] pb-12 container mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 border border-white/50">
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
          </div>
        </div>
      </div>
    </main>
  );
} 