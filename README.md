# Escape Room Game Engine

A high-fidelity, immersive web-based "Escape Room" game engine built with React, featuring point-and-click adventure gameplay with rich media support.

![Escape Room Screenshot](https://github.com/user-attachments/assets/b34c9097-96b1-4fee-a790-3bf9b64875d6)

## Features

- 🎮 **Point-and-Click Gameplay**: Interactive hotspots with hover effects
- 🎨 **Cinematic Design**: Dark Mystery theme with glassmorphism UI elements
- 📦 **Inventory System**: Collect and manage items
- 🧩 **Puzzle System**: Keypad puzzles, pattern puzzles, and riddles
- ⏱️ **Game Timer**: Track your escape time
- 🎬 **Media Support**: Background images and video cutscene support
- ✨ **Smooth Animations**: Powered by Framer Motion
- 🎯 **State Management**: Zustand for efficient game state handling

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Cinzel, Orbitron)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/farhaniftekhar/escape-room.git
cd escape-room
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Game Architecture

### Data Structure

The game is driven by a JSON configuration file (`src/gameData.json`) that defines:

- **Scenes**: Each scene has a background image, description, and hotspots
- **Hotspots**: Interactive areas that can:
  - Add items to inventory
  - Trigger puzzle modals
  - Navigate to other scenes
  - Display clues
  - Win the game
- **Puzzles**: Challenges that players must solve
- **Items**: Collectible objects stored in inventory

### Components

- **GameContainer**: Manages aspect ratio and responsive layout
- **SceneView**: Renders the current scene with background and hotspots
- **Hotspot**: Interactive clickable areas with hover effects
- **InventoryBar**: Displays collected items and game timer (HUD)
- **PuzzleModal**: Generic puzzle interface (keypad, patterns, riddles)
- **MessageModal**: Displays messages and notifications
- **VideoPlayer**: Full-screen video cutscene player

### State Management

The game state is managed by Zustand store (`src/store/gameStore.js`) and includes:

- Current scene
- Inventory items
- Solved puzzles
- Discovered clues
- Game timer
- UI modals (puzzle, video, message)

## Customizing the Game

### Adding New Scenes

Edit `src/gameData.json` and add a new scene object:

```json
{
  "scenes": {
    "yourSceneId": {
      "id": "yourSceneId",
      "name": "Your Scene Name",
      "background": "https://your-image-url.jpg",
      "description": "Scene description",
      "hotspots": [...]
    }
  }
}
```

### Adding Hotspots

Hotspots are positioned using percentage coordinates (x, y, width, height):

```json
{
  "id": "uniqueId",
  "type": "puzzle|item|navigation|clue|win",
  "x": 45,
  "y": 55,
  "width": 15,
  "height": 20,
  "label": "Hotspot Name",
  "hoverText": "Hover message"
}
```

### Creating Puzzles

Add puzzles to the `puzzles` object in `gameData.json`:

```json
{
  "puzzles": {
    "yourPuzzleId": {
      "id": "yourPuzzleId",
      "type": "keypad",
      "title": "Puzzle Title",
      "description": "Instructions",
      "solution": "1234",
      "reward": {
        "type": "item",
        "itemId": "yourItemId"
      }
    }
  }
}
```

### Styling

The game uses a custom color palette defined in `tailwind.config.js`:

- `mystery-black`: Deep black background
- `mystery-purple`: Rich purple accents
- `mystery-gold`: Gold highlights
- `mystery-silver`: Silver text

## Current Game Flow

1. Start in the **Locked Study Room**
2. Search the **Bookshelf** to find an old key
3. Examine the **Painting** to discover a clue (code: 7-3-9-2)
4. Click the **Desk** to open the keypad puzzle
5. Enter the code to get the **Master Key**
6. Use the master key to unlock the **Door**
7. Proceed to the **Hallway** and reach the exit to win!

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── GameContainer.jsx
│   ├── SceneView.jsx
│   ├── Hotspot.jsx
│   ├── InventoryBar.jsx
│   ├── PuzzleModal.jsx
│   ├── MessageModal.jsx
│   └── VideoPlayer.jsx
├── store/              # State management
│   └── gameStore.js
├── gameData.json       # Game configuration
├── App.jsx             # Main app component
└── index.css           # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

- Add more puzzle types (pattern matching, drag-and-drop)
- Implement save/load game functionality
- Add sound effects and background music
- Create a level editor
- Add achievements system
- Multi-language support

## License

MIT

## Credits

- Built with React and Vite
- UI animations by Framer Motion
- Icons by Lucide React
- Placeholder images from Unsplash
