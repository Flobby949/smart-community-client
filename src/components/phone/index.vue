<template>
	<div v-for="item in phones" :key="item.name" class="flex justify-between borderb p-4">
		<div style="color: rgb(114, 114, 114)">{{ item.name }}</div>
		<div class="flex">
			<div class="mr-2">{{ item.phone }}</div>
			<div class="w-[20px] h-[20px] bordera rounded-[50%] flex justify-center items-center" style="background-color: rgb(47, 147, 248)">
				<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/phone.png" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from '@/router'
import type { PropType } from 'vue'
defineProps({
	phones: {
		type: Array as PropType<any[]>,
		default: () => []
	}
})
</script>

<style scoped>
.borderb {
	@apply border border-solid border-gray-200;
}
</style>
