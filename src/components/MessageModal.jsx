import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useGameStore from '../store/gameStore';

const MessageModal = () => {
  const { showMessage, closeMessage } = useGameStore();

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40"
          onClick={closeMessage}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glassmorphism rounded-xl p-6 max-w-lg w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeMessage}
              className="absolute top-3 right-3 text-mystery-silver hover:text-mystery-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-8">
              <p className="font-orbitron text-lg text-mystery-gold leading-relaxed">
                {showMessage}
              </p>
            </div>

            <button
              onClick={closeMessage}
              className="mt-6 w-full bg-mystery-gold hover:bg-mystery-silver text-mystery-black font-orbitron font-bold py-2 rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
