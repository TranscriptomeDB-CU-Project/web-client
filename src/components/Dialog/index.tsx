'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Backdrop, DialogContainer } from './styled'
import { DialogProps } from './types'

const Dialog = ({ children, isOpen, onClose, backdropClose = true }: DialogProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [isOpen])

  if (typeof document === 'undefined' || !isMounted) return null
  if (!isOpen) return null

  return createPortal(
    <DialogContainer>
      <div style={{ zIndex: 100 }} onClick={(ev) => ev.stopPropagation()}>
        {children}
      </div>
      <Backdrop
        onClick={() => {
          if (!backdropClose) onClose?.()
        }}
      />
    </DialogContainer>,
    document.getElementById('dialog')!,
  )
}

export default Dialog
