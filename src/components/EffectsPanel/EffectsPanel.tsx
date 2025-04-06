import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronRight, FaMagic, FaFilm, FaFont, FaAdjust, FaCut } from 'react-icons/fa';

const EffectsPanelContainer = styled.div`
  grid-area: effects;
  background-color: #232323;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #1a1a1a;
`;

const EffectsPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #1a1a1a;
`;

const EffectsPanelTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const EffectsPanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const EffectCategory = styled.div`
  margin-bottom: 10px;
`;

const CategoryHeader = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

const CategoryIcon = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
`;

const CategoryName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const CategoryContent = styled.div<{ isOpen: boolean }>`
  margin-left: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const EffectItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

const EffectIcon = styled.div`
  margin-right: 5px;
  color: #4285F4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
`;

const EffectName = styled.div`
  font-size: 14px;
`;

interface EffectCategoryType {
  id: number;
  name: string;
  icon: React.ReactNode;
  effects: EffectType[];
}

interface EffectType {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const EffectsPanel: React.FC = () => {
  // Sample data for effect categories and effects
  const effectCategories: EffectCategoryType[] = [
    {
      id: 1,
      name: 'Video Effects',
      icon: <FaMagic />,
      effects: [
        { id: 101, name: 'Color Grading', icon: <FaAdjust />, description: 'Expert color correction and grading' },
        { id: 102, name: 'Transitions', icon: <FaCut />, description: 'Smooth scene transitions' },
        { id: 103, name: 'Motion Effects', icon: <FaMagic />, description: 'Dynamic motion and animations' },
      ]
    },
    {
      id: 2,
      name: 'Audio Skills',
      icon: <FaFilm />,
      effects: [
        { id: 201, name: 'Sound Design', icon: <FaMagic />, description: 'Creating immersive soundscapes' },
        { id: 202, name: 'Voice Mixing', icon: <FaMagic />, description: 'Clear and balanced dialogue' },
        { id: 203, name: 'Music Integration', icon: <FaMagic />, description: 'Seamless music integration' },
      ]
    },
    {
      id: 3,
      name: 'Graphics',
      icon: <FaFont />,
      effects: [
        { id: 301, name: 'Lower Thirds', icon: <FaMagic />, description: 'Professional text overlays' },
        { id: 302, name: 'Title Design', icon: <FaMagic />, description: 'Eye-catching title sequences' },
        { id: 303, name: 'Motion Graphics', icon: <FaMagic />, description: 'Animated visual elements' },
      ]
    },
    {
      id: 4,
      name: 'Technical Skills',
      icon: <FaFilm />,
      effects: [
        { id: 401, name: 'Multi-cam Editing', icon: <FaMagic />, description: 'Seamless multi-camera editing' },
        { id: 402, name: 'Format Conversion', icon: <FaMagic />, description: 'Expert in various video formats' },
        { id: 403, name: 'Compression', icon: <FaMagic />, description: 'Optimal file size with quality preservation' },
      ]
    },
  ];
  
  const [openCategories, setOpenCategories] = useState<number[]>([1]);
  
  const toggleCategory = (categoryId: number) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter(id => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };
  
  return (
    <EffectsPanelContainer>
      <EffectsPanelHeader>
        <EffectsPanelTitle>Effects</EffectsPanelTitle>
      </EffectsPanelHeader>
      <EffectsPanelContent>
        {effectCategories.map(category => {
          const isOpen = openCategories.includes(category.id);
          return (
            <EffectCategory key={category.id}>
              <CategoryHeader 
                isOpen={isOpen} 
                onClick={() => toggleCategory(category.id)}
              >
                <CategoryIcon>
                  {isOpen ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                </CategoryIcon>
                <CategoryIcon>
                  {category.icon}
                </CategoryIcon>
                <CategoryName>{category.name}</CategoryName>
              </CategoryHeader>
              <CategoryContent isOpen={isOpen}>
                {category.effects.map(effect => (
                  <EffectItem key={effect.id} title={effect.description}>
                    <EffectIcon>
                      {effect.icon}
                    </EffectIcon>
                    <EffectName>{effect.name}</EffectName>
                  </EffectItem>
                ))}
              </CategoryContent>
            </EffectCategory>
          );
        })}
      </EffectsPanelContent>
    </EffectsPanelContainer>
  );
};

export default EffectsPanel;