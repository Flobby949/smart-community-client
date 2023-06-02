import { defineStore } from 'pinia'
import { store } from '@/store'
import {getUserInfo} from '@/api/user'
import{findMyHouse} from'@/api/owner/index'
export const useUserStore = defineStore('user',{
    state:()=>({
        userInfo:{},
        houseInfo:{}
    }),
    actions:{
         // 获取当前登录者信息
        getStoreInfo(){
            return new Promise((resolve,reject)=>{
                getUserInfo().then((res)=>{
                    this.userInfo=res.data
                    resolve(res)
                })
                .catch((err) => reject(err))
            })
        },
        getHouseInfo(){
            return new Promise((resolve,reject)=>{
                findMyHouse().then((res)=>{
                    this.houseInfo=res.data[0]
                    resolve(res)
                })
                .catch((err) => reject(err))
            })
        }
    }
})
export function useUserStoreHook(){
    return useUserStore(store)
}