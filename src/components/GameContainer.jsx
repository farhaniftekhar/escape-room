import React from 'react';

const GameContainer = ({ children }) => {
  return (
    <div className="w-full h-full bg-mystery-black">
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default GameContainer;
