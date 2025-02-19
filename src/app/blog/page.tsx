import { getBlogPosts } from '@/lib/contentful';
import BlogCardWrapper from '@/components/blog/BlogCardWrapper';
import BlogCard from '@/components/blog/BlogCard';
import { motion } from 'framer-motion';

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
    <main className="min-h-[calc(100vh-var(--top-bar-height))] relative overflow-hidden -mt-[var(--header-height)]">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--tertiary)] via-[#2a2f4d] to-[var(--quinary)]" />

      {/* Enhanced Animated Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Orb - Top Left */}
        <div
          className="absolute w-[600px] h-[600px] -left-48 -top-48 rounded-full bg-[radial-gradient(circle_at_center,_var(--quinary)_0%,_transparent_70%)] blur-[64px] animate-orb-float"
        />
        {/* Secondary Orb - Bottom Right */}
        <div
          className="absolute w-[500px] h-[500px] right-0 bottom-0 rounded-full bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_80%)] blur-[64px] animate-orb-float-reverse"
        />
        {/* Accent Orb - Center */}
        <div
          className="absolute w-[300px] h-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_var(--quaternary)_0%,_transparent_80%)] blur-[48px] animate-pulse-slow"
        />
      </div>

      {/* NEW: Animated Constellation Effect */}
      <div className="absolute inset-0">
        <div className="absolute w-2 h-2 rounded-full bg-[#51fcff] top-1/4 left-1/4 animate-pulse-slow" />
        <div className="absolute w-2 h-2 rounded-full bg-[#51fcff] top-3/4 left-1/3 animate-pulse-slow delay-300" />
        <div className="absolute w-2 h-2 rounded-full bg-[#51fcff] top-1/3 right-1/4 animate-pulse-slow delay-700" />
        <div className="absolute w-[150px] h-[1px] bg-gradient-to-r from-[#51fcff]/0 via-[#51fcff]/20 to-[#51fcff]/0 top-[28%] left-[26%] rotate-[30deg] animate-fade-in-out" />
        <div className="absolute w-[200px] h-[1px] bg-gradient-to-r from-[#51fcff]/0 via-[#51fcff]/20 to-[#51fcff]/0 top-[70%] left-[30%] -rotate-[15deg] animate-fade-in-out delay-300" />
      </div>

      {/* NEW: Enhanced Mesh Gradient with Dynamic Patterns */}
      <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--quaternary)_0%,_transparent_70%)] opacity-30 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--quinary)_0%,_transparent_70%)] opacity-30 animate-pulse-slow delay-500" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,var(--quaternary)_0%,transparent_50%,var(--quinary)_100%)] opacity-20 animate-spin-slower" />
      </div>

      {/* NEW: Floating Light Trails */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#51fcff]/20 to-transparent animate-float-horizontal"
            style={{
              width: `${200 + i * 100}px`,
              top: `${20 + i * 30}%`,
              left: `${-100 + i * 50}px`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Line Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.07] animate-subtle-rotate"
        style={{ 
          backgroundImage: `
            linear-gradient(90deg, var(--quinary) 1px, transparent 1px),
            linear-gradient(0deg, var(--quinary) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* NEW: Glowing Accent Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#51fcff]/10 to-transparent animate-glow-line-vertical" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#51fcff]/10 to-transparent animate-glow-line-vertical delay-1000" />
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#51fcff]/10 to-transparent animate-glow-line-horizontal" />
        <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#51fcff]/10 to-transparent animate-glow-line-horizontal delay-1000" />
      </div>

      {/* Floating Particles - Modified for more variety */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-particle-float"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              backgroundColor: i % 2 === 0 ? '#51fcff' : '#ed54ba',
              left: `${(i * 19) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animationDelay: `${i * 1.5}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative pt-[calc(var(--header-height)+2rem)] pb-12">
          <div className="container mx-auto px-4">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-3xl mx-auto border border-white/90">
              <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
                <span className="text-shimmer-dark drop-shadow-lg">
                  Unimovil Blog
                </span>
              </h1>
              <p className="text-gray-600 text-center max-w-2xl mx-auto text-lg font-medium">
                Descubre las últimas novedades, consejos, guías, y actualizaciones sobre nuestros servicios.
              </p>
            </div>
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