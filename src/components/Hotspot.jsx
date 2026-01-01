import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../store/gameStore';
import gameData from '../gameData.json';

const Hotspot = ({ hotspot }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    hasItem,
    addToInventory,
    changeScene,
    openPuzzle,
    addClue,
    showMessageModal,
    winGame,
  } = useGameStore();

  const handleClick = () => {
    switch (hotspot.type) {
      case 'item':
        if (!hasItem(hotspot.itemId)) {
          addToInventory(hotspot.itemId);
          showMessageModal(hotspot.message || 'Item collected!');
        }
        break;
        
      case 'puzzle':
        openPuzzle(hotspot.puzzleId);
        break;
        
      case 'navigation':
        if (hotspot.requiredItem && !hasItem(hotspot.requiredItem)) {
          showMessageModal(hotspot.lockedMessage || 'You cannot go there yet.');
        } else {
          changeScene(hotspot.targetScene);
        }
        break;
        
      case 'clue':
        addClue(hotspot.clueText);
        showMessageModal(hotspot.clueText);
        break;
        
      case 'win':
        winGame();
        showMessageModal(hotspot.message || 'Congratulations! You won!');
        break;
        
      default:
        break;
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Invisible clickable area */}
      <div className="w-full h-full" />
      
      {/* Hover effect */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 border-2 border-mystery-gold rounded-lg hotspot-glow"
        />
      )}
      
      {/* Hover label */}
      {isHovered && hotspot.hoverText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <div className="glassmorphism px-4 py-2 rounded-lg">
            <p className="font-orbitron text-sm text-mystery-gold">
              {hotspot.hoverText}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Hotspot;
