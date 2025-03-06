'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect dengan cepat ke halaman admin statis
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
      <h1>SingRank CMS</h1>
      <p>Mengalihkan ke panel admin...</p>
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