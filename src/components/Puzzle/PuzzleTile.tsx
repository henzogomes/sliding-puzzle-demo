import Image from 'next/image'
import React from 'react'
import { PuzzleTileProps } from './types'

const PuzzleTile: React.FC<PuzzleTileProps> = (props: PuzzleTileProps) => {
  const { id, imageSrc, label, handleClick } = props
  const isEmpty = imageSrc === undefined

  return (
    <div className="puzzle-tile-container" onClick={handleClick}>
      <div className="puzzle-tile">
        {isEmpty ? (
          <div />
        ) : (
          <Image
            src={imageSrc}
            alt={`Puzzle Piece ${id}`}
            width="150"
            height="150"
            draggable={false}
          />
        )}
      </div>
      {label && <span>{label}</span>}
    </div>
  )
}

export default PuzzleTile
