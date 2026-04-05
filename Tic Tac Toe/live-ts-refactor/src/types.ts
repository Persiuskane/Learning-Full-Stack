export type Player = {
  id: number;
  name: string;
  iconClass: string;
  colorClass: string;
};

export type Move = {
  squareId: number;
  player: Player;
};

export type GameStatus = {
  isComplete: boolean;
  winner: Player | null;
};

export type Game = {
  moves: Move[];
  status: GameStatus;
};

export type DerivedGame = {
  moves: Move[];
  currentPlayer: Player;
  status: GameStatus;
};

export type PlayerStats = {
  wins: number;
  id: number;
  name: string;
  iconClass: string;
  colorClass: string;
};

export type GameStats = {
  playerWithStats: PlayerStats[];
  ties: number;
};

export type Gamestate = {
  currentGameMoves: Move[];
  history: {
    currentRoundGames: Game[];
    allGames: Game[];
  };
};
