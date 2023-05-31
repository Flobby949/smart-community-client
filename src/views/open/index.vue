<script setup lang="ts">
import { onMounted, ref } from 'vue'
import doorItem from '@/components/door-item/index.vue'
import { showDialog } from 'vant'
import { getDoorListApi, openDoorApi } from '@/api/smart'

onMounted(() => {
	getDoorList(1)
})

// 选择小区
const fieldLabel = ref('万象城')
const showPicker = ref(false)

const columns = [
	{ text: '万象城', value: 1 },
	{ text: '汤臣一品', value: 2 },
	{ text: '左岸汀芷', value: 3 },
	{ text: '璀璨天城', value: 4 },
	{ text: '欧鼎华庭', value: 5 }
]

const onConfirm = ({ selectedOptions }) => {
	showPicker.value = false
	fieldLabel.value = selectedOptions[0].text
	getDoorList(selectedOptions[0].value)
}

// 选择门禁
const getDoorList = (communityId: number) => {
	getDoorListApi(communityId).then(res => {
		console.log(res)
	})
}

const doorList = [
	{
		doorId: 1,
		doorImg: 'https://flobby529.oss-cn-nanjing.aliyuncs.com/image/door.png',
		doorName: '西门门禁'
	},
	{
		doorId: 3,
		doorImg: 'https://flobby529.oss-cn-nanjing.aliyuncs.com/image/door.png',
		doorName: '北门门禁'
	},
	{
		doorId: 5,
		doorImg: 'https://flobby529.oss-cn-nanjing.aliyuncs.com/image/door.png',
		doorName: '南门门禁'
	},
	{
		doorId: 6,
		doorImg: 'https://flobby529.oss-cn-nanjing.aliyuncs.com/image/door.png',
		doorName: '东门门禁'
	}
]

const currentDoor = ref(0)
const openDoor = (id: number) => {
	if (id === 0) {
		showDialog({
			message: '请选择门禁设备！'
		})
		return
	}
	show.value = true
	setTimeout(() => {
		show.value = false

		showDialog({
			message: '开门成功！'
		})
	}, 3000)
}

const chooseDoor = (id: number) => {
	currentDoor.value = id
	console.log('选择' + id)
}

// 加载框
const show = ref(false)
</script>

<template>
	<van-nav-bar title="手机开门" fixed :placeholder="true" class="header" />
	<van-field v-model="fieldLabel" is-link readonly label="小区" placeholder="选择小区" @click="showPicker = true" />
	<van-popup v-model:show="showPicker" round position="bottom">
		<van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
	</van-popup>
	<div class="w-screen flex flex-row flex-wrap box-border px-5 justify-between">
		<template v-for="item in doorList" :key="item">
			<door-item :door-item="item" @choose-door="chooseDoor" @open-door="openDoor"></door-item>
		</template>
	</div>
	<div class="toolBar">
		<div class="btnItem" @click="openDoor(currentDoor)">
			<img src="https://flobby529.oss-cn-nanjing.aliyuncs.com/image/door.png" width="60" />
			<div>立即开门</div>
		</div>
		<div class="btnItem">
			<img src="https://flobby529.oss-cn-nanjing.aliyuncs.com/image/door.png" width="60" />
			<div>访客邀请</div>
		</div>
	</div>
	<!-- 加载框 -->
	<van-dialog v-model:show="show" :show-confirm-button="false" width="300px">
		<div class="flex flex-col justify-center items-center">
			<div class="w-[100%] p-2 bg-[#409efe] text-center text-white">等待开门中 ...</div>
			<van-icon class="animate-spin flex-1 m-5" name="setting" size="5rem" color="#409efe" />
		</div>
	</van-dialog>
</template>

<style scoped>
.toolBar {
	position: fixed;
	bottom: 10%;
	left: 50%;
	transform: translateX(-50%);
	width: 84vw;
	height: 12vh;
	border-radius: 10px;
	box-shadow: 3px 3px 10px #dddddd, -3px -3px 10px #dddddd;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}

.btnItem {
	@apply h-full w-full bg-gray-200 flex flex-col justify-around items-center;
}

@keyframes spin {
	from {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
@-webkit-keyframes spin {
	from {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
.animate-spin {
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;
}
</style>
