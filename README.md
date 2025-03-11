# LEPEVA Interactive Kids UI

![LEPEVA Interactive UI](https://via.placeholder.com/1200x600/4A90E2/FFFFFF?text=LEPEVA+Interactive+Kids+UI)

A delightful, kid-friendly UI component library for the LEPEVA English learning platform. This project provides interactive, animated UI components designed specifically for young learners.

## Features

- 🎨 **Kid-Friendly Design**: Bright colors, rounded corners, and playful animations that appeal to children
- 🎮 **Interactive Elements**: Components that respond to user interaction with delightful animations
- 📱 **Responsive**: Works on all devices including tablets and mobile phones
- 🧩 **Modular**: Components can be easily mixed and matched to create engaging interfaces
- 🎭 **Theme Support**: Multiple themes including default, jungle, ocean, and space
- 🔄 **Drag & Drop**: Kid-friendly file and folder management with drag and drop capabilities

## Interactive Components

### 1. Animated Characters

Interactive mascots that guide students through the platform with expressions and animations:

- Teacher character
- Student character
- Animal mascots (Panda, Penguin, Fox)
- Speech bubbles and animations

### 2. Interactive UI Elements

Playful and engaging UI components:

- Animated buttons with sound effects and confetti
- Themed cards with hover effects
- Drag and drop file uploader
- Interactive folder navigation
- Animated folder contents display

### 3. File Management Demo

A complete folder and file management system demo:

- Create and navigate folders
- Upload and organize files
- Drag files between folders
- Multiple themed environments

## Getting Started

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/Daydreamer20/lepeva-interactive-ui.git

# Navigate to the project directory
cd lepeva-interactive-ui

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000/dashboard/materials](http://localhost:3000/dashboard/materials) in your browser to see the demo.

## Component Usage

### Animated Character

```tsx
import AnimatedCharacter from '@/components/characters/AnimatedCharacter';

<AnimatedCharacter
  character="teacher"
  animation="happy"
  size="md"
  speech="Hello there! Ready to learn?"
/>
```

### Kid Button

```tsx
import KidButton from '@/components/ui/KidButton';

<KidButton
  color="primary"
  size="md"
  sound="pop"
  withConfetti
  onClick={() => alert('Button clicked!')}
>
  Click Me!
</KidButton>
```

### Animated Card

```tsx
import AnimatedCard from '@/components/ui/AnimatedCard';

<AnimatedCard
  title="Fun Facts"
  icon="🦄"
  color="accent"
  borderStyle="rounded"
  wiggle
>
  <p>Unicorns are magical creatures!</p>
</AnimatedCard>
```

### File Uploader

```tsx
import FileUploader from '@/components/ui/FileUploader';

<FileUploader
  onUpload={(files) => console.log('Files uploaded:', files)}
  theme="jungle"
  maxFiles={5}
  maxSize={10} // 10MB
/>
```

### Folder Navigation

```tsx
import FolderNavigation from '@/components/ui/FolderNavigation';

<FolderNavigation
  currentFolder="folder-1"
  folderPath={folderPath}
  onNavigate={(folderId) => setCurrentFolder(folderId)}
  onHome={() => setCurrentFolder('root')}
  onBack={handleBackClick}
  theme="ocean"
/>
```

### Folder Contents

```tsx
import FolderContents from '@/components/ui/FolderContents';

<FolderContents
  folders={folders}
  materials={materials}
  onFolderClick={(folderId) => setCurrentFolder(folderId)}
  onFileDrop={handleFileDrop}
  onFolderDrop={handleFolderDrop}
  theme="space"
/>
```

## Technologies Used

- **Next.js**: React framework for building the UI
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Dropzone**: For drag & drop file uploads

## Implementation Details

The UI uses several animation techniques to create a kid-friendly experience:

1. **Spring Animations**: Natural-feeling bouncy animations for interactive elements
2. **Staggered Animations**: Elements appear one after another for a more engaging experience
3. **Hover & Active States**: Interactive feedback when elements are hovered or clicked
4. **Drag & Drop Visual Cues**: Clear visual feedback during drag and drop operations
5. **Confetti Effects**: Celebration animations for completing actions
6. **Character Reactions**: Animated characters that react to user interactions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Designed for the LEPEVA English learning platform
- Character designs inspired by educational platforms for young learners
- UI color schemes based on child development research

---

Made with ❤️ for young learners.