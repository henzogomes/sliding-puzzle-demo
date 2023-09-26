export interface ImageProps {
  src: string;
  alt: string;
}

export interface AvatarProps {
  id: number;
  image: ImageProps;
  active?: boolean;
  handleClick: (path: string, id: number) => void;
}
