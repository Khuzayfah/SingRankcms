'use client';

/**
 * SingRank - Premier SEO Agency in Singapore
 * 
 * Professional website for SingRank, Singapore's leading digital marketing agency.
 * Features elegant animations, interactive charts, diagrams, and a sophisticated
 * red and white color scheme inspired by Singapore's flag.
 * 
 * Sections include:
 * - Hero: Dynamic introduction to SingRank's services
 * - Statistics: SingRank's impressive performance metrics
 * - Services: Comprehensive digital marketing services
 * - Performance: Data visualizations of client results
 * - Case Studies: Successful client projects
 * - Contact: Professional contact section
 */

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { FaSearchPlus, FaChartLine, FaMapMarkerAlt, FaServer, FaRegFileAlt, FaGoogle } from 'react-icons/fa';
import { BsSpeedometer, BsGlobe, BsStars } from 'react-icons/bs';
import { MdOutlineContentPaste, MdOutlineAnalytics, MdKeyboardVoice, MdLocationOn } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { RiRobot2Line } from 'react-icons/ri';
import { SiGoogleanalytics } from 'react-icons/si';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';

// Dynamically import components for performance
const ParticlesContainer = dynamic(() => import('./components/ParticlesContainer'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-white to-luxury-red-50"></div>
});

// Dynamically import charts to improve initial load time
const Charts = dynamic(() => import('./components/Charts'), {
  ssr: false,
  loading: () => <div className="w-full h-80 bg-gray-100 animate-pulse rounded-lg"></div>
});

