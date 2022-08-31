import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  withCredentials: false,
})
/**
 * a function used to return the result from the api call
 * @param url api end points
 * @param options  specify method, data for the request
 * @returns a Promise with data as success state and error message as reject state 
 */
export function makeRequest(url: string, options: any) {
  return api(url, options)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err?.response?.data?.message ?? 'Error'))
}
