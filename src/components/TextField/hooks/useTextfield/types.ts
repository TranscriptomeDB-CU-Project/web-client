import { TextFieldProps } from '../../types'

export interface UseTextfieldParams extends Pick<TextFieldProps, 'value' | 'onChange'> {
  showSuggestion: (value: string) => void
}
