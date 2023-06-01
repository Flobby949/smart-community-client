<script setup lang="ts" name="About">
import { getNoticePage } from '@/api/notice'
import { onClickLeft } from '@/utils'
import router from '@/router'
import { ref } from 'vue'

// import { getNoticePage } from '@/api/notice'
// import { reactive, ref } from 'vue'

const active = ref('')
const list = ref<any[]>([])
const loading = ref(false)
// 加载完成表示符
const finished = ref(false)
const refreshing = ref(false)
let status = -1
let page = {
	page: 1,
	limit: 15,
	status: 0
}
let total = 0
let sum = 0
//加载函数
const onLoad = async () => {
	page.status = status
	// console.log(page.status)
	const { data } = await getNoticePage(page)
	list.value = data.list
	loading.value = false
	// finished.value = true
	sum += list.value.length
	total = data.total
	console.log('sum')
	console.log(sum)
	console.log('total')
	console.log(total)

	//代表已经加加载了所有数据，显示没有更多了
	if (sum >= total) {
		finished.value = true
	} else {
	}
}
const onRefresh = () => {
	// 清空列表数据
	// finished.value = false
	// 重新加载数据
	//刷新即分页,已经加载数少于总数。即加来
	if (sum < total) {
		// 将 loading 设置为 true，表示处于加载状态
		loading.value = true
		page.page = 1 + page.page
		onLoad()
	} else {
		alert('请勿重复刷新')
	}
	//bu
	refreshing.value = false
	// loading.value = false
}
//切换执行函数，执行初始化
function handleTabChange(name: any) {
	status = name
	//分页初始化
	page.page = 1
	//数量初始化
	sum = total = 0
	//数据未加加载完成
	finished.value = false
	onLoad()
}

const info = (noticeId: any) => {
	router.push({
		name: 'noticeDetail',
		params: {
			noticeId: noticeId
		}
	})
}
</script>

<template>
	<van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
	<van-tabs active="{{ active }}" @change="handleTabChange">
		<van-tab title="全部公告" status="0">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
					<div v-for="item in list" :key="item.id" @click="info(item.id)">
						<div>
							<div class="text-[20px] aa inline-block">{{ item.title }}</div>
							<div class="float-right">
								<div v-if="item.status == 1">未读</div>
								<div v-if="item.status == 2">已读</div>
							</div>
						</div>

						<div class="border border-solid border-dark-100">
							{{ item.content }}
							<div class="flex">
								<div>
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
									<span>{{ item.publishTime }}</span>
								</div>

								<div class="ml-3">
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
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
					<template v-for="item in list" :key="item.id">
						<div>
							<div>
								<div class="text-[20px] aa inline-block">{{ item.title }}</div>
							</div>

							<div class="border border-solid border-dark-100">
								{{ item.content }}
								<div>
									<span>{{ item.publishTime }}</span>
									<span>{{ item.readNumber }}</span>
								</div>
							</div>
							<div></div>
						</div>
					</template>
				</van-list>
			</van-pull-refresh>
		</van-tab>
		<van-tab title="已读" status="2">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
					<template v-for="item in list" :key="item.id">
						<div>
							<div>
								<div class="text-[20px] aa inline-block">{{ item.title }}</div>
							</div>

							<div class="border border-solid border-dark-100">
								{{ item.content }}
								<div>
									<span>{{ item.publishTime }}</span>
									<span>{{ item.readNumber }}</span>
								</div>
							</div>
							<div></div>
						</div>
					</template>
				</van-list>
			</van-pull-refresh>
		</van-tab>
	</van-tabs>
</template>

<style scoped>
.aa {
	@apply border border-solid border-sky-900;
}
.icon {
	display: inline-block;
	width: 20px;
}
</style>
