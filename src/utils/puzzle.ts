import path from 'path';
import Jimp from 'jimp';
import { PuzzleTileBaseProps } from '@/components/Puzzle';
import { transpose } from './common';

/**
 * Initializes a 2D board with the specified number of rows and columns,
 * filling it with sequential numbers and a null value in the last cell.
 *
 * @param {number} rows - The number of rows in the board.
 * @param {number} columns - The number of columns in the board.
 * @returns {Array<Array<number | null>>} The initialized 2D board.
 *
 * @example
 * const rows = 3;
 * const columns = 3;
 * const initializedBoard = initializeBoard(rows, columns);
 * console.log(initializedBoard);
 * // Output: [
 * //   [0, 1, 2],
 * //   [3, 4, 5],
 * //   [6, 7, null],
 * // ]
 */
const initializeBoard = (rows: number, columns: number): (number | null)[][] => {
  const board: (number | null)[][] = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      if (i === rows - 1 && j === columns - 1) {
        row.push(null);
        continue;
      }

      row.push(i * columns + j);
    }
    board.push(row);
  }

  return board;
};

/**
 * Unflattens a flattened board to a 2D board with the specified number of rows and columns.
 *
 * @param {Array<number | null>} flattenedBoard - The flattened board to be unflattened.
 * @param {number} rows - The number of rows in the unflattened board.
 * @param {number} columns - The number of columns in the unflattened board.
 * @returns {Array<Array<number | null>>} The unflattened 2D board.
 *
 * @example
 * const flattenedBoard = [1, 2, 3, null, 5, 6];
 * const rows = 2;
 * const columns = 3;
 * const unflattenedBoard = unflattenBoard(flattenedBoard, rows, columns);
 * console.log(unflattenedBoard);
 * // Output: [
 * //   [1, 2, 3],
 * //   [null, 5, 6],
 * // ]
 */
const unflattenBoard = (flattenedBoard: (number | null)[], rows: number, columns: number) => {
  const board = [];

  for (let i = 0; i < rows; i++) {
    const start = i * columns;
    const end = start + columns;
    const row = flattenedBoard.slice(start, end);
    board.push(row);
  }

  return board;
};

/**
 * Finds the position of the first empty cell (null) in a 2D board.
 *
 * @param {Array<Array<number | null>>} currentBoard - The 2D board to search.
 * @returns {[number, number] | undefined} The position of the empty cell as an array [row, column], or undefined if not found.
 *
 * @example
 * const board = [
 *   [1, 2, 3],
 *   [4, null, 6],
 *   [7, 8, 9],
 * ];
 * const emptyPosition = findEmptyPosition(board);
 * console.log(emptyPosition);
 * // Output: [1, 1]
 */
const findEmptyPosition = (currentBoard: (number | null)[][]): [number, number] | undefined => {
  for (let row = 0; row < currentBoard.length; row++) {
    for (let col = 0; col < currentBoard[row].length; col++) {
      if (currentBoard[row][col] === null) {
        return [row, col];
      }
    }
  }
  return undefined;
};

/**
 * Checks if a puzzle is solved by comparing the flattened tiles and the flattened board.
 * Assumes the tiles are vertically disposed in a row.
 *
 * @param {Array<Array<number | null>>} tiles - The 2D array representing the tiles' current arrangement.
 * @param {Array<Array<number | null>>} board - The 2D array representing the solved puzzle board.
 * @returns {boolean} True if the puzzle is solved, false otherwise.
 *
 * @example
 * const currentTiles = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, null],
 * ];
 * const solvedBoard = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, null],
 * ];
 * const isSolved = isPuzzleSolved(currentTiles, solvedBoard);
 * console.log(isSolved);
 * // Outputs: true
 */
const isPuzzleSolved = (tiles: (number | null)[][], board: (number | null)[][]): boolean => {
  // Needs to transpose matrix since on front implementation, the tiles cells
  // are disposed vertically in a row (better styling approach).
  const flatTiles = transpose(tiles).flat();
  const flatBoard = board.flat();

  // Different array lengths means the solution is not compatible with the board.
  if (flatTiles.length !== flatBoard.length) {
    return false;
  }

  for (let i = 0; i < flatTiles.length; i++) {
    // Elements at the same index that are not equal means the puzzle is not solved yet.
    if (flatTiles[i] !== flatBoard[i]) {
      return false;
    }
  }

  // All elements are equal.
  return true;
};

/**
 * Initializes puzzle tiles by splitting an image into a grid of tiles.
 *
 * @param {string} imageSrc - The source path of the image to be split.
 * @param {number} puzzleSize - The number of rows and columns for the puzzle grid.
 * @returns {Promise<Array<PuzzleTileBaseProps>>} A promise that resolves to an array of puzzle tile objects.
 *
 * @example
 * const imageSource = 'example-image.png';
 * const gridSize = 4; // 4x4 grid for the puzzle.
 * const puzzleTiles = await initializePuzzleTiles(imageSource, gridSize);
 * console.log(puzzleTiles);
 * // Outputs an array of puzzle tile objects.
 */
const initializePuzzleTiles = async (
  imageSrc: string,
  puzzleSize: number,
): Promise<PuzzleTileBaseProps[]> => {
  try {
    // Load the image using Jimp.
    const src = path.join(process.cwd(), `public/${imageSrc}`);
    const image = await Jimp.read(src);

    // Get image dimensions.
    const imageWidth = image.getWidth();
    const imageHeight = image.getHeight();

    // Define the number of rows and columns for the puzzle.
    const numRows = puzzleSize;
    const numCols = puzzleSize;

    // Initialize an array to hold puzzle tiles.
    const pieces: PuzzleTileBaseProps[] = [];

    // Calculate piece dimensions
    const tileWidth = Math.floor(imageWidth / numCols);
    const tileHeight = Math.floor(imageHeight / numRows);

    // Loop through rows and columns to split the image.
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const left = col * tileWidth;
        const top = row * tileHeight;

        // Clone the Jimp image to create a piece.
        const piece = image.clone().crop(left, top, tileWidth, tileHeight);

        // Convert the tile to a base64-encoded data URL.
        const pieceDataUrl = await piece.getBase64Async(Jimp.MIME_PNG);

        // Create a puzzle tile object and add it to the array.
        const pieceInfo: PuzzleTileBaseProps = {
          id: row * numCols + col,
          imageSrc: pieceDataUrl,
        };

        pieces.push(pieceInfo);
      }
    }

    return pieces;
  } catch (error) {
    console.error('Error loading image or splitting image:', error);
    return [];
  }
};

export {
  findEmptyPosition,
  initializeBoard,
  initializePuzzleTiles,
  isPuzzleSolved,
  unflattenBoard,
};
