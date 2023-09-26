export interface InfobarProps {
  moves: number;
  timer: number;
  handleRestartClick: () => void;
  setTimeRemaining: (time: number) => void;
}
