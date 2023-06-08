<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import service from '@/utils/service'

const route = useRoute()
const router = useRouter()

const id = ref()
const detail = ref<any>({})

onMounted(() => {
	id.value = route.params.activityId
	service.get('/soft2242/activity/' + id.value).then(res => {
		// state.activityList = res.data
		detail.value = res.data
	})
})

const onClickLeft = () => {
	router.back()
}
</script>

<template>
	<van-nav-bar fixed title="活动详情" left-arrow @click-left="onClickLeft" />
	<!-- 
	<div>活动详情</div>
	<div>{{ id }}</div> -->
	<div class="min-h-screen">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-light-500">
			<div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
				<!-- 左栏：新闻标题及作者 -->
				<div class="text-center lg:text-left lg:col-span-2">
					<h1 class="text-left text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">{{ detail.title }}</h1>
					<div class="mt-5 lg:justify-start">
						<div class=" ">
							<!-- <img src="https://avatars.githubusercontent.com/u/5565939?v=4" alt="author" class="w-10 h-10 rounded-full" /> -->
							<div class="ml-1 flex">
								<van-icon name="underway-o" />
								<p class="text-xs px-4 font-medium text-gray-900">{{ detail.createTime }}</p>
								<van-icon name="eye-o" />
								<p class="text-xs font-medium text-gray-400">{{ detail.viewerCount }}</p>
							</div>
						</div>
					</div>
				</div>
				<van-divider />

				<!-- 右栏：新闻图片、概述、内容 -->
				<div class="max-w-lg mx-auto lg:max-w-none">
					<div class="rounded-lg overflow-hidden">
						<!-- <img src="https://picsum.photos/800/600" alt="news" class="w-full h-auto" /> -->
					</div>
					<!-- shadow-lg  -->
					<div class="mt-0 rounded-lg overflow-hidden bg-white">
						<div class="bg-transparent rounded-lg overflow-hidden text-cente mb-12" v-html="detail.content"></div>
						<div class="bg-white rounded-lg overflow-hidden mb-0">
							<p class="text-x font-medium font-extrabol text-black">主办单位：{{}}</p>
							<p class="text-x font-medium text-black">活动地点：{{ detail.location }}</p>
							<p class="text-x font-medium text-black mb-10">联系电话：{{ detail.tel }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.min-h-screen {
	margin-top: 60px;
}
</style>
