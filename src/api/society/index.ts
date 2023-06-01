import service from '../../utils/service/index'
export function ActivityList() {
	return service.get('/soft2242/activity/list')
}
