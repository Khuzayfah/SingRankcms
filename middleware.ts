import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware helps with routing in the Netlify environment
export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isNetlify = process.env.NETLIFY === 'true';
  
  // Log for debugging
  console.log(`Middleware: URL=${url.pathname}, Netlify=${isNetlify}`);
  
  // Special handling for blog URLs in Netlify environment
  if (url.pathname.startsWith('/blog') && isNetlify) {
    // Make sure blog content is available
    console.log('Blog related URL detected in Netlify environment');
    
    // Just continue processing - the enhanced blogUtils will handle fallbacks
    return NextResponse.next();
  }
  
  // Handle Admin URLs
  if (url.pathname.startsWith('/admin')) {
    console.log('Admin URL detected');
    
    // If accessing /admin, ensure it goes to the index.html file
    if (url.pathname === '/admin' || url.pathname === '/admin/') {
      url.pathname = '/admin/index.html';
      return NextResponse.rewrite(url);
    }
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/blog/:path*',
    '/admin/:path*',
  ],
};

 