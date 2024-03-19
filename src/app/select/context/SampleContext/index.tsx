import { createContext, PropsWithChildren, useContext } from 'react'

import useSwitch from '@/hooks/useSwitch'

import useColumn from './hooks/useColumn'
import useSampleHook from './hooks/useSample'
import useSelect from './hooks/useSelect'
import { ISampleContext } from './types'

export const SampleContext = createContext({} as ISampleContext)

export const useSample = () => useContext(SampleContext)

export const SampleProvider = ({ children }: PropsWithChildren<{}>) => {
  const token = ''
  const warning = useSwitch(false)
  const column = useColumn(token)
  const sample = useSampleHook(token, column)
  const select = useSelect(token, column)

  return <SampleContext.Provider value={{ column, sample, select, warning }}>{children}</SampleContext.Provider>
}
