<template>
	<div class="box">
		<navbar title="我的房屋" />

		<div class="vant-form">
			
	</div>
</template>

<script setup lang="ts">
import navbar from '@/components/NavBar/index.vue'
// //import smartInput from '@/components/smart-input/index.vue'
// import { showFailToast } from 'vant'
// import { reactive, ref, onMounted } from 'vue'
// import { getParkList, getCommunityList, saveCarport } from '@/api/carport/carport'
// import { showConfirmDialog, showNotify, showSuccessToast } from 'vant'

// const dropdownOptions1 = ['选项1', '选项2', '选项3']
// const formRef = ref()
// const communityList = ref<any[]>([])

// const form = reactive({
// 	parkId: '',
// 	ownerId: '',
// 	carId: '',
// 	carportName: ''
// })

// onMounted(() => {
// 	getCommunityLists()
// })

// const submitForm = () => {
// 	saveCarport(form).then(() => {
// 		showSuccessToast('新增车位成功')
// 	})
// 	// formRef.value.validate((valid: boolean) => {
// 	// 	if (!valid) {
// 	// 		return false
// 	// 	}
// 	// 	saveCarport(form).then(() => {
// 	// 		showSuccessToast('新增车位成功')
// 	// 	})
// 	// })
// }
// //获取所有小区列表
// const getCommunityLists = () => {
// 	getCommunityList().then(res => {
// 		communityList.value = res.data
// 	})
// }
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
