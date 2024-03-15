import { createContext, PropsWithChildren, useContext } from 'react'

import { ISearchContext } from './types'
import useCondition from './useCondition'
import useQuery from './useQuery'

export const SearchContext = createContext({} as ISearchContext)

export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({ children }: PropsWithChildren<{}>) => {
  const actions = useCondition()
  const { constructQuery, validate } = useQuery(actions)

  const getToken = () => {
    const error = validate('root')

    if (error) {
      console.error('error', error)
      return
    }

    console.log(constructQuery())
  }

  return <SearchContext.Provider value={{ ...actions, getToken }}>{children}</SearchContext.Provider>
}
