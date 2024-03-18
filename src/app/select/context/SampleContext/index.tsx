import { createContext, PropsWithChildren, useContext } from 'react'

import useColumn from './hooks/useColumn'
import { ISampleContext } from './types'

export const SampleContext = createContext({} as ISampleContext)

export const useSample = () => useContext(SampleContext)

export const SampleProvider = ({ children }: PropsWithChildren<{}>) => {
  const token = ''
  const column = useColumn(token)

  return <SampleContext.Provider value={{ column }}>{children}</SampleContext.Provider>
}
