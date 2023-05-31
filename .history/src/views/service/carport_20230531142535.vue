<template>
	<navbar title="我的车位" />
	<template v-for="(item, index) in list" :key="index">
		<div class="bg-white shadow-lg rounded-lg overflow-hidden m-6">
			<h2 class="font-semibold text-white mb-2 text-xl flex h-[80px] bg-gradient-to-b from-blue-300 to-blue-100 items-center justify-center">
				车位号: {{ item.carportName }}
			</h2>
			<img class="w-full h-64 object-cover object-center" src="https://s1.ax1x.com/2023/05/31/p9vJN1U.png" alt="Car Image" />
			<div class="p-4">
				<p class="text-gray-700 text-base text-center">车牌号: {{ item.licence }}</p>
			</div>
		</div>
		<div class="bg-white mx-4 my-2 border border-gray border-solid overflow-hidden">
			<div class="p-4">
				<div class="flex pb-3 border-dashed border-b-2 border-gray-400">
					<h3 class="font-semibold text-lg mb-2 mt-2">车位信息</h3>
					<button
						class="bg-white rounded-full border-2 border-blue-500 text-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out ml-[140px]"
						@click="updateItem(item)"
					>
						解除绑定
					</button>
				</div>

				<div class="flex items-center mb-2 mt-3">
					<span>停车场名称：</span>
					<span>{{ item.parkName }}</span>
				</div>
				<div class="flex items-center mb-2">
					<span>车主名：</span>
					<span>{{ item.realName }}</span>
				</div>
				<div class="flex items-center mb-2">
					<span>联系电话：</span>
					<span>{{ item.phone }}</span>
				</div>
				<div class="flex items-center mb-2">
					<span>状态：</span>
					<span>{{ statusText(item.status) }}</span>
				</div>
				<div class="flex items-center mb-2">
					<span>购买(租赁)时间：</span>
					<span>{{ item.startTime }}</span>
				</div>
				<div class="flex items-center mb-2">
					<span>结束时间：</span>
					<span>{{ item.status === 2 ? '长期有效' : item.endTime }}</span>
				</div>
			</div>
		</div>
	</template>
</template>
<script setup lang="ts">
import { myCarport, updateCarport } from '@/api/carport/carport'
import navbar from '@/components/NavBar/index.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { showConfirmDialog, showNotify, showSuccessToast } from 'vant'
const router = useRouter()
const list = ref<any[]>([])
const addCarport = () => {
	router.push('/addCarport')
}
function getData() {
	myCarport().then((res: any) => {
		// res.data.forEach((item: any) => {
		// 	item.checked = item.isOwner == 1 ? true : false
		// })
		list.value = res.data
		console.log(list.value)
	})
}
const statusText = (status: number): string => {
	switch (status) {
		case 0:
			return '未知'
		case 1:
			return '租赁中'
		case 2:
			return '已购买'
		default:
			return '未知'
	}
}

const updateItem = (item: any) => {
	showConfirmDialog({
		title: '确定解除绑定吗？',
		message: '解除绑定后将要联系相关人员恢复，请谨慎操作！'
	})
		.then(() => {
			item.ownerId = ''
			updateCarport().then(() => {
				console.log(item.ownerId)
				showSuccessToast('解除绑定成功')
				//window.location.reload()
			})
		})
		.catch(() => {
			showNotify('取消删除')
		})
}
onMounted(() => {
	getData()
})
</script>

<style scoped>
</style>