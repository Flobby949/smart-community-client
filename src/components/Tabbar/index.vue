<template>
	<van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
		<van-tabbar-item v-for="(item, index) in tabbarData" :key="index" :icon="item.icon" :to="item.to">
			{{ item.title }}
		</van-tabbar-item>
	</van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const active = ref(0)
const tabbarData = reactive([
	{
		icon: 'wap-home-o',
		title: '首页',
		to: {
			name: 'Home'
		}
	},
	{
		icon: 'like-o',
		title: '服务',
		to: {
			name: 'Service'
		}
	},
	{
		icon: 'eye-o',
		title: '开门',
		to: {
			name: 'Open'
		}
	},
	{
		icon: 'bullhorn-o',
		title: '消息',
		to: {
			name: 'Bullhorn'
		}
	},
	{
		icon: 'user-o',
		title: '我的',
		to: {
			name: 'My'
		}
	}
])
</script>
