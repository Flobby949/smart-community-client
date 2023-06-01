import service from '@/utils/service/index'

interface openDoorParam {
	doorId: number
	passWay: number
}

interface auditVO {
	ownerId: number
	houseId: number
	face: number
	finger: number
}

export function getDoorListApi(communityId: number) {
	return service.post('/smart/doorList?communityId=' + communityId)
}

export function openDoorApi(params: openDoorParam) {
	return service.post(`/smart/openDoor?doorId=${params.doorId}&passWay=${params.passWay}`)
}

export function auditApi(dataForm: auditVO) {
	return service.post('/smart/audit', dataForm)
}

export function auditList() {
	return service.post('/smart/review')
}
