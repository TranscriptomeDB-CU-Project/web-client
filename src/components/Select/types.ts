export interface SelectProps {
  value: any
  items: {
    value: any
    label: string
  }[]
  onChange: (value: any) => void
  disabled?: boolean
}
