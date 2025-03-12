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
          <article className="bg-white shadow-sm rounded-lg overflow-hidden mx-auto max-w-4xl">
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#d13239] leading-tight">
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
            <div className="px-4 md:px-8 lg:px-16 py-8">
              <div className="max-w-3xl mx-auto article-container">
                {/* Table of Contents - Auto-generated based on headings */}
                {post.tableOfContents && (
                  <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }} className="toc-wrapper mb-10" />
                )}
                
                {/* Article description as intro paragraph */}
                <p className="text-xl font-medium text-gray-700 mb-8 !mt-0 first-letter:text-5xl first-letter:font-bold first-letter:text-[#d13239] first-letter:mr-2 first-letter:float-left first-letter:leading-[1]">
                  {post.description}
                </p>
                
                {/* Render the article content */}
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="article-content"
                />
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-16 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-bold mb-3 text-[#d13239]">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Link 
                          key={index} 
                          href={`/blog?tag=${tag}`}
                          className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full text-sm transition-colors border border-gray-100"
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
                  <h2 className="text-2xl font-bold mb-8 text-[#d13239]">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id} 
                        href={`/blog/${relatedPost.id}`}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                      >
                        <div className="relative h-48 w-full">
                          <Image
                            src={relatedPost.image || '/images/blog/default.jpg'}
                            alt={relatedPost.title}
                            fill
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 225))}`}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-[#d13239] transition-colors">{relatedPost.title}</h3>
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
        
        <style jsx global>{`
          .article-container {
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 1.125rem;
            line-height: 1.8;
            color: #333;
          }
          
          .toc-wrapper {
            border-radius: 0.5rem;
            border: 1px solid #f0f0f0;
            background-color: #fafafa;
            padding: 1.5rem;
            margin-bottom: 2.5rem;
          }
          
          .toc-wrapper h3 {
            color: #d13239;
            font-weight: 700;
            margin-bottom: 0.75rem;
          }
          
          .toc-wrapper ul {
            padding-left: 1.25rem;
          }
          
          .toc-wrapper li {
            margin-bottom: 0.5rem;
          }
          
          .toc-wrapper a {
            color: #d13239;
            text-decoration: none;
            transition: all 0.2s;
          }
          
          .toc-wrapper a:hover {
            text-decoration: underline;
          }
          
          .article-content h2 {
            font-size: 1.875rem;
            font-weight: 700;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #f0f0f0;
            color: #d13239;
          }
          
          .article-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #d13239;
          }
          
          .article-content h4 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #d13239;
          }
          
          .article-content p {
            margin-bottom: 1.5rem;
            line-height: 1.8;
          }
          
          .article-content a {
            color: #d13239;
            font-weight: 500;
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 2px;
            transition: all 0.2s;
          }
          
          .article-content a:hover {
            text-decoration-thickness: 2px;
          }
          
          .article-content strong, .article-content b {
            font-weight: 700;
            color: #d13239;
          }
          
          .article-content ul, .article-content ol {
            margin: 1.5rem 0;
            padding-left: 1.5rem;
          }
          
          .article-content ul {
            list-style-type: disc;
          }
          
          .article-content ol {
            list-style-type: decimal;
          }
          
          .article-content li {
            margin-bottom: 0.75rem;
            padding-left: 0.5rem;
          }
          
          .article-content blockquote {
            margin: 2rem 0;
            padding: 1.5rem 2rem;
            border-left: 4px solid #d13239;
            background-color: #f9f9f9;
            font-style: italic;
            border-radius: 0 0.5rem 0.5rem 0;
          }
          
          .article-content blockquote p {
            margin-bottom: 0;
          }
          
          .article-content img {
            display: block;
            max-width: 100%;
            margin: 2rem auto;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          
          .article-content code {
            background-color: #f1f1f1;
            color: #d13239;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.875rem;
          }
          
          .article-content pre {
            background-color: #2d3748;
            color: #e5e5e5;
            padding: 1.5rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
          }
          
          .article-content pre code {
            background-color: transparent;
            color: inherit;
            padding: 0;
            font-size: 0.875rem;
          }
          
          .article-content hr {
            margin: 2.5rem 0;
            border: 0;
            height: 1px;
            background-color: #f0f0f0;
          }
          
          @media (max-width: 768px) {
            .article-content h2 {
              font-size: 1.5rem;
            }
            
            .article-content h3 {
              font-size: 1.25rem;
            }
            
            .article-content h4 {
              font-size: 1.125rem;
            }
            
            .article-content {
              font-size: 1rem;
            }
          }
        `}</style>
      </>
    );
  } catch (error) {
    console.error(`Error rendering blog post page for ID ${params.id}:`, error);
    notFound();
  }
}