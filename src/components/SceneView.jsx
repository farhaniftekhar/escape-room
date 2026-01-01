import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';
import gameData from '../gameData.json';
import Hotspot from './Hotspot';

const SceneView = () => {
  const { currentScene, startTime, startGame } = useGameStore();
  const scene = gameData.scenes[currentScene];
  
  useEffect(() => {
    if (!startTime) {
      startGame();
    }
  }, [startTime, startGame]);

  if (!scene) {
    return (
      <div className="w-full h-full flex items-center justify-center text-mystery-gold">
        <p className="font-cinzel text-2xl">Scene not found</p>
      </div>
    );
  }

  return (
    <motion.div
      key={currentScene}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${scene.background})`,
        }}
      />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-mystery-black opacity-60" />
      
      {/* Hotspots */}
      <div className="absolute inset-0">
        {scene.hotspots.map((hotspot) => (
          <Hotspot key={hotspot.id} hotspot={hotspot} />
        ))}
      </div>
      
      {/* Scene Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center"
      >
        <h2 className="font-cinzel text-2xl text-mystery-gold drop-shadow-lg">
          {scene.name}
        </h2>
        <p className="font-orbitron text-xs text-mystery-silver mt-1 opacity-80">
          {scene.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SceneView;
