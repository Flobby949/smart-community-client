import service from '../../utils/service/index'
export function myCarport() {
	return service.post('/sys/carport/myPort')
}
