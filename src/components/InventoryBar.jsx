import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, PackageOpen } from 'lucide-react';
import useGameStore from '../store/gameStore';
import gameData from '../gameData.json';

const InventoryBar = () => {
  const { inventory, getElapsedTime } = useGameStore();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [getElapsedTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute bottom-0 left-0 right-0 h-24 glassmorphism flex items-center justify-between px-8"
    >
      {/* Timer */}
      <div className="flex items-center gap-3">
        <Timer className="w-6 h-6 text-mystery-gold" />
        <div>
          <p className="font-orbitron text-xs text-mystery-silver">Time Elapsed</p>
          <p className="font-orbitron text-xl text-mystery-gold font-bold">
            {formatTime(elapsedTime)}
          </p>
        </div>
      </div>

      {/* Inventory */}
      <div className="flex-1 flex items-center justify-center gap-4 px-8">
        <PackageOpen className="w-6 h-6 text-mystery-gold" />
        <p className="font-orbitron text-sm text-mystery-silver">Inventory:</p>
        
        <div className="flex gap-3">
          <AnimatePresence>
            {inventory.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-orbitron text-sm text-mystery-silver opacity-60"
              >
                Empty
              </motion.p>
            ) : (
              inventory.map((itemId, index) => {
                const item = gameData.items[itemId];
                return (
                  <motion.div
                    key={itemId}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ delay: index * 0.1 }}
                    className="glassmorphism px-4 py-2 rounded-lg border border-mystery-gold hover:bg-mystery-purple transition-all cursor-pointer group"
                    title={item?.description || item?.name}
                  >
                    <p className="font-orbitron text-sm text-mystery-gold group-hover:text-white">
                      {item?.name || itemId}
                    </p>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Placeholder for menu */}
      <div className="w-32" />
    </motion.div>
  );
};

export default InventoryBar;
