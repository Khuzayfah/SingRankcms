import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blogUtils';

export function useLatestBlogPosts(count: number = 3) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using the Next.js API route to fetch blog posts
        const response = await fetch('/api/blog/posts?limit=' + count, {
          // Bypass cache to always get fresh data
          cache: 'no-store',
          next: { revalidate: 0 }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          console.error('Blog posts API returned non-array data:', data);
          throw new Error('Invalid data format received from API');
        }
        
        setPosts(data);
      } catch (err) {
        console.error('Error fetching latest blog posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
        // Set empty array to avoid undefined posts
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [count]);

  return { posts, loading, error };
} 