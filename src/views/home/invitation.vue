<script setup lang="ts">
import { onMounted } from 'vue'
import { ref, reactive, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { PickerGroup } from 'vant'

const route = useRoute()

const id = ref()
const value = ref()
const showPicker = ref(false)
const fieldValue = ref('')
const info = ref<any>({ username: '', phone: '' })
const infos = reactive<any>({
	username: '',
	phone: ''
})

const onConfirm = ({ selectedOptions }: any) => {
	showPicker.value = false
	fieldValue.value = selectedOptions[0].text
}
onMounted(() => {
	id.value = route.params.invitationId
})
const checkedList = ref<any>([]) // 选中的Invitation列表，用于检查选择是否成功。 这应该在页
const submitForm = () => {
	// 提交表单逻辑
	console.log('提交表单')
}
</script>

<template>
	<NavBar :title="'访客邀请'" />

	<div class="p-4 bg-gray-200 min-h-screen flex-col">
		<!-- 用户名输入框 -->

		<section class="bg-white shadow-md rounded-xl p-6">
			<div class="flex flex-col md:flex-row justify-between mb-4 mt-4">
				<van-cell-group inset>
					<van-field v-model="value" label="访客姓名" left-icon="smile-o" right-icon="warning-o" placeholder="显示图标" />
					<van-field v-model="value" clearable label="手机号" left-icon="music-o" placeholder="显示清除图标" />
					<van-field v-model="value" label="文本" left-ic on="smile-o" right-icon="warning-o" placeholder="显示图标" />
					<van-field v-model="value" clearable label="文本" left-icon="music-o" placeholder="显示清除图标" />
				</van-cell-group>

				<!-- 多选按钮 -->
				<div class="mt-4">
					<p class="text-base font-medium">开门授权:</p>
					<van-checkbox-group v-model="checkedList" max="4" class="flex mt-5 h-[50px] rounded-xl">
						<div class="items-center text-center justify-betwee">
							<van-checkbox class="flex-1" name="view"></van-checkbox>
							<span>西入口闸机</span>
						</div>
						<div>
							<van-checkbox class="flex-1" name="download"></van-checkbox>
							<span>东入口闸机</span>
						</div>
						<div>
							<van-checkbox class="flex-1" name="edit"></van-checkbox>
							<span>1号单1号元门</span>
						</div>
						<div>
							<van-checkbox class="flex-1" name="delete"></van-checkbox>
							<span>1号单2号元门</span>
						</div>
					</van-checkbox-group>
				</div>
				<!-- 时间选择器 -->
				<div class="bg-white rounded-xl p-6 mt-4">
					<div>
						<van-field v-model="fieldValue" is-link readonly label="入门" placeholder="选择入门时间" @click="showPicker = true" />
						<van-popup v-model:show="showPicker" round position="bottom">
							<van-picker-group title="预约日期" :tabs="['选择日期', '选择时间']" next-step-text="下一步" @confirm="onConfirm" @cancel="onCancel">
								<van-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" />
								<van-time-picker v-model="currentTime" />
							</van-picker-group>
						</van-popup>
					</div>
					<div>
						<van-field v-model="fieldValue" is-link readonly label="出门" placeholder="选择访客有效访问时间" @click="showPicker = true" />
						<van-popup v-model:show="showPicker" round position="bottom">
							<van-picker-group title="预约日期" :tabs="['选择日期', '选择时间']" next-step-text="下一步" @confirm="onConfirm" @cancel="onCancel">
								<van-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" />
								<van-time-picker v-model="currentTime" />
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
