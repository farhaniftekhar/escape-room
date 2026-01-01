import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';
import useGameStore from '../store/gameStore';

const VideoPlayer = () => {
  const { showVideo, closeVideo } = useGameStore();
  const videoRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideo]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    closeVideo();
  };

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <button
            onClick={closeVideo}
            className="absolute top-4 right-4 text-white hover:text-mystery-gold transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <video
            ref={videoRef}
            src={showVideo}
            className="max-w-full max-h-full"
            onEnded={handleVideoEnd}
            controls
          />

          <button
            onClick={togglePlayPause}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glassmorphism p-4 rounded-full hover:bg-mystery-gold hover:text-mystery-black transition-all"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayer;
