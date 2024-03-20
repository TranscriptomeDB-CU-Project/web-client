import { ReactNode } from 'react'

export interface DialogProps {
  children?: ReactNode
  isOpen?: boolean
  backdropClose?: boolean
  onClose?: () => void
}
