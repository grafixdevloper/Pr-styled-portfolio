import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import Timeline from '../Timeline/Timeline';
import Monitor from '../Monitor/Monitor';
import ProjectBin from '../ProjectBin/ProjectBin';
import EffectsPanel from '../EffectsPanel/EffectsPanel';
import PropertiesPanel from '../PropertiesPanel/PropertiesPanel';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 250px;
  grid-template-columns: 250px 1fr 250px;
  grid-template-areas:
    "header header header"
    "project-bin monitor effects"
    "timeline timeline properties";
  height: 100vh;
  width: 100vw;
  background-color: #232323;
  color: #e6e6e6;
  overflow: hidden;
`;

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <ProjectBin />
      <Monitor />
      <EffectsPanel />
      <Timeline />
      <PropertiesPanel />
    </LayoutContainer>
  );
};

export default Layout;