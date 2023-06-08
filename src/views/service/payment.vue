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

// traceNo: 我们自己生成的订单编号
// totalAmount：订单的总金额
// subject： 支付的名称
// alipayTraceNo：固定配置
const submit = (traceNo: any, totalAmount: any, subject: any, alipayTraceNo: any) => {
	window.open(
		'http://localhost:8081/alipay/pay?traceNo=' +
			traceNo +
			'&totalAmount=' +
			totalAmount +
			'&subject=' +
			subject +
			'&alipayTraceNo=' +
			alipayTraceNo +
			'',
		'_blank'
	)
}
</script>

<template>
	<div class="bg-blue-500 rounded-b-3xl h-[150px]">
		<NavBar v-if="info.status === 0" :placeholder="true" :fixed="true" :title="'支付账单'" />
		<!-- :style="{ 'background-color': '#0081ff' }" -->
		<NavBar v-if="info.status === 1" :placeholder="true" :fixed="true" :title="'账单详情'" />
		<!-- <van-divider dashed class="--van-divider-line-height" :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider> -->
		<div class="bg-transparent min-h-screen flex flex-col mt-[30px]">
			<div class="w-full flex-1 p-6">
				<section class="bg-white shadow-md rounded-xl p-6">
					<div class="flex flex-col md:flex-row justify-between mb-4">
						<div>
							<div class="flex justify-between items-center w-full">
								<h2 class="text-2xl font-medium mb-2">{{ info.orderTypeName }}账单</h2>
								<p class="mr-2 right-0">{{ info.otime }}</p>
							</div>

							<p class="text-blue-500 text-4xl text-center mt-3">{{ info.orderMoney }} 元</p>
						</div>
					</div>
				</section>

				<section class="bg-white shadow-md rounded-xl mt-4">
					<div class="flex flex-col md:flex-row justify-between mb-4">
						<div class="h-auto">
							<p class="mt-3 ml-6 text-lg">账单详情</p>
							<div class="dashed pb-2"></div>

							<van-cell-group inset>
								<van-cell title="小区房屋" :value="info.communityName + '-' + info.houseNumber" />
								<van-cell title="房屋面积" :value="info.area + 'm²'" />
								<van-cell title="单位金额" :value="info.price + '元/月'"> </van-cell>

								<van-cell title="账单日期" :value="info.otime">
									<template #title>
										<div class="">
											<span class="custom-title">账单日期</span>
										</div>
									</template>
									<template #value>
										<div class="bg-transparent ml-[-100px] text-lg">
											<span class="text-sm">{{ info.otime }}</span>
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
				<section v-if="info.status === 1" class="bg-white shadow-md rounded-xl mt-4">
					<div class="flex flex-col md:flex-row justify-between mb-4">
						<div class="h-auto">
							<p class="mt-3 ml-6 text-lg">支付信息</p>
							<div class="dashed pb-2"></div>
							<van-cell-group inset>
								<van-cell title="支付单号" :value="info.communityName + '-' + info.houseNumber" />
								<van-cell title="支付方式" :value="'微信支付'" />
								<van-cell title="支付时间" :value="info.payTime"> </van-cell>
							</van-cell-group>
							<!-- <div class="mt-4 md:mt-0 text-center">
							<button class="border bg-blue-500 border-blue-600 text-white px-4 py-2 w-full rounded-md">支付</button>
						</div> -->
						</div>
					</div>
				</section>
				<div class="mt-4 md:mt-0 text-center">
					<button
						v-if="info.status === 0"
						class="border bg-blue-500 border-blue-600 text-white px-4 py-2 mt-20 w-full rounded-md"
						@click="submit(info.orderNumber, info.orderMoney, info.orderTypeName, info.orderNumber)"
					>
						支付
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.dashed {
	border: none;
	border-bottom: 2px dashed #ccc;
}
</style>
