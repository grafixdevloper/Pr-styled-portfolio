import React, { useState } from 'react';
import styled from 'styled-components';
import { FaLock, FaEye, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const TimelineContainer = styled.div`
  grid-area: timeline;
  background-color: #232323;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #1a1a1a;
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #1a1a1a;
`;

const TimelineTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const TimelineControls = styled.div`
  display: flex;
`;

const TimelineContent = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
  position: relative;
`;

const TrackLabels = styled.div`
  width: 150px;
  background-color: #2d2d2d;
  border-right: 1px solid #1a1a1a;
  flex-shrink: 0;
`;

const TrackLabel = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid #1a1a1a;
`;

const TrackName = styled.div`
  flex: 1;
  font-size: 12px;
`;

const TrackControls = styled.div`
  display: flex;
  gap: 5px;
`;

const TrackButton = styled.button`
  background-color: transparent;
  color: #e6e6e6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

const TracksArea = styled.div`
  flex: 1;
  position: relative;
  background-color: #1a1a1a;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px
  );
  background-size: 50px 100%;
`;

const Track = styled.div`
  height: 40px;
  border-bottom: 1px solid #1a1a1a;
  position: relative;
`;

const Clip = styled.div<{ width: number; left: number; color: string }>`
  position: absolute;
  height: 80%;
  top: 10%;
  width: ${props => props.width}px;
  left: ${props => props.left}px;
  background-color: ${props => props.color};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    filter: brightness(1.1);
  }
`;

const TimeRuler = styled.div`
  height: 25px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #1a1a1a;
  display: flex;
  align-items: flex-end;
  padding-bottom: 2px;
  position: relative;
`;

const TimeMarker = styled.div<{ left: number }>`
  position: absolute;
  left: ${props => props.left}px;
  height: 100%;
  width: 1px;
  background-color: #e6e6e6;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #e6e6e6;
  }
`;

const Timeline: React.FC = () => {
  const [currentTime] = useState(150);
  
  // Sample clips data
  const clips = [
    { id: 1, track: 0, start: 50, width: 200, name: 'Intro Animation', color: '#4285F4' },
    { id: 2, track: 1, start: 100, width: 300, name: 'Main Sequence', color: '#EA4335' },
    { id: 3, track: 2, start: 150, width: 250, name: 'B-Roll', color: '#FBBC05' },
    { id: 4, track: 3, start: 200, width: 150, name: 'Outro', color: '#34A853' },
  ];
  
  return (
    <TimelineContainer>
      <TimelineHeader>
        <TimelineTitle>Timeline</TimelineTitle>
        <TimelineControls>
          {/* Timeline controls would go here */}
        </TimelineControls>
      </TimelineHeader>
      <TimelineContent>
        <TrackLabels>
          <TimeRuler />
          <TrackLabel>
            <TrackName>Video 1</TrackName>
            <TrackControls>
              <TrackButton title="Toggle Lock">
                <FaLock size={10} />
              </TrackButton>
              <TrackButton title="Toggle Visibility">
                <FaEye size={10} />
              </TrackButton>
            </TrackControls>
          </TrackLabel>
          <TrackLabel>
            <TrackName>Video 2</TrackName>
            <TrackControls>
              <TrackButton title="Toggle Lock">
                <FaLock size={10} />
              </TrackButton>
              <TrackButton title="Toggle Visibility">
                <FaEye size={10} />
              </TrackButton>
            </TrackControls>
          </TrackLabel>
          <TrackLabel>
            <TrackName>Video 3</TrackName>
            <TrackControls>
              <TrackButton title="Toggle Lock">
                <FaLock size={10} />
              </TrackButton>
              <TrackButton title="Toggle Visibility">
                <FaEye size={10} />
              </TrackButton>
            </TrackControls>
          </TrackLabel>
          <TrackLabel>
            <TrackName>Audio 1</TrackName>
            <TrackControls>
              <TrackButton title="Toggle Mute">
                <FaVolumeMute size={10} />
              </TrackButton>
              <TrackButton title="Toggle Solo">
                <FaVolumeUp size={10} />
              </TrackButton>
            </TrackControls>
          </TrackLabel>
        </TrackLabels>
        <TracksArea>
          <TimeRuler>
            <TimeMarker left={currentTime} />
          </TimeRuler>
          <Track>
            {clips.filter(clip => clip.track === 0).map(clip => (
              <Clip 
                key={clip.id}
                width={clip.width}
                left={clip.start}
                color={clip.color}
              >
                {clip.name}
              </Clip>
            ))}
          </Track>
          <Track>
            {clips.filter(clip => clip.track === 1).map(clip => (
              <Clip 
                key={clip.id}
                width={clip.width}
                left={clip.start}
                color={clip.color}
              >
                {clip.name}
              </Clip>
            ))}
          </Track>
          <Track>
            {clips.filter(clip => clip.track === 2).map(clip => (
              <Clip 
                key={clip.id}
                width={clip.width}
                left={clip.start}
                color={clip.color}
              >
                {clip.name}
              </Clip>
            ))}
          </Track>
          <Track>
            {clips.filter(clip => clip.track === 3).map(clip => (
              <Clip 
                key={clip.id}
                width={clip.width}
                left={clip.start}
                color={clip.color}
              >
                {clip.name}
              </Clip>
            ))}
          </Track>
        </TracksArea>
      </TimelineContent>
    </TimelineContainer>
  );
};

export default Timeline;