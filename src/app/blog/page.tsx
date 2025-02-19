import { getBlogPosts } from '@/lib/contentful';
import BlogCardWrapper from '@/components/blog/BlogCardWrapper';
import BlogCard from '@/components/blog/BlogCard';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  // Sort posts by publishDate (most recent first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  // Debug log
  console.log('Blog Posts:', sortedPosts.map(post => ({
    title: post.title,
    hasImage: Boolean(post.featuredImage?.url),
    imageUrl: post.featuredImage?.url
  })));

  return (
    <main className="min-h-screen relative overflow-hidden py-16">
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
        {/* Hero Section */}
        <div className="relative pt-24 pb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
              <span className="bg-gradient-bright bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto text-lg">
              Descubre las últimas novedades, consejos y actualizaciones sobre nuestros servicios
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
            {sortedPosts.map((post, index) => (
              <BlogCardWrapper 
                key={post.slug} 
                index={index} 
                hasImage={Boolean(post.featuredImage?.url)}
              >
                <BlogCard post={post} index={index} />
              </BlogCardWrapper>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 