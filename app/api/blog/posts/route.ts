import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blogUtils';

// Set configuration to ensure this route is always dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Get search params
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    
    console.log(`API: Fetching blog posts with limit=${limit}, category=${category}, tag=${tag}`);
    
    // Get all blog posts
    let posts = await getAllBlogPosts();
    
    // Filter by category if provided
    if (category) {
      posts = posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by tag if provided
    if (tag) {
      posts = posts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }
    
    // Limit results if specified
    if (limit && limit > 0) {
      posts = posts.slice(0, limit);
    }
    
    console.log(`API: Returning ${posts.length} blog posts`);
    
    // Return the posts
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error('Error in blog posts API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 