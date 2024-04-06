'use client'

import { ReactNode } from 'react'
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
      <body
        style={{
          margin: 0,
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
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
      </body>
    </html>
  )
}
