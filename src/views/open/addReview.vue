<template>
	<nav-bar title="门禁审核" />
	<van-field v-model="fieldLabel" is-link readonly label="房屋" placeholder="选择房屋" @click="showPicker = true" />
	<van-popup v-model:show="showPicker" round position="bottom">
		<van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
	</van-popup>
	<div class="controller">
		<div class="tips">
			<span></span>
			<span>人脸识别信息</span>
		</div>
		<div class="flex justify-around items-center">
			<div>
				<van-icon v-if="image == null && !showVideo" class="iconfont" class-prefix="icon" name="face" size="70px" color="#969799" />
				<img v-else :src="image" width="90" />
				<!--视频展示-->
				<video v-show="showVideo" ref="video" width="150" autoplay></video>
				<!--canvas截取流-->
				<canvas v-show="false" ref="canvas" width="150" height="80"></canvas>
			</div>

			<van-button v-show="!showVideo" type="primary" @click="callCamera">上传</van-button>
			<van-button v-show="showVideo" type="primary" @click="takePhoto">截取</van-button>
		</div>
	</div>
	<div class="controller">
		<div class="tips">
			<span></span>
			<span>指纹识别信息</span>
		</div>
		<div class="flex justify-around items-center">
			<van-icon v-show="dataForm.finger == 0" class="iconfont" class-prefix="icon" name="finger" size="70px" color="#969799" />
			<van-icon v-show="dataForm.finger == 1" class="iconfont" class-prefix="icon" name="finger" size="70px" color="#3396fb" />
			<van-button type="primary" @click="uploadFinger">上传</van-button>
		</div>
	</div>
	<van-button type="primary" @click="submitAudit">提交</van-button>
</template>

<script setup lang="ts">
import { auditApi, type auditVO } from '@/api/smart'
import router from '@/router'
import { showFailToast, showSuccessToast } from 'vant'
import { ref } from 'vue'

// 选择小区
// TODO 获取用户房屋列表
const fieldLabel = ref('万象城')
const showPicker = ref(false)

const columns = [
	{ text: '万象城', value: 1 },
	{ text: '汤臣一品', value: 2 },
	{ text: '左岸汀芷', value: 3 },
	{ text: '璀璨天城', value: 4 },
	{ text: '欧鼎华庭', value: 5 }
]

const onConfirm = ({ selectedOptions }: any) => {
	showPicker.value = false
	fieldLabel.value = selectedOptions[0].text
}

// 开启摄像头
const showVideo = ref(false)
const video = ref<any>()
const callCamera = () => {
	image.value = null
	navigator.mediaDevices
		.getUserMedia({
			video: { facingMode: 'user' }
		})
		.then(res => {
			console.log(res)
			showVideo.value = true
			video.value.srcObject = res
		})
}
// 拍照
const canvas = ref<any>()
const image = ref<string>()
const takePhoto = () => {
	let ctx = canvas.value.getContext('2d')
	// 把当前视频帧内容渲染到canvas上
	ctx.drawImage(video.value, 0, 0, 150, 100)
	// 转base64格式、图片格式转换、图片质量压缩
	let imgBase64 = canvas.value.toDataURL('image/jpeg', 0.7) // 由字节转换为KB 判断大小
	image.value = imgBase64 // 上传拍照信息  调用接口上传图片 .........
	showVideo.value = false
	dataForm.value.face = 1
	closeCamera()
}
// 关闭摄像头
const closeCamera = () => {
	if (!video.value.srcObject) {
		return
	}
	let stream = video.value.srcObject
	let tracks = stream.getTracks()
	tracks.forEach((track: any) => {
		track.stop()
	})
	video.value.srcObject = null
}

// 提交审核
const uploadFinger = () => {
	dataForm.value.finger = 1
}
const dataForm = ref<auditVO>({
	ownerId: 0,
	houseId: 0,
	face: 0,
	finger: 0
})
const submitAudit = () => {
	dataForm.value.ownerId = 15
	dataForm.value.houseId = 10
	auditApi(dataForm.value)
		.then(() => {
			showSuccessToast({
				message: '提交成功',
				iconSize: 50
			})
			router.go(-1)
		})
		.catch(err => {
			showFailToast({
				message: err.msg,
				iconSize: 50
			})
		})
		.finally(() => {
			dataForm.value = {
				ownerId: 0,
				houseId: 0,
				face: 0,
				finger: 0
			}
		})
}
</script>

<style scoped>
.controller {
	margin-top: 10px;
	border-radius: 4px;
	background-color: #fff;
}
.tips {
	display: flex;
	align-items: center;
	padding: 10px 20px;
	font-size: 14px;
}
.tips span:nth-child(1) {
	width: 4px;
	height: 16px;
	margin-right: 10px;
	background-color: #3396fb;
}
</style>
