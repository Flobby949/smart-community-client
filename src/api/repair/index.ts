import service from '@/utils/service'

export function getRepairPage(data: any) {
	return service.get('/property/repair/page', {
		params: data
	})
}

export function getRepairById(id: any) {
	return service.get('/property/repair/' + id)
}

export function addRepair(data: any) {
	return service.post('/property/repair',data)
}
