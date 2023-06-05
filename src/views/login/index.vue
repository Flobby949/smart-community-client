<template>
	<div class="login-box">
		<div class="logo">
			<img src="@/assets/log.png" alt="" />
		</div>
		<div class="title">
			<span>智慧管家</span>
		</div>
		<div class="form">
			<van-form @submit="onSubmit">
				<van-cell-group inset>
					<van-field
						v-model="form.phone"
						label="+86>"
						label-width="35"
						name="请输入手机号"
						placeholder="请输入手机号"
						:rules="[
							{ required: true, message: '请填写您的手机号码！' },
							{ pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }
						]"
					/>
					<van-field
						v-model="form.password"
						type="password"
						name="请输入密码"
						placeholder="请输入密码"
						:rules="[{ required: true, message: '请输入密码' }]"
					/>
				</van-cell-group>
				<div style="margin: 16px">
					<van-button round block type="primary" native-type="submit"> 提交 </van-button>
				</div>
				<div class="msg">
					<span class="left" @click="$router.push('/code')">验证码登录</span>
					<span class="right" @click="$router.push('/forget')">忘记密码?</span>
				</div>
			</van-form>
		</div>
		<div class="other">
			<span class="otherLogin">第三方登录</span>
			<div class="ma" @click="loginByOther">
				<img src="@/assets/mayun.png" alt="" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { loginByAccount, otherLogin, callBack } from '@/api/user'
import { showFailToast, showSuccessToast } from 'vant'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = reactive<USER_PASSWORD>({
	phone: '',
	password: ''
})

const wx = reactive({
	appId: 'wxed9954c01bb89b47',
	scope: 'snsapi_login',
	state: '',
	redirect_uri: 'http://guli.shop/api/ucenter/wx/callback', // 登录成功后的回调URL，需要和后端约定好
	display: 'popup',
	isWechat: true,
	href: '' // 自定义样式链接
})

async function onSubmit() {
	const res = await loginByAccount(form)
	console.log(res)
	if (res.code == 1) {
		showSuccessToast('登录成功')
		localStorage.setItem('accessToken', res.data.accessToken as string)
		router.push('/')
	} else {
		return showFailToast(res.msg)
	}
}

const loginByOther = () => {
	// 页面跳转 到授权首页 http://localhost:8080/oauth/render 接收回调函数的参数
	window.location.href = 'http://localhost:8080/oauth/render'
}
</script>

<style scoped>
.logo {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 20px;
}
.logo img {
	height: 100px;
	width: 100px;
}
.title {
	padding-top: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.title span {
	font-size: 26px;
	font-weight: 500;
	text-align: center;
}
.form {
	padding: 40px 10px;
}
.msg {
	font-size: 12px;
	margin: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.other {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 50px;
}
.otherLogin {
	font-size: 14px;
	margin: 10px;
}
.ma {
	height: 50px;
	width: 50px;
	border-radius: 50%;
	background-color: #eee;
	display: flex;
	align-items: center;
	justify-content: center;
}
.ma img {
	height: 40px;
	width: 40px;
}
</style>
