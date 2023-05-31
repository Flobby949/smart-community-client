import service from '@/utils/service/index'

interface openDoorParam {
	doorId: number
	passWay: number
}

export function getDoorListApi(communityId: number) {
	return service.post('/smart/doorList?communityId=' + communityId)
}

export function openDoorApi(params: openDoorParam) {
	return service.post(`/smart/openDoor?doorId=${params.doorId}&passWay=${params.passWay}`)
}
