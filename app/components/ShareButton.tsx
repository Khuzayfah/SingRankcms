'use client';

import React from 'react';
import { FiShare2 } from 'react-icons/fi';

interface ShareButtonProps {
  title: string;
  url?: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const handleShare = () => {
    // Get the current URL if not provided
    const shareUrl = url || window.location.href;
    
    // Open Twitter share dialog
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      '_blank'
    );
  };

  return (
    <button 
      onClick={handleShare}
      className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-700 transition-colors"
      aria-label="Share on Twitter"
    >
      <FiShare2 size={18} />
    </button>
  );
} 