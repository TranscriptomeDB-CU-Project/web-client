import { Colors } from '@/theme'
import { Variants } from '@/utils/types/variants'

import { StyledButton } from './styled'

export interface ButtonVariants {
  $size: 'small' | 'medium' | 'large'
  $color: Colors
  $filled?: boolean
}

export type ButtonProps = Variants<typeof StyledButton, ButtonVariants>
