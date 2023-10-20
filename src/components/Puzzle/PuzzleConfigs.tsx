import { PuzzleConfigsProps } from './types'
import { HoverCard } from '../HoverCard'
import { Switch } from '../Switch'
import { flex } from '../../../styled-system/patterns'
import classNames from 'classnames'
import { desktopOnly } from '../../../styled-system/recipes'

const PuzzleConfigs = (props: PuzzleConfigsProps) => {
  const { toggleMirror, toggleTilesNumbers, toggleMusic } = props

  const puzzleItem = classNames(
    flex({ align: 'center', justify: 'center', gap: 16 })
  )

  return (
    <>
      <div className={puzzleItem}>
        <Switch
          id="switch-tile-number-display"
          label="Show Numbers"
          handleChange={toggleTilesNumbers}
        />
        <HoverCard
          triggerText="?"
          content="Switch configuration to display the number of the piece over each tile. This is a helper for the players."
        />
      </div>
      <div className={desktopOnly()}>
        <div className={puzzleItem}>
          <Switch
            id="switch-mirror-display"
            label="Display Mirror"
            handleChange={toggleMirror}
            defaultChecked={true}
          />
          <HoverCard
            triggerText="?"
            content="Switch configuration to display the original image. This is a helper for the players."
          />
        </div>
      </div>

      <div className={puzzleItem}>
        <Switch
          id="switch-music"
          label="Play music"
          handleChange={toggleMusic}
          defaultChecked={false}
        />
      </div>
    </>
  )
}

export default PuzzleConfigs
