<template>
	<div class="box">
		<navbar title="我的房屋" />

		<div class="vant-form">
			<van-cell-group>
				<span class="title">选择房屋</span>
				<!-- <van-field v-model="form.parkId" label="下拉框1" placeholder="请选择">
					<van-dropdown-menu v-model="dropdown1" :options="dropdownOptions1" />
				</van-field>
				<van-field v-model="select2" label="下拉框2" placeholder="请选择">
					<van-dropdown-menu v-model="dropdown2" :options="dropdownOptions2" />
				</van-field> -->
				<van-field v-model="form.parkId" label="输入框1" placeholder="请输入内容" />
				<van-field v-model="form.ownerId" label="输入框2" placeholder="请输入内容" />
				<van-field v-model="form.carId" label="输入框3" placeholder="请输入内容" />
				<span class="title">住户信息</span>
				<!-- <van-field v-model="select1" label="下拉框1" placeholder="请选择">
					<van-dropdown-menu v-model="dropdown1" :options="dropdownOptions1" />
				</van-field>
				<van-field v-model="select2" label="下拉框2" placeholder="请选择">
					<van-dropdown-menu v-model="dropdown2" :options="dropdownOptions2" />
				</van-field> -->
				<van-field v-model="form.carportName" label="输入框1" placeholder="请输入内容" />
				<!-- <van-field v-model="input2" label="输入框2" placeholder="请输入内容" />
				<van-field v-model="input3" label="输入框3" placeholder="请输入内容" /> -->
			</van-cell-group>
			<van-button type="primary" block @click="submitForm">提交</van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import navbar from '@/components/NavBar/index.vue'
//import smartInput from '@/components/smart-input/index.vue'
import { showFailToast } from 'vant'
import { reactive, ref } from 'vue'
const dropdownOptions1 = ['选项1', '选项2', '选项3']
const formRef = ref()

const form = reactive({
	parkId: '',
	ownerId: '',
	carId: '',
	carportName: ''
})

const submitForm = () => {
	formRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
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
