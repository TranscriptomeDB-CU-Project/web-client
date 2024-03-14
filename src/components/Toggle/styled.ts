import styled from 'styled-components'

import Text from '../Text'
import { ToggleVariants } from './types'

const getColor = ({ $color }: ToggleVariants) => {
  if ($color === undefined) return 'primary-950'
  return $color === 'green' ? 'primary-800' : 'red-500'
}

const getBackgroundColor = ({ $color }: ToggleVariants) => {
  if ($color === undefined) return 'primary-50'
  return $color === 'green' ? 'primary-100' : 'red-100'
}

export const ToggleContainer = styled(Text).attrs<ToggleVariants>(({ $color }) => ({
  variant: 'body1',
  color: getColor({ $color }),
  bg: getBackgroundColor({ $color }),
}))`
  border: none;
  border-radius: 5px;
  padding: 3px 10px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  white-space: nowrap;
`
