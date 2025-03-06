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

interface Author {
  name: string;
  title: string;
  image: string;
}

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  rawDate: Date;
  category: string;
  image: string;
  content: string;
  readTime: string;
  featured: boolean;
  tags?: string[];
  author: Author;
}

// Define metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = getBlogPostBySlug(params.id) as BlogPost;
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }
  
  return {
    title: `${post.title} | SingRank Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image }]
    }
  };
}

// Define dynamic paths
export async function generateStaticParams() {
  const posts = getAllBlogPosts() as BlogPost[];
  return posts.map(post => ({
    id: post.id
  }));
}

// Get static data at build time
export const revalidate = 60; // Revalidate every 60 seconds

export default function BlogPost({ params }: { params: { id: string } }) {
  // Get the blog post with the matching ID
  const post = getBlogPostBySlug(params.id) as BlogPost;
  
  // If post is not found, show 404 page
  if (!post) {
    notFound();
  }
  
  // Find related posts - up to 3 posts with matching tags or categories
  const allPosts = getAllBlogPosts() as BlogPost[];
  const relatedPosts = allPosts
    .filter(p => 
      p.id !== post.id && 
      (p.category === post.category || 
       (post.tags && p.tags?.some(tag => post.tags?.includes(tag))))
    )
    .slice(0, 3);
    
  // Use placeholder related posts if none are found
  const hasRelatedPosts = relatedPosts.length > 0;
  
  return (
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
            
            <div className="flex items-start mb-8 py-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover object-center"
                    sizes="48px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.title}</p>
              </div>
              
              <div className="text-sm text-gray-500 flex flex-col items-end">
                <div className="flex items-center mb-1">
                  <FiCalendar size={14} className="mr-1.5" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <FiClock size={14} className="mr-1.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-12">
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
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 
            prose-a:text-[#d13239] prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-md">
            <div dangerouslySetInnerHTML={{ __html: transformMarkdownToHTML(post.content) }} />
          </article>
          
          <div className="flex items-center justify-between mt-12 py-8 border-t border-b border-gray-100">
            <div className="flex space-x-3">
              <button className="inline-flex items-center text-gray-500 hover:text-[#d13239] transition-colors">
                <FiHeart size={18} className="mr-2" />
                <span>Like</span>
              </button>
              <button className="inline-flex items-center text-gray-500 hover:text-[#d13239] transition-colors">
                <FiMessageSquare size={18} className="mr-2" />
                <span>Comment</span>
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button className="inline-flex items-center text-gray-500 hover:text-[#d13239] transition-colors">
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
                  <Link href={`/blog/${relatedPost.id}`} className="block h-full">
                    <div className="relative aspect-square md:aspect-video overflow-hidden">
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
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#d13239] to-[#a61b22] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Digital Presence?</h2>
            <p className="mb-8 opacity-90">Our team of experts is ready to help you achieve your digital marketing goals. Contact us today to get started.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="px-8 py-3 bg-white text-[#d13239] rounded-full font-medium hover:bg-gray-100 transition-colors">
                Contact Us
              </Link>
              <Link href="/services" className="px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper function to transform markdown to HTML
function transformMarkdownToHTML(markdown: string): string {
  // Basic transformation for now - this should be replaced with a proper markdown parser
  return markdown
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
    .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" class="rounded-xl shadow-md" />')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#d13239] hover:underline">$1</a>')
    .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.*$)/gm, '<ul><li>$1</li></ul>')
    .replace(/^(\d+)\. (.*$)/gm, '<ol><li>$2</li></ol>')
    .replace(/^(?!\<[uo]l\>)(.+?)(?!\<\/[uo]l\>)$/gm, '<p>$1</p>')
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/<\/ol>\s*<ol>/g, '')
    .replace(/\n\n/g, '<br><br>');
}