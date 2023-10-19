import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { Infobar } from '@/components/Infobar'
import { PageSection } from '@/components/PageSection'
import {
  GameState,
  PuzzleConfigs,
  PuzzleGame,
  PuzzleTileBaseProps,
  PuzzleTileProps
} from '@/components/Puzzle'
import { initializePuzzleTiles } from '@/utils/puzzle'
import { Loading } from '@/components/Loading'
import classNames from 'classnames'
import { flex } from '../../styled-system/patterns/flex'
import { grid } from '../../styled-system/patterns'
import { css } from '../../styled-system/css'

export async function getServerSideProps() {
  const puzzleSize: number = 3
  const avatarImageDirectory: string = 'images/avatars'
  const originalImageSrc: string = `${avatarImageDirectory}/dog1.jpeg`
  let avatarImageFilenames: string[] = []
  let puzzleTiles: PuzzleTileBaseProps[] = []

  try {
    const imageDirectory = path.join(
      process.cwd(),
      `public/${avatarImageDirectory}`
    )
    avatarImageFilenames = fs.readdirSync(imageDirectory)
  } catch (error) {
    console.error('Error loading avatars:', error)
  }

  try {
    // Import the server-side utility function for initializing puzzle tiles.
    // Initialize puzzle tiles on the server side.
    puzzleTiles = await initializePuzzleTiles(originalImageSrc, puzzleSize)
  } catch (error) {
    console.error('Error initializing puzzle pieces:', error)
  }

  return {
    props: {
      avatarImageDirectory,
      avatarImageFilenames,
      originalImageSrc,
      puzzleSize,
      puzzleTiles
    }
  }
}

interface HomeProps {
  avatarImageDirectory: string
  avatarImageFilenames: string[]
  originalImageSrc: string
  puzzleSize: number
  puzzleTiles: PuzzleTileProps[]
}

