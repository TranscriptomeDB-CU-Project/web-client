import { createContext, PropsWithChildren, useContext } from 'react'
import toast from 'react-hot-toast'

import SampleApi from '@/api/SampleApi'

import { ISearchContext } from './types'
import useCondition from './useCondition'
import useGeneralParam from './useGeneralParam'
import useQuery from './useQuery'

export const SearchContext = createContext({} as ISearchContext)

export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({ children }: PropsWithChildren<{}>) => {
  const actions = useCondition()
  const generalParam = useGeneralParam()
  const { constructQuery, validate } = useQuery(actions, generalParam)

  const getToken = () => {
    const error = validate()

    if (error) {
      toast.error(error)
      return
    }

    return SampleApi.getToken(constructQuery())
  }

  return <SearchContext.Provider value={{ ...actions, ...generalParam, getToken }}>{children}</SearchContext.Provider>
}
