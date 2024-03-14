import { CheckboxContainer } from './styled'
import { CheckboxProps } from './types'

const Checkbox = (props: CheckboxProps) => {
  return <CheckboxContainer {...props} onChange={(ev) => props.handleChecked?.(ev.currentTarget.checked)} />
}

export default Checkbox
