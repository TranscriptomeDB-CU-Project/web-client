import { useCallback, useState } from 'react'

const useSwitch = () => {
  const [state, setState] = useState(false)

  const toggle = useCallback(() => {
    setState((prevState) => !prevState)
  }, [])

  const setOn = useCallback(() => {
    setState(true)
  }, [])

  const setOff = useCallback(() => {
    setState(false)
  }, [])

  return {
    state,
    toggle,
    setOn,
    setOff,
  }
}

export default useSwitch
