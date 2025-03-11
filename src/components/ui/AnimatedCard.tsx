'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'error';
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'rounded' | 'wavy';
  onClick?: () => void;
  hoverEffect?: boolean;
  className?: string;
  wiggle?: boolean;
  float?: boolean;
  badge?: string | number;
}

/**
 * AnimatedCard component that provides an animated, interactive card
 * with various visual effects for a kid-friendly UI
 */
const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  title,
  icon,
  color = 'primary',
  borderStyle = 'solid',
  onClick,
  hoverEffect = true,
  className = '',
  wiggle = false,
  float = false,
  badge,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map of colors to Tailwind classes
  const colorMap = {
    primary: {
      bg: 'bg-primary-50',
      border: 'border-primary-300',
      text: 'text-primary-700',
      shadow: 'shadow-primary-100',
      badgeBg: 'bg-primary-500',
    },
    secondary: {
      bg: 'bg-secondary-50',
      border: 'border-secondary-300',
      text: 'text-secondary-700',
      shadow: 'shadow-secondary-100',
      badgeBg: 'bg-secondary-500',
    },
    accent: {
      bg: 'bg-accent-50',
      border: 'border-accent-300',
      text: 'text-accent-700',
      shadow: 'shadow-accent-100',
      badgeBg: 'bg-accent-500',
    },
    success: {
      bg: 'bg-success-50',
      border: 'border-success-300',
      text: 'text-success-700',
      shadow: 'shadow-success-100',
      badgeBg: 'bg-success-500',
    },
    error: {
      bg: 'bg-error-50',
      border: 'border-error-300',
      text: 'text-error-700',
      shadow: 'shadow-error-100',
      badgeBg: 'bg-error-500',
    },
  };
  
  // Map of border styles to CSS classes
  const borderStyleMap = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    rounded: 'rounded-3xl',
    wavy: 'border-2 border-dotted border-opacity-50',
  };

  // Animation variants
  const animationVariants = {
    wiggle: wiggle ? {
      rotate: [0, 1, 0, -1, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }
      }
    } : {},
    float: float ? {
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }
      }
    } : {},
    hover: hoverEffect ? {
      scale: isHovered ? 1.03 : 1,
      y: isHovered ? -5 : 0,
      boxShadow: isHovered 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    } : {},
  };
  
  return (
    <motion.div
      className={`
        ${colorMap[color].bg}
        border-2 ${colorMap[color].border} ${borderStyleMap[borderStyle]}
        rounded-2xl overflow-hidden
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        ...animationVariants.wiggle,
        ...animationVariants.float,
        ...animationVariants.hover,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
    >
      {/* Card header with title and icon */}
      {(title || icon) && (
        <div className={`flex items-center gap-2 px-5 py-3 ${colorMap[color].text} font-cartoon font-bold`}>
          {icon && <div className="text-xl">{icon}</div>}
          {title && <h3 className="text-lg">{title}</h3>}
        </div>
      )}
      
      {/* Card content */}
      <div className="p-5">
        {children}
      </div>
      
      {/* Badge (if provided) */}
      {badge && (
        <div className="absolute -top-2 -right-2">
          <div className={`
            ${colorMap[color].badgeBg} text-white
            w-6 h-6 rounded-full
            flex items-center justify-center
            text-xs font-bold
            shadow-md
          `}>
            {badge}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedCard;