import { ComponentProps, JSXElementConstructor } from 'react'

type RemovePrefix<T> = {
  [K in keyof T as K extends `$${infer Rest}` ? Rest : K]: T[K]
}

export type Variants<S extends JSXElementConstructor<any>, T> = Partial<RemovePrefix<T>> &
  Omit<ComponentProps<S>, keyof T>
