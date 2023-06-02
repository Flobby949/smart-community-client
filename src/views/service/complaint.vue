<script setup lang="ts" name="About">
import router from '@/router'
import { onClickLeft } from '@/utils'
import { ref } from 'vue'
import { getComplaintPage } from '@/api/complaint'
// 详情
const info = (item: any) => {
	router.push({
		name: 'complaintDetail',
		params: {
			complaintId: item.id
		}
	})
}

const add = (type: any) => {
	router.push({
		name: 'addComplaint'
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
	const { data } = await getComplaintPage(page)
	list.value = data.list
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
	page.page = 1
	sum = 0
	finished.value = false
	loading.value = true
	onLoad()
}
</script>
<template>
	<div class="h-52 bg-blue-400 rounded-bl-br-full" style="z-index: 99">
		<van-nav-bar title="投诉建议" left-arrow @click-left="onClickLeft" />
	</div>

	<div class="absolute top-20 w-[100%] h-[100%]">
		<div class="flex text-center items-center justify-around">
			<div class="w-10 bordera" @click="add">投诉建议</div>
		</div>

		<div class="bg-white mt-5 mr-2 ml-3">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div v-for="item in list" :key="item.id" class="bordera">
						<div>
							<div class="text-[20px] inline-block text-blue-600" @click="info(item)">{{ item.title }}</div>
							<div class="float-right">
								<div v-if="item.state == 0">未处理</div>
								<div v-if="item.state == 1">已处理</div>
							</div>
						</div>

						<hr />

						<div>
							<div class="list">
								<div>投诉类型</div>
								<div>物业服务</div>
							</div>

							<div class="list">
								<div>投诉时间</div>
								<div>{{ item.createTime }}</div>
							</div>
						</div>

						<div class="text-[20px]">报修内容</div>
						<hr />
						<div>
							{{ item.content }}
							<div class="flex">
								<template v-for="img in item.imgs" :key="img">
									<img class="img" :src="img" />
								</template>
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
	@apply border border-solid border-sky-900;
}
.img {
	width: 100px;
}
.icon {
	display: inline-block;
	width: 20px;
}

.list {
	@apply flex justify-between;
}
</style>
