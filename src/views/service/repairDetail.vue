<script setup lang="ts">
import { getRepairById } from '@/api/repair'
import { onMounted } from 'vue'
import { onClickLeft } from '@/utils'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUserInfo } from '@/api/user'
const route = useRoute()

const repair = ref()
const item = ref<any>('')
const user = ref<any>('')

onMounted(async () => {
	repair.value = route.params.repairId
	let { data } = await getRepairById(repair.value)
	item.value = data
	console.log('数据')
	console.log(data)

	getUserInfo().then(res => {
		user.value = res.data
	})
})
</script>

<template>
	<div class="h-52 bg-blue-400 rounded-bl-br-full" style="z-index: 99">
		<van-nav-bar title="报修详情" left-arrow fixed @click-left="onClickLeft" />
	</div>

	<div class="absolute top-20 w-[100%] h-[100%] bg-gray-100 m-2 rounded-[5px]">
		<div class="borderb bg-white">
			<div class="p-[4px]">
				<div class="font-bold inline-block text mt-1 mb-1">{{ item.title }}</div>
				<div class="float-right mr-3">
					<div v-if="item.state == 0" class="bg-red-500 radiusButton">未处理</div>
					<div v-if="item.state == 1" class="bg-yellow-500 radiusButton">处理中</div>
					<div v-if="item.state == 2" class="bg-blue-500 radiusButton">已理中</div>
					<div v-if="item.state == 3" class="bg-gray-300 radiusButton">已评价</div>
				</div>
			</div>

			<hr />

			<div class="flex justify-between text mt-3">
				<div>报修分类</div>
				<div class="mr-5">
					<div v-if="item.type == 0">公共报修</div>
					<div v-if="item.type == 1">公共报修</div>
				</div>
			</div>
			<div class="flex justify-between text mt-3">
				<div>报修类型</div>
				<div class="mr-5">
					<div v-if="item.category == 0">路灯</div>
					<div v-if="item.category == 1">厕所</div>
				</div>
			</div>
			<div class="flex justify-between text mt-3">
				<div>报修小区</div>
				<div class="mr-5">
					{{ item.communityName }}
				</div>
			</div>

			<div class="flex justify-between text mt-3">
				<div>报修时间</div>
				<div class="mr-5">
					{{ item.createTime }}
				</div>
			</div>

			<div class="flex justify-between text mt-3">
				<div>报修人</div>
				<div class="mr-5">
					{{ item.userName }}
				</div>
			</div>

			<div class="flex justify-between text mt-3">
				<div>手机号</div>
				<div class="mr-5">
					{{ user.phone }}
				</div>
			</div>

			<div class="mt-3">报修内容</div>
			<hr class="mt-2" />
			<div>
				<div class="text mt-2">
					{{ item.content }}
				</div>

				<div class="flex m-2">
					<template v-for="img in item.imgs" :key="img">
						<img class="img" :src="img" />
					</template>
				</div>
			</div>
		</div>

		<div>
			<div class="mt-2 text">报修处理</div>
			<div class="bg-white">
				<van-steps direction="vertical" :active="3">
					<van-step>
						<h3>2021/05/31 10:01:45</h3>
						<div class="text-blue-500 flex">
							<div>报修人:</div>
							<div class="ml-1">{{ item.userName }}</div>
						</div>
					</van-step>
					<van-step>
						<h3>2021/05/31 10:01:45</h3>
						<div class="text-blue-500 flex">
							<div>处理人:</div>
							<div class="ml-1">李明轩</div>
						</div>
						<div class="text-blue-500 flex">
							<div>状态:</div>
							<div class="ml-1">待处理</div>
						</div>
					</van-step>
					<van-step>
						<h3>2021/05/31 10:01:45</h3>
						<div class="text-blue-500 flex">
							<div>处理人:</div>
							<div class="ml-1">李明轩</div>
						</div>
						<div class="text-blue-500 flex">
							<div>状态:</div>
							<div class="ml-1">已完成</div>
						</div>

						<div class="text-blue-500 flex">
							<div>处理内容:</div>
							<div class="ml-1">更换电灯泡</div>
						</div>

						<div class="text-blue-500 flex">
							<div>现场照片:</div>
							<div class="ml-1">
								<template v-for="img in item.imgs" :key="img">
									<img class="img" :src="img" />
								</template>
							</div>
						</div>
					</van-step>
				</van-steps>
			</div>
		</div>
	</div>
</template>

<style scoped>
.rounded-bl-br-full {
	border-bottom-left-radius: 80px;
	border-bottom-right-radius: 80px;
}
.radiusButton {
	display: inline-block;
	padding: 1px 10px;
	border-radius: 15px;
}

.bordera {
	/* @apply border border-solid border-sky-900; */
}

.borderb {
	@apply border border-solid border-gray-200;
}

.borderButton {
	@apply border border-solid border-blue-500 ml-3 flex justify-center items-center;
	border-radius: 5px;
	width: 80px;
	height: 30px;
}

.text {
	text-indent: 20px;
}
.img {
	width: 90px;
	border-radius: 5px;
	margin: 3px;
}
</style>
