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
let list = ref<any[]>([])
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
	<div class="bg-gray-100">
		<div class="h-52 rounded-bl-br-full" style="z-index: 99; background-color: #409dfdff">
			<van-nav-bar title="投诉建议" left-arrow fixed @click-left="onClickLeft" />
		</div>

		<div class="relative top-[-120px]">
			<div class="flex text-center items-center justify-around">
				<div class="w-[140px] rounded-[20px] p-[8px] text-white add" style="background-color: #8bc4fdff" @click="add">+投诉建议</div>
			</div>

			<div class="mt-5 mr-2 ml-3">
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
					<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<div v-for="item in list" :key="item.id" class="borderb mb-5 bg-white rounded-[15px]">
							<div class="p-3" style="border-bottom: 1px dotted gray">
								<van-text-ellipsis class="text-[16px] inline-block" style="color: #409dfdff" :content="item.title" @click="info(item)" />
							</div>

							<div>
								<div class="list mt-2">
									<div class="text">投诉类型</div>
									<div class="mr-2">
										<div v-if="item.type == 0">扰民投诉</div>
										<div v-if="item.type == 1">物业投诉</div>
										<div v-if="item.type == 2">卫生投诉</div>
										<div v-if="item.type == 3">安全投诉</div>
									</div>
								</div>

								<div class="list mt-2">
									<div class="text">投诉时间</div>
									<div class="mr-2">{{ item.createTime }}</div>
								</div>
							</div>

							<div class="mt-2 pb-3" style="border-bottom: 1px dotted gray">报修内容</div>

							<div class="text mt-2">
								<van-text-ellipsis rows="3" style="line-height: 1.5rem" :content="item.content" @click="info(item)" />

								<div class="flex mt-4 mr-3" style="min-height: 80px">
									<template v-for="img in item.imgs" :key="img">
										<img class="img mr-3" :src="img" />
									</template>
								</div>
							</div>
						</div>
					</van-list>
				</van-pull-refresh>
			</div>
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
.borderb {
	@apply border border-solid border-gray-200;
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
.text {
	text-indent: 20px;
	color: gray;
}
.add {
	font-family: '华文琥珀';
	/* font-size: px; */
}
</style>
