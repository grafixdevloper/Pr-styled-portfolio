import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronRight, FaCog, FaSlidersH } from 'react-icons/fa';

const PropertiesPanelContainer = styled.div`
  grid-area: properties;
  background-color: #232323;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #1a1a1a;
  border-left: 1px solid #1a1a1a;
`;

const PropertiesPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #1a1a1a;
`;

const PropertiesPanelTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const PropertiesPanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const PropertySection = styled.div`
  margin-bottom: 10px;
`;

const SectionHeader = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

const SectionIcon = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
`;

const SectionName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const SectionContent = styled.div<{ isOpen: boolean }>`
  margin-left: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const PropertyRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 12px;
`;

const PropertyLabel = styled.div`
  width: 100px;
  color: #aaa;
`;

const PropertyValue = styled.div`
  flex: 1;
`;

const PropertySlider = styled.input`
  width: 100%;
  height: 4px;
  background: #3a3a3a;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #4285F4;
    cursor: pointer;
  }
`;

const PropertyInput = styled.input`
  background-color: #3a3a3a;
  border: 1px solid #1a1a1a;
  color: #e6e6e6;
  padding: 2px 5px;
  width: 50px;
  font-size: 12px;
`;

const PropertySelect = styled.select`
  background-color: #3a3a3a;
  border: 1px solid #1a1a1a;
  color: #e6e6e6;
  padding: 2px 5px;
  font-size: 12px;
`;

const PropertyOption = styled.option`
  background-color: #3a3a3a;
  color: #e6e6e6;
`;

const ColorSwatch = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${props => props.color};
  border: 1px solid #1a1a1a;
  margin-right: 5px;
`;

const ColorRow = styled.div`
  display: flex;
  align-items: center;
`;

interface PropertySectionType {
  id: number;
  name: string;
  icon: React.ReactNode;
  properties: PropertyType[];
}

type PropertyType = {
  id: number;
  name: string;
  type: 'slider' | 'input' | 'select' | 'color';
  value: any;
  options?: string[];
};

const PropertiesPanel: React.FC = () => {
  // Sample data for property sections
  const propertySections: PropertySectionType[] = [
    {
      id: 1,
      name: 'Motion',
      icon: <FaSlidersH />,
      properties: [
        { id: 101, name: 'Position', type: 'input', value: '0, 0' },
        { id: 102, name: 'Scale', type: 'slider', value: 100 },
        { id: 103, name: 'Rotation', type: 'slider', value: 0 },
        { id: 104, name: 'Opacity', type: 'slider', value: 100 },
      ]
    },
    {
      id: 2,
      name: 'Color Effects',
      icon: <FaCog />,
      properties: [
        { id: 201, name: 'Exposure', type: 'slider', value: 0 },
        { id: 202, name: 'Contrast', type: 'slider', value: 0 },
        { id: 203, name: 'Highlights', type: 'slider', value: 0 },
        { id: 204, name: 'Shadows', type: 'slider', value: 0 },
        { id: 205, name: 'Color', type: 'color', value: '#4285F4' },
      ]
    },
    {
      id: 3,
      name: 'Audio',
      icon: <FaCog />,
      properties: [
        { id: 301, name: 'Volume', type: 'slider', value: 0 },
        { id: 302, name: 'Pan', type: 'slider', value: 0 },
        { id: 303, name: 'EQ Preset', type: 'select', value: 'Default', options: ['Default', 'Voice Enhance', 'Bass Boost', 'Treble Boost'] },
      ]
    },
  ];
  
  const [openSections, setOpenSections] = useState<number[]>([1]);
  const [propertyValues, setPropertyValues] = useState<{[key: number]: any}>({});
  
  const toggleSection = (sectionId: number) => {
    if (openSections.includes(sectionId)) {
      setOpenSections(openSections.filter(id => id !== sectionId));
    } else {
      setOpenSections([...openSections, sectionId]);
    }
  };
  
  const handlePropertyChange = (propertyId: number, value: any) => {
    setPropertyValues({
      ...propertyValues,
      [propertyId]: value
    });
  };
  
  const renderPropertyControl = (property: PropertyType) => {
    const value = propertyValues[property.id] !== undefined ? propertyValues[property.id] : property.value;
    
    switch (property.type) {
      case 'slider':
        return (
          <PropertyRow key={property.id}>
            <PropertyLabel>{property.name}</PropertyLabel>
            <PropertyValue>
              <PropertySlider 
                type="range" 
                min="0" 
                max="100" 
                value={value} 
                onChange={(e) => handlePropertyChange(property.id, parseInt(e.target.value))}
              />
            </PropertyValue>
            <PropertyInput 
              type="number" 
              value={value} 
              onChange={(e) => handlePropertyChange(property.id, parseInt(e.target.value))}
            />
          </PropertyRow>
        );
      case 'input':
        return (
          <PropertyRow key={property.id}>
            <PropertyLabel>{property.name}</PropertyLabel>
            <PropertyValue>
              <PropertyInput 
                type="text" 
                value={value} 
                onChange={(e) => handlePropertyChange(property.id, e.target.value)}
              />
            </PropertyValue>
          </PropertyRow>
        );
      case 'select':
        return (
          <PropertyRow key={property.id}>
            <PropertyLabel>{property.name}</PropertyLabel>
            <PropertyValue>
              <PropertySelect 
                value={value} 
                onChange={(e) => handlePropertyChange(property.id, e.target.value)}
              >
                {property.options?.map(option => (
                  <PropertyOption key={option} value={option}>{option}</PropertyOption>
                ))}
              </PropertySelect>
            </PropertyValue>
          </PropertyRow>
        );
      case 'color':
        return (
          <PropertyRow key={property.id}>
            <PropertyLabel>{property.name}</PropertyLabel>
            <PropertyValue>
              <ColorRow>
                <ColorSwatch color={value} />
                <PropertyInput 
                  type="text" 
                  value={value} 
                  onChange={(e) => handlePropertyChange(property.id, e.target.value)}
                />
              </ColorRow>
            </PropertyValue>
          </PropertyRow>
        );
      default:
        return null;
    }
  };
  
  return (
    <PropertiesPanelContainer>
      <PropertiesPanelHeader>
        <PropertiesPanelTitle>Properties</PropertiesPanelTitle>
      </PropertiesPanelHeader>
      <PropertiesPanelContent>
        {propertySections.map(section => {
          const isOpen = openSections.includes(section.id);
          return (
            <PropertySection key={section.id}>
              <SectionHeader 
                isOpen={isOpen} 
                onClick={() => toggleSection(section.id)}
              >
                <SectionIcon>
                  {isOpen ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                </SectionIcon>
                <SectionIcon>
                  {section.icon}
                </SectionIcon>
                <SectionName>{section.name}</SectionName>
              </SectionHeader>
              <SectionContent isOpen={isOpen}>
                {section.properties.map(property => renderPropertyControl(property))}
              </SectionContent>
            </PropertySection>
          );
        })}
      </PropertiesPanelContent>
    </PropertiesPanelContainer>
  );
};

export default PropertiesPanel;