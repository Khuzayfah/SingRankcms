import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// This page is just a redirect to the Netlify CMS admin page
export default function Admin() {
  const router = useRouter();
  
  useEffect(() => {
    // Use window.location for a full page reload to ensure static files are served correctly
    window.location.href = '/admin/index.html';
  }, []);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      flexDirection: 'column',
      background: '#7857FF',
      color: 'white',
    }}>
      <Head>
        <title>SingRank CMS - Admin</title>
      </Head>
      <h1>SingRank CMS</h1>
      <p>Redirecting to admin panel...</p>
      <div style={{ marginTop: '20px' }}>
        <div style={{ 
          display: 'inline-block', 
          borderRadius: '50%', 
          borderTop: '3px solid #fff',
          borderRight: '3px solid transparent',
          width: '20px', 
          height: '20px',
          animation: 'spin 1s linear infinite',
        }}></div>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 