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

export function getMyCartParkVO() {
	return service.post('/sys/park/car/list')
}
