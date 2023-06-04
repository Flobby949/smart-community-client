<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar/index.vue'
import { getUserInfo } from '@/api/user'
import { OrderListByUserId } from '@/api/society'
import { showNotify, showToast } from 'vant'
const router = useRouter()

// 获取 getUserInfo
const userInfo = ref<any>({})
let id = 0

const bills = ref<any>([{}])

onMounted(() => {
	info(1)
})

const info = (status: number) => {
	getUserInfo()
		.then(res => {
			id = res.data.id
			userInfo.value = res.data
			console.log(userInfo.value.id)
			getList(userInfo.value.id, status)
		})
		.catch(err => {
			console.log(err)
			// 消息提示
			showNotify({ message: '用户信息获取错误，请重新登录' + err.msg })
		})
}

const getList = (id: number, status: number) => {
	OrderListByUserId(id, status)
		.then(res => {
			bills.value = res.data
		})
		.catch(err => {
			console.log(err)
			showNotify({ message: '订单获取错误' })
		})
}

const active = ref(0)
</script>
<template>
	<div class="bg-gray-100 h-full">
		<NavBar :title="'缴费记录'" />

		<div class="guest-list mt-4 bg-white ml-4 mr-4">
			<div v-for="(item, index) in bills" :key="index" class="rounded-lg shadow-md p-4 relative mb-6 bg-white">
				<div class="mt-0 p-3">
					<div class="flex text-xl">
						<img v-if="item.orderType === 4" src="https://s1.ax1x.com/2023/06/04/pC9wk7V.png" class="w-auto h-8 mr-4 pb-1" alt="电费" />
						<img v-if="item.orderType === 6" src="https://s1.ax1x.com/2023/06/04/pC9wVtU.png" class="w-auto h-8 mr-4 pb-1" alt="暖气费" />
						<img v-if="item.orderType === 7" src="https://s1.ax1x.com/2023/06/04/pC9wF00.png" class="w-auto h-8 mr-4 pb-1" alt="燃气费" />
						<img v-if="item.orderType === 3" src="https://s1.ax1x.com/2023/06/04/pC9wimq.png" class="w-auto h-8 mr-4 pb-1" alt="水费" />
						<img v-if="item.orderType === 1" src="https://s1.ax1x.com/2023/06/04/pC9wEkT.png" class="w-auto h-8 mr-4 pb-1" alt="停车费" />
						<img v-if="item.orderType === 5" src="https://s1.ax1x.com/2023/06/04/pC9wZhF.png" class="w-auto h-8 mr-4 pb-1" alt="物业费" />
						<p class="pb-1">{{ item.orderTypeName }}</p>
					</div>
					<div class="dashed pb-2"></div>
					<div class="pt-5">
						<div class="flex relative">
							<p class="text-gray-500 pt-1">小区房屋</p>
							<div class="absolute right-2 p-1 top-[-1px]">{{ item.communityName }}{{ item.units }}单元-{{ item.houseNumber }}</div>
						</div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">账单日期</p>
							<div class="absolute right-2 p-1 top-[-1px]">{{ item.otime }}</div>
						</div>

						<div class="relative text-center justify-center items-center mt-7">
							<p class="text-blue-500 text-3xl">{{ item.orderMoney }} 元</p>
							<div class="dashed pb-2"></div>

							<div class="mt-3 relative">
								<!-- <van-button size="small" class="w-[100px]" type="primary" @click="router.push('/payment/' + item.id)">付款</van-button> -->
								<p class="absolute right-2 top-[-2px] text-blue-400" @click="router.push('/payment/' + item.id)">查看详情</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-gray-100 h-10"></div>
	</div>
</template>

<style>
.dashed {
	border: none;
	border-bottom: 2px dashed #ccc;
}
</style>
