<script setup lang="ts">
import { onMounted } from 'vue'
import { ref, reactive, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { getUserInfo } from '@/api/user'
import { addInvitation } from '@/api/society'
import { showNotify, showToast, showConfirmDialog } from 'vant'

const userInfo = ref<any>({})
// 用户id
let userId = 0
const route = useRoute()

onMounted(() => {
	id.value = route.params.invitationId
	getUserInfo().then(res => {
		userId = res.data.id
		userInfo.value = res.data
		console.log(userInfo.value.id)
	})
})

const id = ref()
const minDate = new Date(2021, 5, 1)
const maxDate = new Date(2025, 5, 1)
const showPicker1 = ref(false)
const showPicker2 = ref(false)
// 获取开门入口
const checkedList = ref<any>([])
const enter = reactive<any>({
	date: ref(['2022', '06', '01']),
	time: ref(['12', '00'])
})
const end = reactive<any>({
	date: ref(['2022', '06', '02']),
	time: ref(['12', '00'])
})
// 获取访客信息
const infos = reactive<any>({
	username: '123',
	phone: 'ysh'
})
const formData = reactive<any>({
	userId: userId,
	doorIds: '',
	endTime: '',
	createTime: '',
	phone: infos.phone,
	visitorName: infos.username
})
// 获取时间数据
const formDataEnter = ref<any>()
const formDataEnd = ref<any>()

const transform = (date: Array<any>, time: Array<any>, type: any): String => {
	const dates = date[0] + '-' + date[1] + '-' + date[2] + ' ' + time[0] + ':' + time[1] + ':00' // 转换格式 （+0800是因为Vue3的datetime-picker使用的是
	if (type === 0) {
		formDataEnter.value = dates
	} else {
		formDataEnd.value = dates
	}
	return dates
}
// 数组转成字符串方法
function arrayToString(arr: any[], separator: string): string {
	return arr.join(separator)
}
const onConfirm = (selectedOptions: any) => {
	showPicker1.value = false
	console.log(selectedOptions)
	transform(selectedOptions[0].selectedValues, selectedOptions[1].selectedValues, 0)
	formData.createTime = formDataEnter
}
const onConfirmEnd = (selectedOptions: any) => {
	showPicker2.value = false
	console.log(selectedOptions)
	transform(selectedOptions[0].selectedValues, selectedOptions[1].selectedValues, 1)
	formData.endTime = formDataEnd
}
const onCancel = () => {
	showPicker1.value = false
	showPicker2.value = false
}

const submitForm = () => {
	formData.userId = userId
	// 开门授权入口
	// formData.doorIds = arrayToString(checkedList, ',')
	formData.doorIds = checkedList.value.join(',')
	// 提交表单逻辑
	console.log('提交表单')
	// console.log(infos)
	console.log(checkedList.value)
	console.log(formData.createTime)
	console.log(formData.endTime)
	console.log(formData.doorIds)
	console.log(formData.visitorName)
	console.log(formData.userId)

	showConfirmDialog({
		title: '标题',
		message: '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。'
	})
		.then(() => {
			// on confirm
			addInvitation(formData).then(res => {
				console.log(res.data)
				showNotify(res.data.msg)
			})
		})
		.catch(() => {
			// on cancel
		})
}
</script>

<template>
	<NavBar :title="'访客邀请'" />

	<div class="p-4 bg-gray-200 min-h-screen flex-col">
		<!-- 用户名输入框 -->

		<section class="bg-white shadow-md rounded-xl p-6">
			<div class="md:flex-row justify-between mb-4 mt-4">
				<van-cell-group class="w-full">
					<van-field v-model="infos.username" label="访客姓名" left-icon="friends-o" right-icon="warning-o" placeholder="输入访客姓名" />
					<van-field v-model="infos.phone" clearable label="手机号" left-icon="phone-circle-o" right-icon="warning-o" placeholder="输入访客手机号" />
				</van-cell-group>

				<!-- 多选按钮 -->
				<div class="mt-4">
					<p class="text-base font-medium ml-2">开门授权:</p>
					<van-checkbox-group v-model="checkedList" max="4" class="flex mt-5 h-auto rounded-xl">
						<!-- items-center text-center justify-betwee -->
						<div class="flex flex-col justify-center items-center text-center ml-2">
							<van-checkbox class="flex-1 mx-auto" name="1"></van-checkbox>
							<span>西入口闸机</span>
						</div>
						<div class="flex flex-col justify-center items-center text-center ml-2">
							<van-checkbox class="flex-1" name="2"></van-checkbox>
							<span>东入口闸机</span>
						</div>
						<div class="flex flex-col justify-center items-center text-center ml-2">
							<van-checkbox class="flex-1" name="3"></van-checkbox>
							<span>1号单1号元门</span>
						</div>
						<div class="flex flex-col justify-center items-center text-center ml-2">
							<van-checkbox class="flex-1" name="4"></van-checkbox>
							<span>1号单2号元门</span>
						</div>
					</van-checkbox-group>
				</div>
				<!-- 时间选择器 -->
				<div class="bg-white rounded-xl p-0 mt-8">
					<div>
						<van-field v-model="formDataEnter" is-link readonly label="入门时间" placeholder="选择入门时间" @click="showPicker1 = true" />
						<van-popup v-model:show="showPicker1" round position="bottom">
							<van-picker-group title="入门时间" :tabs="['选择日期', '选择时间']" next-step-text="下一步" @confirm="onConfirm" @cancel="onCancel">
								<van-date-picker v-model="enter.date" :min-date="minDate" :max-date="maxDate" />
								<van-time-picker v-model="enter.time" />
							</van-picker-group>
						</van-popup>
					</div>
					<div>
						<van-field v-model="formDataEnd" is-link readonly label="离开时间" placeholder="离开时间" @click="showPicker2 = true" />
						<van-popup v-model:show="showPicker2" round position="bottom">
							<van-picker-group title="截至时间" :tabs="['选择日期', '选择时间']" next-step-text="下一步" @confirm="onConfirmEnd" @cancel="onCancel">
								<van-date-picker v-model="end.date" :min-date="new Date(2021, 5, 1)" :max-date="maxDate" />
								<van-time-picker v-model="end.tiem" />
							</van-picker-group>
						</van-popup>
					</div>
				</div>
			</div>
		</section>
		<!-- 提交按钮 -->
		<van-button type="primary" class="mt-10" block @click="submitForm">没写完</van-button>
	</div>
	<div class="p-4 bg-gray-200 min-h-screen flex-col rounded-xl"></div>
</template>
