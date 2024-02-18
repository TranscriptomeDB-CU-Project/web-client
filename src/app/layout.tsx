import StyledComponentsRegistry from '@/lib/registry'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={poppins.className}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
