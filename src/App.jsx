import React from 'react';
import GameContainer from './components/GameContainer';
import SceneView from './components/SceneView';
import InventoryBar from './components/InventoryBar';
import PuzzleModal from './components/PuzzleModal';
import MessageModal from './components/MessageModal';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <GameContainer>
      <SceneView />
      <InventoryBar />
      <PuzzleModal />
      <MessageModal />
      <VideoPlayer />
    </GameContainer>
  );
}

export default App;
