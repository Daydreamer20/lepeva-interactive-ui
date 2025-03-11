'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KidButton from './KidButton';

interface Folder {
  id: string;
  name: string;
  parentId: string;
  createdAt: string;
}

interface FolderNavigationProps {
  currentFolder: string;
  folderPath: Folder[];
  onNavigate: (folderId: string) => void;
  onHome: () => void;
  onBack: () => void;
  theme?: 'default' | 'jungle' | 'space' | 'ocean';
  animated?: boolean;
  className?: string;
}

/**
 * Kid-friendly folder navigation component with animated
 * breadcrumbs and themed visuals
 */
const FolderNavigation: React.FC<FolderNavigationProps> = ({
  currentFolder,
  folderPath,
  onNavigate,
  onHome,
  onBack,
  theme = 'default',
  animated = true,
  className = '',
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Theme configuration
  const themeConfig = {
    default: {
      homeIcon: '🏠',
      backIcon: '⬅️',
      separator: '📂',
      folderIcon: '📁',
      activeFolder: '📂',
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-700',
      hoverClass: 'hover:bg-blue-100',
    },
    jungle: {
      homeIcon: '🌴',
      backIcon: '🦁',
      separator: '🌿',
      folderIcon: '🍃',
      activeFolder: '🌿',
      bgClass: 'bg-green-50',
      textClass: 'text-green-700',
      hoverClass: 'hover:bg-green-100',
    },
    space: {
      homeIcon: '🚀',
      backIcon: '👽',
      separator: '🌠',
      folderIcon: '🌟',
      activeFolder: '🌠',
      bgClass: 'bg-indigo-50',
      textClass: 'text-indigo-700',
      hoverClass: 'hover:bg-indigo-100',
    },
    ocean: {
      homeIcon: '🏝️',
      backIcon: '🐠',
      separator: '🌊',
      folderIcon: '🐚',
      activeFolder: '🌊',
      bgClass: 'bg-cyan-50',
      textClass: 'text-cyan-700',
      hoverClass: 'hover:bg-cyan-100',
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { 
      scale: 0.9,
      y: 2,
    },
  };

  return (
    <div className={`${themeConfig[theme].bgClass} p-4 rounded-xl ${className}`}>
      <motion.div
        className="flex flex-wrap items-center gap-2"
        variants={animated ? containerVariants : undefined}
        initial={animated ? "hidden" : undefined}
        animate={animated ? "visible" : undefined}
      >
        {/* Home button */}
        <motion.button
          className={`p-2 rounded-full ${themeConfig[theme].hoverClass} transition-colors`}
          variants={animated ? buttonVariants : undefined}
          whileHover="hover"
          whileTap="tap"
          onClick={onHome}
          aria-label="Go to home folder"
        >
          <span className="text-xl" role="img" aria-label="Home">
            {themeConfig[theme].homeIcon}
          </span>
        </motion.button>

        {/* Back button - only show if we're not at root */}
        {folderPath.length > 0 && (
          <motion.button
            className={`p-2 rounded-full ${themeConfig[theme].hoverClass} transition-colors`}
            variants={animated ? buttonVariants : undefined}
            whileHover="hover"
            whileTap="tap"
            onClick={onBack}
            aria-label="Go back to parent folder"
          >
            <span className="text-xl" role="img" aria-label="Back">
              {themeConfig[theme].backIcon}
            </span>
          </motion.button>
        )}

        {/* Folder path */}
        <div className="flex flex-wrap items-center">
          {folderPath.map((folder, index) => (
            <React.Fragment key={folder.id}>
              {/* Separator */}
              <motion.span
                className="mx-1 text-gray-500"
                variants={animated ? itemVariants : undefined}
              >
                {themeConfig[theme].separator}
              </motion.span>
              
              {/* Folder */}
              <motion.button
                className={`
                  px-3 py-1.5 rounded-lg font-cartoon font-bold
                  ${themeConfig[theme].textClass}
                  ${themeConfig[theme].hoverClass}
                  transition-all duration-200
                  flex items-center gap-1
                `}
                variants={animated ? itemVariants : undefined}
                whileHover="hover"
                whileTap="tap"
                onClick={() => onNavigate(folder.id)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <span className="text-sm">
                  {hoverIndex === index 
                    ? themeConfig[theme].activeFolder 
                    : themeConfig[theme].folderIcon}
                </span>
                <span>{folder.name}</span>
                
                {/* Floating animation when hovered */}
                {hoverIndex === index && (
                  <motion.span
                    className="absolute -top-2 -right-1 text-xs"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: [-4, 0, -4] }}
                    transition={{ 
                      y: { 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    ✨
                  </motion.span>
                )}
              </motion.button>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
      
      {/* Current location indicator */}
      <motion.div
        className="mt-3 text-sm text-gray-500 font-cartoon"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {folderPath.length === 0 
          ? `You're at the root folder` 
          : `Current folder: ${folderPath[folderPath.length - 1]?.name}`
        }
      </motion.div>
    </div>
  );
};

export default FolderNavigation;