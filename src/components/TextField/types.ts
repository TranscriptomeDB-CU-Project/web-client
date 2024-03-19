import { InputHTMLAttributes } from 'react'

export interface TextFieldProps {
  onChange: (value: string) => void
  value: string
  placeholder?: string
  search?: boolean
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  disabled?: boolean

  getSuggestions?: (value: string) => Promise<string[]>
  onSelectSuggestion?: (value: string) => void
  isLoading?: boolean
}
