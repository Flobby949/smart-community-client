<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import type { PropType } from 'vue'

defineProps({
	list: {
		type: Array as PropType<any[]>,
		default: () => []
	},
	show: {
		type: Boolean,
		default: false
	}
})

//子类定义连接事件
const emit = defineEmits(['info'])

const toInfo = (item: any) => {
	emit('info', item)
}
</script>

<template>
	<div v-for="item in list" :key="item.id" class="border-[1px] mt-2 bg-white rounded-lg border-slate-300 h-[180px]" @click="toInfo(item)">
		<div>
			<div class="text-[20px] inline-block mt-4 ml-2">{{ item.title }}</div>

			<div v-show="show" class="float-right mr-2 mt-4">
				<div v-if="item.status == 1" class="text-blue-400">未读</div>
				<div v-if="item.status == 2" class="text-gray-400">已读</div>
			</div>
		</div>

		<div class=" " style="color: #666666">
			<div class="ml-6 mt-2 w-[310px] line-clamp-3">{{ item.content }}</div>

			<div class="flex mt-6 ml-3">
				<div>
					<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
					<span class="ml-1 relative top-[2px]">{{ item.publishTime }}</span>
				</div>

				<div class="ml-3">
					<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/eye.png" />
					<span class="ml-3 relative top-[2px]">{{ item.readNumber }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.icon {
	display: inline-block;
	width: 20px;
}
</style>
