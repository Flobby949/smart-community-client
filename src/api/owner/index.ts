import service from '../../utils/service/index'

export function findMyHouse(data: any) {
	return service.post('owner/findMyHouseList', data)
}
export function findFamily(data: any) {
	return service.post('owner/findFamily', data)
}
export function addFamilyInfo(data: any) {
	return service.post('owner/addFamily', data)
}
export function getHouseOptions() {
	return service.post('owner/houseOptions')
}
export function getDefaultInfo(){
	return service.post('owner/defaultInfo')
}
export function sbCertify(data: any) {
	return service.post('owner/sbCertify', data)
}
export function deleteFamily(data: any) {
	return service.delete('owner/deleteFamily', data)
}

export function myHouse(state?: number) {
	return service.post('/owner/myHouse?state=' + state)
}

export function deleteHouse(houseId: number) {
	return service.post(`/owner/deleteHouse?houseId=${houseId}`)
}

export function findAllHouse() {
	return service.post('/owner/allHouse')
}

export function allBuilding(communityId: string) {
	return service.post(`/owner/allBuilding?communityId=${communityId}`)
}

export function allUnit(communityId: string, buildingId: string) {
	return service.post(`/owner/allUnit?communityId=${communityId}&buildingId=${buildingId}`)
}

export function allHouseByUnit(communityId: string, buildingId: string, unitId: string) {
	return service.post(`/owner/allHouseByUnit?communityId=${communityId}&buildingId=${buildingId}&unit
=${unitId}`)
}

export function addHouse(data: any) {
	return service.post('/owner/addHouse', data)
}

export function upload(data: any) {
	return service.post('/auth/upload', data)
}
