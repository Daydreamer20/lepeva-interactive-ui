'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedCharacterProps {
  character: 'teacher' | 'student' | 'panda' | 'penguin' | 'fox';
  size?: 'sm' | 'md' | 'lg';
  animation?: 'idle' | 'happy' | 'thinking' | 'confused' | 'celebrating';
  speech?: string;
  className?: string;
}

/**
 * AnimatedCharacter component that displays animated cartoon characters with various expressions
 */
const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  character,
  size = 'md',
  animation = 'idle',
  speech,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map size to pixel dimensions
  const sizeMap = {
    sm: 80,
    md: 150,
    lg: 250,
  };
  
  // Character placeholder images
  const characterImages = {
    teacher: 'https://via.placeholder.com/300/5271FF/FFFFFF?text=Teacher',
    student: 'https://via.placeholder.com/300/FF9900/FFFFFF?text=Student',
    panda: 'https://via.placeholder.com/300/FFFFFF/000000?text=Panda',
    penguin: 'https://via.placeholder.com/300/000066/FFFFFF?text=Penguin',
    fox: 'https://via.placeholder.com/300/FF6633/FFFFFF?text=Fox',
  };
  
  // Animation variants based on the selected animation type
  const animationVariants = {
    idle: {
      y: [0, -5, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }
      }
    },
    happy: {
      rotate: [-3, 3, -3],
      y: [0, -8, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 0.5,
          ease: "easeInOut",
        },
        y: {
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut",
        }
      }
    },
    thinking: {
      rotate: [0, 2, 0],
      y: [0, -2, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
        y: {
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }
      }
    },
    confused: {
      rotate: [-5, 5, -5],
      x: [-3, 3, -3],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        },
        x: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
        }
      }
    },
    celebrating: {
      y: [0, -15, 0],
      rotate: [-5, 5, -5],
      scale: [1, 1.05, 1],
      transition: {
        y: {
          repeat: Infinity,
          duration: 0.5,
          ease: "easeInOut",
        },
        rotate: {
          repeat: Infinity,
          duration: 0.5,
          ease: "easeInOut", 
        },
        scale: {
          repeat: Infinity,
          duration: 0.5,
          ease: "easeInOut",
        }
      }
    }
  };
  
  // Speech bubble animation
  const speechBubbleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 10,
      transition: { 
        duration: 0.2 
      } 
    }
  };
  
  const pixelSize = sizeMap[size];
  
  return (
    <div 
      className={`relative flex flex-col items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Speech bubble - shown when provided or on hover */}
      {(speech || isHovered) && (
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-3 shadow-md z-10"
          style={{
            width: pixelSize * 1.2,
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={speechBubbleVariants}
        >
          <div className="text-center font-cartoon text-slate-700">
            {speech || "Hi there! 👋"}
          </div>
          {/* Triangle pointer */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white"
          />
        </motion.div>
      )}
      
      {/* Character image with animation */}
      <motion.div
        className="relative"
        style={{
          width: pixelSize,
          height: pixelSize,
        }}
        animate={animationVariants[animation]}
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={characterImages[character]}
          alt={`${character} character`}
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedCharacter;