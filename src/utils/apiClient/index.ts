import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/_api' : process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 60000,
  withCredentials: true,
})
