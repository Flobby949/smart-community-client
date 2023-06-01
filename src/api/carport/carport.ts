import service from '../../utils/service/index'
export function myCarport() {
	return service.post('/sys/carport/myPort')
}
export function updateCarport() {
	return service.put('/sys/carport')
}
export function saveCarport(form: any) {
	return service.post('/sys/carport', form)
}
export function getCommunityList() {
	return service.get('/sys/community/list')
}
export function getParkList() {
	return service.get('/sys/park/list')
}

export function getCarList() {
	return service.get('/sys/car/list')
}
export function saveCar(form: any) {
	return service.post('/sys/car', form)
}
export function getMyCartParkVO() {
	return service.post('/sys/park/car/list')
}
/**
 * 获取没有拥有者的车位列表，也就是说状态是0的车位列表
 */
export function getNoOwnerList(){
	return service.get('/sys/carport/noOwner')
}
export function getUser() {
	return service.post('/user/info')
}

