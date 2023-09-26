/**
 * Shuffles an array of numbers and null values randomly.
 *
 * @param {Array<number | null>} array - The array to be shuffled.
 * @returns {Array<number | null>} A shuffled version of the input array.
 *
 * @example
 * const originalArray = [1, 2, 3, null, 5];
 * const shuffledArray = shuffleArray(originalArray);
 * console.log(shuffledArray);
 * // (Possible) Output: [2, null, 1, 5, 3]
 */
const shuffleArray = (array: (number | null)[]): (number | null)[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Transposes a 2D array (matrix) by swapping rows with columns.
 *
 * @param {Array<Array<number | null>>} matrix - The 2D array to be transposed.
 * @returns {Array<Array<number | null>>} A transposed version of the input matrix.
 * @throws {Error} If the input matrix is invalid or contains undefined rows.
 *
 * @example
 * const originalMatrix = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9],
 * ];
 * const transposedMatrix = transpose(originalMatrix);
 * console.log(transposedMatrix);
 * // Output: [
 * //   [1, 4, 7],
 * //   [2, 5, 8],
 * //   [3, 6, 9],
 * // ]
 */
const transpose = (matrix: (number | null)[][]): (number | null)[][] => {
  if (matrix.length == 0) {
    return [];
  }

  if (matrix[0] === null) {
    throw new Error('Undefined matrix row 1.');
  }

  // Make a copy of original matrix.
  // Values can be the same, they will be replaced.
  const transposed = new Array(matrix.length);

  for (let i = 0; i < matrix.length; ++i) {
    transposed[i] = new Array(matrix[0].length);
  }
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[0].length; ++j) {
      transposed[j][i] = matrix[i][j];
    }
  }

  return transposed;
};

export { shuffleArray, transpose };
