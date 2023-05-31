import service from '../../utils/service/index'
export function myCarport() {
	return service.post('/sys/carport/myPort')
}
export function updateCarport() {
	return service.put("/sys/carport")
}
export function saveCarport(form: any) {
    return service.post("/sys/carport")
}
