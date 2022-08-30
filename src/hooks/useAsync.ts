import { useCallback, useEffect, useState } from 'react'
import { SearchCustomType } from '../types/SearchCustom'

// execute immediately whenever the function is being call
export function useAsync<Type>(
  func: (params: SearchCustomType) => Promise<any>,
  dependencies?: []
) {
  const { execute, ...state } = useAsyncInternal<Type>(func, dependencies, true)
  useEffect(() => {
    execute()
  }, [execute])
  return state
}

// execute when the function call is in another function
export function useAsyncFn<Type>(
  func: (params: SearchCustomType) => Promise<any>,
  dependencies?: []
) {
  return useAsyncInternal<Type>(func, dependencies, false)
}

export function useAsyncInternal<Type>(
  func: (params: SearchCustomType) => Promise<any>,
  dependencies?: [],
  initialLoading = false
) {
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState()
  const [value, setValue] = useState<Type>()

  const execute = useCallback(async (params?: any) => {
    setLoading(true)
    try {
      const data = await func({ ...params })
      setValue(data)
      setError(undefined)
      return data
    } catch {
      setError(error)
      setValue(undefined)
    } finally {
      setLoading(false)
    }
  }, dependencies ?? [])

  return { loading, error, value, execute }
}
