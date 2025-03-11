'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedCard from './AnimatedCard';

interface Material {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: string;
  url?: string;
  folderId: string;
  sessionId?: string;
}

interface Folder {
  id: string;
  name: string;
  parentId: string;
  createdAt: string;
}

interface DragItem {
  type: 'file' | 'folder';
  id: string;
}

interface FolderContentsProps {
  folders: Folder[];
  materials: Material[];
  onFolderClick: (folderId: string) => void;
  onFileClick?: (file: Material) => void;
  onFileDrop?: (fileId: string, targetFolderId: string) => void;
  onFolderDrop?: (folderId: string, targetFolderId: string) => void;
  theme?: 'default' | 'jungle' | 'ocean' | 'space';
  animated?: boolean;
  className?: string;
}

/**
 * Kid-friendly component to display folder contents with
 * animations and interactive elements
 */
const FolderContents: React.FC<FolderContentsProps> = ({
  folders,
  materials,
  onFolderClick,
  onFileClick,
  onFileDrop,
  onFolderDrop,
  theme = 'default',
  animated = true,
  className = '',
}) => {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<{ type: 'file' | 'folder', id: string } | null>(null);

  // Theme configuration
  const themeConfig = {
    default: {
      folderIcon: '📁',
      emptyFolderMsg: 'This folder is empty!',
      emptyFolderEmoji: '🔍',
    },
    jungle: {
      folderIcon: '🌿',
      emptyFolderMsg: 'No animals in this part of the jungle!',
      emptyFolderEmoji: '🦁',
    },
    ocean: {
      folderIcon: '🐚',
      emptyFolderMsg: 'No fish in this part of the ocean!',
      emptyFolderEmoji: '🐠',
    },
    space: {
      folderIcon: '🌟',
      emptyFolderMsg: 'No aliens in this galaxy!',
      emptyFolderEmoji: '👽',
    },
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) {
      return '🖼️';
    } else if (fileType.includes('pdf')) {
      return '📄';
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return '📝';
    } else if (fileType.includes('spreadsheet') || fileType.includes('excel')) {
      return '📊';
    } else if (fileType.includes('presentation') || fileType.includes('powerpoint')) {
      return '📽️';
    } else if (fileType.includes('audio')) {
      return '🎵';
    } else if (fileType.includes('video')) {
      return '🎬';
    } else {
      return '📁';
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== targetId) {
      setDropTargetId(targetId);
    }
  };

  const handleDragLeave = () => {
    setDropTargetId(null);
  };

  const handleDrop = (e: React.DragEvent, targetFolderId: string) => {
    e.preventDefault();
    setDropTargetId(null);

    if (!draggedItem) return;

    // Don't allow dropping into self
    if (draggedItem.type === 'folder' && draggedItem.id === targetFolderId) {
      return;
    }

    // Handle folder drop
    if (draggedItem.type === 'folder' && onFolderDrop) {
      onFolderDrop(draggedItem.id, targetFolderId);
    }
    // Handle file drop
    else if (draggedItem.type === 'file' && onFileDrop) {
      onFileDrop(draggedItem.id, targetFolderId);
    }

    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropTargetId(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Folders section */}
      <div className="mb-8">
        <h2 className="text-xl font-kids mb-4 flex items-center gap-2">
          <span role="img" aria-label="Folders">{themeConfig[theme].folderIcon}</span>
          <span>Folders</span>
        </h2>

        {folders.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">{themeConfig[theme].emptyFolderEmoji}</div>
            <p className="text-gray-500 font-cartoon">{themeConfig[theme].emptyFolderMsg}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={animated ? containerVariants : undefined}
            initial={animated ? "hidden" : undefined}
            animate={animated ? "visible" : undefined}
          >
            {folders.map((folder) => (
              <motion.div
                key={folder.id}
                variants={animated ? itemVariants : undefined}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                draggable
                onDragStart={(e) => handleDragStart(e, { type: 'folder', id: folder.id })}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, folder.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, folder.id)}
                className={`
                  cursor-pointer
                  ${dropTargetId === folder.id ? 'ring-2 ring-primary-500 bg-primary-50' : ''}
                `}
                onMouseEnter={() => setHoveredItem({ type: 'folder', id: folder.id })}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <AnimatedCard
                  color="primary"
                  borderStyle="rounded"
                  onClick={() => onFolderClick(folder.id)}
                  wiggle={hoveredItem?.id === folder.id}
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-3xl">
                      {themeConfig[theme].folderIcon}
                    </div>
                    <div>
                      <div className="font-cartoon font-bold truncate">{folder.name}</div>
                      <div className="text-xs text-gray-500">{formatDate(folder.createdAt)}</div>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Files section */}
      <div>
        <h2 className="text-xl font-kids mb-4 flex items-center gap-2">
          <span role="img" aria-label="Files">📄</span>
          <span>Files</span>
        </h2>

        {materials.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📂</div>
            <p className="text-gray-500 font-cartoon">No files found!</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={animated ? containerVariants : undefined}
            initial={animated ? "hidden" : undefined}
            animate={animated ? "visible" : undefined}
          >
            {materials.map((file) => (
              <motion.div
                key={file.id}
                variants={animated ? itemVariants : undefined}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                draggable
                onDragStart={(e) => handleDragStart(e, { type: 'file', id: file.id })}
                onDragEnd={handleDragEnd}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredItem({ type: 'file', id: file.id })}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <AnimatedCard
                  color="secondary"
                  borderStyle="rounded"
                  onClick={() => onFileClick && onFileClick(file)}
                  wiggle={hoveredItem?.id === file.id}
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-3xl">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <div className="font-cartoon font-bold truncate">{file.name}</div>
                      <div className="text-xs text-gray-500 flex flex-col">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{formatDate(file.lastModified)}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FolderContents;