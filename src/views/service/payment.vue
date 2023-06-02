<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderByOrderId } from '@/api/society'
import { showNotify, showToast } from 'vant'
import NavBar from '@/components/NavBar/index.vue'

const route = useRoute()
// 获取传入id
const id = ref()
const info = ref<any>({})

onMounted(() => {
	id.value = route.params.orderId
	getOrderByOrderId(id.value).then(res => {
		info.value = res.data
		console.log(info)
	})
})
</script>

<template>
	<NavBar :title="'账单列表'" />

	<!-- <van-divider dashed class="--van-divider-line-height" :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider> -->
	<div class="bg-gray-100 min-h-screen flex flex-col">
		<div class="w-full flex-1 p-6">
			<section class="bg-white shadow-md rounded-xl p-6">
				<div class="flex flex-col md:flex-row justify-between mb-4">
					<div>
						<div class="flex justify-between items-center w-full">
							<h2 class="text-2xl font-medium mb-2">{{ info.orderTypeName }}</h2>
							<p class="mr-2 right-0">{{ info.otime }}</p>
						</div>

						<p class="text-blue-500 text-4xl text-center mt-3">{{ info.orderMoney }} 元</p>
					</div>
				</div>
			</section>
			<section class="bg-white shadow-md rounded-xl mt-4">
				<div class="flex flex-col md:flex-row justify-between mb-4">
					<div class="h-auto">
						<van-cell-group inset>
							<van-cell title="小区房屋" :value="info.communityName + '-' + info.houseNumber" />
							<van-cell title="房屋面积" :value="info.area + 'm²'" />
							<van-cell title="单位金额" :value="info.price + '元/月'"> </van-cell>

							<van-cell title="账单日期" :value="info.otime">
								<template #title>
									<div class="right-2">
										<span class="custom-title">账单日期</span>
									</div>
								</template>
								<template #value>
									<div class="bg-transparent">
										<span class="bg-transparent">{{ info.otime }}</span>
									</div>
								</template>
							</van-cell>
							<van-cell title="账单金额" :value="'￥' + info.orderMoney + '元'" />
						</van-cell-group>
						<!-- <div class="mt-4 md:mt-0 text-center">
							<button class="border bg-blue-500 border-blue-600 text-white px-4 py-2 w-full rounded-md">支付</button>
						</div> -->
					</div>
				</div>
			</section>
			<div class="mt-4 md:mt-0 text-center">
				<button v-if="info.status === 0" class="border bg-blue-500 border-blue-600 text-white px-4 py-2 mt-20 w-full rounded-md">支付</button>
			</div>
		</div>
	</div>

	<!-- <div class="rounded-lg overflow-hidden min-h-screen">
		<van-cell-group inset>
			<van-cell title="小区房屋" :value="info.communityName + '-' + info.houseNumber" />
			<van-cell title="房屋面积" :value="info.area + 'm²'" />
			<van-cell title="单位金额" :value="info.price + '元/月'"> </van-cell>

			<van-cell title="账单日期" :value="info.otime">
				<template #title>
					<div class="right-2">
						<span class="custom-title">账单日期</span>
					</div>
				</template>
				<template #value>
					<div class="bg-transparent">
						<span class="bg-transparent">{{ info.otime }}</span>
					</div>
				</template>
			</van-cell>
			<van-cell title="账单金额" :value="'￥' + info.orderMoney + '元'" />
		</van-cell-group>
	</div> -->

	<!-- <div class="bg-gray-100 min-h-screen flex flex-col"> -->
	<!-- Header -->
	<!-- <header class="bg-white shadow-md py-4 px-6 flex items-center justify-between">
			<h1 class="text-lg font-medium">账单详情</h1>
			<button class="text-gray-500">
				<svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M3.70711,16.2929 C3.31658,15.9024 3.31658,15.2692 3.70711,14.8787 L8.82843,9.75736 L3.70711,4.63604 C3.31658,4.24552 3.31658,3.61231 3.70711,3.22178 C4.09763,2.83126 4.73085,2.83126 5.12137,3.22178 L10.2426,8.34309 C10.6331,8.73361 10.6331,9.36683 10.2426,9.75736 L5.12137,14.8787 C4.73085,15.2692 4.09763,15.2692 3.70711,14.8787 Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</header> -->

	<!-- Content -->
	<!-- <div class="w-full flex-1 p-6">
			<section class="bg-white shadow-md rounded-xl p-6">
				<div class="flex flex-col md:flex-row justify-between mb-4">
					<div>
						<h2 class="text-lg font-medium mb-2">账单信息</h2>
						<p class="text-gray-500 text-sm">2022年5月 由 简书 支付</p>
					</div>
					<div class="mt-4 md:mt-0">
						<button class="border border-blue-600 text-blue-600 px-4 py-2 rounded-md">支付</button>
					</div>
				</div>

				<div class="mt-6">
					<h2 class="text-lg font-medium mb-2">账单明细</h2>
					<div class="grid grid-cols-3 gap-4">
						<div class="col-span-2">
							<p class="text-gray-500 text-sm">购买华为 MateBook X Pro</p>
							<p class="text-lg font-medium mt-2">¥ 9999.00</p>
							<p class="text-gray-400 text-sm mt-2">2022年5月20日 15:36:57</p>
						</div>
						<div>
							<button class="border border-red-400 text-red-400 px-2 py-1 rounded-md">退款</button>
						</div>
					</div>
				</div>
			</section>
		</div> -->
	<!-- </div> -->
</template>
