import { createContext, PropsWithChildren, useContext } from 'react'

import { ISearchContext } from './types'
import useCondition from './useCondition'
import useQuery from './useQuery'

export const SearchContext = createContext({} as ISearchContext)

export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({ children }: PropsWithChildren<{}>) => {
  const actions = useCondition()
  const { constructQuery } = useQuery(actions, actions.complex.state)

  return <SearchContext.Provider value={{ ...actions, constructQuery }}>{children}</SearchContext.Provider>
}
