import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFolder, FaFolderOpen, FaVideo, FaImage, FaMusic, FaFile } from 'react-icons/fa';
import { useMediaContext } from '../../context/MediaContext';

const ProjectBinContainer = styled.div`
  grid-area: project-bin;
  background-color: #232323;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1a1a1a;
`;

const ProjectBinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #1a1a1a;
`;

const ProjectBinTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ProjectBinContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const FolderItem = styled.div<{ isOpen: boolean }>`
  margin-bottom: 5px;
`;

const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

const FolderIcon = styled.div`
  margin-right: 5px;
  color: #FBBC05;
`;

const FolderName = styled.div`
  font-size: 14px;
`;

const FolderContent = styled.div<{ isOpen: boolean }>`
  margin-left: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const MediaItem = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  background-color: ${props => props.isSelected ? '#4285F4' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.isSelected ? '#4285F4' : '#3a3a3a'};
  }
`;

const MediaIcon = styled.div<{ type: string }>`
  margin-right: 5px;
  color: ${props => {
    switch (props.type) {
      case 'video': return '#4285F4';
      case 'image': return '#34A853';
      case 'audio': return '#EA4335';
      default: return '#e6e6e6';
    }
  }};
`;

const MediaName = styled.div`
  font-size: 14px;
`;

interface Folder {
  id: number;
  name: string;
  items: MediaItem[];
}

interface MediaItem {
  id: number;
  name: string;
  type: 'video' | 'image' | 'audio' | 'other';
  duration?: string;
}

const ProjectBin: React.FC = () => {
  const { selectedItem, setSelectedItem } = useMediaContext();
  
  // Sample data for project folders and media items
  const [folders, _setFolders] = useState<Folder[]>([
    {
      id: 1,
      name: 'Commercial Projects',
      items: [
        { id: 101, name: 'Real Estate.mp4', type: 'video', duration: '00:02:30' },
      ]
    },
    {
      id: 2,
      name: 'Documentary Work',
      items: [
        { id: 201, name: 'Interview Footage.mp4', type: 'video', duration: '00:15:00' },
        { id: 202, name: 'B-Roll Compilation.mp4', type: 'video', duration: '00:05:30' },
        { id: 203, name: 'Location Photos', type: 'image' },
      ]
    },
    {
      id: 3,
      name: 'Motion Graphics',
      items: [
        { id: 301, name: 'Title Sequence.mp4', type: 'video', duration: '00:00:20' },
        { id: 302, name: 'Lower Thirds Pack.mp4', type: 'video', duration: '00:00:45' },
        { id: 303, name: 'Animated Icons.mp4', type: 'video', duration: '00:00:30' },
      ]
    },
    {
      id: 4,
      name: 'Audio Assets',
      items: [
        { id: 401, name: 'Background Music.mp3', type: 'audio', duration: '00:02:30' },
        { id: 402, name: 'Sound Effects.mp3', type: 'audio', duration: '00:01:00' },
        { id: 403, name: 'Voiceover.mp3', type: 'audio', duration: '00:00:45' },
      ]
    },
  ]);
  
  const [openFolders, setOpenFolders] = useState<number[]>([1]);
  
  const toggleFolder = (folderId: number) => {
    if (openFolders.includes(folderId)) {
      setOpenFolders(openFolders.filter(id => id !== folderId));
    } else {
      setOpenFolders([...openFolders, folderId]);
    }
  };
  
  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video': return <FaVideo />;
      case 'image': return <FaImage />;
      case 'audio': return <FaMusic />;
      default: return <FaFile />;
    }
  };
  
  return (
    <ProjectBinContainer>
      <ProjectBinHeader>
        <ProjectBinTitle>Project</ProjectBinTitle>
      </ProjectBinHeader>
      <ProjectBinContent>
        {folders.map(folder => {
          const isOpen = openFolders.includes(folder.id);
          return (
            <FolderItem key={folder.id} isOpen={isOpen}>
              <FolderHeader onClick={() => toggleFolder(folder.id)}>
                <FolderIcon>
                  {isOpen ? <FaFolderOpen /> : <FaFolder />}
                </FolderIcon>
                <FolderName>{folder.name}</FolderName>
              </FolderHeader>
              <FolderContent isOpen={isOpen}>
                {folder.items.map(item => (
                  <MediaItem 
                    key={item.id} 
                    isSelected={selectedItem?.id === item.id}
                    onClick={() => setSelectedItem(item)}
                  >
                    <MediaIcon type={item.type}>
                      {getMediaIcon(item.type)}
                    </MediaIcon>
                    <MediaName>{item.name}</MediaName>
                  </MediaItem>
                ))}
              </FolderContent>
            </FolderItem>
          );
        })}
      </ProjectBinContent>
    </ProjectBinContainer>
  );
};

export default ProjectBin;