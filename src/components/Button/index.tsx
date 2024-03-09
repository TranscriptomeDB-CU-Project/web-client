import { MouseEvent, useState } from 'react'

import { StyledButton } from './styled'
import { ButtonProps } from './types'

const Button = ({ size = 'small', color = 'primary', filled, onClick, ...props }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return

    setIsLoading(true)
    await onClick?.(event)
    setIsLoading(false)
  }

  return <StyledButton onClick={handleClick} $size={size} $color={color} $filled={filled} {...props} />
}

export default Button
