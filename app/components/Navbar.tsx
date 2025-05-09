'use client';

/**
 * Compact Professional Navbar - Refined Theme
 * 
 * A sophisticated and compact navigation bar with elegant styling.
 * Features subtle animations, clear readability, and professional appearance.
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiServer, 
  FiInfo, 
  FiFileText, 
  FiMail, 
  FiMenu, 
  FiX 
} from 'react-icons/fi';

// Logo letter animation variants - simplified for better performance
const letterVariants = {
  initial: { opacity: 0, y: -10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: "easeOut"
    }
  }),
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

// Tagline animation variants
const taglineVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { delay: 0.3, duration: 0.4 }
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Only add the event listener client-side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Simplified nav links with elegant icons
  const navLinks = [
    { title: 'Home', href: '/', icon: <FiHome className="w-4 h-4" /> },
    { title: 'Services', href: '/services', icon: <FiServer className="w-4 h-4" /> },
    { title: 'About', href: '/about', icon: <FiInfo className="w-4 h-4" /> },
    { title: 'Blog', href: '/blog', icon: <FiFileText className="w-4 h-4" /> },
    { title: 'Contact', href: '/contact', icon: <FiMail className="w-4 h-4" /> }
  ];

  // Check if link is active
  const isActive = (path: string) => pathname === path;

  // Logo text for animation
  const singText = "SING".split("");
  const rankText = "RANK".split("");

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isOpen 
        ? 'bg-white shadow-sm py-2' 
        : 'bg-white/95 py-2'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo with Animation - More Compact */}
          <Link href="/">
            <motion.div
              className="flex items-center"
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mr-2"
              >
                <Image 
                  src="/icons/logo.png" 
                  alt="SingRank Logo" 
                  width={28} 
                  height={28} 
                  className="h-7 w-7"
                />
              </motion.div>
              
              <div className="flex items-baseline">
                <div className="flex">
                  {singText.map((letter, index) => (
                    <motion.span
                      key={`sing-${index}`}
                      className="text-lg font-bold tracking-wide text-gray-800"
                      variants={letterVariants}
                      custom={index}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                <div className="flex">
                  {rankText.map((letter, index) => (
                    <motion.span
                      key={`rank-${index}`}
                      className="text-lg font-bold tracking-wide text-[#d13239]"
                      variants={letterVariants}
                      custom={index + 4}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1
                  }}
                  className="ml-0.5 w-1.5 h-1.5 bg-[#d13239] rounded-full"
                ></motion.span>
              </div>
              <motion.p
                variants={taglineVariants}
                className="text-xs tracking-wide text-gray-500 ml-2"
              >
                Digital Excellence
              </motion.p>
            </motion.div>
          </Link>

          {/* Desktop Navigation - More Compact and Professional */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                      isActive(link.href) 
                        ? 'text-[#d13239] bg-red-50' 
                        : 'text-gray-700 hover:text-[#d13239] hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-1.5">{link.icon}</span>
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#d13239] hover:bg-gray-100 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                      isActive(link.href) 
                        ? 'text-[#d13239] bg-red-50' 
                        : 'text-gray-700 hover:text-[#d13239] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 