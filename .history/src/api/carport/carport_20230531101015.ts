import service from '../../utils/service/index'
export function myHouse() {
	return service.post('/owner/myHouse')
}
