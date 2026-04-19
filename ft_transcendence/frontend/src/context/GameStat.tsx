import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext({
	gs: 'ChooseGame',
	setGs: (ns: string) => {}
});

function GameProvider({ children }: any) {
  const [gameState, setGameState] = useState<string>('choosingSettings'); // Initial state

  const updateGameState = (newState: string) => {
    setGameState(newState);
  };

  return (
    <GameContext.Provider value={{ gs: gameState ,setGs: updateGameState }}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider }
