<template>
	<nav-bar title="门禁审核" />
	<van-field v-model="fieldLabel" is-link readonly label="房屋" placeholder="选择房屋" @click="showPicker = true" />
	<van-popup v-model:show="showPicker" round position="bottom">
		<van-picker :columns="houseList" @cancel="showPicker = false" @confirm="onConfirm" />
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
	<div class="addBtn" @click="submitAudit">
		<van-icon name="send-gift" color="#fff" size="60px" />
	</div>
</template>

<script setup lang="ts">
import { myHouse } from '@/api/owner'
import { auditApi, type auditVO } from '@/api/smart'
import router from '@/router'
import { showFailToast, showSuccessToast } from 'vant'
import { onMounted } from 'vue'
import { ref } from 'vue'

// TODO 获取用户房屋列表
const fieldLabel = ref<string>()
const showPicker = ref(false)

const onConfirm = ({ selectedOptions }: any) => {
	showPicker.value = false
	fieldLabel.value = selectedOptions[0].text
	dataForm.value.houseId = selectedOptions[0].value
	dataForm.value.ownerId = selectedOptions[0].ownerId
}

const houseList = ref<
	{
		text: string
		value: number
		ownerId: number
	}[]
>([])
interface HouseInfo {
	id: number
	houseId: number
	communityName: string
	buildingName: string
	units: string | number
	houseNumber: string
	ownerId: string
}
const getHouse = () => {
	myHouse(1).then(res => {
		houseList.value = res.data.map((item: HouseInfo) => ({
			text: item.communityName + item.buildingName + item.units + '单元' + item.houseNumber,
			value: item.id,
			ownerId: item.ownerId
		}))
		fieldLabel.value = houseList.value[0].text
		dataForm.value.houseId = houseList.value[0].value
		dataForm.value.ownerId = houseList.value[0].ownerId
	})
}
onMounted(() => {
	getHouse()
})
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
const image = ref<string | null>()
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

.addBtn {
	position: fixed;
	width: 80px;
	height: 80px;
	background: #0078d4;
	bottom: 10%;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 4px 4px 10px #b7b7b7, -2px -2px 10px #b7b7b7;
	z-index: 99;
}
</style>
