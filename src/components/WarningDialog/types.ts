import { DialogProps } from '@/components/Dialog/types'

export interface WarningDialogProps extends Omit<DialogProps, 'children'> {
  handleSubmit?: () => void | Promise<void>
}
