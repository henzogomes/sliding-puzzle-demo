import { NextApiRequest, NextApiResponse } from 'next';
import { PuzzleTileBaseProps } from '@/components/Puzzle';
import { initializePuzzleTiles } from '@/utils/puzzle';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let puzzleTiles: PuzzleTileBaseProps[] = [];

  if (req.method === 'POST') {
    const { body } = req;
    const { path, puzzleSize } = body;

    try {
      // Import the server-side utility function for initializing puzzle tiles.
      // Initialize puzzle tiles on the server side.
      puzzleTiles = await initializePuzzleTiles(path, puzzleSize);
    } catch (error) {
      console.error('Error initializing puzzle tiles:', error);
    }
  } else {
    // Handle other HTTP methods if needed...
    // Method Not Allowed.
    res.status(405).end();
  }

  res.status(200).json(puzzleTiles);
};
