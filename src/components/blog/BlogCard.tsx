'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Newspaper } from '@phosphor-icons/react';

interface ContentItem {
  content?: { value: string }[];
  value?: string;
}

interface ContentObject {
  content?: ContentItem[];
}

function cleanAndTruncateContent(content: string | ContentObject | null | undefined) {
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
      .map(item => item.content?.map(c => c.value).join(' ') || '')
      .join(' ');
    
    const truncated = textContent.slice(0, 250).split(' ').slice(0, -1).join(' ');
    return truncated + '...';
  }
  
  return '';
}

interface BlogCardProps {
  post: {
    title: string;
    slug: string;
    publishDate: string;
    content: string | ContentObject;
    featuredImage?: {
      url: string;
      title?: string;
    } | null;
    author?: {
      name: string;
      avatar?: {
        url: string;
      } | null;
    } | null;
  };
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const authorName = post.author?.name || 'Unimovil';
  const authorAvatar = post.author?.avatar?.url;

  const cardContent = (
    <div className="flex flex-col h-full bg-white/85 backdrop-blur-sm rounded-xl shadow-xl">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
        {post.featuredImage?.url ? (
          <>
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.title || post.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#0e1b45] via-[#1a1f35] to-[#141b38] relative overflow-hidden">
            {/* Animated Background Layers */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,255,0.1)_50%,transparent_75%)] bg-[length:250px_250px] animate-subtle-drift opacity-50" />
            
            {/* Hexagon Grid Pattern */}
            <div className="absolute inset-0" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' stroke-width='1' stroke='rgba(81,252,255,0.05)' fill='none' stroke-dasharray='4,6'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
              }}
            />

            {/* Glowing Orbs */}
            <div className="absolute inset-0">
              <div className="absolute h-32 w-32 rounded-full bg-[#292cf6]/10 blur-2xl animate-cosmic-drift-1 top-1/4 -left-8" />
              <div className="absolute h-40 w-40 rounded-full bg-[#51fcff]/10 blur-2xl animate-cosmic-drift-2 bottom-1/4 -right-8" />
              <div className="absolute h-24 w-24 rounded-full bg-[#ed54ba]/10 blur-2xl animate-cosmic-drift-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Animated Lines */}
            <div className="absolute inset-0">
              {/* Horizontal Lines */}
              <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#51fcff]/20 to-transparent animate-pulse-slow" />
              <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ed54ba]/20 to-transparent animate-pulse-slow delay-300" />
              
              {/* Vertical Lines */}
              <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#292cf6]/20 to-transparent animate-pulse-slow delay-150" />
              <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#51fcff]/20 to-transparent animate-pulse-slow delay-450" />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-[#51fcff]/30 animate-particle-float"
                  style={{
                    left: `${(i * 13) % 100}%`,
                    top: `${(i * 17) % 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${4 + (i % 4)}s`
                  }}
                />
              ))}
            </div>

            {/* Center Logo/Icon Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-16 h-16">
                {/* Rotating Border */}
                <div className="absolute inset-0 border-2 border-[#51fcff]/10 rounded-lg animate-spin-slow" />
                <div className="absolute inset-0 border-2 border-[#ed54ba]/10 rounded-lg animate-reverse-spin-slow" />
                
                {/* Center Icon */}
                <div className="absolute inset-2 bg-gradient-to-br from-[#292cf6]/20 via-[#51fcff]/20 to-[#ed54ba]/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                  <Newspaper size={24} weight="duotone" className="text-white/30" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-6 flex flex-col justify-between">
        {/* Title without hover tooltip */}
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-shimmer-dark transition-colors line-clamp-2 mb-2">
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
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
          {cleanAndTruncateContent(post.content)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-white">
              <Image
                src={authorAvatar || '/images/logo_crop.png'}
                alt={`${authorName}'s avatar`}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-gray-600 font-bold">{authorName}</span>
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
  );

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      {cardContent}
    </Link>
  );
} 