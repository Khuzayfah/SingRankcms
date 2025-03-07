'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error to help diagnose issues
  console.error('Blog post error occurred:', error);

  return (
    <div className="min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8 flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <p className="text-base font-semibold text-[#d13239]">Error</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Blog Post Error
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          We're sorry, but we encountered an error while trying to load this blog post. 
          This might be due to content availability or temporary server issues.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-md bg-[#d13239] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#a61b22] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d13239] flex items-center"
          >
            <FiRefreshCw className="mr-2" />
            Try Again
          </button>
          <Link
            href="/blog"
            className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
} 