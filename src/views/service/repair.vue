<script setup lang="ts" name="About">
import { getRepairPage } from '@/api/repair'
import router from '@/router'
import { onClickLeft } from '@/utils'
import { onMounted, ref } from 'vue'
let page = {
	page: 1,
	limit: 15,
	status: 0
}
let list = ref('')
onMounted(async () => {
	const { data } = await getRepairPage(page)
	// console.log(data)
	list.value = data.list
})
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
				<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
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
							<div>
								<img class="img" :src="item.imgs" />
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
