'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import KidButton from '@/components/ui/KidButton';
import AnimatedCard from '@/components/ui/AnimatedCard';
import FileUploader from '@/components/ui/FileUploader';
import FolderNavigation from '@/components/ui/FolderNavigation';
import FolderContents from '@/components/ui/FolderContents';
import AnimatedCharacter from '@/components/characters/AnimatedCharacter';

// Define interfaces
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

interface Session {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status: string;
}

// Mock data generator functions
const generateMockFolders = (): Folder[] => {
  return [
    {
      id: 'folder-1',
      name: 'Animals',
      parentId: 'root',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'folder-2',
      name: 'Colors',
      parentId: 'root',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'folder-3',
      name: 'Numbers',
      parentId: 'root',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'folder-4',
      name: 'Farm Animals',
      parentId: 'folder-1',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'folder-5',
      name: 'Wild Animals',
      parentId: 'folder-1',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

const generateMockMaterials = (): Material[] => {
  return [
    {
      id: 'material-1',
      name: 'Cat picture.jpg',
      type: 'image/jpeg',
      size: 1024 * 1024 * 2.5, // 2.5MB
      lastModified: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      folderId: 'folder-4',
    },
    {
      id: 'material-2',
      name: 'Dog sounds.mp3',
      type: 'audio/mpeg',
      size: 1024 * 1024 * 3.2, // 3.2MB
      lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      folderId: 'folder-4',
    },
    {
      id: 'material-3',
      name: 'Numbers 1-10.pdf',
      type: 'application/pdf',
      size: 1024 * 1024 * 1.8, // 1.8MB
      lastModified: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      folderId: 'folder-3',
    },
    {
      id: 'material-4',
      name: 'Primary Colors.ppt',
      type: 'application/vnd.ms-powerpoint',
      size: 1024 * 1024 * 5.7, // 5.7MB
      lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      folderId: 'folder-2',
    },
    {
      id: 'material-5',
      name: 'Lion Facts.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 1024 * 1024 * 1.1, // 1.1MB
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      folderId: 'folder-5',
    },
    {
      id: 'material-6',
      name: 'Tiger video.mp4',
      type: 'video/mp4',
      size: 1024 * 1024 * 15.3, // 15.3MB
      lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      folderId: 'folder-5',
    },
    {
      id: 'material-7',
      name: 'ABC Phonics.mp3',
      type: 'audio/mpeg',
      size: 1024 * 1024 * 4.6, // 4.6MB
      lastModified: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      folderId: 'root',
    },
    {
      id: 'material-8',
      name: 'Welcome Presentation.pptx',
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      size: 1024 * 1024 * 7.8, // 7.8MB
      lastModified: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      folderId: 'root',
    },
  ];
};

/**
 * Kid-friendly Materials Dashboard that demonstrates the interactive UI components
 */
const MaterialsDashboardPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string>('root');
  const [folderPath, setFolderPath] = useState<Folder[]>([]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<'default' | 'jungle' | 'ocean' | 'space'>('default');
  const [activeTip, setActiveTip] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Load mock data
  useEffect(() => {
    const allFolders = generateMockFolders();
    const allMaterials = generateMockMaterials();

    setFolders(allFolders.filter(folder => folder.parentId === currentFolder));
    setMaterials(allMaterials.filter(material => material.folderId === currentFolder));
    
    // Show welcome confetti
    setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1000);
  }, []);

  // Update displayed folders and materials when current folder changes
  useEffect(() => {
    const allFolders = generateMockFolders();
    const allMaterials = generateMockMaterials();

    setFolders(allFolders.filter(folder => folder.parentId === currentFolder));
    setMaterials(allMaterials.filter(material => material.folderId === currentFolder));
    
    // Update folder path
    if (currentFolder === 'root') {
      setFolderPath([]);
    } else {
      const buildPath = (folderId: string, allFolders: Folder[], accPath: Folder[] = []): Folder[] => {
        const folder = allFolders.find(f => f.id === folderId);
        if (!folder) return accPath;
        
        if (folder.parentId === 'root') {
          return [folder, ...accPath];
        }
        
        return buildPath(folder.parentId, allFolders, [folder, ...accPath]);
      };
      
      setFolderPath(buildPath(currentFolder, allFolders));
    }
  }, [currentFolder]);

  // Navigation handlers
  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const handleBackClick = () => {
    if (folderPath.length === 0) {
      // Already at root
      return;
    }
    
    if (folderPath.length === 1) {
      // Going back to root
      setCurrentFolder('root');
    } else {
      // Going back to parent folder
      const parentFolder = folderPath[folderPath.length - 2];
      setCurrentFolder(parentFolder.id);
    }
  };

  const handleHomeClick = () => {
    setCurrentFolder('root');
  };

  // File upload handler
  const handleFileUpload = (files: File[]) => {
    // In a real app, we would upload files to server
    // Here we just simulate adding them to state
    
    const newMaterials = files.map((file, index) => ({
      id: `material-new-${Date.now()}-${index}`,
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      lastModified: new Date().toISOString(),
      folderId: currentFolder,
    }));
    
    setMaterials(prev => [...prev, ...newMaterials]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Create folder handler
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder: Folder = {
      id: `folder-new-${Date.now()}`,
      name: newFolderName,
      parentId: currentFolder,
      createdAt: new Date().toISOString(),
    };
    
    setFolders(prev => [...prev, newFolder]);
    setNewFolderName('');
    setIsCreatingFolder(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Drag and drop handlers
  const handleFileDrop = (fileId: string, targetFolderId: string) => {
    setMaterials(prev => prev.map(material => 
      material.id === fileId 
        ? { ...material, folderId: targetFolderId }
        : material
    ));
  };

  const handleFolderDrop = (folderId: string, targetFolderId: string) => {
    setFolders(prev => prev.map(folder => 
      folder.id === folderId 
        ? { ...folder, parentId: targetFolderId }
        : folder
    ));
  };

  // Helper tips for the dashboard
  const tips = [
    "Drag and drop files into folders!",
    "Create colorful folders to organize your materials!",
    "Upload multiple files at once for faster workflow!",
    "Try different themes for more fun!",
    "Click on any folder to see what's inside!"
  ];

  // Cycle tips every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTip(prev => (prev + 1) % tips.length);
    }, 8000);
    
    return () => clearInterval(timer);
  }, [tips.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with character guide */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <motion.h1 
              className="text-3xl font-kids text-primary-700"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My Lesson Materials
            </motion.h1>
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <AnimatedCharacter
                character={
                  selectedTheme === 'default' ? 'teacher' : 
                  selectedTheme === 'jungle' ? 'panda' :
                  selectedTheme === 'ocean' ? 'penguin' : 'fox'
                }
                animation="happy"
                size="sm"
                speech={tips[activeTip]}
              />
            </motion.div>
          </div>
          
          {/* Theme selector */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <KidButton 
              size="sm" 
              color="primary"
              rounded
              onClick={() => setSelectedTheme('default')}
            >
              🏠
            </KidButton>
            <KidButton 
              size="sm" 
              color="success"
              rounded
              onClick={() => setSelectedTheme('jungle')}
            >
              🌴
            </KidButton>
            <KidButton 
              size="sm" 
              color="accent"
              rounded
              onClick={() => setSelectedTheme('space')}
            >
              🚀
            </KidButton>
            <KidButton 
              size="sm" 
              color="secondary"
              rounded
              onClick={() => setSelectedTheme('ocean')}
            >
              🌊
            </KidButton>
          </motion.div>
        </header>
        
        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <KidButton 
            color="primary"
            icon={<span className="mr-1">📂</span>}
            onClick={() => setIsCreatingFolder(true)}
          >
            New Folder
          </KidButton>
          
          <KidButton 
            color="secondary"
            icon={<span className="mr-1">🔍</span>}
            onClick={() => {}}
          >
            Search
          </KidButton>
          
          <div className="flex-1"></div>
          
          <input
            type="text"
            placeholder="Search files..."
            className="input-kid"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
        
        {/* Folder navigation */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FolderNavigation
            currentFolder={currentFolder}
            folderPath={folderPath}
            onNavigate={handleFolderClick}
            onHome={handleHomeClick}
            onBack={handleBackClick}
            theme={selectedTheme}
          />
        </motion.div>
        
        {/* Create folder form */}
        {isCreatingFolder && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <AnimatedCard color="primary" borderStyle="dashed">
              <div className="flex flex-col">
                <h3 className="font-cartoon font-bold mb-2 text-primary-700">Create New Folder</h3>
                <input
                  type="text"
                  placeholder="Folder name"
                  className="input-kid mb-4"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                />
                <div className="flex gap-3">
                  <KidButton
                    color="error"
                    onClick={() => setIsCreatingFolder(false)}
                  >
                    Cancel
                  </KidButton>
                  <KidButton
                    color="success"
                    onClick={handleCreateFolder}
                    withConfetti
                  >
                    Create Folder
                  </KidButton>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        )}
        
        {/* File uploader */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FileUploader
            onUpload={handleFileUpload}
            theme={selectedTheme}
          />
        </motion.div>
        
        {/* Folder contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <FolderContents
            folders={folders}
            materials={materials}
            onFolderClick={handleFolderClick}
            onFileDrop={handleFileDrop}
            onFolderDrop={handleFolderDrop}
            theme={selectedTheme}
          />
        </motion.div>
      </div>
      
      {/* Confetti effect (simplified representation) */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 20}%`,
                backgroundColor: ['#FF5E5B', '#39B54A', '#FFDE59', '#4D9DE0', '#E15CD5'][
                  Math.floor(Math.random() * 5)
                ],
              }}
              initial={{ y: -20, opacity: 1 }}
              animate={{
                y: window.innerHeight,
                opacity: [1, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialsDashboardPage;