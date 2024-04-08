import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  const getToken = async () => {
    const error = validate()

    if (error) {
      toast.error(error)
      return
    }

    const token = await SampleApi.getToken(constructQuery())
    router.push(`/select?token=${token}`)
  }

  return <SearchContext.Provider value={{ ...actions, ...generalParam, getToken }}>{children}</SearchContext.Provider>
}
