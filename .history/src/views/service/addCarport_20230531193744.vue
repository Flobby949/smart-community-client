<template>
	<div class="box">
		<navbar title="我的房屋" />
		<div class="vant-form">
			<van-cell-group>
				<span class="title">选择房屋</span>

				<van-dropdown-menu v-model="form.communityId" label="小区名称">
					<van-dropdown-item v-for="community in communityList" :key="community.id" :value="community.id">
						{{ community.communityName }}
					</van-dropdown-item>
				</van-dropdown-menu>
				<van-picker
					v-model="communityId"
					:columns="communityList.map(community => community.communityName)"
					placeholder="请选择小区名称"
					@change="handlePickerChange"
				></van-picker>
				<van-field v-model="form.parkId" label="停车场名字" placeholder="请选择停车场名称" />
				<van-field v-model="form.ownerId" label="输入框2" placeholder="请输入内容" />
				<van-field v-model="form.carId" label="输入框3" placeholder="请输入内容" />
				<span class="title">住户信息</span>
				<van-field v-model="form.carportName" label="输入框1" placeholder="请输入内容" />
			</van-cell-group>
			<van-button type="primary" block @click="submitForm">提交</van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import navbar from '@/components/NavBar/index.vue'
//import smartInput from '@/components/smart-input/index.vue'
import { showFailToast } from 'vant'
import { reactive, ref, onMounted, computed } from 'vue'
import { getParkList, getCommunityList, saveCarport } from '@/api/carport/carport'
import { showConfirmDialog, showNotify, showSuccessToast, Picker } from 'vant'

const dropdownOptions1 = ['选项1', '选项2', '选项3']
const formRef = ref()
const communityList = ref<any[]>([])
const communityId = ref<number[]>([])

const form = reactive({
	communityId: '',
	parkId: '',
	ownerId: '',
	carId: '',
	carportName: ''
})
// 显示选择器
const handlePickerChange = (value: any) => {
	form.communityId.value = value
}
onMounted(() => {
	getCommunityLists()
})

const submitForm = () => {
	saveCarport(form).then(() => {
		showSuccessToast('新增车位成功')
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
//获取所有小区列表
const getCommunityLists = () => {
	getCommunityList().then(res => {
		communityList.value = res.data
	})
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
	display: block;
	background-color: #f5f5f5;
	padding: 0 20px;
	line-height: 40px;
	color: #333;
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
.field {
	padding-top: 20px;
	padding-bottom: 10px;
}
</style> 
