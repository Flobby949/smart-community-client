import service from '@/utils/service'

export function getNoticePage(data: any) {
	return service.get('/property/notice/page', {
		params: data
	})
}
export function getNoticeById(id: any) {
	return service.get('/property/notice/' + id)
}
export function read(data: any) {
	return service.post('/property/notice/read', data)
}

export function readNoticeNum() {
	return service.get('/property/notice/readNoticeNum')
}