<template>
	<div class="box">
		<navbar title="添加车辆" />
		<div class="item">
			<div>
				<div class="flex bg-blue-500 mt-6">
					<div class="absolute ml-[58px] text-white font-bold text-2xl mt-7">请输入真实有效的车牌号</div>
					<div class="flex flex-row ml-9">
						<div v-for="(char, index) in 8" :key="index" class="border rounded-sm mr-2 mt-[80px] mb-8 flex-1">
							<input
								:ref="'charInput' + index"
								v-model="licenseChars[index]"
								type="text"
								:placeholder="index === 0 ? '省' : ''"
								class="w-[30px] h-[30px] pl-2"
								maxlength="1"
								@input="() => updateLicense(index)"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="h-[20px] bg-gray-200 flex flex-col justify-center items-center">
				<div class="h-[10px] bg-gray-200 w-3/4"></div>
			</div>
			<!-- <smartInput title="车牌号">
				<van-field v-model="form.licence" placeholder="请输入姓名" clearable />
			</smartInput> -->
			<smartInput title="车辆品牌" class="m-3">
				<van-field v-model="form.brand" placeholder="请输入品牌" clearable />
			</smartInput>
			<smartInput title="车辆型号" class="m-3">
				<van-field v-model="form.specification" placeholder="请输入型号" clearable />
			</smartInput>
			<smartInput title="车辆颜色" class="m-3">
				<van-field v-model="form.color" placeholder="请输入颜色" clearable />
			</smartInput>
			<!-- 添加触发按钮 -->
			<van-button class="custom-button" @click="showPopup">{{ buttonText }}</van-button>
			<van-popup v-model:show="show" position="bottom" :style="{ height: '35%' }">
				<van-date-picker v-model="currentDate" title="保险截止日期" @cancel="closePopup" @confirm="selectDate" />
			</van-popup>

			<van-button class="custom-button" @click="showPopup2">{{ button2Text }}</van-button>
			<van-popup v-model:show="show2" position="bottom" :style="{ height: '35%' }">
				<van-date-picker v-model="currentDate2" title="年审日期" @cancel="closePopup2" @confirm="selectDate2" />
			</van-popup>
			<div class="btn">
				<van-button round type="primary" @click="submitForm">提交</van-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { saveCar, getUser } from '@/api/carport/carport'
import navbar from '@/components/NavBar/index.vue'
import smartInput from '@/components/smart-input/index.vue'
import { showFailToast, showSuccessToast } from 'vant'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const selectedDate = ref('')
const selectedDate2 = ref('')
const licensePlate = ref(['', '', '', '', '', '', '', ''])
//获取当前日期
const date = new Date()
const licenseChars = ref(['', '', '', '', '', '', ''])
const form = reactive({
	licence: '',
	brand: '',
	specification: '',
	color: '',
	deadline: '',
	annualTime: '',
	userId: ''
})

getUser()
	.then(response => {
		const user = response.data
		const userId = user.id
		form.userId = userId

		// 在这里使用 userId
		console.log('User ID:', userId)
	})
	.catch(error => {
		console.error('Failed to fetch user:', error)
	})

const submitForm = () => {
	saveCar(form)
		.then(() => {
			showSuccessToast('新增车辆成功')
			// 清除输入框中的数据
			//form.licence = ''
			licenseChars.value = ['', '', '', '', '', '', '']
			form.brand = ''
			form.specification = ''
			form.color = ''
			form.deadline = ''
			form.annualTime = ''
			form.userId = ''
			selectedDate.value = ''
			selectedDate2.value = ''
		})
		.catch(() => {
			showFailToast('新增车辆失败')
		})
}

const chooseDate = ref([date.getFullYear(), date.getMonth() + 1, date.getDate()])
const chooseDate2 = ref([date.getFullYear(), date.getMonth() + 1, date.getDate()])
const currentDate = ref([date.getFullYear(), date.getMonth() + 1, date.getDate()])
const currentDate2 = ref([date.getFullYear(), date.getMonth() + 1, date.getDate()])
const show = ref(false)
const show2 = ref(false)
//显示日期选择器
const showPopup = () => {
	currentDate.value = []
	currentDate.value = [...chooseDate.value]
	show.value = true
}
const showPopup2 = () => {
	currentDate2.value = []
	currentDate2.value = [...chooseDate2.value]
	show2.value = true
}

//关闭日期选择器
const closePopup = () => {
	show.value = false
}
const closePopup2 = () => {
	show2.value = false
}

const selectDate = () => {
	chooseDate.value = [...currentDate.value]
	form.deadline = `${chooseDate.value[0]}-${chooseDate.value[1]}-${chooseDate.value[2]}`
	show.value = false
	selectedDate.value = form.deadline // 将选择的日期赋值给 selectedDate
}
const selectDate2 = () => {
	chooseDate2.value = [...currentDate2.value]
	form.annualTime = `${chooseDate2.value[0]}-${chooseDate2.value[1]}-${chooseDate2.value[2]}`
	show2.value = false
	selectedDate2.value = form.annualTime // 将选择的日期赋值给 selectedDate
}
const buttonText = computed(() => {
	if (selectedDate.value) {
		return `保险截止日期：${selectedDate.value}`
	} else {
		return '保险截止日期'
	}
})
const button2Text = computed(() => {
	if (selectedDate2.value) {
		return `年审日期：${selectedDate2.value}`
	} else {
		return '年审日期'
	}
})
// 添加 updateLicense 方法来同步赋值给 form.licence
const updateLicense = (index: number) => {
	form.licence = licenseChars.value.join('')
	if (index < licenseChars.value.length - 1) {
		const nextInput = $refs['charInput' + (index + 1)]
		nextInput.focus()
	}
}
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
.custom-button {
	width: 100%;
	background-color: #ffffff;
	border-radius: 0;
}
.license-input {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
}

.license-char {
	width: 12%;
	height: 12vw;
	border: 1px solid #ccc;
	border-radius: 4px;
	text-align: center;
}
</style>
