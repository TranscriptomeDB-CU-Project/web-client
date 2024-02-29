import { ComponentProps } from 'react'
import { StyledButton } from './styled'
import { Colors } from '@/theme'

export interface ButtonVariants {
  size: 'small' | 'medium' | 'large'
  color: Colors
  filled?: boolean
}

export type ButtonProps = Partial<ButtonVariants> & Omit<ComponentProps<typeof StyledButton>, 'size' | 'color'>
