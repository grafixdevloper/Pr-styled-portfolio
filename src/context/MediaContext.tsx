import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MediaItem {
  id: number;
  name: string;
  type: 'video' | 'image' | 'audio' | 'other';
  duration?: string;
}

interface MediaContextType {
  selectedItem: MediaItem | null;
  setSelectedItem: (item: MediaItem | null) => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMediaContext must be used within a MediaProvider');
  }
  return context;
};

interface MediaProviderProps {
  children: ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  return (
    <MediaContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </MediaContext.Provider>
  );
};