<template>
	<div class="box">
		<navbar title="添加车位" />
		<span class="title">选择车位</span>
		<div class="item">
			<div>
				<smartInput title="小区">
					<van-field v-model="form.community" placeholder="请输入小区名称" clearable />
				</smartInput>
				<smartInput title="区域">
					<van-field v-model="form.houseId" placeholder="请选择停车场" clearable />
				</smartInput>
				<smartInput title="车位号">
					<van-field v-model="form.houseId" placeholder="请输入车位号" clearable />
				</smartInput>
			</div>
		</div>
		<span class="title">住户信息</span>
		<div class="item">
			<div>
				<smartInput title="姓名">
					<van-field v-model="form.community" placeholder="请输入ownerId" clearable />
				</smartInput>
				<smartInput title="手机号">
					<van-field v-model="form.houseId" placeholder="请输入楼栋房号" clearable />
				</smartInput>
				<div class="btn">
					<van-button round type="primary">提交</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import navbar from '@/components/NavBar/index.vue'
import smartInput from '@/components/smart-input/index.vue'
import { showFailToast } from 'vant'
import { reactive } from 'vue'

const form = reactive({
	community: '',
	houseId: '',
	sex: -1,
	first: []
})
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
	margin-left: 20px;
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
