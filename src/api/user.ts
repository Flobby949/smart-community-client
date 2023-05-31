// eslint-disable-next-line prettier/prettier
import service from '../utils/service/index'

export function loginByAccount(data: USER_PASSWORD): Promise<USER_PASSWORD_RES> {
	return service.post('/auth/login', data)
}

export function forgetPassword(data: FORGET_PASSWORD) {
	return service.post('/auth/forget/password', data)
}

export function sendPhone(data: SEND_PHONE) {
	return service.post('/auth/send/code', data)
}

export function loginByCode(data: LOGIN_CODE) {
	return service.post('/auth/phone/login', data)
}

export function otherLogin() {
	return service.get('/oauth/render')
}

export function callBack() {
	return service.get('/oauth/callback')
}
export function getUserInfo(){
	return service.post('/user/info')
}
export function updateUser(data:any){
	return service.post('/user/update',data,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
}
export function uploadFile(data:any){
	return service.post('/auth/upload', data)
}

