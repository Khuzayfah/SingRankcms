'use client';

/**
 * Professional Button Component with SGDS Color Palette
 * 
 * An elegant button component designed with Singapore Government Design System colors.
 * 
 * Features:
 * - Three variants: primary (purple gradient), secondary (dark with blue accents), and outline (purple border)
 * - Three sizes: small, medium, and large with consistent proportions
 * - Loading state with animated spinner
 * - Optional icon support with proper positioning
 * - Luxury animation effects including scale, glow, and subtle movement
 * - Full width option for layout flexibility
 * - Built with Framer Motion for smooth, elegant animations
 * - Shimmer effect on hover for primary variant
 * 
 * Usage example:
 * <Button 
 *   variant="primary" 
 *   size="md" 
 *   icon={<span>👑</span>}
 *   luxuryAnimation={true}
 *   onClick={() => handleAction()}
 * >
 *   Action
 * </Button>
 */

import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps {
  children?: any;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: any;
  fullWidth?: boolean;
  isLoading?: boolean;
  luxuryAnimation?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any; // Allow other HTML button props
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  isLoading = false,
  luxuryAnimation = false,
  className = '',
  ...props
}: ButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#7857FF] to-[#2E93FF] text-white',
    secondary: 'bg-gray-900 text-white border border-[#1F69FF]/30 hover:border-[#1F69FF]/60',
    outline: 'bg-transparent border-2 border-[#7857FF] text-[#7857FF] hover:bg-[#7857FF]/10',
  };

  // Width class
  const widthClass = fullWidth ? 'w-full' : '';

  // Shadow class based on variant
  const shadowClass = variant === 'primary' ? 'shadow-lg shadow-indigo-500/20' : '';

  // Animation class
  const animationClass = luxuryAnimation ? 'relative overflow-hidden' : '';

  const baseClass = `
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${widthClass} 
    ${shadowClass}
    ${animationClass}
    rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 
    transition-all duration-300 ease-out flex items-center justify-center ${className || ''}
  `;

  // Filter out any props that might cause issues with Framer Motion's types
  const safeProps = { ...props };
  
  // Remove any Framer Motion specific props to avoid type conflicts
  delete safeProps.onDrag;
  delete safeProps.onDragStart;
  delete safeProps.onDragEnd;
  delete safeProps.whileHover;
  delete safeProps.whileTap;
  delete safeProps.transition;
  
  return (
    <motion.button
      whileHover={{ 
        scale: luxuryAnimation ? 1.05 : 1.02, 
        boxShadow: luxuryAnimation ? '0 0 20px rgba(120, 87, 255, 0.4)' : 'none',
        y: luxuryAnimation ? -3 : -1
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={baseClass}
      disabled={isLoading || props.disabled}
      {...safeProps}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1F69FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2.5 text-[#1F69FF]">{icon}</span>
      ) : null}
      {children}
      
      {/* Additional decorative elements for primary variant */}
      {variant === 'primary' && luxuryAnimation && (
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute inset-0 z-10 bg-gradient-to-r from-[#7857FF]/0 via-[#7857FF]/30 to-[#7857FF]/0 transform -translate-x-full animate-shimmer"></span>
        </span>
      )}
    </motion.button>
  );
} 