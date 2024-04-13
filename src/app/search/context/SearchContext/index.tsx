import { useRouter } from 'next/navigation'
import { createContext, PropsWithChildren, useContext } from 'react'
import toast from 'react-hot-toast'

import SampleApi from '@/api/SampleApi'
import { useAppDispatch } from '@/store'
import selectedColActions from '@/store/selectedColumn/actions'

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
  const dispatch = useAppDispatch()

  const getToken = async () => {
    const error = validate(actions.complex.state)

    if (error) {
      toast.error(error)
      return
    }

    const query = constructQuery()

    dispatch(selectedColActions.addInitialColumns(query))
    const token = await SampleApi.getToken(query)
    router.push(`/select?token=${token}`)
  }

  return <SearchContext.Provider value={{ ...actions, ...generalParam, getToken }}>{children}</SearchContext.Provider>
}
