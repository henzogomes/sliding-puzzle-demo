import { Dispatch, SetStateAction } from 'react';

export interface PuzzleTileBaseProps {
  id: number;
  imageSrc?: string;
}

export type PuzzleTileProps = PuzzleTileBaseProps & {
  label: string | false;
  handleClick: () => void;
};

export interface GameState {
  ended: boolean;
  puzzleSolved: boolean;
  moves: number;
  new: boolean;
  timeRemaining: number;
  timer: number;
}

export interface PuzzleGameProps {
  puzzleTiles: PuzzleTileProps[];
  showTilesNumbers: boolean;
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export interface PuzzleConfigsProps {
  timerOptions: {
    name: string;
    value: string;
  }[];
  setPuzzleSize: (value: number[]) => void;
  setTimer: (value: string) => void;
  toggleMirror: (checked: boolean) => void;
  toggleTilesNumbers: (checked: boolean) => void;
}
