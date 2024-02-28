import { Poppins, Sarabun } from 'next/font/google'
import { css } from 'styled-components'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const sarabun = Sarabun({ subsets: ['latin'], weight: ['400'] })

export const TYPOGRAPHY = {
  h1: css`
    font-size: 48px;
    font-weight: 700;
    font-family: ${poppins.style.fontFamily};
  `,
  h2: css`
    font-size: 28px;
    font-weight: 700;
    font-family: ${poppins.style.fontFamily};
  `,
  h3: css`
    font-size: 18px;
    font-weight: 600;
    font-family: ${poppins.style.fontFamily};
  `,
  body1: css`
    font-size: 16px;
    font-weight: 500;
    font-family: ${poppins.style.fontFamily};
  `,
  body2: css`
    font-size: 14px;
    font-weight: 400;
    font-family: ${sarabun.style.fontFamily};
  `,
}
