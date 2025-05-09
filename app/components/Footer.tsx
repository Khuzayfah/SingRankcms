/**
 * Compact Professional Footer
 * 
 * A refined, elegant footer with improved readability and professional appearance.
 * Features a clean layout, subtle animations, and optimized for both mobile and desktop.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiMail, 
  FiPhone, 
  FiGlobe,
  FiInstagram, 
  FiTwitter, 
  FiFacebook, 
  FiLinkedin 
} from 'react-icons/fi';

// Simplified animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

// Simplified footer navigation
const footerLinks = {
  services: [
    { name: 'SEO', href: '/services' },
    { name: 'Content Strategy', href: '/services/content' },
    { name: 'Technical SEO', href: '/services/technical' },
    { name: 'Local SEO', href: '/services/local' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  social: [
    {
      name: 'Instagram',
      href: '#',
      icon: <FiInstagram />
    },
    {
      name: 'Twitter',
      href: '#',
      icon: <FiTwitter />
    },
    {
      name: 'Facebook',
      href: '#',
      icon: <FiFacebook />
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: <FiLinkedin />
    },
  ],
};

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');
  
  // Use useEffect to set the date only on the client side
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Horizontal layout for all sections */}
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 gap-8 md:gap-0">
          {/* Company Info */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="md:w-1/3"
          >
            <div className="flex items-center">
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-gray-800">SING</span>
                <span className="text-lg font-bold text-[#d13239]">RANK</span>
                <span className="ml-0.5 w-1.5 h-1.5 bg-[#d13239] rounded-full"></span>
              </div>
              <div className="ml-2 relative w-5 h-5">
                <Image 
                  src="/icons/logo.png" 
                  alt="SingRank Logo" 
                  width={20} 
                  height={20}
                  className="object-contain"
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-600 max-w-xs mt-4">
              Helping businesses achieve digital excellence through strategic SEO and content optimization.
            </p>
            
            <ul className="space-y-2 text-sm mt-4">
              <li className="flex items-start">
                <FiMapPin className="mt-0.5 mr-2 text-[#d13239]" />
                <span className="text-gray-600">61 Ubi Rd 1, #03-16 Oxley Bizhub, Singapore 408727</span>
              </li>
              <li className="flex items-start">
                <FiMail className="mt-0.5 mr-2 text-[#d13239]" />
                <a href="mailto:info@singrank.com" className="text-gray-600 hover:text-[#d13239] transition-colors">
                  info@singrank.com
                </a>
              </li>
              <li className="flex items-start">
                <FiPhone className="mt-0.5 mr-2 text-[#d13239]" />
                <a href="tel:+65666999" className="text-gray-600 hover:text-[#d13239] transition-colors">
                  +65 666 999
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Quick Links Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="md:w-2/3 flex flex-wrap"
          >
            <div className="flex flex-wrap w-full">
              {/* Services */}
              <div className="w-1/2 md:w-1/3 mb-6">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Services</h3>
                <ul className="mt-4 space-y-2">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-[#d13239] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Company */}
              <div className="w-1/2 md:w-1/3 mb-6">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Company</h3>
                <ul className="mt-4 space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-[#d13239] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Legal and Social */}
              <div className="w-full md:w-1/3 mb-6">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Legal</h3>
                <ul className="mt-4 space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-[#d13239] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                {/* Social Links */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Connect</h3>
                  <div className="flex space-x-3">
                    {footerLinks.social.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-500 hover:text-[#d13239] transition-colors p-2 rounded-full hover:bg-gray-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">{item.name}</span>
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Large Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="w-64 h-64 relative">
            <Image
              src="/icons/logo.png"
              alt="SingRank Logo"
              width={256}
              height={256}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center">
            <div className="relative w-4 h-4 mr-2">
              <Image 
                src="/icons/logo.png" 
                alt="SingRank Logo" 
                width={16} 
                height={16}
                className="object-contain"
              />
            </div>
            <p className="text-xs text-gray-500">
              © {currentYear} SingRank. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center mt-2 sm:mt-0">
            <FiGlobe className="h-3 w-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">Singapore</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 