const Home: React.FC<HomeProps> = ({
  avatarImageDirectory,
  avatarImageFilenames,
  originalImageSrc,
  puzzleSize,
  puzzleTiles
}) => {
  const initialGameState = {
    moves: 0,
    new: true,
    ended: false,
    puzzleSolved: false
  }

  const toggleMusic = (checked: boolean) => {
    const audio = document.getElementById('omfgaudio') as HTMLAudioElement

    if (checked) {
      if (audio) {
        audio.play()
      }
    } else {
      if (audio) {
        audio.pause()
      }
    }

    setMusic(checked)
  }

  const [tiles, setTiles] = useState<PuzzleTileProps[]>(puzzleTiles)
  const [originalSrc, setOriginalSrc] = useState<string>(originalImageSrc)
  const [size, setSize] = useState<number>(puzzleSize)
  const [path, setPath] = useState<string>(originalImageSrc)
  const [showNumbers, setShowNumbers] = useState<boolean>(false)
  const [displayMirror, setDisplayMirror] = useState<boolean>(true)
  const [music, setMusic] = useState<boolean>(false)
  const [gameState, setGameState] = useState<GameState>({
    ...initialGameState,
    timeRemaining: 0,
    timer: 0
  })

  const [avatarActiveId, setAvatarActiveId] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(false)

  const updatePuzzleGame = (puzzleSize: number, path: string) => {
    setLoading(true)

    console.log('loading')
    // Handle the click event here
    // Send an HTTP request to the server
    fetch('/api/load-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // You can send data in the request body if needed
      body: JSON.stringify({ puzzleSize, path })
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        setOriginalSrc(path)
        setTiles(data)
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleClick = (path: string, idx: number) => {
    setPath(path)
    setAvatarActiveId(idx)
  }

  const setPuzzleSize = (value: number[]) => {
    setSize(value[0])
  }

  const setTimer = (value: string) => {
    const newTimer = Number(value) * 60

    setGameState((prevState) => ({
      ...prevState,
      ...initialGameState,
      timeRemaining: newTimer,
      timer: newTimer
    }))
  }

  const setTimeRemaining = (time: number) => {
    setGameState((prevState) => ({
      ...prevState,
      timeRemaining: time
    }))
  }

  const toggleMirror = (checked: boolean) => {
    setDisplayMirror(checked)
  }

  const toggleTilesNumbers = (checked: boolean) => {
    setShowNumbers(checked)
  }

  const handleRestartClick = () => {
    setGameState((prevState) => ({
      ...prevState,
      ...initialGameState,
      timeRemaining: gameState.timer
    }))
  }

  useEffect(() => {
    updatePuzzleGame(size, path)
  }, [size, path])

  useEffect(() => {
    if (gameState.timer > 0 && gameState.timeRemaining === 0) {
      setGameState((prevState) => ({
        ...prevState,
        ended: true,
        puzzleSolved: false
      }))
    }
  }, [gameState.timer, gameState.timeRemaining])

  const title = 'The Sausage Dog Sliding Puzzle'
  const description = 'Demo'

  const timerOptions = [
    { name: 'Unlimited', value: '0' },
    { name: '1 hour', value: '60' },
    { name: '30 minutes', value: '30' },
    { name: '10 minutes', value: '10' },
    { name: '5 minutes', value: '5' },
    { name: '1 minute', value: '1' }
  ]

  const avatarContainer = classNames(
    grid({ columns: 5, gap: 10 }),
    css({ py: 25 })
  )

  const puzzleConfigs = classNames(
    flex({ align: 'center', justify: 'center', gap: 24 }),
    css({ margin: '24px 0 ' })
  )

  const puzzleContainer = classNames(grid({ columns: 2, gap: 16 }))

  const originalImageOverlay = classNames(
    css({
      bg: 'secondary',
      height: '100%',
      left: 0,
      opacity: 0.985,
      position: 'absolute',
      top: 0,
      width: '100%'
    })
  )

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Loading isLoading={loading} />
      <PageSection>
        <h1 className={css({ textStyle: 'typographyH1', py: 35 })}>{title}</h1>
      </PageSection>
      <div className={css({ bg: 'primary' })}>
        <PageSection>
          <div className={avatarContainer}>
            {avatarImageFilenames.map((avatar, idx) => (
              <Avatar
                key={idx}
                id={idx}
                image={{
                  src: `${avatarImageDirectory}/${avatar}`,
                  alt: `${avatar.replace('.jpeg', '')}`
                }}
                active={avatarActiveId === idx}
                handleClick={handleClick}
              />
            ))}
          </div>
        </PageSection>
      </div>
      <PageSection>
        <div className={puzzleConfigs}>
          <PuzzleConfigs
            timerOptions={timerOptions}
            setPuzzleSize={setPuzzleSize}
            setTimer={setTimer}
            toggleMirror={toggleMirror}
            toggleTilesNumbers={toggleTilesNumbers}
            toggleMusic={toggleMusic}
          />
        </div>
        <div className={puzzleContainer}>
          <PuzzleGame
            puzzleTiles={tiles}
            showTilesNumbers={showNumbers}
            gameState={gameState}
            setGameState={setGameState}
          />
          <div className={css({ position: 'relative' })}>
            <Image
              src={`/${originalSrc}`}
              alt="Original Image"
              width="500"
              height="500"
            />
            {!displayMirror && <div className={originalImageOverlay}></div>}
          </div>
        </div>
        <div className={css({ margin: '24px 0 ' })}>
          <Infobar
            moves={gameState.moves}
            timer={gameState.timer}
            setTimeRemaining={setTimeRemaining}
            handleRestartClick={handleRestartClick}
          />
        </div>
      </PageSection>

      <audio id="omfgaudio" loop={true}>
        <source src="/audio/omfgdogs.mp3" type="audio/mpeg" />
      </audio>
    </>
  )
}

export default Home
