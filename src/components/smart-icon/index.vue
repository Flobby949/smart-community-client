<template>
	<div class="list">
		<template v-for="(item, index) in prop.list" :key="index">
			<div class="item" @click="onClick(item)">
				<van-icon :name="item.name" />
				<div class="title">{{ item.title }}</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import router from '@/router'
import type { PropType } from 'vue'

const prop = defineProps({
	list: {
		type: Array as PropType<any[]>,
		default: () => []
	}
})
const emit = defineEmits(['myClick'])
const onClick = (item: any) => {
	router.push(item.url)
}
</script>

<style scoped>
.list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
.item {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	height: 80px;
	width: 80px;
	margin: 5px 6px;
}
.title {
	font-size: 14px;
}
</style>
