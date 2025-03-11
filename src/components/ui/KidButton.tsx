'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface KidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  sound?: 'pop' | 'click' | 'bounce' | 'tada' | 'none';
  disabled?: boolean;
  rounded?: boolean;
  className?: string;
  withConfetti?: boolean;
}

/**
 * KidButton component that provides an interactive, animated button with sound effects
 * for a kid-friendly UI experience
 */
const KidButton: React.FC<KidButtonProps> = ({
  children,
  onClick,
  color = 'primary',
  size = 'md',
  icon,
  sound = 'pop',
  disabled = false,
  rounded = false,
  className = '',
  withConfetti = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Map of colors to Tailwind classes
  const colorMap = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white',
    success: 'bg-success-500 hover:bg-success-600 text-white',
    error: 'bg-error-500 hover:bg-error-600 text-white',
  };
  
  // Map of sizes to Tailwind classes
  const sizeMap = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8',
  };
  
  // Play sound effect
  const playSound = () => {
    if (sound === 'none' || disabled) return;
    
    // In a real implementation, we would use actual sound files
    console.log(`Playing ${sound} sound`);
    
    // Simulate sound playback (in a real app, use HTML5 Audio or a library)
    // const audio = new Audio(`/sounds/${sound}.mp3`);
    // audio.play();
  };
  
  const handleClick = () => {
    if (disabled) return;
    
    playSound();
    setIsPressed(true);
    
    if (withConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    if (onClick) {
      onClick();
    }
    
    // Reset pressed state after animation
    setTimeout(() => setIsPressed(false), 150);
  };
  
  return (
    <div className="relative">
      {/* Confetti effect (simplified - would use react-confetti in real implementation) */}
      {showConfetti && withConfetti && (
        <div className="absolute -top-20 left-0 right-0 h-20 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FF5E5B', '#39B54A', '#FFDE59', '#4D9DE0', '#E15CD5'][
                  Math.floor(Math.random() * 5)
                ],
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: [-20, Math.random() * -100 - 20],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [1, 0],
                rotate: [0, Math.random() * 360],
              }}
              transition={{ duration: 1 + Math.random() * 2 }}
            />
          ))}
        </div>
      )}
      
      <motion.button
        className={`
          font-cartoon font-bold relative
          ${colorMap[color]}
          ${sizeMap[size]}
          ${rounded ? 'rounded-full' : 'rounded-xl'}
          shadow-kid
          flex items-center justify-center gap-2
          transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={!disabled ? { 
          scale: 0.95,
          y: 4,
          boxShadow: "0 0px 0 rgba(0, 0, 0, 0.1)" 
        } : {}}
        animate={isPressed ? { 
          scale: 0.95,
          y: 4,
          boxShadow: "0 0px 0 rgba(0, 0, 0, 0.1)"
        } : {
          scale: 1,
          y: 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 15 
        }}
        onClick={handleClick}
        disabled={disabled}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </motion.button>
    </div>
  );
};

export default KidButton;