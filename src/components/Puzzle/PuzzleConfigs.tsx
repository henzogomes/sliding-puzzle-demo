import { PuzzleConfigsProps } from './types'
import { HoverCard } from '../HoverCard'
import { Switch } from '../Switch'

const PuzzleConfigs = (props: PuzzleConfigsProps) => {
  const { toggleMirror, toggleTilesNumbers, toggleMusic } = props

  return (
    <>
      <div className="puzzle-configs-item">
        <Switch
          id="switch-tile-number-display"
          label="Show Tiles Numbers"
          handleChange={toggleTilesNumbers}
        />
        <HoverCard
          triggerText="?"
          content="Switch configuration to display the number of the piece over each tile. This is a helper for the players."
        />
      </div>
      <div className="device-desktop-only">
        <div className="puzzle-configs-item">
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

      <div className="device-desktop-only">
        <div className="puzzle-configs-item">
          <Switch
            id="switch-music"
            label="Play music"
            handleChange={toggleMusic}
            defaultChecked={false}
          />
        </div>
      </div>
    </>
  )
}

export default PuzzleConfigs
