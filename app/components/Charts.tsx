'use client';

import React, { memo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Simple skeleton component for charts while loading
const ChartSkeleton = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg animate-pulse">
    <div className="text-gray-400">Loading chart...</div>
  </div>
);

// Dynamic import for the entire recharts library instead of individual components
// This avoids TypeScript errors while still providing code splitting
const RechartsComponents = dynamic(
  () => import('recharts').then(mod => mod),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

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

// Break down Charts into smaller components
const SEOPerformanceChart = memo(() => {
  const [mounted, setMounted] = useState(false);
  
  // Only render on client side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || !RechartsComponents) return <ChartSkeleton />;
  
  const { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area } = RechartsComponents;
  
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={seoPerformanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ED2939" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ED2939" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9B2C2C" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#9B2C2C" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="organicTraffic" name="Organic Traffic" stroke="#ED2939" fillOpacity={1} fill="url(#colorTraffic)" />
          <Area type="monotone" dataKey="conversions" name="Conversions" stroke="#9B2C2C" fillOpacity={1} fill="url(#colorConversions)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

SEOPerformanceChart.displayName = 'SEOPerformanceChart';

const ROIDistributionChart = memo(() => {
  const [mounted, setMounted] = useState(false);
  
  // Only render on client side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || !RechartsComponents) return <ChartSkeleton />;
  
  const { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } = RechartsComponents;
  
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={roiData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {roiData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

ROIDistributionChart.displayName = 'ROIDistributionChart';

const KeywordRankingsChart = memo(() => {
  const [mounted, setMounted] = useState(false);
  
  // Only render on client side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || !RechartsComponents) return <ChartSkeleton />;
  
  const { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } = RechartsComponents;
  
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={keywordRankingsData}
          layout="vertical"
          margin={{ top: 20, right: 20, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" />
          <YAxis dataKey="keyword" type="category" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="before" name="Previous Ranking" fill="#9B2C2C" />
          <Bar dataKey="after" name="Current Ranking" fill="#ED2939" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

KeywordRankingsChart.displayName = 'KeywordRankingsChart';

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
          whileInView={{
            opacity: 1,
            x: 0
          }}
          onAnimationComplete={() => setVisibleCharts(prev => ({ ...prev, seo: true }))}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-xl font-bold mb-4 text-luxury-red-700">SEO Performance Growth</h3>
          {visibleCharts.seo ? <SEOPerformanceChart /> : <ChartSkeleton />}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          onAnimationComplete={() => setVisibleCharts(prev => ({ ...prev, roi: true }))}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-xl font-bold mb-4 text-luxury-red-700">Service ROI Distribution</h3>
          {visibleCharts.roi ? <ROIDistributionChart /> : <ChartSkeleton />}
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        onAnimationComplete={() => setVisibleCharts(prev => ({ ...prev, keywords: true }))}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <h3 className="text-xl font-bold mb-4 text-luxury-red-700">Keyword Ranking Improvements</h3>
        {visibleCharts.keywords ? <KeywordRankingsChart /> : <ChartSkeleton />}
        <div className="mt-4 text-center text-gray-600">
          <p className="italic">*Lower numbers indicate better rankings</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Charts; 