import service from "@/utils/service";
export function getNoticePage(data: any){
  return service.get("/property/notice/page",{
    params:data
  }
  )
}
export function getNoticeById(id: any){
  return service.get("/property/notice/"+id)
}





