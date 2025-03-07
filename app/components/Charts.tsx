'use client';

import React, { memo, useState, useEffect, lazy } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Simple skeleton component for charts while loading
const ChartSkeleton = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg animate-pulse">
    <div className="text-gray-400">Loading chart...</div>
  </div>
);

// Dynamic import for specific chart types to avoid TypeScript errors
const DynamicAreaChart = dynamic(() => import('./charts/AreaChart'), { 
  ssr: false, 
  loading: () => <ChartSkeleton /> 
});

const DynamicPieChart = dynamic(() => import('./charts/PieChart'), { 
  ssr: false, 
  loading: () => <ChartSkeleton /> 
});

const DynamicBarChart = dynamic(() => import('./charts/BarChart'), { 
  ssr: false, 
  loading: () => <ChartSkeleton /> 
});

// Static data that doesn't change - moved outside component
const seoPerformanceData = [
  { month: 'Jan', organicTraffic: 100, conversions: 10 },
  { month: 'Feb', organicTraffic: 130, conversions: 15 },
  { month: 'Mar', organicTraffic: 170, conversions: 22 },
  { month: 'Apr', organicTraffic: 220, conversions: 28 },
  { month: 'May', organicTraffic: 250, conversions: 32 },
  { month: 'Jun', organicTraffic: 290, conversions: 38 },
];

const keywordRankingsData = [
  { keyword: 'SEO Singapore', before: 25, after: 2 },
  { keyword: 'Digital Marketing', before: 45, after: 5 },
  { keyword: 'Content Strategy', before: 30, after: 3 },
  { keyword: 'Technical SEO', before: 50, after: 4 },
  { keyword: 'Local SEO', before: 35, after: 1 },
];

const roiData = [
  { name: 'SEO', value: 35 },
  { name: 'Content', value: 25 },
  { name: 'Technical', value: 20 },
  { name: 'Local SEO', value: 15 },
  { name: 'AEO', value: 5 },
];

// Singapore colors
const COLORS = ['#ED2939', '#9B2C2C', '#C53030', '#E53E3E', '#FC8181'];

/**
 * Charts Component - Optimized for performance
 * 
 * Features:
 * - Code-split chart components for better loading
 * - Lazy loaded charts render only when needed
 * - Memoized components to prevent unnecessary re-renders
 * - Reduced bundle size by importing only needed components
 * - Client-side only rendering for better hydration
 */
const Charts = () => {
  const [visibleCharts, setVisibleCharts] = useState({
    seo: false,
    roi: false,
    keywords: false
  });
  
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          onAnimationComplete={() => setVisibleCharts(prev => ({ ...prev, seo: true }))}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-xl font-bold mb-4 text-luxury-red-700">SEO Performance Growth</h3>
          {visibleCharts.seo ? (
            <DynamicAreaChart data={seoPerformanceData} />
          ) : (
            <ChartSkeleton />
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          onAnimationComplete={() => setVisibleCharts(prev => ({ ...prev, roi: true }))}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-xl font-bold mb-4 text-luxury-red-700">Service ROI Distribution</h3>
          {visibleCharts.roi ? (
            <DynamicPieChart data={roiData} colors={COLORS} />
          ) : (
            <ChartSkeleton />
          )}
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        onAnimationComplete={() => setVisibleCharts(prev => ({ ...prev, keywords: true }))}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <h3 className="text-xl font-bold mb-4 text-luxury-red-700">Keyword Ranking Improvements</h3>
        {visibleCharts.keywords ? (
          <DynamicBarChart data={keywordRankingsData} />
        ) : (
          <ChartSkeleton />
        )}
        <div className="mt-4 text-center text-gray-600">
          <p className="italic">*Lower numbers indicate better rankings</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Charts; 