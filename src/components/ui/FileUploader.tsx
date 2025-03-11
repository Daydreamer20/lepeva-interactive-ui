'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import KidButton from './KidButton';

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  theme?: 'default' | 'jungle' | 'ocean' | 'space';
  children?: React.ReactNode;
  containerClassName?: string;
}

/**
 * Kid-friendly file uploader with drag and drop functionality, 
 * animations, and themed visuals
 */
const FileUploader: React.FC<FileUploaderProps> = ({
  onUpload,
  maxFiles = 10,
  maxSize = 10, // Default 10MB
  acceptedTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.ppt', '.pptx'],
  theme = 'default',
  children,
  containerClassName = '',
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  // Character based on theme
  const themeConfig = {
    default: {
      character: '🦊',
      message: 'Drop your files here!',
      bgClass: 'bg-gradient-to-r from-blue-50 to-indigo-50',
    },
    jungle: {
      character: '🐵',
      message: 'Swing your files into the jungle!',
      bgClass: 'bg-gradient-to-r from-green-50 to-lime-50',
    },
    ocean: {
      character: '🐠',
      message: 'Splash your files into the ocean!',
      bgClass: 'bg-gradient-to-r from-blue-50 to-cyan-50',
    },
    space: {
      character: '👾',
      message: 'Blast your files into space!',
      bgClass: 'bg-gradient-to-r from-indigo-50 to-purple-50',
    },
  };
  
  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Reset error state
    setUploadError(null);
    
    // Check if too many files
    if (acceptedFiles.length > maxFiles) {
      setUploadError(`You can only upload up to ${maxFiles} files at once.`);
      return;
    }
    
    // Check for files that are too large
    const oversizedFiles = acceptedFiles.filter(
      file => file.size > maxSize * 1024 * 1024
    );
    
    if (oversizedFiles.length > 0) {
      setUploadError(`Some files are too large. Maximum size is ${maxSize}MB.`);
      return;
    }
    
    // If all checks pass, set files
    setUploadedFiles(acceptedFiles);
    
    // Simulate upload process (would connect to API in real implementation)
    if (acceptedFiles.length > 0) {
      simulateUpload(acceptedFiles);
    }
  }, [maxFiles, maxSize]);
  
  // Simulate upload process with animation
  const simulateUpload = (files: File[]) => {
    setIsUploading(true);
    
    // Simulate API upload delay
    setTimeout(() => {
      onUpload(files);
      setIsUploading(false);
      setUploadComplete(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setUploadComplete(false);
        setUploadedFiles([]);
      }, 3000);
    }, 2000);
  };
  
  const resetUpload = () => {
    setUploadedFiles([]);
    setUploadError(null);
    setIsUploading(false);
    setUploadComplete(false);
  };
  
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
  });
  
  // Get file icon based on file type
  const getFileIcon = (file: File) => {
    const type = file.type;
    
    if (type.includes('image')) {
      return '🖼️';
    } else if (type.includes('pdf')) {
      return '📄';
    } else if (type.includes('word') || type.includes('document')) {
      return '📝';
    } else if (type.includes('spreadsheet') || type.includes('excel')) {
      return '📊';
    } else if (type.includes('presentation') || type.includes('powerpoint')) {
      return '📽️';
    } else {
      return '📁';
    }
  };
  
  return (
    <div className={`w-full ${containerClassName}`}>
      <div
        {...getRootProps()}
        className={`
          relative
          border-4 border-dashed rounded-2xl p-8
          transition-all duration-300 ease-in-out
          min-h-[200px]
          flex flex-col items-center justify-center
          cursor-pointer
          ${themeConfig[theme].bgClass}
          ${isDragActive && !isDragReject ? 'border-primary-400 bg-primary-50' : 'border-gray-300'}
          ${isDragReject ? 'border-error-400 bg-error-50' : ''}
          ${isDragAccept ? 'border-success-400 bg-success-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {/* Animated character */}
        <AnimatePresence mode="wait">
          {!isUploading && !uploadComplete && (
            <motion.div 
              className="text-6xl mb-4"
              key="character"
              initial={{ scale: 0.8, y: 10, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: isDragActive ? -20 : 0,
                opacity: 1,
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {themeConfig[theme].character}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Upload state messages */}
        <AnimatePresence mode="wait">
          {!isUploading && !uploadComplete && uploadedFiles.length === 0 && (
            <motion.div
              key="upload-prompt"
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <p className="text-lg font-cartoon mb-2">
                {isDragActive
                  ? isDragReject
                    ? "Oops! Some files aren't allowed."
                    : "Yes! Drop them here!"
                  : themeConfig[theme].message}
              </p>
              <p className="text-sm text-gray-500">
                {children || `Drag and drop your files, or click to browse`}
              </p>
            </motion.div>
          )}
          
          {/* Uploading animation */}
          {isUploading && (
            <motion.div
              key="uploading"
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex flex-col items-center">
                <div className="relative h-20 w-20 mb-4">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-8 left-8 w-4 h-4 rounded-full bg-primary-500"
                      animate={{
                        x: Math.cos(i * (Math.PI / 4)) * 30,
                        y: Math.sin(i * (Math.PI / 4)) * 30,
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
                <p className="font-cartoon text-lg">Uploading your files...</p>
              </div>
            </motion.div>
          )}
          
          {/* Upload complete animation */}
          {uploadComplete && (
            <motion.div
              key="complete"
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
            >
              <motion.div 
                className="text-6xl mb-2"
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 0.5 }}
              >
                🎉
              </motion.div>
              <p className="font-cartoon text-success-600 text-lg">
                Upload Complete!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* File list */}
        {uploadedFiles.length > 0 && !isUploading && !uploadComplete && (
          <motion.div
            className="w-full mt-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-cartoon text-lg mb-3 text-center">
              Ready to upload {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2">
              {uploadedFiles.map((file, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-xl">{getFileIcon(file)}</span>
                  <span className="truncate text-sm">{file.name}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 mt-4">
              <KidButton
                color="error"
                size="sm"
                onClick={resetUpload}
              >
                Cancel
              </KidButton>
              <KidButton
                color="success"
                size="sm"
                onClick={() => simulateUpload(uploadedFiles)}
              >
                Upload Files
              </KidButton>
            </div>
          </motion.div>
        )}
        
        {/* Error message */}
        <AnimatePresence>
          {uploadError && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-error-100 border-t border-error-200 p-3 text-error-700 rounded-b-xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                <p className="text-sm">{uploadError}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FileUploader;