import { useCallback, useEffect, useState } from 'react'
import { SearchCustomType } from '../types/SearchCustom'

// execute immediately whenever the function is being call
export function useAsync<Type>(
{ func, dependencies }: { func: (params: SearchCustomType) => Promise<any>; dependencies?: [] }) {
  const { execute, ...state } = useAsyncInternal<Type>(func, dependencies, true)
  useEffect(() => {
    execute()
  }, [execute])
  return state
}

// execute when the function call is in another function
export function useAsyncFn<Type>(
  serviceFunc: (params: SearchCustomType) => Promise<any>,
  dependencies?: []
) {
  return useAsyncInternal<Type>(serviceFunc, dependencies, false)
}
/**
 * 
 * @param serviceFunc 
 * @param dependencies 
 * @param initialLoading 
 * @returns 
 */
export function useAsyncInternal<Type>(
  serviceFunc: (params: SearchCustomType) => Promise<any>,
  dependencies = [],
  initialLoading = false
) {
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState()
  const [value, setValue] = useState<Type>()

  const execute = useCallback(async (params?: SearchCustomType) => {
    setLoading(true)
    try {
      const data = await serviceFunc({ ...params })
      setValue(data)
      setError(undefined)
      return data
    } catch {
      setError(error)
      setValue(undefined)
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { loading, error, value, execute }
}
