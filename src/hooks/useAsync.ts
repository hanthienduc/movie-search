import { useCallback, useEffect, useState } from 'react'
import { SearchCustomType } from '../types/SearchCustom'

// the execute function being execute immediately whenever the function is being called 
// and return the results from it
export function useAsync<Type>({
  func,
  dependencies,
}: {
  func: (params: SearchCustomType) => Promise<any>
  dependencies?: []
}) {
  const { execute, ...state } = useAsyncInternal<Type>(func, dependencies, true)
  useEffect(() => {
    execute()
  }, [execute])
  return state
}

// execute at the time the internal execute function being called
// and return the results from it
export function useAsyncFn<Type>(
  serviceFunc: (params: SearchCustomType) => Promise<any>,
  dependencies?: []
) {
  return useAsyncInternal<Type>(serviceFunc, dependencies, false)
}
/**
 * a function used a service function as based to make a request to api
 * with additional states loading, error, and values(result from the request)
 * @param serviceFunc function that make a request to the api end point
 * @param dependencies provide the dependencies for the useCallback hook
 * @param initialLoading set initial loading state of the api call
 * @returns {loading, error, value}
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
