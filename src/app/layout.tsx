import { ReactNode } from 'react'

import StyledComponentsRegistry from '@/lib/registry'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
