<template>
	<div class="forgetBox">
		<van-nav-bar title="找回密码" left-arrow @click-left="$router.back()" />
		<div class="main">
			<div class="form">
				<van-form @submit="onSubmit">
					<van-cell-group inset>
						<van-field
							v-model="form.mobile"
							label="+86>"
							label-width="35"
							name="请输入手机号"
							placeholder="请输入手机号"
							:rules="[
								{ required: true, message: '请填写您的手机号码！' },
								{ pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }
							]"
						/>
						<van-field v-model="form.code" name="验证码" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码！' }]">
							<template #button>
								<van-button round size="small" @click="send">
									<span v-if="!show">发送验证码</span>
									<span v-else>还剩下{{ time }}秒</span>
								</van-button>
							</template>
						</van-field>
						<van-field
							v-model="form.oldpassword"
							type="password"
							name="请输入密码"
							placeholder="请输入密码"
							:rules="[{ required: true, message: '请输入密码' }]"
						/>
						<van-field
							v-model="form.password"
							type="password"
							name="请确认密码"
							placeholder="请确认密码"
							:rules="[{ validator: validator, message: '两次密码不一致' }]"
						/>
					</van-cell-group>
					<div style="margin: 16px">
						<van-button round block type="primary" native-type="submit"> 提交 </van-button>
					</div>
				</van-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { forgetPassword, sendPhone } from '@/api/user'
import { showFailToast, showSuccessToast } from 'vant'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = reactive({
	mobile: '',
	code: '',
	oldpassword: '',
	password: ''
})
const validator = (val: string) => {
	if (val != form.oldpassword) {
		return false
	} else {
		return true
	}
}
let timer: any = null
let time = ref(0)
let show = ref(false)
function send() {
	if (form.mobile == '') {
		return showFailToast('手机号不能为空')
	}

	sendPhone({
		mobile: form.mobile,
		type: 0
	}).then((res: any) => {
		if (res.code == 1) {
			show.value = true
			showSuccessToast('验证码发送成功')
			time.value = 60
			timer = setInterval(() => {
				time.value--
				if (time.value <= 0) {
					show.value = false
					clearInterval(timer)
				}
			}, 1000)
		} else {
			return showFailToast(res.msg)
		}
	})
}

function onSubmit() {
	forgetPassword(form).then((res: any) => {
		if (res.code == 1) {
			showSuccessToast('修改密码成功')
			router.push('/login')
		} else {
			showFailToast('修改密码失败')
		}
	})
}
</script>

<style scoped>
.forgetBox {
	background-color: #dddddd;
	height: 100vh;
	width: 100vw;
}
.main {
	margin: 10px;
	background-color: #fff;
	height: 90%;
	border-radius: 6px;
}
.form {
	padding: 40px 10px;
}
</style>
