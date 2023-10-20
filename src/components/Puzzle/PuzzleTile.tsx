import Image from 'next/image'
import React from 'react'
import { PuzzleTileProps } from './types'
import classNames from 'classnames'
import { css } from '../../../styled-system/css'
import { textShadow } from '../../../styled-system/recipes'

const PuzzleTile: React.FC<PuzzleTileProps> = (props: PuzzleTileProps) => {
  const { id, imageSrc, label, handleClick } = props
  const isEmpty = imageSrc === undefined

  const puzzleTileContainer = classNames(
    css({ paddingBottom: '100%', position: 'relative', w: '100%' })
  )

  const puzzleTile = classNames(
    css({
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0
    })
  )

  const tileNumber = classNames(
    css({
      color: 'white',
      fontSize: '22px',
      position: 'absolute',
      p: '5px',
      textTransform: 'uppercase'
    }),
    textShadow()
  )

  return (
    <div className={puzzleTileContainer} onClick={handleClick}>
      <div className={puzzleTile}>
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
      {label && <span className={tileNumber}>{label}</span>}
    </div>
  )
}

export default PuzzleTile
