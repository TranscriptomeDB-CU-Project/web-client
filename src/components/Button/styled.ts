import styled, { css } from 'styled-components'

import { getPaletteColor, PALETTE, TYPOGRAPHY } from '@/theme'

import { ButtonVariants } from './types'

const SIZE = {
  small: css`
    font-size: 14px;
    padding: 0 10px;
  `,
  medium: css`
    padding: 2px 15px;
  `,
  large: css`
    padding: 8px 20px;
  `,
}

const getBgColor = ({ $color: color, $filled: filled }: ButtonVariants) => {
  if (color === 'primary') return filled ? PALETTE.PRIMARY[700] : PALETTE.PRIMARY[100]
  return filled ? getPaletteColor(color, 500) : getPaletteColor(color, 100)
}

const getColor = ({ $color: color, $filled: filled }: ButtonVariants) => {
  if (color === 'primary') return filled ? PALETTE.PRIMARY[50] : PALETTE.PRIMARY[800]
  return filled ? getPaletteColor(color, 100) : getPaletteColor(color, 500)
}

export const StyledButton = styled.button<ButtonVariants>`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  ${TYPOGRAPHY.body1}
  ${({ $size }) => SIZE[$size]}
  color: ${getColor};
  background-color: ${getBgColor};
`
