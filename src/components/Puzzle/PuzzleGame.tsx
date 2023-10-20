import React, { useEffect, useState } from 'react'
import { shuffleArray } from '@/utils/common'
import {
  findEmptyPosition,
  initializeBoard,
  isPuzzleSolved,
  unflattenBoard
} from '@/utils/puzzle'
import PuzzleTile from './PuzzleTile'
import { PuzzleGameProps } from './types'
import classNames from 'classnames'
import { css } from '../../../styled-system/css'
import { grid } from '../../../styled-system/patterns'

const PuzzleGame = (props: PuzzleGameProps) => {
  const { puzzleTiles, showTilesNumbers, gameState, setGameState } = props

  const puzzleSize: number = Math.sqrt(puzzleTiles.length)
  const board: (number | null)[][] = initializeBoard(puzzleSize, puzzleSize)

  const [boardTiles, setBoardTiles] = useState<(number | null)[][]>(board)

  /**
   * Click handler for every tile click.
   */
  const handleTileClick = (row: number, col: number): void => {
    const emptyPosition = findEmptyPosition(boardTiles)

    if (!emptyPosition) {
      return
    }

    const [emptyRow, emptyCol] = emptyPosition

    // Check if clicked tile is adjacent to the empty position so the
    // move can be considered valid.
    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)

    if (isAdjacent) {
      const tiles = [...boardTiles]
      // Switch the clicked tile with the empty position.
      tiles[emptyRow][emptyCol] = boardTiles[row][col]
      tiles[row][col] = null
      // Update board and state.
      setBoardTiles(tiles)
      setGameState((prevState) => ({
        ...prevState,
        moves: gameState.moves + 1
      }))

      if (isPuzzleSolved(tiles, board)) {
        setGameState((prevState) => ({
          ...prevState,
          ended: true,
          puzzleSolved: true
        }))
      }
    }
  }

  /**
   * Restart the game by re-shuffling the puzzle tiles on the board and
   * making 'new' flag false to propagate React states.
   */
  const restart = () => {
    const flattenedBoard = shuffleArray(board.flat())
    const boardTiles = unflattenBoard(flattenedBoard, puzzleSize, puzzleSize)
    setBoardTiles(boardTiles)
    setGameState((prevState) => ({
      ...prevState,
      new: false
    }))
  }

  useEffect(() => {
    restart()
  }, [puzzleSize])

  useEffect(() => {
    if (gameState.new) {
      restart()
    }
  }, [gameState.new])

  const puzzleOuterWrapper = classNames(
    css({
      maxW: '100%',
      lg: {
        w: '50%'
      },
      md: {
        w: '50%'
      },
      sm: {
        w: '70%'
      },
      smDown: {
        w: '90%'
      }
    })
  )

  const puzzleInnerWrapper = classNames(
    grid({
      gap: 0,
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
    })
  )

  return (
    <>
      <div className={puzzleOuterWrapper}>
        <div className={puzzleInnerWrapper}>
          {boardTiles.map((row, rowIndex) => (
            <div key={rowIndex} className={grid({ gap: 0 })}>
              {row.map((tile, colIndex) => (
                <PuzzleTile
                  key={colIndex}
                  id={tile !== null ? puzzleTiles[tile].id : -1}
                  imageSrc={
                    tile !== null ? puzzleTiles[tile].imageSrc : undefined
                  }
                  label={
                    tile !== null && showTilesNumbers ? `${tile + 1}` : false
                  }
                  handleClick={() => handleTileClick(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
        {gameState.ended && <div>Congratulations! </div>}
      </div>
    </>
  )
}

export default PuzzleGame
