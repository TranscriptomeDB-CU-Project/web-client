import { InputHTMLAttributes } from 'react'

export interface RadioBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  handleChecked?: (checked: boolean) => void
}
