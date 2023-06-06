import service from '../../utils/service/index'
// 活动模块
export function ActivityList(communityId: number) {
	return service.get('/soft2242/activity/list/' + communityId)
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
export function gateOpenListByUserId(id: any) {
	return service.get('/soft2242/visitor/gateOpenHistoryList/' + id)
}
export function invitaionListByUserId(id: any) {
	return service.get('/soft2242/visitor/history2/' + id)
}
export function invalidStatus(id: any) {
	return service.put('/soft2242/visitor/status/' + id)
}
