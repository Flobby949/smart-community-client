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
		<van-nav-bar title="在线报修" left-text="返回" left-arrow @click-left="onClickLeft" />
	</div>

	<div class="absolute top-20 w-[100%] h-[100%]">
		<div class="flex bordera text-center items-center justify-around">
			<div class="h-10 bordera text-center bg-white" @click="add(0)">
				<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/settings.png" />
				公告报修
			</div>

			<div class="h-10 bordera text-center bg-white" @click="add(1)">
				<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/house.png" />
				个人报修
			</div>
		</div>

		<div class="bg-white mt-5 mr-2 ml-3">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div v-for="item in list" :key="item.id" class="bordera">
						<div>
							<div class="text-[20px] inline-block">{{ item.title }}</div>
							<div class="float-right">
								<div v-if="item.state == 0">未处理</div>
								<div v-if="item.state == 1">已处理</div>
							</div>
						</div>

						<div>
							<span> 公告报修 </span>

							<span> 路灯 </span>
						</div>

						<di>
							{{ item.content }}
							<div class="flex">
								<template v-for="img in item.imgs" :key="img">
									<img class="img" :src="img" />
								</template>
							</div>
							<div class="flex">
								<div>
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
									<span>{{ item.createTime }}</span>
								</div>
								<div class="ml-3" @click="info(item)">报修详情</div>
							</div>
						</di>
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
.icon {
	display: inline-block;
	width: 20px;
}
.img {
	width: 100px;
}
</style>
