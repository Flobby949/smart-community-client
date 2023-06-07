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
	<div class="bg-gray-100 min-h-full bordera">
		<div class="h-52 rounded-bl-br-full" style="background-color: rgb(47, 147, 248)">
			<van-nav-bar title="物业电话" left-arrow @click-left="onClickLeft" />
		</div>

		<div class="relative top-[-120px]">
			<div class="m-4">
				<div class="text-white">社区物业电话</div>
				<div class="bg-white mt-3">
					<phone :phones="propertyPhones"></phone>
				</div>

				<div class="m-3" style="color: rgb(158, 156, 156)">快递电话</div>
				<div class="bg-white">
					<phone :phones="kdPhones"> </phone>
				</div>

				<div class="text-center mt-4">没有更多了....</div>
			</div>
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
