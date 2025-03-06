/**
 * Professional Blog Page - Luxury Red & White Theme
 * 
 * This page presents our collection of industry insights and expertise with an elegant,
 * premium design that emphasizes trust, knowledge, and authority.
 * 
 * Features:
 * - Luxury red and white theme with subtle animations
 * - Premium card design with elegant hover effects
 * - Featured posts section for highlighted content
 * - Sophisticated filtering and search functionality
 * - Newsletter subscription with premium styling
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { getAllBlogPosts } from '../../lib/blogUtils';
import type { BlogPost } from '../../lib/blogUtils';

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Blog | SingRank - Digital Marketing Insights',
    description: 'Stay updated with the latest digital marketing trends, SEO strategies, and industry insights from SingRank\'s expert team.',
    openGraph: {
      title: 'Blog | SingRank - Digital Marketing Insights',
      description: 'Stay updated with the latest digital marketing trends, SEO strategies, and industry insights from SingRank\'s expert team.',
      images: ['/images/blog/blog-og.jpg'],
      type: 'website',
      url: 'https://singrank.com/blog',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | SingRank - Digital Marketing Insights',
      description: 'Stay updated with the latest digital marketing trends, SEO strategies, and industry insights from SingRank\'s expert team.',
      images: ['/images/blog/blog-og.jpg'],
    }
  };
}

export default async function Blog() {
  // Get blog posts from CMS
  const blogPosts = await getAllBlogPosts();
  
  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  // Blog categories for filtering
  const allCategories = Array.from(new Set(blogPosts.map(post => post.category)));
  const categories = ['All', ...allCategories];

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#fff1f1] to-transparent opacity-50 z-0"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Digital Marketing <span className="text-[#d13239]">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with the latest trends, strategies, and industry insights from our expert team.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center bg-white rounded-full shadow-md border border-gray-100 p-2">
                <FiSearch className="ml-4 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 text-gray-700 focus:outline-none bg-transparent"
                />
                <button className="px-6 py-2 bg-[#d13239] text-white rounded-full hover:bg-[#a61b22] transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 text-center">
              <span className="border-b-2 border-[#d13239] pb-1">Featured Articles</span>
            </h2>
            <p className="text-gray-600 text-center">
              Handpicked content by our experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-xl overflow-hidden shadow-lg group bg-white border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/blog/${post.slug ? (post.slug.includes('-') ? post.slug.split('-').slice(-1)[0] : post.slug) : post.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-[#d13239]/80 flex items-center justify-center z-10 opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                      <span className="text-white font-medium flex items-center">
                        Read Article <FiArrowRight className="ml-2" />
                      </span>
                    </div>
                    <div className="h-full w-full relative">
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#d13239] rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      <Image 
                        src={post.image || '/images/blog/default.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="flex items-center mr-4">
                        <FiCalendar className="mr-1.5" size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <FiClock className="mr-1.5" size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#d13239] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* All blog posts section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center mb-8 gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                category === 'All'
                  ? 'bg-[#d13239] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#d13239]/30 hover:bg-[#fff5f5]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <Link href={`/blog/${post.slug ? (post.slug.includes('-') ? post.slug.split('-').slice(-1)[0] : post.slug) : post.id}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <Image 
                    src={post.image || '/images/blog/default.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#d13239] rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span className="flex items-center mr-4">
                      <FiCalendar className="mr-1.5" size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-1.5" size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#d13239] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-2">{post.description}</p>
                  <div className="flex items-center text-[#d13239] font-medium">
                    Read More
                    <FiArrowRight className="ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 