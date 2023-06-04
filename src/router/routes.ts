import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import Forget from '@/views/forget/index.vue'
import Code from '@/views/login/code/index.vue'
const routes: Array<RouteRecordRaw> = [
	{
		path: '/first',
		name: 'first',
		component: () => import('@/views/first/index.vue'),
		meta: {
			title: '启动页',
			noCache: true
		}
	},
	{
		path: '/msg',
		name: 'msg',
		component: () => import('@/views/first/msg/index.vue'),
		meta: {
			title: '协议',
			noCache: true
		}
	},
	{
		path: '/',
		name: 'root',
		component: Layout,
		redirect: '/home',
		meta: {
			title: '首页'
		},
		children: [
			// 前五个tabbar
			{
				path: 'home',
				name: 'Home',
				component: Home,
				meta: {
					title: '主页'
				}
			},
			{
				path: 'my',
				name: 'My',
				component: () => import('@/views/my/index.vue'),
				meta: {
					title: '我的',
					noCache: true
				}
			},
			{
				path: 'notice',
				name: 'notice',
				component: () => import('@/views/notice/index.vue'),
				meta: {
					title: '消息',
					noCache: true
				}
			},
			{
				path: 'Open',
				name: 'Open',
				component: () => import('@/views/open/index.vue'),
				meta: {
					title: '开门',
					noCache: true
				}
			},
			{
				path: 'service',
				name: 'Service',
				component: () => import('@/views/service/index.vue'),
				meta: {
					title: '服务',
					noCache: true
				}
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录'
		},
		component: Login
	},
	{
		path: '/forget',
		name: 'forget',
		meta: {
			title: '忘记密码'
		},
		component: Forget
	},
	{
		path: '/code',
		name: 'code',
		meta: {
			title: '登录'
		},
		component: Code
	},
	// 业务页面
	{
		path: '/family',
		name: 'family',
		component: () => import('@/views/my/family.vue'),
		meta: {
			title: '家庭成员'
		}
	},
	{
		path: '/activityDetail/:activityId',
		name: 'activityDetail',
		component: () => import('@/views/home/activityDetail.vue'),
		meta: {
			title: '社区活动详情'
		}
	},
	{
		path: '/invitation',
		name: 'invitation',
		component: () => import('@/views/home/invitation.vue'),
		meta: {
			title: '访客邀请'
		}
	},
	{
		path: '/invitation/historyList',
		name: 'historyList',
		component: () => import('@/views/home/invitationHistoryList.vue'),
		meta: {
			title: '访客邀请记录'
		}
	},
	{
		path: '/invitation/openHistory',
		name: 'openHistory',
		component: () => import('@/views/home/gateOpenHistory.vue'),
		meta: {
			title: '开门记录'
		}
	},
	{
		path: '/house',
		name: 'house',
		component: () => import('@/views/my/house.vue'),
		meta: {
			title: '我的房屋'
		}
	},
	{
		path: '/paymentList',
		name: 'paymentList',
		component: () => import('@/views/service/paymentList.vue'),
		meta: {
			title: '账单列表'
		}
	},
	{
		path: '/payment/:orderId',
		name: 'payment',
		component: () => import('@/views/service/payment.vue'),
		meta: {
			title: '账单详情'
		}
	},
	{
		path: '/payment/paymentHistory',
		name: 'paymentHistory',
		component: () => import('@/views/service/paymentHistory.vue'),
		meta: {
			title: '缴费记录'
		}
	},
	{
		path: '/carport',
		name: 'carport',
		component: () => import('@/views/service/carport.vue'),
		meta: {
			title: '我的车位'
		}
	},
	{
		path: '/addCarport',
		name: 'addCarport',
		component: () => import('@/views/service/addCarport.vue'),
		meta: {
			title: '添加车位'
		}
	},
	{
		path: '/car',
		name: 'car',
		component: () => import('@/views/service/car.vue'),
		meta: {
			title: '我的车辆'
		}
	},
	{
		path: '/bindCar',
		name: 'bindCar',
		component: () => import('@/views/service/bindCar.vue'),
		meta: {
			title: '绑定车辆'
		}
	},
	{
		path: '/carBill',
		name: 'carBill',
		component: () => import('@/views/service/carBill.vue'),
		meta: {
			title: '停车账单'
		}
	},
	{
		path: '/billRecord',
		name: 'billRecord',
		component: () => import('@/views/service/billRecord.vue'),
		meta: {
			title: '停车账单'
		}
	},
	{
		path: '/repair',
		name: 'repair',
		component: () => import('@/views/service/repair.vue'),
		meta: {
			title: '在线报修'
		}
	},
	{
		path: '/addRepair/:type',
		name: 'addRepair',
		component: () => import('@/views/service/addRepair.vue'),
		meta: {
			title: '添加报修'
		}
	},
	{
		path: '/repairDetail/:repairId',
		name: 'repairDetail',
		component: () => import('@/views/service/repairDetail.vue'),
		meta: {
			title: '报修详情'
		}
	},
	{
		path: '/complaint',
		name: 'complaint',
		component: () => import('@/views/service/complaint.vue'),
		meta: {
			title: '投诉建议'
		}
	},
	{
		path: '/addComplaint',
		name: 'addComplaint',
		component: () => import('@/views/service/addComplaint.vue'),
		meta: {
			title: '添加投诉'
		}
	},
	{
		path: '/complaintDetail/:complaintId',
		name: 'complaintDetail',
		component: () => import('@/views/service/complaintDetail.vue'),
		meta: {
			title: '投诉详情'
		}
	},
	{
		path: '/noticeDetail/:noticeId',
		name: 'noticeDetail',
		component: () => import('@/views/notice/noticeDetail.vue'),
		meta: {
			title: '通知详情'
		}
	},
	{
		path: '/phone',
		name: 'phone',
		component: () => import('@/views/service/propertyPhone.vue'),
		meta: {
			title: '联系物业'
		}
	},
	{
		path: '/addFamily',
		name: 'addFamily',
		component: () => import('@/views/my/addFamily.vue'),
		meta: {
			title: '添加家属'
		}
	},
	{
		path: '/certified',
		name: 'certified',
		component: () => import('@/views/my/certified.vue'),
		meta: {
			title: '业主认证'
		}
	},
	{
		path: '/profile',
		name: 'profile',
		component: () => import('@/views/my/profile.vue'),
		meta: {
			title: '个人信息'
		}
	},
	{
		path: '/device',
		name: 'device',
		component: () => import('@/views/open/device.vue'),
		meta: {
			title: '设备'
		}
	},
	{
		path: '/addHouse',
		name: 'addHouse',
		component: () => import('@/views/my/addHouse.vue'),
		meta: {
			title: '添加房屋'
		}
	},
	{
		path: '/review',
		name: 'review',
		component: () => import('@/views/open/review.vue'),
		meta: {
			title: '审核记录'
		}
	},
	{
		path: '/addReview',
		name: 'addReview',
		component: () => import('@/views/open/addReview.vue'),
		meta: {
			title: '门禁审核'
		}
	}
]

export default routes
