import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaStepForward, FaStepBackward, FaCut, FaFolder, FaSave } from 'react-icons/fa';

const HeaderContainer = styled.header`
  grid-area: header;
  background-color: #2d2d2d;
  color: #e6e6e6;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #1a1a1a;
`;

const MenuBar = styled.div`
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid #1a1a1a;
`;

const MenuItem = styled.div`
  margin-right: 15px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #8ab4f8;
  }
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;

const ToolButton = styled.button`
  background-color: transparent;
  color: #e6e6e6;
  border: none;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

const ProjectTitle = styled.div`
  margin-left: auto;
  font-weight: bold;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <MenuBar>
        <MenuItem>File</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Clip</MenuItem>
        <MenuItem>Sequence</MenuItem>
        <MenuItem>Graphics</MenuItem>
        <MenuItem>View</MenuItem>
        <MenuItem>Window</MenuItem>
        <MenuItem>Help</MenuItem>
      </MenuBar>
      <ToolBar>
        <ToolButton title="Open Project">
          <FaFolder />
        </ToolButton>
        <ToolButton title="Save Project">
          <FaSave />
        </ToolButton>
        <ToolButton title="Cut">
          <FaCut />
        </ToolButton>
        <ToolButton title="Previous Frame">
          <FaStepBackward />
        </ToolButton>
        <ToolButton title="Play/Pause">
          <FaPlay />
        </ToolButton>
        <ToolButton title="Next Frame">
          <FaStepForward />
        </ToolButton>
        <ProjectTitle>Video Editor Portfolio</ProjectTitle>
      </ToolBar>
    </HeaderContainer>
  );
};

export default Header;