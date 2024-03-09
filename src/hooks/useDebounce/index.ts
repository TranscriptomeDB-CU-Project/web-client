import { useEffect } from 'react'

import { UseDebounceParams } from './types'

const useDebounce = (params: UseDebounceParams) => {
  const { debounceValue, originalValue, onChange, time = 300 } = params

  useEffect(() => {
    if (debounceValue !== originalValue) {
      const timeout = setTimeout(async () => {
        onChange(debounceValue)
      }, time)

      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, onChange])
}

export default useDebounce
