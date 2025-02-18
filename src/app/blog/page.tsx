import { getBlogPosts } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import BlogCardWrapper from '@/components/blog/BlogCardWrapper';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  // Debug log
  console.log('Blog Posts:', posts.map(post => ({
    title: post.title,
    hasImage: Boolean(post.featuredImage?.url),
    imageUrl: post.featuredImage?.url
  })));

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#292cf6]/5 to-transparent pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-transparent bg-clip-text">
              Blog
            </span>
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto text-lg">
            Descubre las últimas novedades, consejos y actualizaciones sobre nuestros servicios
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <BlogCardWrapper 
              key={post.slug} 
              index={index} 
              hasImage={Boolean(post.featuredImage?.url)}
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                {post.featuredImage?.url ? (
                  <>
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.title || post.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                      {/* Image overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Date badge */}
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                        {new Date(post.publishDate).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-[#ed54ba] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {post.author.avatar?.url ? (
                            <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-white">
                              <Image
                                src={post.author.avatar.url}
                                alt={`${post.author.name}'s avatar`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : null}
                          <div>
                            <p className="text-sm font-medium text-gray-800">{post.author.name}</p>
                          </div>
                        </div>
                        <span className="text-[#ed54ba] group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center text-sm font-medium">
                          Leer más
                          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
                            <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#ed54ba] transition-colors flex-1">
                        {post.title}
                      </h2>
                      <time className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {new Date(post.publishDate).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {post.author.avatar?.url ? (
                          <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-white">
                            <Image
                              src={post.author.avatar.url}
                              alt={`${post.author.name}'s avatar`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : null}
                        <div>
                          <p className="text-sm font-medium text-gray-800">{post.author.name}</p>
                        </div>
                      </div>
                      <span className="text-[#ed54ba] group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center text-sm font-medium">
                        Leer más
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
                          <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            </BlogCardWrapper>
          ))}
        </div>
      </div>
    </main>
  );
} 