import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  withCredentials: true,
})

export function makeRequest(url: string, options: any) {
  return api(url, options)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err?.response?.data?.message ?? 'Error'))
}
