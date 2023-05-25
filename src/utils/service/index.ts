import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

import NProgress from 'nprogress'

const service = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 5000
})

service.interceptors.request.use(
    (req: InternalAxiosRequestConfig) => {
        NProgress.start()
        return req
    },
    (err: AxiosError) => {
        return Promise.reject(err)
    }
)

service.interceptors.response.use(
    (response: AxiosResponse) => {
        NProgress.done()
        return response.data
    },
    (err: AxiosError) => {
        return Promise.reject(err)
    }
)

export default service
