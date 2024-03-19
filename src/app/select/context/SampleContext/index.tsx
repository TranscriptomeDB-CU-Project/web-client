import { createContext, PropsWithChildren, useContext } from 'react'

import useColumn from './hooks/useColumn'
import useSampleHook from './hooks/useSample'
import { ISampleContext } from './types'

export const SampleContext = createContext({} as ISampleContext)

export const useSample = () => useContext(SampleContext)

export const SampleProvider = ({ children }: PropsWithChildren<{}>) => {
  const token = ''
  const column = useColumn(token)
  const sample = useSampleHook(token, column)

  return <SampleContext.Provider value={{ column, sample }}>{children}</SampleContext.Provider>
}