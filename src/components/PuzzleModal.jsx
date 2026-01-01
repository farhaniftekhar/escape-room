import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useGameStore from '../store/gameStore';
import gameData from '../gameData.json';

const PuzzleModal = () => {
  const { showPuzzle, closePuzzle, solvePuzzle, addToInventory, showMessageModal } = useGameStore();
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  if (!showPuzzle) return null;

  const puzzle = gameData.puzzles[showPuzzle];
  if (!puzzle) return null;

  const handleSubmit = () => {
    if (userInput === puzzle.solution) {
      // Correct answer
      solvePuzzle(puzzle.id);
      
      // Give reward
      if (puzzle.reward?.type === 'item') {
        addToInventory(puzzle.reward.itemId);
      }
      
      showMessageModal(puzzle.successMessage);
      closePuzzle();
      setUserInput('');
      setError('');
    } else {
      // Wrong answer
      setError(puzzle.failMessage);
      setTimeout(() => setError(''), 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        onClick={closePuzzle}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glassmorphism rounded-2xl p-8 max-w-md w-full mx-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closePuzzle}
            className="absolute top-4 right-4 text-mystery-silver hover:text-mystery-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title */}
          <h3 className="font-cinzel text-2xl text-mystery-gold mb-4">
            {puzzle.title}
          </h3>

          {/* Description */}
          <p className="font-orbitron text-sm text-mystery-silver mb-6">
            {puzzle.description}
          </p>

          {/* Input based on puzzle type */}
          {puzzle.type === 'keypad' && (
            <div className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter code..."
                maxLength={puzzle.solution.length}
                className="w-full bg-mystery-black border-2 border-mystery-gold rounded-lg px-4 py-3 text-center font-orbitron text-2xl text-mystery-gold tracking-widest focus:outline-none focus:border-mystery-silver"
                autoFocus
              />

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 font-orbitron text-sm text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-mystery-gold hover:bg-mystery-silver text-mystery-black font-orbitron font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                SUBMIT
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PuzzleModal;
