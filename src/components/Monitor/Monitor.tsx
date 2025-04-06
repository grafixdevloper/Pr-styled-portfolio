import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaExpand, FaCompress, FaPlay, FaPause } from 'react-icons/fa';
import YouTube from 'react-youtube';
import { useMediaContext } from '../../context/MediaContext';

const MonitorContainer = styled.div`
  grid-area: monitor;
  background-color: #232323;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #1a1a1a;
  border-right: 1px solid #1a1a1a;
`;

const MonitorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #1a1a1a;
`;

const MonitorTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const MonitorControls = styled.div`
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  background-color: transparent;
  color: #e6e6e6;
  border: none;
  margin-left: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

const VideoPreview = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  position: relative;
  overflow: hidden;
`;

const VideoContent = styled.div`
  width: 80%;
  max-height: 80%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
  }
`;

const PlayButton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const TransportControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #2d2d2d;
  border-top: 1px solid #1a1a1a;
`;

const TimeDisplay = styled.div`
  font-family: monospace;
  margin: 0 15px;
  font-size: 14px;
`;



const Monitor: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { selectedItem } = useMediaContext();
  const playerRef = useRef<any>(null);
  
  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const isRealEstateVideo = selectedItem?.name === 'Real Estate.mp4';
  const youtubeVideoId = 'dVICHgxW6tg';
  


  const onReady = (event: any) => {
    playerRef.current = event.target;
  };

  const onStateChange = (event: any) => {
    // YouTube state: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    setIsPlaying(event.data === 1);
  };
  
  return (
    <MonitorContainer>
      <MonitorHeader>
        <MonitorTitle>Program</MonitorTitle>
        <MonitorControls>
          <ControlButton onClick={toggleFullscreen}>
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </ControlButton>
        </MonitorControls>
      </MonitorHeader>
      <VideoPreview>
        <VideoContent>
          {isRealEstateVideo ? (
            <YouTube
              videoId={youtubeVideoId}
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 0,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              onReady={onReady}
              onStateChange={onStateChange}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          ) : (
            <h2>{selectedItem ? selectedItem.name : 'Select a video from Project Bin'}</h2>
          )}
          <VideoOverlay onClick={togglePlay}>
            <PlayButton>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </PlayButton>
          </VideoOverlay>
        </VideoContent>
      </VideoPreview>
      <TransportControls>
        <ControlButton onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </ControlButton>
        <TimeDisplay>{selectedItem?.duration || '00:00:00:00'}</TimeDisplay>
      </TransportControls>
    </MonitorContainer>
  );
};

export default Monitor;