/**
 * Professional Blog Post Page - Luxury Red & White Theme
 * 
 * This page displays an individual blog post with an elegant,
 * premium design that emphasizes readability and authority.
 * 
 * Features:
 * - Luxury red and white theme with subtle animations
 * - Premium typography for enhanced readability
 * - Author information with credentials
 * - Related posts section
 * - Social sharing functionality
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import { getBlogPostBySlug, getAllBlogPosts } from '../../../lib/blogUtils';
import { notFound } from 'next/navigation';
import StructuredData from '../../components/StructuredData';
import type { BlogPost } from '../../../lib/blogUtils';

// Set to no-caching to ensure fresh content
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Optimize images loading
const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f6f7f8" offset="20%" />
        <stop stop-color="#edeef1" offset="50%" />
        <stop stop-color="#f6f7f8" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f6f7f8" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

const toBase64 = (str: string) => typeof window === 'undefined' 
  ? Buffer.from(str).toString('base64') 
  : window.btoa(str);

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getBlogPostBySlug(params.id);
  
  if (!post) {
    return {
      title: 'Post Not Found | SingRank Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  const safeSlug = post.slug ? (post.slug.includes('-') ? post.slug.split('-').slice(-1)[0] : post.slug) : post.id;

  return {
    title: `${post.title} | SingRank Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: 'article',
      url: `https://singrank.com/blog/${safeSlug}`,
      publishedTime: post.date,
      modifiedTime: post.modifiedDate || post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    }
  };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  console.log(`Blog post detail page: Fetching post with ID ${params.id}`);
  
  try {
    // Get the blog post
    const post = await getBlogPostBySlug(params.id);
    
    // If post not found, show 404 page
    if (!post) {
      console.error(`Blog post with ID ${params.id} not found`);
      notFound();
    }
    
    // Get related posts (same category or tags)
    const allPosts = await getAllBlogPosts();
    const relatedPosts = allPosts
      .filter(p => 
        p.id !== post.id && 
        (p.category === post.category || 
         p.tags.some(tag => post.tags.includes(tag)))
      )
      .slice(0, 3);
    
    // Use placeholder related posts if none are found
    const hasRelatedPosts = relatedPosts.length > 0;

    const breadcrumbData = {
      items: [
        { name: 'Home', url: 'https://singrank.com' },
        { name: 'Blog', url: 'https://singrank.com/blog' },
        { name: post.title, url: `https://singrank.com/blog/${params.id}` }
      ]
    };

    return (
      <>
        <StructuredData 
          type="article" 
          data={{
            title: post.title,
            description: post.description,
            image: post.image || '/images/blog/default.jpg',
            author: post.author.name,
            date: post.date,
            slug: params.id
          }} 
        />
        <StructuredData type="breadcrumb" data={breadcrumbData} />
        <main className="min-h-screen pt-20 pb-16 bg-gray-50">
          {/* Navigation and Breadcrumbs */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center text-sm mb-2">
              <Link href="/" className="text-gray-600 hover:text-[#d13239]">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/blog" className="text-gray-600 hover:text-[#d13239]">Blog</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-400 truncate max-w-[200px]">{post.title}</span>
            </div>
            
            <Link href="/blog" className="inline-flex items-center text-[#d13239] hover:text-[#a61b22] transition-colors mb-2 font-medium">
              <FiArrowLeft className="mr-2" />
              <span>Back to all articles</span>
            </Link>
          </div>
          
          {/* Article Container */}
          <article className="bg-white shadow-sm rounded-lg overflow-hidden mx-auto max-w-5xl">
            {/* Article Header */}
            <header className="relative">
              {/* Featured Image */}
              <div className="relative h-[30vh] md:h-[40vh] lg:h-[50vh] w-full">
                <Image
                  src={post.image || '/images/blog/default.jpg'}
                  alt={post.title}
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 630))}`}
                  className="object-cover object-center brightness-[0.85]"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 bg-white shadow-md text-[#d13239] rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              {/* Title and Author Section - Overlapping the image */}
              <div className="relative bg-white rounded-t-3xl mx-4 -mt-12 p-6 md:p-8 shadow-lg z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-100 pt-6">
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-4 border-2 border-white shadow-sm">
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        fill
                        className="object-cover object-center"
                        sizes="48px"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                      <p className="text-sm text-gray-600">{post.author.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="flex items-center mr-4 bg-gray-50 px-3 py-1 rounded-full">
                      <FiCalendar className="mr-1.5" size={14} />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                      <FiClock className="mr-1.5" size={14} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Article Content */}
            <div className="px-4 md:px-8 lg:px-12 py-8">
              <div className="max-w-3xl mx-auto">
                {/* Table of Contents - Auto-generated based on headings */}
                {post.tableOfContents && (
                  <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
                )}
                
                {/* Main Article Content */}
                <div className="prose prose-lg max-w-none text-gray-800
                  prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-20
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-base prose-p:leading-relaxed prose-p:my-6
                  prose-a:text-[#d13239] prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                  prose-strong:font-bold prose-strong:text-gray-900
                  prose-code:text-[#d13239] prose-code:bg-gray-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                  prose-img:rounded-lg prose-img:shadow-md
                  prose-blockquote:border-l-4 prose-blockquote:border-[#d13239] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                  prose-ul:my-6 prose-ol:my-6
                  prose-li:my-2">
                  
                  {/* Article description as intro paragraph */}
                  <p className="text-xl font-medium text-gray-700 mb-8 !mt-0">
                    {post.description}
                  </p>
                  
                  {/* Render the article content */}
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Link 
                          key={index} 
                          href={`/blog?tag=${tag}`}
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full text-sm transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Related Articles */}
            {hasRelatedPosts && (
              <div className="bg-gray-50 px-4 py-12 mt-8">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl font-bold mb-8 text-gray-900">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id} 
                        href={`/blog/${relatedPost.id}`}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-48 w-full">
                          <Image
                            src={relatedPost.image || '/images/blog/default.jpg'}
                            alt={relatedPost.title}
                            fill
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 225))}`}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">{relatedPost.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-3">{relatedPost.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </article>
        </main>
      </>
    );
  } catch (error) {
    console.error(`Error rendering blog post page for ID ${params.id}:`, error);
    notFound();
  }
}