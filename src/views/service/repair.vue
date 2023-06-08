<script setup lang="ts" name="About">
import { getRepairPage } from '@/api/repair'
import router from '@/router'
import { onClickLeft } from '@/utils'
import { onMounted, ref } from 'vue'

// 详情
const info = (item: any) => {
	console.log('uId:' + item.userId)
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
	<div style="background-color: #f5f5f5">
		<div>
			<div class="h-52 rounded-bl-br-full" style="z-index: 99; background: #409eff">
				<van-nav-bar title="在线报修" left-arrow @click-left="onClickLeft" />
			</div>

			<div class="flex bordera text-center items-center justify-around relative bottom-[145px]">
				<div class="h-[56px] w-[40%] bordera text-center bg-white flex rounded-md ml-3" @click="add(0)">
					<img class="w-[50px] h-[50px] mt-[1px]" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/settings.png" />
					<div class="flex-1 bordera flex items-center font-semibold font-[20px] ml-2" style="color: #409eff">公告报修</div>
				</div>

				<div class="h-[56px] w-[42%] bordera text-center bg-white flex rounded-md mr-3" @click="add(1)">
					<img class="w-[50px] h-[44px] mt-[4px]" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/house.png" />
					<div class="flex-1 bordera flex items-center font-semibold font-[20px] ml-2" style="color: #409eff">个人报修</div>
				</div>
			</div>
		</div>
		<div class="mr-2 ml-3 relative bottom-[135px]">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div v-for="item in list" :key="item.id" class="bg-white borderb mt-4 rounded-[10px] h-[275px]">
						<div class="flex justify-between">
							<van-text-ellipsis class="text-[15px] flex-1 ml-5 mt-2" :content="item.title" @click="info(item)" />
							<div class="text-center mt-[6px] mr-4">
								<div v-if="item.state == 0" class="radiusButton text-white text-[10px]" style="background-color: #ff3b31">未处理</div>
								<div v-if="item.state == 1" class="bg-yellow-500 radiusButton text-white text-[10px]">处理中</div>
								<div v-if="item.state == 2" class="radiusButton text-white text-[10px]" style="background-color: #409eff">受理中</div>
								<div v-if="item.state == 3" class="bg-gray-300 radiusButton text-white text-[10px]">已评价</div>
							</div>
						</div>

						<hr class="mt-2" />
						<div class="flex mt-[10px]" style="color: #409eff">
							<div v-if="item.type == 0" class="borderButton">公共报修</div>
							<div v-if="item.type == 1" class="borderButton">公共报修</div>

							<div v-if="item.category == 0" class="borderButton">路灯</div>
							<div v-if="item.category == 1" class="borderButton">厕所</div>
						</div>

						<div class="m-2">
							<div class="bg-slate-100 text-[14px] h-[60px] flex items-center justify-center" style="color: #666666">
								<van-text-ellipsis style="line-height: 20px" rows="2" :content="item.content" class="ml-3" @click="info(item)" />
							</div>

							<div class="flex">
								<template v-for="img in item.imgs" :key="img">
									<img class="img" :src="img" />
								</template>
							</div>
							<hr class="mt-2" />
							<div class="flex justify-between text-[15px] mt-2" style="color: #999999">
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

.img {
	width: 90px;
	height: 70px;
	border-radius: 5px;
	margin: 4px;
}
.radiusButton {
	display: inline-block;
	padding: 1px 10px;
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 25px;
	width: 66px;
}

.borderButton {
	@apply border border-solid border-blue-500 ml-3 flex justify-center items-center;
	border-radius: 5px;
	width: 76px;
	height: 27px;
	font-size: 10px;
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
