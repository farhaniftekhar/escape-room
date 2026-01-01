import { create } from 'zustand';
import gameData from '../gameData.json';

const useGameStore = create((set, get) => ({
  // Game state
  currentScene: gameData.initialState.currentScene,
  inventory: gameData.initialState.inventory,
  solvedPuzzles: gameData.initialState.solvedPuzzles,
  discoveredClues: gameData.initialState.discoveredClues,
  startTime: null,
  gameWon: false,
  
  // UI state
  showPuzzle: null,
  showVideo: null,
  showMessage: null,
  
  // Actions
  startGame: () => set({ startTime: Date.now() }),
  
  changeScene: (sceneId) => set({ currentScene: sceneId }),
  
  addToInventory: (itemId) => {
    const { inventory } = get();
    if (!inventory.includes(itemId)) {
      set({ inventory: [...inventory, itemId] });
    }
  },
  
  removeFromInventory: (itemId) => {
    const { inventory } = get();
    set({ inventory: inventory.filter(id => id !== itemId) });
  },
  
  hasItem: (itemId) => {
    const { inventory } = get();
    return inventory.includes(itemId);
  },
  
  solvePuzzle: (puzzleId) => {
    const { solvedPuzzles } = get();
    if (!solvedPuzzles.includes(puzzleId)) {
      set({ solvedPuzzles: [...solvedPuzzles, puzzleId] });
    }
  },
  
  isPuzzleSolved: (puzzleId) => {
    const { solvedPuzzles } = get();
    return solvedPuzzles.includes(puzzleId);
  },
  
  addClue: (clueText) => {
    const { discoveredClues } = get();
    if (!discoveredClues.includes(clueText)) {
      set({ discoveredClues: [...discoveredClues, clueText] });
    }
  },
  
  openPuzzle: (puzzleId) => set({ showPuzzle: puzzleId }),
  
  closePuzzle: () => set({ showPuzzle: null }),
  
  playVideo: (videoUrl) => set({ showVideo: videoUrl }),
  
  closeVideo: () => set({ showVideo: null }),
  
  showMessageModal: (message) => set({ showMessage: message }),
  
  closeMessage: () => set({ showMessage: null }),
  
  winGame: () => set({ gameWon: true }),
  
  resetGame: () => set({
    currentScene: gameData.initialState.currentScene,
    inventory: [],
    solvedPuzzles: [],
    discoveredClues: [],
    startTime: null,
    gameWon: false,
    showPuzzle: null,
    showVideo: null,
    showMessage: null,
  }),
  
  getElapsedTime: () => {
    const { startTime } = get();
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 1000);
  },
}));

export default useGameStore;
