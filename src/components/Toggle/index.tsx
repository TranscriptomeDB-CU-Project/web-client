import { ToggleContainer } from './styled'
import { ToggleProps } from './types'

const Toggle = ({ onToggle, value, color }: ToggleProps) => {
  return (
    <ToggleContainer $color={color} onClick={onToggle}>
      {value}
    </ToggleContainer>
  )
}

export default Toggle
