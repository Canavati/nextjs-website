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
    <main className="min-h-screen relative bg-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-[#292cf6]/10 to-gray-900 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,rgba(81,252,255,.3)_1px,transparent_0),linear-gradient(rgba(81,252,255,.3)_1px,transparent_0)] bg-[size:48px_48px]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-[15%] w-[600px] h-[600px] bg-[#ed54ba]/20 rounded-full blur-3xl animate-cosmic-shift opacity-50" />
        <div className="absolute bottom-40 right-[15%] w-[800px] h-[800px] bg-[#51fcff]/20 rounded-full blur-3xl animate-cosmic-shift delay-700 opacity-50" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#292cf6]/20 rounded-full blur-3xl animate-cosmic-shift delay-1000 opacity-50" />
        
        {/* Additional Ambient Light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#ed54ba]/5 via-transparent to-[#51fcff]/5" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative pt-24 pb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-transparent bg-clip-text">
                Blog
              </span>
            </h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto text-lg">
              Descubre las últimas novedades, consejos y actualizaciones sobre nuestros servicios
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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