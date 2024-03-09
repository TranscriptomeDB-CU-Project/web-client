import { Variants } from '@/utils/types/variants'

import { ToggleContainer } from './styled'

export interface ToggleVariants {
  $color?: 'red' | 'green'
}

export interface ToggleProps extends Variants<typeof ToggleContainer, ToggleVariants> {
  onToggle: () => void
  value: string
}
