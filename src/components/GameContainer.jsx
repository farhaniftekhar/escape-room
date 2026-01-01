import React from 'react';

const GameContainer = ({ children }) => {
  return (
    <div className="w-full h-full bg-mystery-black flex items-center justify-center">
      <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video">
        {children}
      </div>
    </div>
  );
};

export default GameContainer;
