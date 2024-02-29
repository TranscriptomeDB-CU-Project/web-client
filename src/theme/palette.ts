export const PRIMARY = {
  50: '#F5F8F3',
  100: '#DFEAD9',
  200: '#D0E0C7',
  300: '#BBD2AD',
  400: '#ADC99D',
  500: '#99BC85',
  600: '#8BAB79',
  700: '#6D855E',
  800: '#546749',
  900: '#404F38',
  950: '#222D1D',
}

export const BLACK = {
  50: '#ededed',
  100: '#c6c8c6',
  200: '#aaadaa',
  300: '#848884',
  400: '#6c716c',
  500: '#474d47',
  600: '#414641',
  700: '#323732',
  800: '#272a27',
  900: '#1e201e',
}

export const WHITE = '#ffffff'

export const RED = {
  100: '#FFDADA',
  500: '#F26363',
}

export const BLUE = {
  100: '#D6DFFF',
  500: '#4D6AB3',
}

export const PALETTE = {
  PRIMARY,
  BLACK,
  WHITE,
  RED,
  BLUE,
}

export type Colors = keyof typeof PALETTE
