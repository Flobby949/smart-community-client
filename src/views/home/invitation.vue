<script setup lang="ts">
import { onMounted } from 'vue'
import { ref, reactive, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserInfo } from '@/api/user'
import { addInvitation, getCommunityListByUserId, getDoorList } from '@/api/society'
import { showNotify, showToast, showConfirmDialog } from 'vant'

const userInfo = ref<any>({})
// 用户id
let userId = ref(0)
const route = useRoute()
const router = useRouter()

onMounted(() => {
	id.value = route.params.invitationId
	getUserInfo().then(res => {
		userId.value = res.data.id
		userInfo.value = res.data
		formData.userId = userId.value // 让页面携带当前用户id给后续操作(页面跳转等)
		console.log(userInfo.value.id)
		// 获取用户的小区列表
		getCommunityList(res.data.id)
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
	userId: 0,
	doorIds: '',
	endTime: '',
	createTime: '',
	phone: '',
	visitorName: ''
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
// 访客邀请历史记录页面
const handleClickRight = () => {
	router.push('/invitation/historyList')
}

const submitForm = () => {
	formData.userId = userId
	// 开门授权入口
	// formData.doorIds = arrayToString(checkedList, ',')
	formData.doorIds = checkedList.value.join(',')
	// 提交表单逻辑
	formData.phone = infos.phone
	formData.visitorName = infos.username
	console.log('提交表单')

	showConfirmDialog({
		title: '添加访客',
		message: '确定要添加此页面的访客？' // Message in the dialog.
	})
		.then(() => {
			// on confirm
			// 判断是否为空
			if (infos.username.trim() === '') {
				showToast('请输入访客姓名')
				return
			}
			if (infos.phone.trim() === '') {
				showToast('请输入访客手机号')
				return
			}
			if (checkedList.value.length === 0) {
				showToast('请选择访客开门授权位置')
				return
			}
			if (!formDataEnter.value || formData.createTime.trim() === '') {
				// 检查是否已发送请求创建日期匹配创建日期选择器 {
				showToast('请选择访客访访问时间')
				return
			}
			if (!formDataEnd.value || formData.endTime.trim() === '') {
				showToast('请选择访客访离开的时间')
				return
			}
			// 添加访客和添加邀请记录
			addInvitation(formData)
				.then(res => {
					console.log(res.data)
					showNotify({ type: 'primary', message: '成功添加' })
					showToast('成功添加')
					setInterval(() => {}, 500)
					router.push('invitation/historyList')
				})
				.catch(err => {
					showToast(err.msg)
					return
				})
		})
		.catch(err => {
			// on cancel
			showToast('已取消')
		})
}
// 选择社区
const communityId = ref<any>(0)
const doorList = ref<any>(0)
const communityName = ref('请选择')
const communityList = reactive<any>([
	// { text: '杭州', value: 'Hangzhou' },
])
const showPopover = ref(false)
// 获取小区列表
const getCommunityList = (userId: any) => {
	getCommunityListByUserId(userId).then(res => {
		const list = ref<any>([{}])
		list.value = res.data
		list.value.map((item: any) => {
			communityList.push({ text: item.communityName, value: item.id })
		})
		communityList
	})
}

const onConfirmCommunity = (selectedOptions: any) => {
	showPopover.value = false
	communityName.value = selectedOptions.selectedOptions[0].text
	console.log(selectedOptions)
	communityId.value = selectedOptions.selectedValues[0]
	getDoors(communityId.value)
}
// 获取doorid
const getDoors = (id: number) => {
	getDoorList(id).then(res => {
		console.log(res.data)
		doorList.value = res.data
	})
}
</script>

<template>
	<NavBar :title="'访客邀请'" :placeholder="true" :fixed="true" :right-text="'邀请记录'" @click-right="handleClickRight" />

	<div class="p-4 bg-gray-200 min-h-screen flex-col">
		<!-- 用户名输入框 -->

		<section class="bg-white shadow-md rounded-xl p-6">
			<div class="md:flex-row justify-between mb-1 mt-4">
				<van-cell-group class="w-full border rounded-3xl pt-6 pb-4 pl-4">
					<van-field v-model="infos.username" label="访客姓名" required left-icon="friends-o" right-icon="warning-o" placeholder="输入访客姓名" />
					<van-field
						v-model="infos.phone"
						clearable
						label="手机号"
						required
						left-icon="phone-circle-o"
						right-icon="warning-o"
						placeholder="输入访客手机号"
					/>
				</van-cell-group>

				<!-- 多选按钮 -->
				<div class="mt-4 border rounded-3xl pt-6 pb-8 pl-5">
					<p class="text-base font-medium ml-2">开门授权:</p>
					<van-field v-model="communityName" is-link readonly label="选择社区" placeholder="选择访客访问小区" @click="showPopover = true" />
					<van-popup v-model:show="showPopover" round position="bottom">
						<van-picker :columns="communityList" @cancel="showPopover = false" @confirm="onConfirmCommunity" />
					</van-popup>

					<van-checkbox-group v-model="checkedList" max="4" class="flex mt-5 h-auto rounded-xl">
						<!-- items-center text-center justify-betwee -->
						<!-- <div class="flex flex-col justify-center items-center text-center ml-2">
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
						</div> -->
						<div v-for="(item, index) in doorList" :key="index" class="flex flex-col justify-center items-center text-center ml-2">
							<van-checkbox class="flex-1" :name="item.doorId"></van-checkbox>
							<span>{{ item.doorName }}</span>
						</div>
					</van-checkbox-group>
				</div>
				<!-- 时间选择器 -->
				<div class="bg-white rounded-xl p-0 mt-4 border rounded-3xl pt-6 pb-4 pl-4">
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
		<div class="mt-[100px]">
			<van-button type="primary" class="mt-1" block @click="submitForm">提交</van-button>
		</div>
	</div>
	<!-- <div class="p-4 bg-gray-200 min-h-screen flex-col rounded-xl"></div> -->
</template>
<style>
.dashed2 {
	border: none;
	border-bottom: 2px dashed #396cebaf;
}
</style>
