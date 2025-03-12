import { NextRequest, NextResponse } from 'next/server';
import { invalidateBlogCache } from '@/lib/blogUtils';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    // Get the secret from query parameter
    const secret = request.nextUrl.searchParams.get('secret');
    const requiredSecret = process.env.REVALIDATE_SECRET || 'SingRankCMS2024';
    
    // Validate the secret
    if (secret !== requiredSecret) {
      return NextResponse.json({ 
        error: 'Invalid secret' 
      }, { status: 401 });
    }
    
    // Get path to revalidate
    const path = request.nextUrl.searchParams.get('path') || '/blog';
    
    // Invalidate both blog cache and Next.js cache
    invalidateBlogCache();
    revalidatePath(path);
    
    return NextResponse.json({ 
      success: true,
      message: `Cache invalidated for ${path}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error revalidating blog cache:', error);
    return NextResponse.json({ 
      error: 'Failed to revalidate cache' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body to get webhook data from CMS
    const body = await request.json();
    
    // Log webhook data for debugging
    console.log('Received webhook:', JSON.stringify(body, null, 2));
    
    // Invalidate cache
    invalidateBlogCache();
    
    // Revalidate both blog list and specific article if available
    revalidatePath('/blog');
    
    // If we have article data, revalidate that specific path too
    if (body?.entry?.slug) {
      revalidatePath(`/blog/${body.entry.slug}`);
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Blog cache invalidated via webhook',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing blog webhook:', error);
    return NextResponse.json({ 
      error: 'Failed to process webhook' 
    }, { status: 500 });
  }
} 