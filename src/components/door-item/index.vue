<template>
	<div class="item bg-gray-200 rounded-md box-border my-4 w-[40vw] h-[30vw] flex flex-col justify-around items-center" @click="chooseDoor">
		<img :src="doorItem.doorImg" />
		<div>{{ doorItem.doorName }}</div>
	</div>
</template>

<script setup lang="ts">
import { showDialog } from 'vant'

const prop = defineProps<{
	doorItem: {
		doorId: number
		doorImg: string
		doorName: string
		onlineStatus: number
	}
}>()

// 开门事件
const emit = defineEmits(['chooseDoor', 'openDoor'])

let verClickNum = 0
let lastClickTime = 0
let clickTimer: any = null

const chooseDoor = () => {
	if (prop.doorItem.onlineStatus === 1) {
		emit('chooseDoor', 0)
		showDialog({
			message: '该设备离线！'
		})
		return
	}
	let nowTime = new Date().getTime()
	if (nowTime - lastClickTime < 200) {
		//双击
		emit('openDoor', prop.doorItem.doorId)
		verClickNum++
		lastClickTime = 0
		clickTimer && clearTimeout(clickTimer)
	} else {
		//单击
		lastClickTime = nowTime
		clickTimer = setTimeout(() => {
			if (verClickNum > 1) {
				verClickNum = 1
				return
			} else {
				emit('chooseDoor', prop.doorItem.doorId)
			}
		}, 200)
	}
}
</script>

<style scoped>
.item:hover {
	transform: scale(1.1);
	border: 1px solid #25abff;
	box-shadow: 3px 3px 10px #dddddd, -3px -3px 10px #dddddd;
}
</style>
