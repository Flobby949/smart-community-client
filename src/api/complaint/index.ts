import service from '@/utils/service'

export function getComplaintPage(data: any) {
	return service.get('/property/complaint/page', {
		params: data
	})
}

export function getComplaintById(id: any) {
	return service.get('/property/complaint/' + id)
}

export function addComplaint(data: any) {
	return service.post('/property/complaint', data)
}
