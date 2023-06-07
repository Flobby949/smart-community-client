<script setup lang="ts" name="About">
import { getNoticePage, read, readNoticeNum } from '@/api/notice'
import { onClickLeft } from '@/utils'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import router from '@/router'
const route = useRoute()
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

//1消息
const isNotice = ref('0')

onMounted(() => {
	console.log('路由测试')
	isNotice.value = route.query.isNotice
	console.log(isNotice.value)
})
let total = 0
let sum = 0
let flag = 0
const unReadnum = ref(0)
//加载函数
const onLoad = async () => {
	flag++
	console.log(flag)
	page.status = status
	if (sum < total && refreshing.value == false) {
		page.page = 1 + page.page
	}
	const { data } = await getNoticePage(page)
	list.value = data.list
	//加载完毕
	loading.value = false
	// console.log(loading.value)
	refreshing.value = false
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

	await readNoticeNum().then(res => {
		unReadnum.value = res.data
		// console.log('阅读数量')
		// console.log(unReadnum.value)
	})
}

const onRefresh = () => {
	page.page = 1
	sum = 0
	finished.value = false
	loading.value = true
	onLoad()
}

//切换执行函数，执行初始化
async function handleTabChange(name: any) {
	if (flag > 0) {
		status = name
		//分页初始化
		page.page = 1
		//数量初始化
		sum = total = 0
		//数据未加加载完成
		// finished.value = false
		onLoad()
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
	<van-nav-bar v-if="isNotice == '1'" title="消息中心" left-arrow @click-left="onClickLeft" />
	<van-nav-bar v-else title="社区公告" left-arrow @click-left="onClickLeft" />
	<van-badge v-if="isNotice != '1'" :content="unReadnum" color="#1989fa" class="absolute left-[58%] top-[15px]" style="z-index: 999">
		<div class="child" />
	</van-badge>

	<div v-if="isNotice == '1'">
		<van-pull-refresh v-model="refreshing" class="w-[350px] mx-auto" @refresh="onRefresh">
			<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" class="" @load="onLoad">
				<div v-for="item in list" :key="item.id" class="border-[1px] mt-2 bg-white rounded-lg border-slate-300 h-[180px]" @click="info(item)">
					<div>
						<div class="text-[20px] inline-block mt-4 ml-2">{{ item.title }}</div>
						<div class="float-right mr-2 mt-4">
							<div v-if="item.status == 1" class="text-blue-400">未读</div>
							<div v-if="item.status == 2" class="text-gray-400">已读</div>
						</div>
					</div>

					<div class=" " style="color: #666666">
						<div class="ml-6 mt-2 w-[310px] line-clamp-3">{{ item.content }}</div>

						<div class="flex mt-6 ml-3">
							<div>
								<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
								<span class="ml-1 relative top-[2px]">{{ item.publishTime }}</span>
							</div>

							<div class="ml-3">
								<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/eye.png" />
								<span class="ml-3 relative top-[2px]">{{ item.readNumber }}</span>
							</div>
						</div>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>

	<van-tabs v-else active="{{ active }}" style="background-color: #f5f5f5" @change="handleTabChange">
		<van-tab title="全部公告" status="0">
			<van-pull-refresh v-model="refreshing" class="w-[350px] mx-auto" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" class="" @load="onLoad">
					<div v-for="item in list" :key="item.id" class="border-[1px] mt-2 bg-white rounded-lg border-slate-300 h-[180px]" @click="info(item)">
						<div>
							<div class="text-[20px] inline-block mt-4 ml-2">{{ item.title }}</div>
							<div class="float-right mr-2 mt-4">
								<div v-if="item.status == 1" class="text-blue-400">未读</div>
								<div v-if="item.status == 2" class="text-gray-400">已读</div>
							</div>
						</div>

						<div class=" " style="color: #666666">
							<div class="ml-6 mt-2 w-[310px] line-clamp-3">{{ item.content }}</div>

							<div class="flex mt-6 ml-3">
								<div>
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
									<span class="ml-1 relative top-[2px]">{{ item.publishTime }}</span>
								</div>

								<div class="ml-3">
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/eye.png" />
									<span class="ml-3 relative top-[2px]">{{ item.readNumber }}</span>
								</div>
							</div>
						</div>
					</div>
				</van-list>
			</van-pull-refresh>
		</van-tab>
		<van-tab title="未读" status="1">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" class="w-[350px] mx-auto" @load="onLoad">
					<div v-for="item in list" :key="item.id" class="border-[1px] mt-3 bg-white rounded-lg border-slate-300 h-[180px]" @click="info(item)">
						<div>
							<div class="text-[20px] inline-block mt-4 ml-2 aa">{{ item.title }}</div>
						</div>

						<div class="" style="color: #666666">
							<div class="ml-6 mt-2 w-[310px] line-clamp-3">{{ item.content }}</div>
							<div class="flex mt-6 ml-3">
								<div>
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
									<span class="ml-1 relative top-[2px]">{{ item.publishTime }}</span>
								</div>

								<div class="ml-3">
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/eye.png" />
									<span class="ml-3 relative top-[2px]">{{ item.readNumber }}</span>
								</div>
							</div>
						</div>
					</div>
				</van-list>
			</van-pull-refresh>
		</van-tab>
		<van-tab title="已读" status="2">
			<van-pull-refresh v-model="refreshing" class="w-[350px] mx-auto" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div v-for="item in list" :key="item.id" class="border-[1px] mt-3 bg-white rounded-lg border-slate-300 h-[180px]" @click="info(item)">
						<div>
							<div class="text-[20px] inline-block mt-4 ml-2 aa">{{ item.title }}</div>
						</div>

						<div class="" style="color: #666666">
							<div class="ml-6 mt-2 w-[310px] line-clamp-3">{{ item.content }}</div>
							<div class="flex mt-6 ml-3">
								<div>
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
									<span class="ml-1 relative top-[2px]">{{ item.publishTime }}</span>
								</div>

								<div class="ml-3">
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/eye.png" />
									<span class="ml-3 relative top-[2px]">{{ item.readNumber }}</span>
								</div>
							</div>
						</div>
					</div>
				</van-list>
			</van-pull-refresh>
		</van-tab>
	</van-tabs>
</template>

<style scoped>
.bordera {
	@apply border border-solid border-sky-900;
}
.icon {
	display: inline-block;
	width: 20px;
}
</style>
