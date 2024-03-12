import { RadioBoxContainer } from './styled'
import { RadioBoxProps } from './types'

const RadioBox = (props: RadioBoxProps) => {
  return (
    <RadioBoxContainer
      {...props}
      onChange={(ev) => {
        props.handleChecked?.(ev.currentTarget.checked)
      }}
    />
  )
}

export default RadioBox
