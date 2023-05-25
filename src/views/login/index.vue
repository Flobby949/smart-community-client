<template>
	<div class="login-box">
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
	</div>
</template>

<script setup lang="ts">
import { loginByAccount } from '@/api/user'
import { showFailToast, showSuccessToast } from 'vant'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = reactive<USER_PASSWORD>({
	phone: '',
	password: ''
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
</script>

<style scoped>
.title {
	padding-top: 60px;
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
</style>
