<script setup lang="ts" name="About">
import { getNoticePage, read, readNoticeNum } from '@/api/notice'
import { onClickLeft } from '@/utils'
import router from '@/router'
import { ref } from 'vue'

const list = ref<any[]>([])
let dataList: any = []
// const list: any = []
const loading = ref(false)
// 加载完成表示符
const finished = ref(false)
const refreshing = ref(false)
let status = 0
let page = {
	page: 1,
	limit: 15,
	status: 0
}
let total = 0
let sum = 0
let flag = 0
const unReadnum = ref(0)
//加载函数
const onLoad = async () => {
	flag++
	console.log(flag)
	page.status = status
	//不下拉刷新即加加载
	if (sum < total && refreshing.value == false) {
		page.page = 1 + page.page
	}
	loading.value = true
	const { data } = await getNoticePage(page)
	// list.value = list.value.concat(data.list)
	list.value = data.list
	// dataList = dataList.concat(data.list)
	//加载完毕
	loading.value = false
	console.log(list.value)
	console.log(dataList)
	loading.value = false
	if (refreshing.value == true) {
		refreshing.value = false
	}

	// sum += list.length
	sum += list.value.length
	total = data.total
	console.log('sum')
	console.log(sum)
	console.log('total')
	console.log(total)

	//代表已经加加载了所有数据，显示没有更多了
	if (sum >= total) {
		console.log('加载完毕。。。。')
		finished.value = true
	}

	await readNoticeNum().then(res => {
		unReadnum.value = res.data
		// console.log('阅读数量')
		// console.log(unReadnum.value)
	})
}

const onRefresh = () => {
	if (page.page > 1) {
		page.page = page.page - 1
	}

	list.value = []
	sum = 0
	finished.value = false
	onLoad()
}

//切换执行函数，执行初始化
async function handleTabChange(name: any) {
	if (flag > 0) {
		console.log('切换函数。。。。')
		status = name
		//分页初始化
		page.page = 1
		list.value = []
		//数量初始化
		finished.value = false
		sum = total = 0
		//数据未加加载完成
		// finished.value = false
		// onLoad()
	}
}

const info = (item: any) => {
	let data = {
		noticeId: item.id
	}
	// const params = new URLSearchParams()
	// params.append('noticeId', item.id)
	read(data)

	router.push({
		name: 'noticeDetail',
		params: {
			noticeId: item.id
		}
	})
}
</script>

<template>
	<div class="bg-gray-100">
		<van-nav-bar title="消息中心" left-arrow @click-left="onClickLeft" />
		<van-badge :content="unReadnum" color="#1989fa" class="absolute left-[58%] top-[15px]" style="z-index: 999">
			<div class="child" />
		</van-badge>
		<van-tabs @change="handleTabChange">
			<van-tab title="全部公告" status="0">
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
					<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<div v-for="item in list" :key="item.id" class="borderb m-3 bg-white" @click="info(item)">
							<div class="flex justify-between">
								<div class="font-bold inline-block p-2">{{ item.title }}</div>
								<div class="flex items-center">
									<div v-if="item.status == 1" class="text-blue-500 text-[13px] mr-4">未读</div>
									<div v-if="item.status == 2">已读</div>
								</div>
							</div>

							<div class="borderb mt-1">
								<van-text-ellipsis class="text" style="line-height: 20px" rows="3" :content="item.content" />
								<div class="flex m-2">
									<div class="flex">
										<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
										<span>{{ item.publishTime }}</span>
									</div>

									<div class="flex ml-3">
										<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/eye.png" />
										<span>{{ item.readNumber }}</span>
									</div>
								</div>
							</div>
						</div>
					</van-list>
				</van-pull-refresh>
			</van-tab>

			<van-tab title="未读" status="1">
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
					<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<div v-for="item in list" :key="item.id" class="borderb m-3 bg-white" @click="info(item)">
							<div class="flex justify-between">
								<div class="font-bold inline-block p-2">{{ item.title }}</div>
							</div>

							<div class="borderb mt-1">
								<van-text-ellipsis class="text" style="line-height: 20px" rows="3" :content="item.content" />
								<div class="flex m-2">
									<div class="flex">
										<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
										<span>{{ item.publishTime }}</span>
									</div>

									<div class="flex ml-3">
										<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/eye.png" />
										<span>{{ item.readNumber }}</span>
									</div>
								</div>
							</div>
						</div>
					</van-list>
				</van-pull-refresh>
			</van-tab>

			<van-tab title="已读" status="2">
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
					<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<div v-for="item in list" :key="item.id" class="borderb m-3 bg-white" @click="info(item)">
							<div class="flex justify-between">
								<div class="font-bold inline-block p-2">{{ item.title }}</div>
							</div>

							<div class="borderb mt-1">
								<van-text-ellipsis class="text" style="line-height: 20px" rows="3" :content="item.content" />
								<div class="flex m-2">
									<div class="flex">
										<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
										<span>{{ item.publishTime }}</span>
									</div>

									<div class="flex ml-3">
										<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/eye.png" />
										<span>{{ item.readNumber }}</span>
									</div>
								</div>
							</div>
						</div>
					</van-list>
				</van-pull-refresh>
			</van-tab>
		</van-tabs>
	</div>
</template>

<style scoped>
.bordera {
	@apply border border-solid border-sky-900;
}

.borderb {
	@apply border border-solid border-gray-200;
}
.icon {
	display: inline-block;
	width: 20px;
}
.text {
	text-indent: 20px;
}
</style>
