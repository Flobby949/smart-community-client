import service from '../../utils/service/index'
export function myHouse() {
	return service.post('/sys/myHouse')
}
