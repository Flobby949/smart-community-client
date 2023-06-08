import service from '@/utils/service'

export function getPhonePage(data: any) {
	return service.get('/property/phone/page', {
		params: data
	})
}

export function getPhoneById(id: any) {
	return service.get('/property/phone/' + id)
}

export function addPhone(data: any) {
	return service.post('/property/phone', data)
}
