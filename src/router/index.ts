import { createRouter, createWebHashHistory, type RouteLocationNormalized } from 'vue-router'
import routes from './routes'
import { useCachedViewStoreHook } from '@/store/modules/cachedView'
import NProgress from '@/utils/progress'

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export interface toRouteType extends RouteLocationNormalized {
	meta: {
		title?: string
		noCache?: boolean
	}
}
const whitePath = ['/login', '/forget', '/code', '/first', '/msg']
router.beforeEach((to: toRouteType, from, next) => {
	if (to.path === '/Home') {
		// 获取query参数
		const query = to.query.token
		console.log(query)

		if (query) {
			localStorage.setItem('accessToken', query.toString())
		}
	}

	const token = localStorage.getItem('accessToken')
	NProgress.start()

	// 路由缓存
	// useCachedViewStoreHook().addCachedView(to);
	if (!token && !whitePath.includes(to.path)) {
		next('/first')
	}
	// 页面 title
	document.title = '智慧管家业主' + '-' + to.meta.title
	next()
})

router.afterEach(() => {
	NProgress.done()
})

export default router
