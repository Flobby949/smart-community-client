<template>
	<div class="list">
		<template v-for="(item, index) in prop.list" :key="index">
			<div class="item" @click="onClick(item)">
				<img :src="getUrl(item.name)" />
				<div class="title">{{ item.title }}</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import router from '@/router'
import type { PropType } from 'vue'
const getUrl = (name: string) => {
	return new URL(`../../assets/${name}.png`, import.meta.url).href
}
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
	width: 20%;
	margin: 5px 6px;
}
.item img {
	width: 35px;
	height: 35px;
}
.title {
	margin-top: 6px;
	font-size: 14px;
}
</style>
