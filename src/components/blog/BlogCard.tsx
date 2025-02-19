'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, User } from '@phosphor-icons/react';
import { BlogPost } from '@/lib/contentful';

function cleanAndTruncateContent(content: any) {
  if (!content) return '';
  
  // If content is a string, clean it directly
  if (typeof content === 'string') {
    const cleanContent = content
      .replace(/<[^>]*>/g, '')
      .replace(/[#*`_~]/g, '')
      .trim();
    
    const truncated = cleanContent.slice(0, 250).split(' ').slice(0, -1).join(' ');
    return truncated + '...';
  }
  
  // If content is an object (Contentful Rich Text), convert to string first
  if (content.content && Array.isArray(content.content)) {
    const textContent = content.content
      .map(item => item.content?.map(c => c.value).join(' '))
      .join(' ');
    
    const truncated = textContent.slice(0, 250).split(' ').slice(0, -1).join(' ');
    return truncated + '...';
  }
  
  return '';
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const authorName = post.author?.fields?.name || post.author?.name || 'Anonymous';
  const authorAvatar = post.author?.fields?.avatar?.fields?.file?.url || post.author?.avatar?.url;

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      {post.featuredImage?.url ? (
        <div className="flex flex-col h-full bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.title || post.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          <div className="flex-1 p-6 flex flex-col">
            {/* Title */}
            <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-[#ed54ba] transition-colors line-clamp-2">
              {post.title}
            </h2>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Clock size={16} weight="duotone" />
              <time>
                {new Date(post.publishDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Content preview */}
            <p className="text-gray-600 mb-4 line-clamp-4 text-sm leading-relaxed flex-1">
              {cleanAndTruncateContent(post.content)}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {authorAvatar && (
                  <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-white">
                    <Image
                      src={authorAvatar}
                      alt={`${authorName}'s avatar`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="text-sm text-gray-600 font-medium">{authorName}</span>
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
        </div>
      ) : (
        <div className="flex flex-col h-full bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
          {/* Decorative Header */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-[#292cf6]/20 via-[#ed54ba]/10 to-[#51fcff]/20">
            {/* Network Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(81,252,255,.1)_1px,transparent_0),linear-gradient(rgba(81,252,255,.1)_1px,transparent_0)] bg-[size:24px_24px] animate-network-flow" />
            
            {/* Animated Particles */}
            <div className="absolute inset-0">
              <div className="absolute h-24 w-24 rounded-full bg-[#ed54ba]/30 blur-xl animate-cosmic-shift top-1/4 left-1/4" />
              <div className="absolute h-32 w-32 rounded-full bg-[#51fcff]/30 blur-xl animate-cosmic-shift delay-700 top-2/3 right-1/3" />
              <div className="absolute h-20 w-20 rounded-full bg-[#292cf6]/30 blur-xl animate-cosmic-shift delay-1000 top-1/3 right-1/4" />
            </div>

            {/* Glowing Lines */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#51fcff]/50 to-transparent animate-pulse-slow" />
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#ed54ba]/50 to-transparent animate-pulse-slow delay-500" />
            </div>
          </div>
          
          <div className="flex-1 p-6 flex flex-col">
            {/* Title */}
            <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-[#ed54ba] transition-colors">
              {post.title}
            </h2>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Clock size={16} weight="duotone" />
              <time>
                {new Date(post.publishDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Content preview */}
            <p className="text-gray-600 mb-6 line-clamp-4 text-sm leading-relaxed flex-1">
              {cleanAndTruncateContent(post.content)}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-white">
                    <Image
                      src={authorAvatar}
                      alt={`${authorName}'s avatar`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gradient-to-br from-[#ed54ba]/20 to-[#51fcff]/20 flex items-center justify-center">
                    <User size={16} weight="duotone" className="text-gray-600" />
                  </div>
                )}
                <span className="text-sm text-gray-600 font-medium">{authorName}</span>
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
        </div>
      )}
    </Link>
  );
} 