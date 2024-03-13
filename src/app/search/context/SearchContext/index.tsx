import { createContext, PropsWithChildren, useContext } from 'react'

import { ISearchContext } from './types'
import useCondition from './useCondition'

export const SearchContext = createContext({} as ISearchContext)

export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({ children }: PropsWithChildren<{}>) => {
  const actions = useCondition()

  return <SearchContext.Provider value={actions}>{children}</SearchContext.Provider>
}
