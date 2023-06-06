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
	<van-nav-bar title="消息中心" fixed />
	<van-tabs active="{{ active }}" style="background-color: #f5f5f5" @change="handleTabChange">
		<van-tab title="全部公告" status="0">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<template v-for="(item, index) in list" :key="index">
						<div class="listBox" @click="info(item)">
							<div class="listBox-header">
								<div class="left">{{ item.title }}</div>
								<div class="right">
									<div v-if="item.status == 1">未读</div>
									<div v-if="item.status == 2">已读</div>
								</div>
							</div>
							<div class="listBox-content">
								{{ item.content }}
							</div>
							<div class="listBox-footer">
								<div class="left">
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
									<span>{{ item.publishTime }}</span>
								</div>
								<div class="right">
									<van-icon class="eye" name="eye-o" />
									<span>{{ item.readNumber }}</span>
								</div>
							</div>
						</div>
					</template>
				</van-list>
			</van-pull-refresh>
		</van-tab>
		<van-tab title="未读" status="1">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<template v-for="(item, index) in list" :key="index">
						<div class="listBox" @click="info(item)">
							<div class="listBox-header">
								<div class="left">{{ item.title }}</div>
							</div>
							<div class="listBox-content">
								{{ item.content }}
							</div>
							<div class="listBox-footer">
								<div class="left">
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
									<span>{{ item.publishTime }}</span>
								</div>
								<div class="right">
									<van-icon class="eye" name="eye-o" />
									<span>{{ item.readNumber }}</span>
								</div>
							</div>
						</div>
					</template>
				</van-list>
			</van-pull-refresh>
		</van-tab>
		<van-tab title="已读" status="2">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<template v-for="(item, index) in list" :key="index">
						<div class="listBox" @click="info(item)">
							<div class="listBox-header">
								<div class="left">{{ item.title }}</div>
							</div>
							<div class="listBox-content">
								{{ item.content }}
							</div>
							<div class="listBox-footer">
								<div class="left">
									<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
									<span>{{ item.publishTime }}</span>
								</div>
								<div class="right">
									<van-icon class="eye" name="eye-o" />
									<span>{{ item.readNumber }}</span>
								</div>
							</div>
						</div>
					</template>
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
.listBox {
	border-radius: 10px;
	margin: 10px;
	width: 95%;
	background-color: #fff;
	height: 170px;
}
.listBox-header {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	border-bottom: 1px solid #ccc;
}
.listBox-header .right {
	color: #2c58e9;
	font-size: 14px;
}
.listBox-content {
	padding: 10px;
	color: #666666;
	font-size: 14px;
}
.listBox-footer {
	font-size: 14px;
	display: flex;
	justify-content: space-between;
	padding: 10px 10px 20px 10px;
}
.listBox-footer .left {
	display: flex;
	align-items: center;
	color: #666666;
}
.listBox-footer .right {
	display: flex;
	align-items: center;
	color: #666666;
}
.listBox-footer .right span,
.listBox-footer .left span {
	margin-left: 5px;
}

.van-pull-refresh {
	min-height: 500px;
}
</style>
