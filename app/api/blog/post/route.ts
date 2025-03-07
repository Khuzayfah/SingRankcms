import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/blogUtils';

// Set configuration to ensure this route is always dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Get the slug from the search params
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    console.log(`API: Fetching blog post with slug=${slug}`);
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }
    
    // Get the blog post
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Return the post
    return NextResponse.json(post, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error('Error in blog post API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
} 