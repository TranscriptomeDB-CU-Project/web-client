'use client'

import { ReactNode } from 'react'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import Loading from '@/components/Loading'
import Text from '@/components/Text'
import StyledComponentsRegistry from '@/lib/registry'
import { store } from '@/store'
import { POPPINS } from '@/theme'

import { DesktopContainer, MobileContainer } from './styled'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>Transcriptome DB</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        style={{
          margin: 0,
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <Suspense>
          <Provider store={store}>
            <Loading />
            <Toaster
              toastOptions={{
                style: {
                  fontFamily: POPPINS,
                  fontWeight: 500,
                },
              }}
            />
            <StyledComponentsRegistry>
              <DesktopContainer>{children}</DesktopContainer>
              <MobileContainer>
                <Text style={{ textAlign: 'center' }} variant="h2" color="white">
                  Please open this website in desktop 🙏🙏🙏
                </Text>
              </MobileContainer>
              <div id="dialog" />
            </StyledComponentsRegistry>
          </Provider>
        </Suspense>
      </body>
    </html>
  )
}
