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
import { getAllBlogPosts, getFeaturedPosts, getAllTestimonials } from '../../lib/blogUtils';

// Get blog posts from CMS
export async function generateMetadata() {
  return {
    title: 'Blog | SingRank - Digital Marketing Insights',
    description: 'Discover the latest strategies, trends, and insights to elevate your digital presence and drive measurable results.',
  };
}

// Get static data at build time
export const revalidate = 60; // Revalidate every 60 seconds

export default function Blog() {
  // Get blog posts from CMS
  const blogPosts = getAllBlogPosts();
  
  // Get featured posts
  const featuredPosts = getFeaturedPosts();
  
  // Get testimonials
  const testimonials = getAllTestimonials();
  
  // Use sample data if no CMS content is available yet
  const useSampleData = blogPosts.length === 0;
  
  // Sample blog posts as fallback
  const sampleBlogPosts = [
    {
      id: "1",
      title: '10 SEO Strategies That Will Dominate in 2024',
      description: 'Stay ahead of the competition with these proven SEO strategies that are set to deliver the best results in the coming year.',
      category: 'SEO',
      date: 'March 15, 2024',
      readTime: '8 min read',
      featured: true,
      image: '/images/blog/seo-strategies.jpg'
    },
    {
      id: "2",
      title: 'How to Build a Social Media Strategy That Converts',
      description: 'Learn how to create a social media strategy focused on driving conversions rather than just increasing vanity metrics.',
      category: 'Social Media',
      date: 'March 10, 2024',
      readTime: '6 min read',
      featured: false,
      image: '/images/blog/social-media.jpg'
    },
    {
      id: "3",
      title: 'Content Marketing Trends to Watch in 2024',
      description: 'Discover the latest content marketing trends that are shaping the digital landscape and how you can leverage them.',
      category: 'Content Marketing',
      date: 'March 5, 2024',
      readTime: '7 min read',
      featured: true,
      image: '/images/blog/content-marketing.jpg'
    },
    {
      id: "4",
      title: 'PPC Campaign Optimization: A Step-by-Step Guide',
      description: 'Follow this comprehensive guide to optimize your PPC campaigns for better performance and higher ROI.',
      category: 'PPC',
      date: 'February 28, 2024',
      readTime: '10 min read',
      featured: false,
      image: '/images/blog/ppc-campaign.jpg'
    },
    {
      id: "5",
      title: 'Email Marketing Best Practices for 2024',
      description: 'Maximize your email marketing effectiveness with these up-to-date best practices for higher open rates and conversions.',
      category: 'Email Marketing',
      date: 'February 20, 2024',
      readTime: '5 min read',
      featured: false,
      image: '/images/blog/email-marketing.jpg'
    },
    {
      id: "6",
      title: 'How Video Marketing is Transforming Digital Strategies',
      description: 'Explore how video marketing is changing the digital landscape and how businesses are leveraging it for growth.',
      category: 'Video Marketing',
      date: 'February 15, 2024',
      readTime: '8 min read',
      featured: false,
      image: '/images/blog/video-marketing.jpg'
    }
  ];
  
  // Sample testimonials as fallback
  const sampleTestimonials = [
    {
      id: "1",
      name: "Sarah Chen",
      position: "Marketing Director",
      company: "SG Tech Solutions",
      quote: "SingRank transformed our digital presence. Their SEO expertise helped us achieve top rankings for our most valuable keywords, resulting in a 75% increase in organic traffic.",
      avatar: "/images/testimonials/sarah.jpg",
      rating: 5
    },
    {
      id: "2",
      name: "David Wong",
      position: "CEO",
      company: "Horizon Digital",
      quote: "Working with SingRank has been a game-changer for our business. Their strategic approach to content and technical SEO delivered impressive results in a competitive industry.",
      avatar: "/images/testimonials/david.jpg",
      rating: 5
    }
  ];
  
  // Use CMS data or sample data
  const postsToDisplay = useSampleData ? sampleBlogPosts : blogPosts;
  const featuredPostsToDisplay = useSampleData ? sampleBlogPosts.filter(post => post.featured) : featuredPosts;
  const testimonialsToDisplay = testimonials.length > 0 ? testimonials : sampleTestimonials;
  
  // Blog categories for filtering
  const allCategories = Array.from(new Set(postsToDisplay.map(post => post.category)));
  const categories = ['All', ...allCategories];
  
  // Client component with useState will be implemented in a separate file

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#fff1f1] to-transparent opacity-50 z-0"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-[#fff5f5] text-[#d13239] rounded-full text-sm font-medium mb-6 border border-[#ffcaca]">
              Insights & Expertise
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#d13239] to-[#a61b22]">
              Digital Marketing Insights
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover the latest strategies, trends, and insights to elevate your digital presence and drive measurable results.
            </p>
            
            {/* Search is client-side only */}
            <div className="max-w-xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-5 py-4 pr-12 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d13239]/20 focus:border-[#d13239]"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiSearch size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Posts Section */}
      {featuredPostsToDisplay.length > 0 && (
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
            {featuredPostsToDisplay.map((post, index) => (
              <div
                key={post.id}
                className="rounded-xl overflow-hidden shadow-lg group bg-white border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/blog/${post.id}`} className="block h-full">
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
      
      {/* All blog posts section - simplified for SSR */}
      <section className="container mx-auto px-4 py-8">
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
          {postsToDisplay.map(post => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <Link href={`/blog/${post.id}`} className="block h-full">
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
      
      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            <span className="border-b-2 border-[#d13239] pb-1">Client Success Stories</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our clients who have achieved significant results through our digital marketing strategies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonialsToDisplay.map((testimonial) => (
            <div key={testimonial.id} className="bg-[#fff9f9] p-6 rounded-xl border border-[#ffcaca]">
              <div className="flex items-start mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200 mr-4 border-2 border-[#d13239]">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover object-center"
                      sizes="64px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                  <div className="flex mt-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#d13239" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Newsletter Subscription */}
      <section className="bg-gradient-to-r from-[#d13239] to-[#a61b22] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-8 opacity-90">Stay updated with the latest digital marketing insights, trends, and tips delivered directly to your inbox.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-full focus:outline-none text-gray-800"
              />
              <button className="px-6 py-3 bg-white text-[#d13239] rounded-full font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm opacity-80">We respect your privacy and will never share your information.</p>
          </div>
        </div>
      </section>
    </main>
  );
} 