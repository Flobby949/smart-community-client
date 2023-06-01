<template>
	<div class="list">
		<template v-for="(item, index) in prop.list" :key="index">
			<div
				class="item"
				:style="{
					backgroundColor: item.color
				}"
				@click="myclick(item)"
			>
				<span>{{ item.title }}</span>
				<van-icon :name="item.name" />
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
const emit = defineEmits(['onItemClick'])
const myclick = (item: any) => {
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
	width: 160px;
	height: 60px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin: 12px;
}
</style>
