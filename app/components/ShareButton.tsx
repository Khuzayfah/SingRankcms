'use client';

import React from 'react';
import { FiShare2 } from 'react-icons/fi';

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    const shareUrl = window.location.href;
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