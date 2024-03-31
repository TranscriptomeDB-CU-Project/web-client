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
  25: '#f5f5f5',
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
  200: '#FFC9C4',
  500: '#F26363',
  600: '#E74C4C',
}

export const BLUE = {
  100: '#D6DFFF',
  200: '#BDD8FF',
  500: '#4D6AB3',
  600: '#3A4D8C',
}

export const PALETTE = {
  PRIMARY,
  BLACK,
  WHITE,
  RED,
  BLUE,
}

export type PaletteColor = Lowercase<keyof typeof PALETTE>

type SubKey<T extends object> = keyof T extends infer K
  ? K extends string & keyof T
    ? T[K] extends object
      ? MyPaths<T[K]> & number
      : never
    : K
  : never

type Shade = SubKey<typeof PALETTE>

export const getPaletteColor = (color: PaletteColor, shade: Shade) => {
  if (color === 'white') return WHITE
  return PALETTE[color.toUpperCase() as keyof typeof PALETTE][shade as keyof (typeof PALETTE)[keyof typeof PALETTE]]
}

// modify from  https://stackoverflow.com/questions/71944996/typescript-create-union-type-based-on-existence-of-sub-keys-in-an-object

type MyPaths<T extends object> = keyof T extends infer K
  ? K extends string & keyof T
    ? T[K] extends object
      ? `${Lowercase<K>}${PrependDash<MyPaths<T[K]>>}`
      : never
    : K
  : never

type PrependDash<T> = [T] extends [never] ? '' : `-${T & number}`

export type Colors = MyPaths<typeof PALETTE> | 'white'

export const getColor = (color: Colors) => {
  if (color === 'white') return WHITE
  const [palette, shade] = color.split('-')
  return PALETTE[palette.toLocaleUpperCase() as keyof typeof PALETTE][
    Number(shade) as keyof (typeof PALETTE)[keyof typeof PALETTE]
  ]
}
