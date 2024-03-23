'use client'

import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import StyledComponentsRegistry from '@/lib/registry'
import { POPPINS } from '@/theme'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
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
