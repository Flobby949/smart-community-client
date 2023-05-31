<template>
	<navbar title="我的车位" />
	<template v-for="(item, index) in list" :key="index">
		<div class="bg-white shadow-lg rounded-lg overflow-hidden m-8">
			<h3 class="font-semibold text-lg mb-2 text-center mt-4">车牌号: {{ item.parkId }}</h3>
			<img class="w-full h-64 object-cover object-center" src="https://s1.ax1x.com/2023/05/31/p9vJN1U.png" alt="Car Image" />
			<div class="p-4">
				<p class="text-gray-700 text-base text-center">车位号: {{ item.carportName }}</p>
			</div>
		</div>
		<div class="bg-white mx-4 my-2 border border-gray border-solid overflow-hidden">
			<div class="p-4">
				<h3 class="font-semibold text-lg mb-2">车位信息</h3>
				<div class="flex items-center mb-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
						<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
						<path
							fill-rule="evenodd"
							d="M9.707 16.293a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l6.293-6.293a1 1 0 011.414 1.414l-7 7z"
							clip-rule="evenodd"
						/>
					</svg>
					<p class="text-gray-800">{{ item.startTime }}</p>
				</div>
				<div class="flex items-center mb-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M13 9a4 4 0 11-8 0 4 4 0 018 0zm-1.75 2.25a2.5 2.5 0 10-3.5 0l-.5.5v.5h4.5v-.5l-.5-.5z"
							clip-rule="evenodd"
						/>
					</svg>
					<p class="text-gray-800">{{ item.endTime }}</p>
				</div>
				三表联查；停车场名称 ；地址 ；绑定车辆（车牌号），车位号
			</div>
		</div>
	</template>
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
		res.data.forEach((item: any) => {
			item.checked = item.isOwner == 1 ? true : false
		})
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
