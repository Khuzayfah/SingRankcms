'use client';

import React, { useCallback, memo, useState, useEffect } from 'react';
import { loadSlim } from "tsparticles-slim";
import dynamic from 'next/dynamic';

// Dynamically import Particles component with no SSR to reduce bundle size
const Particles = dynamic(() => import("react-tsparticles"), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-white to-luxury-red-50 opacity-50" />
  )
});

/**
 * ParticlesContainer Component
 * 
 * A background component with animated particles using red and white colors
 * Creates an elegant, professional effect with particles that move and connect
 * 
 * Optimized for better performance:
 * - Reduced FPS limit
 * - Reduced particle count
 * - Simplified particle shapes
 * - Disabled collisions when on mobile
 * - No SSR rendering to reduce bundle size
 * - Uses requestIdleCallback for initialization
 */
const ParticlesContainer = () => {
  // Prevent hydration mismatch by only rendering on client
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Detect if on mobile for performance optimizations
  const [isMobile, setIsMobile] = useState(false);
  
  // Initialize component only when visible and on client
  useEffect(() => {
    // Use requestIdleCallback for non-critical initialization
    if (typeof window !== 'undefined') {
      const requestIdleCallback = 
        window.requestIdleCallback || 
        ((cb) => setTimeout(cb, 1));
      
      requestIdleCallback(() => {
        setIsClient(true);
        setIsMobile(window.innerWidth < 768);

        // Add resize detection with throttling
        let resizeTimer: NodeJS.Timeout;
        const handleResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            setIsMobile(window.innerWidth < 768);
          }, 250); // Throttle resize event
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      });
    }
  }, []);

  // Initialize particles engine only when component is visible
  const particlesInit = useCallback(async (engine: any) => {
    // Wait until browser is idle to initialize
    if (typeof window !== 'undefined' && !isInitialized) {
      setIsInitialized(true);
      await loadSlim(engine);
    }
  }, [isInitialized]);

  // Only render on client to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-white to-luxury-red-50 opacity-50" />
    );
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        fpsLimit: isMobile ? 30 : 40, // Reduce FPS to improve performance
        particles: {
          color: {
            value: "#d13239",
          },
          links: {
            color: "#d13239",
            distance: 150,
            enable: true,
            opacity: 0.25, // Reduce opacity for better performance
            width: isMobile ? 0.5 : 1, // Thinner lines for better performance
          },
          collisions: {
            enable: false, // Disable collisions for better performance
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: isMobile ? 0.8 : 1, // Slower particles on mobile
            straight: false,
          },
          number: {
            density: {
              enable: true, 
              area: 1000, // Larger area = fewer particles
            },
            value: isMobile ? 30 : 50, // Significantly reduce particle count
          },
          opacity: {
            value: 0.5, // Reduced opacity
          },
          shape: {
            type: "circle", // Simpler shape for better performance
          },
          size: {
            value: { min: 1, max: isMobile ? 2 : 3 }, // Smaller particles
          },
        },
        detectRetina: false, // Disable retina detection for performance
        background: {
          color: {
            value: "#ffffff",
          },
        },
      }}
      className="absolute inset-0 z-0"
    />
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(ParticlesContainer); 