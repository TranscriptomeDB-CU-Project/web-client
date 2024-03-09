import { Colors, TYPOGRAPHY } from '@/theme'

export interface TextProps {
  variant?: keyof typeof TYPOGRAPHY
  color?: Colors
  bg?: Colors
  fontSize?: string
}
