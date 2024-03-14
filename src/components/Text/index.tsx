import styled from 'styled-components'

import { getColor, TYPOGRAPHY } from '@/theme'

import { TextProps } from './types'

export const Text = styled.div.withConfig({
  shouldForwardProp: (props) => !['variant', 'color', 'fontSize', 'bg', 'center'].includes(props),
})<TextProps>`
  ${({ variant }) => TYPOGRAPHY[variant ?? 'body1']}
  color: ${({ color }) => getColor(color ?? 'primary-950')};
  background-color: ${({ bg }) => (bg ? getColor(bg) : 'transparent')};
  font-size: ${({ fontSize }) => fontSize};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`
export default Text
