import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { showFailToast } from 'vant'
import NProgress from 'nprogress'

const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_API,
	timeout: 5000
})

service.interceptors.request.use(
	(req: InternalAxiosRequestConfig) => {
		NProgress.start()
		req.headers['Authorization'] = localStorage.getItem('accessToken')
		return req
	},
	(err: AxiosError) => {
		return Promise.reject(err)
	}
)

service.interceptors.response.use(
	(response: AxiosResponse) => {
		NProgress.done()
		let res = response.data
		// if (res.code === 401) {
		// 	// localStorage.clear()
		// 	// window.location.reload()
		// 	return Promise.reject(res)
		// }
		if (res.code === 500) {
			showFailToast(res.msg)
			return Promise.reject(res)
		}
		return res
	},
	(err: AxiosError) => {
		return Promise.reject(err)
	}
)

export default service
