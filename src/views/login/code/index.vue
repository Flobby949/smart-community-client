<template>
	<div class="login-box">
		<div class="title">
			<span>输入验证码</span>
		</div>
		<div v-if="showTips" class="tips">
			<span>请输入{{ form.phone }}收到的验证码</span>
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
					<van-field v-model="form.code" name="验证码" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码！' }]">
						<template #button>
							<van-button round size="small" @click="sendMsg">
								<span v-if="time <= 0">发送验证码</span>
								<span v-else>重新发送({{ time }})</span>
							</van-button>
						</template>
					</van-field>
				</van-cell-group>
				<div style="margin: 16px">
					<van-button round block type="primary" native-type="submit"> 提交 </van-button>
				</div>
				<div class="msg">
					<span class="left" @click="$router.push('/login')">密码登录</span>
					<span class="right" @click="$router.push('/forget')">忘记密码?</span>
				</div>
			</van-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = reactive({
	phone: '',
	code: ''
})

const showTips = ref(false)
let time = ref(0)
let timer: any = null
function onSubmit() {
	showSuccessToast('登录成功')
	localStorage.setItem('admin', '124')
	router.push('/')
}

function sendMsg() {
	if (form.phone == '') {
		showFailToast('手机号不能为空')
		return
	}
	showSuccessToast('短信验证码发送成功')
	showTips.value = true
	time.value = 60
	timer = setInterval(() => {
		time.value--
		if (time.value <= 0) {
			clearInterval(timer)
		}
	}, 1000)
}
</script>

<style scoped>
.title {
	padding-top: 60px;
	display: flex;
	align-items: center;
	margin-left: 50px;
}
.title span {
	font-size: 20px;
	font-weight: 500;
}
.tips {
	margin-top: 20px;
	display: flex;
	align-items: center;
	margin-left: 50px;
}
.tips span {
	font-size: 16px;
	font-weight: 500;
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
