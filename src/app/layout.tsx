'use client'

import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import StyledComponentsRegistry from '@/lib/registry'
import { POPPINS } from '@/theme'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body
        style={{
          padding: '12px',
          margin: 0,
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <Toaster
          toastOptions={{
            style: {
              fontFamily: POPPINS,
              fontWeight: 500,
            },
          }}
        />
        <StyledComponentsRegistry>
          {children}
          <div id="dialog" />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
