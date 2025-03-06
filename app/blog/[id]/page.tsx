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
import { FiArrowLeft, FiMessageSquare, FiCalendar, FiClock, FiShare2, FiBookmark, FiHeart } from 'react-icons/fi';
import { getBlogPostBySlug, getAllBlogPosts } from '../../../lib/blogUtils';
import { notFound } from 'next/navigation';
import StructuredData from '../../components/StructuredData';
import type { BlogPost } from '../../../lib/blogUtils';

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    id: post.slug,
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

  return {
    title: `${post.title} | SingRank Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://singrank.com/blog/${post.slug}`,
      images: [post.image || '/images/blog/default.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image || '/images/blog/default.jpg'],
    },
  };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  // Get the blog post with the matching ID
  const post = await getBlogPostBySlug(params.id);
  
  // If post is not found, show 404 page
  if (!post) {
    notFound();
  }
  
  // Find related posts - up to 3 posts with matching tags or categories
  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(p => 
      p.id !== post.id && 
      (p.category === post.category || 
       (post.tags && p.tags?.some(tag => post.tags?.includes(tag))))
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
      <main className="min-h-screen pt-20 pb-16 bg-white">
        {/* Back to blog link */}
        <div className="container mx-auto px-4 py-6">
          <Link href="/blog" className="inline-flex items-center text-[#d13239] hover:text-[#a61b22] transition-colors">
            <FiArrowLeft className="mr-2" />
            <span>Back to all articles</span>
          </Link>
        </div>
        
        {/* Hero Section */}
        <section className="relative pb-8 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-5 flex items-center">
                <span className="inline-block px-3 py-1 bg-[#fff5f5] text-[#d13239] rounded-full text-sm font-medium border border-[#ffcaca]">
                  {post.category}
                </span>
                
                <div className="ml-auto flex space-x-3">
                  <button className="inline-flex items-center text-gray-500 hover:text-[#d13239] transition-colors">
                    <FiShare2 size={16} />
                  </button>
                  <button className="inline-flex items-center text-gray-500 hover:text-[#d13239] transition-colors">
                    <FiBookmark size={16} />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      fill
                      className="object-cover object-center"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                    <p className="text-sm text-gray-600">{post.author.title}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <span className="flex items-center mr-4">
                    <FiCalendar className="mr-1.5" size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <FiClock className="mr-1.5" size={14} />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Image */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg mb-12">
              <Image
                src={post.image || '/images/blog/default.jpg'}
                alt={post.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          </div>
        </section>
        
        {/* Article Content */}
        <section className="container mx-auto px-4 py-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none text-gray-900
              prose-headings:text-[#d13239] prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-4
              prose-p:text-gray-900 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-[#d13239] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#d13239] prose-strong:font-bold
              prose-code:text-[#d13239] prose-code:bg-gray-50 prose-code:px-1 prose-code:rounded
              prose-pre:bg-gray-50 prose-pre:text-gray-900
              prose-img:rounded-xl prose-img:shadow-md prose-img:aspect-square prose-img:object-cover
              prose-blockquote:border-l-[#d13239] prose-blockquote:text-gray-900 prose-blockquote:bg-gray-50 prose-blockquote:p-4
              prose-ul:text-gray-900 prose-ol:text-gray-900
              prose-li:text-gray-900 prose-li:mb-2">
              <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-900" />
            </article>
            
            <div className="flex items-center justify-between mt-12 py-8 border-t border-b border-gray-100">
              <div className="flex space-x-3">
                <button className="inline-flex items-center text-gray-600 hover:text-[#d13239] transition-colors">
                  <FiHeart size={18} className="mr-2" />
                  <span>Like</span>
                </button>
                <button className="inline-flex items-center text-gray-600 hover:text-[#d13239] transition-colors">
                  <FiMessageSquare size={18} className="mr-2" />
                  <span>Comment</span>
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button className="inline-flex items-center text-gray-600 hover:text-[#d13239] transition-colors">
                  <FiShare2 size={18} className="mr-2" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </section>
                
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <section className="container mx-auto px-4 py-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Related Articles */}
        {hasRelatedPosts && (
          <section className="container mx-auto px-4 py-12 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <div key={relatedPost.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block h-full">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={relatedPost.image || '/images/blog/default.jpg'}
                          alt={relatedPost.title}
                          fill
                          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#d13239] rounded-full text-xs font-medium">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#d13239] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.description}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}