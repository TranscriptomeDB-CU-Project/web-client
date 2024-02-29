import { Colors, PALETTE, TYPOGRAPHY } from '@/theme'
import styled, { css } from 'styled-components'
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

const getBgColor = ({ color, filled }: ButtonVariants) => {
  if (color === 'PRIMARY') return filled ? PALETTE.PRIMARY[700] : PALETTE.PRIMARY[100]
  return filled ? PALETTE[color][500] : PALETTE[color][100]
}

const getColor = ({ color, filled }: ButtonVariants) => {
  if (color === 'PRIMARY') return filled ? PALETTE.PRIMARY[50] : PALETTE.PRIMARY[800]
  return filled ? PALETTE[color][100] : PALETTE[color][500]
}

export const StyledButton = styled.button<ButtonVariants>`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  ${TYPOGRAPHY.body1}
  ${({ size }) => SIZE[size]}
  color: ${getColor};
  background-color: ${getBgColor};
`
