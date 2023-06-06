<script setup lang="ts" name="About">
import { onClickLeft } from '@/utils'
let propertyPhones = [
	{ name: '幸福苑小区物业', phone: '010-26584523' },
	{ name: '1号楼管家电话', phone: '010-26584523' },
	{ name: '2号楼管家电话', phone: '010-26584523' },
	{ name: '3号楼管家电话', phone: '010-26584523' },
	{ name: '4号楼管家电话', phone: '010-26584523' }
]

let kdPhones = [
	{ name: '顺丰快递', phone: '400-8111111' },
	{ name: '圆通快递', phone: '021-697778888' },
	{ name: '中通快递', phone: '400-8895543' },
	{ name: '韵达快递', phone: '021-39207888' },
	{ name: 'EMS快递', phone: '10000' }
]
</script>
<template>
	<div class="h-52 bg-blue-400 rounded-bl-br-full" style="z-index: 99">
		<van-nav-bar title="物业电话" left-arrow fixed @click-left="onClickLeft" />
	</div>

	<div class="absolute top-20 w-[100%] h-[100%] bg-gray-100">
		<div class="m-4">
			<div>物业电话</div>
			<div class="bg-white">
				<div v-for="item in propertyPhones" :key="item.name" class="flex justify-between borderb p-2">
					<div>{{ item.name }}</div>
					<div class="flex">
						<div class="mr-2">{{ item.phone }}</div>
						<div class="w-[20px] h-[20px] bordera rounded-[50%] bg-blue-700 flex justify-center items-center">
							<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/phone.png" />
						</div>
					</div>
				</div>
			</div>

			<div class="m-3">快递电话</div>

			<div class="bg-white">
				<div v-for="item in kdPhones" :key="item.name" class="flex justify-between borderb p-2">
					<div>{{ item.name }}</div>
					<div class="flex">
						<div class="mr-2">{{ item.phone }}</div>
						<div class="w-[20px] h-[20px] bordera rounded-[50%] bg-blue-700 flex justify-center items-center">
							<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/phone.png" />
						</div>
					</div>
				</div>
			</div>

			<div class="text-center mt-4">没有更多了....</div>
		</div>
	</div>
</template>
<style scoped>
.rounded-bl-br-full {
	border-bottom-left-radius: 80px;
	border-bottom-right-radius: 80px;
}
.bordera {
	@apply border border-solid border-sky-900;
}
.borderb {
	@apply border border-solid border-gray-200;
}
.icon {
	display: inline-block;
	width: 20px;
}
</style>
