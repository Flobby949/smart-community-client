import service from '../../utils/service/index'
export function myCarport() {
	return service.post('/sys/carport/myPort')
}
export function updateCarport(ownerId: number) {
	return service.put(`/sys/carport?ownerId=${ownerId}`)
}
