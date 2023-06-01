<template>
	<div class="box">
		<navbar title="添加车辆" />
		<div class="item">
			<div>
				<smartInput title="车牌号">
					<van-field v-model="form.licence" placeholder="请输入姓名" clearable />
				</smartInput>
				<smartInput title="车辆品牌">
					<van-field v-model="form.brand" placeholder="请输入姓名" clearable />
				</smartInput>
				<smartInput title="车辆型号">
					<van-field v-model="form.specification" placeholder="请输入姓名" clearable />
				</smartInput>
				<smartInput title="车辆颜色">
					<van-field v-model="form.color" placeholder="请输入姓名" clearable />
				</smartInput>
				<smartInput title="保险截止日期">
					<van-field v-model="form.deadline" placeholder="请输入姓名" clearable />
				</smartInput>
				<smartInput title="年审日期">
					<van-field v-model="form.annualTime" placeholder="请输入姓名" clearable />
				</smartInput>
				<div class="btn">
					<van-button round type="primary" @click="submitForm">提交</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { saveCar } from '@/api/carport/carport'
import navbar from '@/components/NavBar/index.vue'
import smartInput from '@/components/smart-input/index.vue'
import { showFailToast, showSuccessToast } from 'vant'
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const licensePlate = ref('')
const licensePlateRules = [{ pattern: /^[A-Z]{1}[A-Z0-9]{5}$/, message: '请输入正确的车牌号' }]
const form = reactive({
	licence: '',
	brand: '',
	specification: '',
	color: '',
	deadline: '',
	annualTime: '',
	userId: ''
})
const columns = ref<any[]>([])

const afterRead = (file: any) => {
	console.log(file.file.name)
}
const beforeRead = (file: any) => {
	if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
		showFailToast('只允许上传jpg/png格式的图片！')
		return false
	}
	return true
}
const submitForm = () => {
	saveCar(form).then(() => {
		showSuccessToast('新增车辆成功')
	})
	// formRef.value.validate((valid: boolean) => {
	// 	if (!valid) {
	// 		return false
	// 	}
	// 	saveCarport(form).then(() => {
	// 		showSuccessToast('新增车位成功')
	// 	})
	// })
}
// onMounted(() => {
// 	allHouse()
// })
// 假设您的用户信息保存在浏览器的 LocalStorage 中，字段名为 "userInfo"
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
const userId = userInfo.id // 假设用户ID保存在 "id" 字段中

// 现在，您可以在需要使用用户ID的地方使用 userId 变量
console.log('当前登录用户ID:', userId)
</script>

<style scoped>
.box {
	height: 100vh;
	width: 100vw;
	background-color: #f5f5f5;
	overflow: auto;
}
.item {
	background-color: #fff;
	border-radius: 6px;
}
.title {
	font-size: 16px;
	margin-left: 10px;
	height: 40px;
	line-height: 40px;
}
.boxItem {
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #ccc;
	border-radius: 4px;
	height: 30px;
	width: 40px;
	font-size: 12px;
	margin: 0 5px;
}
.active {
	border: 1px solid #3f99fe;
}
.file {
	display: flex;
	flex-direction: column;
	margin-left: 10px;
}
.file span {
	padding: 10px 0;
}
.upload {
	display: flex;
	align-items: center;
	justify-content: center;
}
.btn {
	margin: 20px 0;
	padding-bottom: 50px;
	justify-content: center;
	align-items: center;
	display: flex;
}
.van-button {
	width: 90%;
	margin: 0 auto;
}
</style>

