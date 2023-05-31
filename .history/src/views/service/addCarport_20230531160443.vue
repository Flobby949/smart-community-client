<template>
	<div class="box">
		<navbar title="添加车位" />
		<span class="title">选择车位</span>
		<div class="item">
			<div>
				<smartInput title="小区">
					<van-field v-model="form.community" placeholder="请输入小区名称" clearable />
				</smartInput>
				<smartInput title="楼栋">
					<van-field v-model="form.houseId" placeholder="请输入楼栋房号" clearable />
				</smartInput>
				<smartInput title="单元">
					<van-field v-model="form.houseId" placeholder="请输入楼栋房号" clearable />
				</smartInput>
				<smartInput title="房间号">
					<van-field v-model="form.houseId" placeholder="请输入楼栋房号" clearable />
				</smartInput>
			</div>
		</div>
		<span class="title">住户信息</span>
		<div class="item">
			<div>
				<smartInput title="姓名">
					<van-field v-model="form.community" placeholder="请输入小区名称" clearable />
				</smartInput>
				<!-- 性别 -->
				<smartInput title="性别">
					<div :class="['boxItem', form.sex === 0 ? 'active' : '']" @click="choose(0)">男</div>
					<div :class="['boxItem', form.sex === 1 ? 'active' : '']" @click="choose(1)">女</div>
				</smartInput>
				<smartInput title="手机号">
					<van-field v-model="form.houseId" placeholder="请输入楼栋房号" clearable />
				</smartInput>
				<smartInput title="身份证号">
					<van-field v-model="form.houseId" placeholder="请输入楼栋房号" clearable />
				</smartInput>
				<div class="file">
					<span>上传证件照片</span>
					<van-uploader v-model="form.first" class="upload" multiple :after-read="afterRead" :before-read="beforeRead" />
				</div>
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

const choose = (sex: number) => {
	form.sex = sex
}

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
	padding-top: 80px;
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
