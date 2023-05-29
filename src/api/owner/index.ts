import service from "../../utils/service/index"

export function findMyHouse(){
    return service.post("owner/findMyHouseList")
}
export function findFamily(data: any){
    return service.post("owner/findFamily",data)
}
export function addFamilyInfo(data:any){
    return service.post("owner/addFamily",data)
}
export function deleteFamily(data:any){
    return service.delete("owner/deleteFamily",data)
}