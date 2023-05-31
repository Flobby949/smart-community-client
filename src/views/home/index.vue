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
	<van-space direction="vertical" fill>
		<div type="primary">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item><img src="https://s1.ax1x.com/2023/05/31/p9vaxfI.png" /></van-swipe-item>
				<van-swipe-item><img src="https://s1.ax1x.com/2023/05/31/p9vdn10.png" /></van-swipe-item>
				<van-swipe-item><img src="https://s1.ax1x.com/2023/05/31/p9vdmpq.png" /></van-swipe-item>
				<van-swipe-item><img src="https://s1.ax1x.com/2023/05/31/p9vdZhn.png" /></van-swipe-item>
			</van-swipe>
		</div>
		<div class="bg-white shadow-lg border rounded-lg">
			常用服务

			<div type="primary" class="grid grid-cols-2 gap-4 mb-4">
				<div class="bg-gray-100 p-6">1</div>
				<div class="bg-gray-100 p-6">2</div>
				<div class="bg-gray-100 p-6">3</div>
				<div class="bg-gray-100 p-6">4</div>
			</div>
		</div>

		<div class="bg-white shadow-lg border rounded-lg mb-5">
			智慧社区

			<div type="primary" class="grid grid-cols-4 gap-4 mb-4">
				<div class="bg-gray-100 p-6">1</div>
				<div class="bg-gray-100 p-6">2</div>
				<div class="bg-gray-100 p-6">3</div>
				<div class="bg-gray-100 p-6">4</div>
				<div class="bg-gray-100 p-6">1</div>
				<div class="bg-gray-100 p-6">2</div>
				<div class="bg-gray-100 p-6">3</div>
				<div class="bg-gray-100 p-6">4</div>
			</div>
		</div>

		<!-- -mt-24 w-11/12 mx-auto h-44 -->
		<div class="bg-white shadow-lg border rounded-lg mb-5" type="primary">
			<div class="flex justify-around items-center mt-4">
				<van-image class="bg-blue-400" round width="50" height="50" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/fang.png" />
				<van-image round width="50" height="50" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/cw2.png" />
				<van-image class="bg-blue-400" round width="50" height="50" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/mycar.png" />
				<van-image class="bg-blue-400" round width="50" height="50" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/zhangdan.png" />
			</div>
			<div class="flex justify-around items-center mt-1">
				<p>我的房屋</p>
				<p>我的车位</p>
				<p>我的车辆</p>
				<p>我的账单</p>
				<!-- <p>问卷调查</p>
				<p>社区公告</p>
				<p>联系物业</p>
				<p>更新</p> -->
			</div>
		</div>

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
	</van-space>
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
