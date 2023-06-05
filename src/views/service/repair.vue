<script setup lang="ts" name="About">
import { getRepairPage } from '@/api/repair'
import router from '@/router'
import { onClickLeft } from '@/utils'
import { onMounted, ref } from 'vue'

// 详情
const info = (item: any) => {
	router.push({
		name: 'repairDetail',
		params: {
			repairId: item.id
		}
	})
}

const add = (type: any) => {
	router.push({
		name: 'addRepair',
		params: {
			type
		}
	})
}
//加载提示
const loading = ref(false)
//完成提示
const finished = ref(false)
//刷新提示
const refreshing = ref(false)
let total = -1
let sum = 0
// //加载函数
let page = {
	page: 1,
	limit: 15
}
let list = ref([])
//下拉会自动调用这个
const onLoad = async () => {
	// loading.value = true
	if (sum < total && refreshing.value == false) {
		page.page = 1 + page.page
		// sleep(1000);
	}
	const { data } = await getRepairPage(page)
	list.value = data.list
	// list.value =list.value.concat(data.list)
	console.log(list.value)
	//下拉完毕
	refreshing.value = false
	//加载一次后，会在懂变成true,变成加载中，就会卡在那里，变为true后，才会真的执行...
	loading.value = false
	console.log(loading.value)
	sum += list.value.length
	total = data.total
	console.log('sum')
	console.log(sum)
	console.log('total')
	console.log(total)
	//代表已经加加载了所有数据，显示没有更多了
	if (sum >= total) {
		finished.value = true
	}
}

const onRefresh = () => {
	if (page.page > 1) {
		page.page = page.page - 1
	}
	sum = 0
	finished.value = false
	loading.value = true
	onLoad()
}
</script>
<template>
	<div class="h-52 bg-blue-400 rounded-bl-br-full" style="z-index: 99">
		<van-nav-bar title="在线报修" left-arrow @click-left="onClickLeft" />
	</div>

	<div class="absolute top-20 w-[100%] h-[100%]">
		<div class="flex bordera text-center items-center justify-around items-center">
			<div class="h-10 w-[30%] bordera text-center bg-white flex" @click="add(0)">
				<img class="icon m-1" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/settings.png" />
				<div class="flex-1 bordera flex items-center justify-center">公告报修</div>
			</div>

			<div class="h-10 w-[30%] bordera text-center bg-white flex" @click="add(1)">
				<img class="icon m-1" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/house.png" />
				<div class="flex-1 bordera flex items-center justify-center">个人报修</div>
			</div>
		</div>

		<div class="bg-gray-100 mt-5 mr-2 ml-3">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div v-for="item in list" :key="item.id" class="bg-white borderb mt-4 rounded-[10px]">
						<div class="flex justify-between">
							<van-text-ellipsis class="font-bold text m-1 flex-1" :content="item.title" @click="info(item)" />
							<div>
								<div v-if="item.state == 0" class="bg-red-500 radiusButton">未处理</div>
								<div v-if="item.state == 1" class="bg-yellow-500 radiusButton">处理中</div>
								<div v-if="item.state == 2" class="bg-blue-500 radiusButton">已理中</div>
								<div v-if="item.state == 3" class="bg-gray-300 radiusButton">已评价</div>
							</div>
						</div>

						<hr />
						<div class="flex mt-2">
							<div v-if="item.type == 0" class="borderButton">公共报修</div>
							<div v-if="item.type == 1" class="borderButton">公共报修</div>

							<div v-if="item.category == 0" class="borderButton">路灯</div>
							<div v-if="item.category == 1" class="borderButton">厕所</div>
						</div>

						<div class="m-2">
							<div class="bg-gray-200 text">
								<van-text-ellipsis style="line-height: 12px" rows="3" :content="item.content" @click="info(item)" />
							</div>

							<div class="flex m-2">
								<template v-for="img in item.imgs" :key="img">
									<img class="img" :src="img" />
								</template>
							</div>
							<div class="flex justify-between">
								<div>{{ item.createTime }}</div>
								<div class="text-blue-500" @click="info(item)">报修详情</div>
							</div>
						</div>
					</div>
				</van-list>

				<!-- 下拉提示，通过 scale 实现一个缩放效果 -->
				<!-- <template #pulling="props"> 下拉提示 </template> -->

				<!-- 释放提示 -->
				<template #loosing> 释放提示 </template>

				<!-- 加载提示 -->
				<template #loading> 加载提示 </template>
			</van-pull-refresh>
		</div>
	</div>
</template>

<style scoped>
.rounded-bl-br-full {
	border-bottom-left-radius: 80px;
	border-bottom-right-radius: 80px;
}

.bordera {
	/* @apply border border-solid border-sky-900; */
}

.borderb {
	@apply border border-solid border-gray-200;
}
.icon {
	display: inline-block;
	width: 20px;
}
.img {
	width: 90px;
	border-radius: 5px;
	margin: 3px;
}
.radiusButton {
	display: inline-block;
	padding: 1px 10px;
	border-radius: 15px;
}

.borderButton {
	@apply border border-solid border-blue-500 ml-3 flex justify-center items-center;
	border-radius: 5px;
	width: 80px;
	height: 30px;
}

.text {
	text-indent: 20px;
}
.top {
	height: 40px;
	width: 100%;
	line-height: 40px;
	font-size: 16px;
	font-weight: bold;
	border-bottom: 2px dashed #ccc;
	text-align: center;
	margin-top: 5px;
}
</style>
