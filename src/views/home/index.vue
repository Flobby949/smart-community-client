<script setup lang="ts">
import router from '@/router'
import { ref, reactive, onMounted } from 'vue'
import service from '@/utils/service'
import { ActivityList } from '@/api/society'

const activityList = ref<any[]>([])
ActivityList().then(res => {
	activityList.value = res.data
})
onMounted(() => {})

const showDetail = (id: number) => {
	router.push('/activityDetail/' + id)
}
</script>

<template>
	<div type="primary" class="flex flex-col space-y-4">
		<div v-for="(item, index) in activityList" :key="index" class="bg-gray-100 p-4 rounded-lg" @click="showDetail(item.id)">
			<!-- <img :src="item.cover" alt="news" class="w-[90%] h-[100px] mx-auto h-auto rounded-md" /> -->
			<img :src="item.cover" alt="news" class="w-full h-auto rounded-md" />

			<h2 class="text-xl font-bold">{{ item.activityName }}</h2>
			<p class="text-gray-700">
				{{ item.title }}
			</p>
			<p>{{ item.atime }}</p>
		</div>
	</div>
</template>
<style>
.my-swipe .van-swipe-item {
	color: #fff;
	font-size: 20px;
	line-height: 150px;
	text-align: center;
	background-color: #39a9ed;
}
</style>
