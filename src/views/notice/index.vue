<script setup lang="ts" name="About">
import { getNoticePage, read } from '@/api/notice'
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
}
// const onRefresh = () => {
// 	//刷新即分页,已经加载数少于总数。即加来，而且一刷新，就默认refreshing.value  = true
// 	if (sum < total) {
// 		page.page = 1 + page.page
// 		onLoad()
// 	} else {
// 		alert('请勿重复刷新')
// 		refreshing.value = false
// 	}
// }

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
function handleTabChange(name: any) {
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
	<van-nav-bar title="消息中心" />
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
