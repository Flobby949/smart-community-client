<template>
	<div class="bg-blue-500 rounded-b-lg h-[280px]">
		<navbar title="我的车辆" />
		<button class="bg-white mt-10 p-3 bg-opacity-50 rounded-full w-36 text-white text-center flex justify-center items-center mx-auto my-auto">
			+添加车辆
		</button>
		<template v-for="(item, index) in list" :key="index">
			<div class="flex flex-col m-10 mt-15">
				<!--卡片1-->
				<div class="bg-white rounded-lg shadow-md p-4 mb-4">
					<div class="flex">
						<img src="https://s1.ax1x.com/2023/06/01/p9zpFmj.png" class="w-[60px] mr-3" alt="" />
						<h2 class="text-[30px] font-bold mb-2 mt-4 ml-3">{{ item.licence }}</h2>
					</div>

					<div class="border border-dashed border-gray-300 h-0.5 w-full mt-3 mb-4"></div>

					<div class="flex">
						<div class="w-20 h-8 ml-2 flex justify-center items-center rounded-full border-2 border-blue-500 text-blue-500">{{ item.brand }}</div>
						<div class="w-20 h-8 ml-2 flex justify-center items-center rounded-full border-2 border-blue-500 text-blue-500">{{ item.color }}</div>
						<div class="w-20 h-8 ml-2 flex justify-center items-center rounded-full border-2 border-blue-500 text-blue-500">
							{{ item.specification }}
						</div>
					</div>
					<div class="flex mt-5">
						<p class="text-gray-400">保险结束日期</p>
						<p class="ml-[60px]">{{ formatDate(item.deadline) }}</p>
					</div>
					<div class="flex mt-3">
						<p class="text-gray-400">年审时间</p>
						<p class="ml-[80px]">{{ formatDate(item.annualTime) }}</p>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>
<script setup lang="ts">
import { getCarList, saveCar } from '@/api/carport/carport'
import navbar from '@/components/NavBar/index.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { showConfirmDialog, showNotify, showSuccessToast } from 'vant'
const list = ref<any[]>([])

const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return `${year}年${month}月${day}日`
}
function getData() {
	getCarList().then((res: any) => {
		// res.data.forEach((item: any) => {
		// 	item.checked = item.isOwner == 1 ? true : false
		// })
		list.value = res.data
		console.log(list.value)
		console.log('---------')
	})
}
onMounted(() => {
	getData()
})
</script>
