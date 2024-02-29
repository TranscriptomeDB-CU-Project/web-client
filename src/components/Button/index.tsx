import { MouseEvent, useState } from 'react'
import { ButtonProps } from './types'
import { StyledButton } from './styled'

const Button = ({ size = 'small', color = 'PRIMARY', onClick, ...props }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return

    setIsLoading(true)
    await onClick?.(event)
    setIsLoading(false)
  }

  return <StyledButton onClick={handleClick} size={size} color={color} {...props} />
}

export default Button
