<script setup lang="ts">
import { onMounted, ref } from 'vue'
import doorItem from '@/components/door-item/index.vue'
import { showDialog } from 'vant'
import { getDoorListApi, openDoorApi } from '@/api/smart'
import { findAllHouse } from '@/api/owner'

onMounted(() => {
	getDoorList(1)
	allHouse()
})

// TODO 选择小区
const fieldLabel = ref('万象城')
const showPicker = ref(false)
const communityList = ref<any[]>([])
function allHouse() {
	findAllHouse().then((res: any) => {
		console.log(res.data)
		communityList.value = res.data.map((item: any) => {
			item.text = item.communityName
			item.value = item.communityId
			return item
		})
		// 过滤掉重复的小区
		communityList.value = communityList.value.filter((item: any, index: number) => {
			return (
				communityList.value.findIndex((item2: any) => {
					return item.communityName === item2.communityName
				}) === index
			)
		})

		console.log(communityList.value)
	})
}

const onConfirm = ({ selectedOptions }: any) => {
	showPicker.value = false
	fieldLabel.value = selectedOptions[0].text
	getDoorList(selectedOptions[0].value)
}
const loading = ref(false)

// 选择门禁
const getDoorList = (communityId?: number) => {
	loading.value = true
	getDoorListApi(communityId || 1)
		.then(res => {
			doorList.value = res.data
		})
		.finally(() => {
			loading.value = false
		})
}

const doorList = ref([])
const currentDoor = ref(0)
const openDoor = (id: number) => {
	if (id === 0) {
		showDialog({
			message: '请选择门禁设备！'
		})
		return
	}
	show.value = true
	openDoorApi({
		doorId: id,
		passWay: 0
	})
		.then((res: any) => {
			if (res.code === 1) {
				showDialog({
					message: '开门成功！'
				})
			} else {
				showDialog({
					message: res.msg || '开门失败！'
				})
			}
		})
		.finally(() => {
			currentDoor.value = 0
			show.value = false
		})
}

const chooseDoor = (id: number) => {
	currentDoor.value = id
}

// 加载框
const show = ref(false)
</script>

<template>
	<div class="h-screen w-screen boxIndex bg-[#f5f5f5]">
		<van-nav-bar title="手机开门" fixed :placeholder="true" class="header" />
		<van-field v-model="fieldLabel" is-link readonly label="小区" placeholder="选择小区" @click="showPicker = true" />
		<van-popup v-model:show="showPicker" round position="bottom">
			<van-picker :columns="communityList" @cancel="showPicker = false" @confirm="onConfirm" />
		</van-popup>
		<van-pull-refresh v-model="loading" class="h-full" @refresh="getDoorList">
			<div class="w-screen flex flex-row flex-wrap box-border px-5 justify-between">
				<template v-for="item in doorList" :key="item">
					<door-item :door-item="item" @choose-door="chooseDoor" @open-door="openDoor"></door-item>
				</template>
			</div>
		</van-pull-refresh>
		<div class="toolBar">
			<div class="btnItem" @click="openDoor(currentDoor)">
				<img src="https://flobby529.oss-cn-nanjing.aliyuncs.com/image/door.png" width="60" />
				<div>立即开门</div>
			</div>
			<div class="btnItem" @click="$router.push('/review')">
				<img src="https://flobby529.oss-cn-nanjing.aliyuncs.com/image/door.png" width="60" />
				<div>门禁审核</div>
			</div>
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
	bottom: 15%;
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
	@apply h-full w-full bg-white rounded-md flex flex-col justify-around items-center;
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
.boxIndex {
	height: calc(100vh - 80px);
}
</style>