// Animated component that only renders when in view
const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: any; 
  className?: string; 
  delay?: number 
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6, 
            delay: delay,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Scroll to next section
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
    setHasScrolled(true);
  };

  // Add scroll listener to trigger animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO Performance data for chart
  const seoPerformanceData = [
    { month: 'Jan', organicTraffic: 100, conversions: 10 },
    { month: 'Feb', organicTraffic: 130, conversions: 15 },
    { month: 'Mar', organicTraffic: 170, conversions: 22 },
    { month: 'Apr', organicTraffic: 220, conversions: 28 },
    { month: 'May', organicTraffic: 250, conversions: 32 },
    { month: 'Jun', organicTraffic: 290, conversions: 38 },
  ];

  // Keyword ranking improvements data
  const keywordRankingsData = [
    { keyword: 'SEO Singapore', before: 25, after: 2 },
    { keyword: 'Digital Marketing', before: 45, after: 5 },
    { keyword: 'Content Strategy', before: 30, after: 3 },
    { keyword: 'Technical SEO', before: 50, after: 4 },
    { keyword: 'Local SEO', before: 35, after: 1 },
  ];

  // ROI distribution data
  const roiData = [
    { name: 'SEO', value: 35 },
    { name: 'Content', value: 25 },
    { name: 'Technical', value: 20 },
    { name: 'Local SEO', value: 15 },
    { name: 'AEO', value: 5 },
  ];

  // Singapore colors
  const COLORS = ['#ED2939', '#9B2C2C', '#C53030', '#E53E3E', '#FC8181'];

  // Stats section data
  const stats = [
    { number: "97%", label: "Ranking Improvement" },
    { number: "184%", label: "Average Traffic Growth" },
    { number: "8.3x", label: "Average ROI" }
  ];

  // Services section data
  const services = [
    {
      icon: <FaSearchPlus className="text-3xl text-luxury-red-600" />,
      title: "Search Engine Optimization",
      description: "Comprehensive SEO strategies to boost your online visibility and drive targeted traffic to your website."
    },
    {
      icon: <MdOutlineContentPaste className="text-3xl text-luxury-red-600" />,
      title: "Content Strategy",
      description: "Data-driven content plans that align with search intent and business objectives for maximum impact."
    },
    {
      icon: <BsSpeedometer className="text-3xl text-luxury-red-600" />,
      title: "Technical SEO Audit",
      description: "Thorough website analysis to identify and resolve technical issues affecting search visibility."
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-luxury-red-600" />,
      title: "Local SEO",
      description: "Enhance your business presence on Google Maps and local search results to capture nearby customers."
    },
    {
      icon: <RiRobot2Line className="text-3xl text-luxury-red-600" />,
      title: "AI Answer Optimization",
      description: "Optimize content for AI-powered platforms to ensure your brand is recognized as an authority."
    },
    {
      icon: <FaChartLine className="text-3xl text-luxury-red-600" />,
      title: "Performance Analysis",
      description: "Detailed analytics and reporting to track progress and demonstrate ROI from your digital marketing investments."
    }
  ];

  // Technical SEO services
  const technicalSeoServices = [
    {
      icon: <FaServer className="text-2xl text-luxury-red-600" />,
      title: "Site Architecture",
      description: "Evaluating URL structures, internal linking, and crawl efficiency."
    },
    {
      icon: <BsSpeedometer className="text-2xl text-luxury-red-600" />,
      title: "Core Web Vitals",
      description: "Improving metrics related to loading speed, interactivity, and visual stability."
    },
    {
      icon: <FaRegFileAlt className="text-2xl text-luxury-red-600" />,
      title: "Indexation Issues",
      description: "Addressing crawl errors, duplicate content, and other indexing challenges."
    }
  ];

  // Content Strategy services
  const contentStrategyServices = [
    {
      icon: <MdKeyboardVoice className="text-2xl text-luxury-red-600" />,
      title: "Keyword Research",
      description: "Identifying high-value keywords to target for improved search rankings."
    },
    {
      icon: <BsStars className="text-2xl text-luxury-red-600" />,
      title: "Topic Clusters",
      description: "Organizing content into thematic clusters to enhance topical authority."
    },
    {
      icon: <MdOutlineAnalytics className="text-2xl text-luxury-red-600" />,
      title: "Content Calendar",
      description: "Planning and scheduling content publication to maintain consistency."
    }
  ];

  // Local SEO services
  const localSeoServices = [
    {
      icon: <FaGoogle className="text-2xl text-luxury-red-600" />,
      title: "Google Business Profile",
      description: "Enhancing your business's presence on Google Maps and local search."
    },
    {
      icon: <BsGlobe className="text-2xl text-luxury-red-600" />,
      title: "Local Citations",
      description: "Ensuring consistent business information across online directories."
    },
    {
      icon: <SiGoogleanalytics className="text-2xl text-luxury-red-600" />,
      title: "Review Management",
      description: "Monitoring and responding to customer reviews to build trust."
    }
  ];

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section with ParticleBackground */}
      <section className="relative min-h-screen bg-white">
        <div className="absolute inset-0 z-0">
          <ParticlesContainer />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center">
          <motion.div 
            style={{ opacity, y, scale }}
            className="flex flex-col items-center text-center max-w-5xl mx-auto"
          >
            {/* Singapore Flag Colors Animated Highlight */}
            <div className="absolute -top-20 -right-20 w-40 h-40 opacity-20 hidden md:block">
              <motion.div 
                className="absolute w-full h-full rounded-full bg-luxury-red-600"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            
            {/* SingRank Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6 w-96 h-96 relative"
            >
              <Image
                src="/icons/logo.png"
                alt="SingRank Logo"
                width={384}
                height={384}
                className="object-contain"
                priority
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="luxury-badge mb-6 bg-gradient-to-r from-luxury-red-600 to-luxury-red-700 text-white px-5 py-3 rounded-full text-sm font-semibold relative overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
              <span className="font-bold text-white">#1 SEO Agency Singapore</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/40"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-luxury-red-700 relative"
            >
              <div className="absolute -left-8 -top-8 w-16 h-16 opacity-10 md:opacity-20">
                <motion.div 
                  className="w-full h-full bg-luxury-red-600 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Dominate <span className="text-luxury-red-600">Search</span>
              </motion.span>
              <motion.span 
                className="text-luxury-red-600 relative inline-block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Results
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-luxury-red-500 to-luxury-red-700"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />
              </motion.span>
              <motion.span 
                className="block mt-2 text-3xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                in <span className="text-luxury-red-600 font-bold">Singapore</span>
              </motion.span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl relative"
            >
              <div className="absolute -right-10 -bottom-10 w-20 h-20 opacity-10 hidden md:block">
                <motion.div 
                  className="w-full h-full bg-luxury-red-600 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key="tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  SingRank delivers <span className="text-luxury-red-600 font-bold">97% ranking improvements</span> through data-driven SEO strategies tailored for Singapore businesses.
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/contact" className="btn-primary relative overflow-hidden px-8 py-4 text-lg bg-gradient-to-r from-luxury-red-600 to-luxury-red-700 hover:from-luxury-red-700 hover:to-luxury-red-800 text-white rounded-md transition-all duration-300 inline-block shadow-lg shadow-luxury-red-200">
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeInOut"
                    }}
                  />
                  Get Free SEO Audit
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/services" className="btn-secondary relative overflow-hidden px-8 py-4 text-lg border-2 border-luxury-red-600 text-luxury-red-600 hover:bg-luxury-red-50 rounded-md transition-all duration-300 inline-block shadow-lg shadow-transparent hover:shadow-luxury-red-100">
                  <motion.span
                    className="absolute inset-0 bg-luxury-red-50/30"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeInOut"
                    }}
                  />
                  Explore SEO Services
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Scroll Down Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: hasScrolled ? 0 : 1, 
              y: hasScrolled ? -20 : 0 
            }}
            transition={{ 
              duration: 0.6, 
              delay: 1.5,
            }}
            onClick={handleScrollDown}
          >
            <motion.div
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="flex flex-col items-center"
            >
              <span className="text-sm text-luxury-red-600 mb-2">Scroll to discover</span>
              <div className="w-8 h-14 border-2 border-luxury-red-600 rounded-full flex justify-center items-start p-1">
                <motion.div 
                  className="w-2 h-2 bg-luxury-red-600 rounded-full"
                  animate={{ 
                    y: [0, 24, 0],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-white to-luxury-red-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 opacity-5">
          <motion.div 
            className="absolute w-full h-full rounded-full bg-luxury-red-600"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-96 h-96 opacity-5">
          <motion.div 
            className="absolute w-full h-full rounded-full bg-luxury-red-600"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block text-sm font-bold text-luxury-red-600 uppercase tracking-wider mb-3 px-3 py-1 border border-luxury-red-200 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                ROI-FOCUSED SEO AGENCY
              </motion.span>
              <h2 className="text-4xl font-bold text-center text-luxury-red-700 relative">
                <span className="inline-block relative">
                  Singapore's 
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-luxury-red-100"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </span>
                {' '}
                <span className="text-luxury-red-600">Leading Results</span>
                
                <motion.div 
                  className="absolute -right-14 top-3 hidden lg:block"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                >
                  <svg className="w-12 h-12 text-luxury-red-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" fill="currentColor"/>
                  </svg>
                </motion.div>
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto mt-4">
                Our data-driven approach has delivered exceptional SEO results for businesses across Singapore.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="mb-16 bg-white p-8 rounded-lg border border-luxury-red-100 shadow-xl">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 md:w-1/2 md:pr-8">
                  <h3 className="text-2xl font-bold text-luxury-red-700 mb-4">
                    Expertise-Driven Digital Marketing
                  </h3>
                  <p className="text-gray-700 mb-4">
                    SingRank was founded by experts in <span className="font-semibold text-luxury-red-600">Marketing</span>, <span className="font-semibold text-luxury-red-600">Programming</span>, and <span className="font-semibold text-luxury-red-600">Data Science</span>, bringing together the perfect combination of skills to revolutionize your digital presence.
                  </p>
                  <p className="text-gray-700">
                    We help businesses achieve remarkable growth through digital marketing strategies based on <span className="italic">actual data</span>, not perception or guesswork.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <Image 
                    src="/icons/logo.png" 
                    alt="SingRank Data-Driven Approach" 
                    width={600} 
                    height={400} 
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex flex-col items-center">
                  <motion.h3 
                    className="text-6xl font-bold text-red-700 mb-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    97%
                  </motion.h3>
                  <div className="h-0.5 w-20 bg-red-200 mb-4"></div>
                  <p className="text-gray-600 font-medium text-center">Ranking Improvement</p>
                  <div className="mt-6 text-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                      <path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0z"/>
                      <path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086l-1-1z"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex flex-col items-center">
                  <motion.h3 
                    className="text-6xl font-bold text-red-700 mb-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    184%
                  </motion.h3>
                  <div className="h-0.5 w-20 bg-red-200 mb-4"></div>
                  <p className="text-gray-600 font-medium text-center">Average Traffic Growth</p>
                  <div className="mt-6 text-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                      <path d="M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1Z"/>
                      <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12.31 12.31 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7Zm6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.552 4.552 0 0 1 .23-2.002Zm-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.507 4.507 0 0 1-1.3-1.905Z"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex flex-col items-center">
                  <motion.h3 
                    className="text-6xl font-bold text-red-700 mb-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    8.3x
                  </motion.h3>
                  <div className="h-0.5 w-20 bg-red-200 mb-4"></div>
                  <p className="text-gray-600 font-medium text-center">Average ROI</p>
                  <div className="mt-6 text-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
          
          {/* Mobile Optimized Badge */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-2 bg-luxury-red-50 text-luxury-red-700 rounded-full text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-luxury-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Google Analytics Verified Data
            </span>
          </motion.div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-white relative" id="services">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full overflow-hidden h-40 opacity-10">
          <div className="w-96 h-96 bg-luxury-red-100 rounded-full absolute -top-56 -left-16"/>
        </div>
        <div className="absolute bottom-0 right-0 w-full overflow-hidden h-40 opacity-10">
          <div className="w-96 h-96 bg-luxury-red-100 rounded-full absolute -bottom-56 -right-16"/>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.span 
                className="inline-block text-sm font-bold text-luxury-red-600 uppercase tracking-wider mb-3 px-3 py-1 border border-luxury-red-200 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                SEO Agency Singapore
              </motion.span>
              <h2 className="text-4xl font-bold text-center text-luxury-red-700">
                Comprehensive <span className="text-luxury-red-600">SEO Services</span>
              </h2>
              <p className="text-gray-600 mt-4">
                Our award-winning SEO strategies are designed to increase your online visibility, drive targeted traffic, and maximize conversions.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="h-full">
                <motion.div 
                  className="bg-white p-8 rounded-xl border border-gray-200 h-full flex flex-col hover:border-luxury-red-200 transition-all duration-500 group relative overflow-hidden"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "rgba(237, 41, 57, 0.5)"
                  }}
                >
                  {/* Background gradient effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-luxury-red-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0">
                    <motion.div 
                      className="w-16 h-16"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-r-[60px] border-t-transparent border-r-luxury-red-50 group-hover:border-r-luxury-red-100 transition-colors duration-500"
                      />
                      <div className="absolute top-3 right-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                        {index === 0 ? (
                          <span className="text-xs font-bold text-luxury-red-600">#1</span>
                        ) : index === 1 ? (
                          <span className="text-xs font-bold text-luxury-red-600">#2</span>
                        ) : (
                          <span className="text-xs font-bold text-luxury-red-600">#{index + 1}</span>
                        )}
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="mb-6 p-4 bg-luxury-red-50 rounded-lg inline-block relative z-10 group-hover:bg-luxury-red-100 transition-colors duration-300">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                      className="text-luxury-red-600 group-hover:text-luxury-red-700 transition-colors duration-300"
                    >
                      {service.icon}
                    </motion.div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-luxury-red-700 mb-3 relative z-10 group-hover:text-luxury-red-800 transition-colors duration-300">{service.title}</h3>
                  
                  <p className="text-gray-600 flex-grow relative z-10 group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>
                  
                  <div className="h-0.5 w-16 bg-luxury-red-100 my-4 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-luxury-red-100 group-hover:to-white transition-all duration-500 relative z-10" />
                  
                  <motion.div 
                    className="mt-4 relative z-10"
                    whileHover={{ x: 5 }}
                  >
                    <Link href="/services" className="text-luxury-red-600 font-medium inline-flex items-center group-hover:text-luxury-red-700 transition-colors duration-300">
                      Learn More
                      <motion.svg 
                        className="w-5 h-5 ml-2" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </motion.svg>
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* Service benefits callout */}
          <motion.div 
            className="mt-16 p-8 rounded-xl bg-gradient-to-r from-luxury-red-50 to-white border border-luxury-red-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-xl font-bold text-luxury-red-700 mb-2">Why Choose SingRank as Your SEO Agency?</h3>
                <p className="text-gray-600">Singapore-based experts with proven results and industry-leading strategies.</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-luxury-red-600 text-white rounded-md font-semibold transition-all duration-300 hover:bg-luxury-red-700 shadow-md hover:shadow-lg">
                  <span>Start Your SEO Journey</span>
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Performance Section with Charts */}
      <section className="py-20 bg-gradient-to-r from-luxury-red-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 text-luxury-red-700">
              Performance <span className="text-luxury-red-600">Analytics</span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection>
            <Charts />
          </AnimatedSection>
        </div>
      </section>
      
      {/* NEW SECTION: SEO & AEO Adaptability Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5">
          <svg className="h-full w-full" viewBox="0 0 200 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M190,10 Q-90,400 190,790" stroke="url(#grad1)" strokeWidth="20" fill="none" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ED2939" />
                <stop offset="100%" stopColor="#FF8A80" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <AnimatedSection>
              <motion.span 
                className="inline-block text-sm font-bold text-luxury-red-600 uppercase tracking-wider mb-3 px-3 py-1 border border-luxury-red-200 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Cutting-Edge Digital Adaptation
              </motion.span>
              <h2 className="text-4xl font-bold text-luxury-red-700 mb-6">
                Beyond SEO: <span className="text-luxury-red-600">The AEO Revolution</span>
              </h2>
              <p className="text-gray-600 mb-6">
                In today's rapidly evolving digital landscape, SingRank stands at the forefront of both traditional SEO and the emerging field of Answer Engine Optimization (AEO).
              </p>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="mr-4 p-2 bg-luxury-red-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxury-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-luxury-red-700 mb-1">AI-Powered Content Optimization</h3>
                    <p className="text-gray-600">We craft content that ranks not just on traditional search engines, but also excels in AI-powered answer engines like ChatGPT and Bard.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="mr-4 p-2 bg-luxury-red-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxury-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-luxury-red-700 mb-1">Adaptive Digital Strategy</h3>
                    <p className="text-gray-600">Our strategies evolve with the digital landscape, incorporating the latest AI advancements and digital marketing innovations.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="mr-4 p-2 bg-luxury-red-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-luxury-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-luxury-red-700 mb-1">Future-Proof SEO Solutions</h3>
                    <p className="text-gray-600">SingRank prepares your business for the future, implementing strategies that ensure visibility regardless of how search technology evolves.</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Link href="/services" className="inline-flex items-center px-6 py-3 bg-luxury-red-600 text-white rounded-md font-semibold transition-all duration-300 hover:bg-luxury-red-700 shadow-md hover:shadow-lg">
                  <span>Explore Our Digital Adaptation</span>
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </AnimatedSection>
            
            {/* Right Content - Modern AI Visual */}
            <AnimatedSection delay={0.3}>
              <motion.div 
                className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-luxury-red-100"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-red-50 to-white">
                  {/* Abstract AI Nodes Visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 bg-luxury-red-600 rounded-full"
                          style={{
                            top: `${50 + 35 * Math.sin(i * Math.PI / 3)}%`,
                            left: `${50 + 35 * Math.cos(i * Math.PI / 3)}%`,
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                      
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <React.Fragment key={`line-${i}`}>
                          <motion.div
                            className="absolute top-1/2 left-1/2 w-[1px] bg-luxury-red-200 origin-top"
                            style={{
                              height: '35%',
                              transform: `rotate(${i * 60}deg)`,
                              opacity: 0.7,
                            }}
                          />
                        </React.Fragment>
                      ))}
                      
                      <motion.div
                        className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full bg-gradient-to-br from-luxury-red-500 to-luxury-red-700 flex items-center justify-center text-white"
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(237, 41, 57, 0.7)',
                            '0 0 0 10px rgba(237, 41, 57, 0)',
                            '0 0 0 0 rgba(237, 41, 57, 0)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent">
                    <h3 className="text-xl font-bold text-luxury-red-700">AI & SEO Integration</h3>
                    <p className="text-gray-600">Powering Singapore's businesses with next-generation digital strategies</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Featured Blog Section */}
      <section className="py-20 bg-white relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-luxury-red-50 to-white opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block text-sm font-bold text-luxury-red-600 uppercase tracking-wider mb-3 px-3 py-1 border border-luxury-red-200 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                SEO Insights
              </motion.span>
              <h2 className="text-4xl font-bold text-center text-luxury-red-700">
                Featured <span className="text-luxury-red-600">Articles</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Stay updated with the latest SEO trends, strategies, and insights for Singapore's digital marketing landscape.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Blog Post 1 */}
            <AnimatedSection delay={0.1}>
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-full flex flex-col hover:shadow-xl transition-shadow duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 bg-luxury-red-100">
                  <div className="absolute inset-0 flex items-center justify-center text-luxury-red-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-luxury-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">SEO</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-luxury-red-600 text-sm font-medium mb-2">April 10, 2023</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-luxury-red-600 transition-colors duration-300">
                    How AI is Changing SEO in Singapore
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    Explore how AI and machine learning are transforming SEO strategies for Singapore businesses in 2023 and beyond.
                  </p>
                  <Link href="/blog" className="text-luxury-red-600 font-medium inline-flex items-center mt-auto">
                    Read More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
            
            {/* Featured Blog Post 2 */}
            <AnimatedSection delay={0.2}>
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-full flex flex-col hover:shadow-xl transition-shadow duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 bg-luxury-red-100">
                  <div className="absolute inset-0 flex items-center justify-center text-luxury-red-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-luxury-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">Local SEO</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-luxury-red-600 text-sm font-medium mb-2">March 25, 2023</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-luxury-red-600 transition-colors duration-300">
                    Dominating Local Search in Singapore
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    Practical strategies for Singapore businesses to improve local search visibility and attract nearby customers.
                  </p>
                  <Link href="/blog" className="text-luxury-red-600 font-medium inline-flex items-center mt-auto">
                    Read More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
            
            {/* Featured Blog Post 3 */}
            <AnimatedSection delay={0.3}>
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-full flex flex-col hover:shadow-xl transition-shadow duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 bg-luxury-red-100">
                  <div className="absolute inset-0 flex items-center justify-center text-luxury-red-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-luxury-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">AEO</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-luxury-red-600 text-sm font-medium mb-2">April 2, 2023</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-luxury-red-600 transition-colors duration-300">
                    Answer Engine Optimization: Beyond Traditional SEO
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    How to optimize your content for AI-powered answer engines and voice search in Singapore's market.
                  </p>
                  <Link href="/blog" className="text-luxury-red-600 font-medium inline-flex items-center mt-auto">
                    Read More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/blog" className="inline-flex items-center px-6 py-3 border-2 border-luxury-red-600 text-luxury-red-600 rounded-md font-semibold hover:bg-luxury-red-50 transition-all duration-300">
              <span>View All Articles</span>
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Technical SEO Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center mb-4 text-luxury-red-700">
              Technical SEO <span className="text-luxury-red-600">Excellence</span>
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
              Our comprehensive technical SEO services ensure your website meets the highest standards for search engines.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technicalSeoServices.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div 
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-luxury-red-200 transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                >
                  <div className="flex items-start mb-4">
                    <div className="mr-4 p-2 bg-luxury-red-50 rounded-lg">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-luxury-red-700 mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-red-700 to-luxury-red-900 z-0" />
        
        {/* Decorative background patterns */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div 
            className="absolute top-10 right-10 w-64 h-64 bg-luxury-red-800 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-10 left-10 w-80 h-80 bg-luxury-red-800 rounded-full opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [30, 0, 30],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-5"
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Decorative lines */}
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.path 
              d="M0,50 L100,50" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
            <motion.path 
              d="M50,0 L50,100" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div 
                className="w-20 h-20 mx-auto mb-8 relative"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1
                }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-full bg-white/10"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="absolute inset-3 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Ready to <span className="relative inline-block">
                  Dominate
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-1 bg-white"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span> Google Rankings in Singapore?
              </motion.h2>
              
              <motion.p 
                className="text-white/90 mb-10 text-lg md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Join Singapore's leading businesses that have achieved <span className="font-bold">97% ranking improvements</span> and <span className="font-bold">184% traffic growth</span> with our proven SEO strategies.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <motion.span
                    className="absolute -inset-1 rounded-lg bg-white/20 blur-md"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <Link href="/contact" className="relative inline-block px-8 py-4 bg-white text-luxury-red-700 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                    Get Free SEO Analysis
                    <motion.span
                      className="absolute top-0 right-0 -mt-2 -mr-2 w-4 h-4 bg-luxury-red-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/services" className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300">
                    Explore SEO Services
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
} 