<template>
	<navbar title="我的车位" />
	<template v-for="(item, index) in list" :key="index">
		<div class="bg-white shadow-lg rounded-lg overflow-hidden m-8">
			<h3 class="font-semibold text-lg mb-2 text-center mt-4">车位号: {{ item.carportName }}</h3>
			<img class="w-full h-64 object-cover object-center" src="https://s1.ax1x.com/2023/05/31/p9vJN1U.png" alt="Car Image" />
			<div class="p-4">
				<p class="text-gray-700 text-base text-center">车牌号: {{ item.licence }}</p>
			</div>
		</div>
		<div class="bg-white mx-4 my-2 border border-gray border-solid overflow-hidden">
			<div class="p-4">
				<h3 class="font-semibold text-lg mb-2">车位信息</h3>
				<div class="flex items-center mb-2">
					<span>停车场名称：</span>
					<span>{{ item.parkName }}</span>
				</div>
				<div class="flex items-center mb-2">
					<p class="text-gray-800">{{ item.realName }}</p>
				</div>
				<div class="flex items-center mb-2">
					<p class="text-gray-800">{{ item.phone }}</p>
				</div>
				<div class="flex items-center mb-2">
					<p class="text-gray-800">{{ item.status }}</p>
				</div>
				<div class="flex items-center mb-2">
					<p class="text-gray-800">{{ item.startTime }}</p>
				</div>
				<div class="flex items-center mb-2">
					<p class="text-gray-800">{{ item.endTime }}</p>
				</div>
			</div>
		</div>
	</template>
</template>
<script setup lang="ts">
import { myCarport } from '@/api/carport/carport'
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

// const deleteItem = (item: any) => {
// 	showConfirmDialog({
// 		title: '确定删除吗？',
// 		message: '删除后将无法恢复，请谨慎操作！'
// 	})
// 		.then(() => {
// 			deleteHouse(item.buildingId).then(() => {
// 				showSuccessToast('删除成功')
// 				window.location.reload()
// 			})
// 		})
// 		.catch(() => {
// 			showNotify('取消删除')
// 		})
// }
onMounted(() => {
	getData()
})
</script>
