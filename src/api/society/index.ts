import service from '../../utils/service/index'
// 活动模块
export function ActivityList() {
	return service.get('/soft2242/activity/list')
}

// 订单
export function OrderListByUserId(id: number, status: number) {
	return service.get(`/soft2242/order/listById?id=${id}&status=${status}`)
}
export function getOrderByOrderId(id: any) {
	return service.get(`/soft2242/order/` + id)
}

// 访客
export function addInvitation(data: any) {
	return service.post('/soft2242/visitor/addHistory', data)
}
