<script setup lang="ts">
import { getNoticeById } from '@/api/notice'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { onClickLeft } from '@/utils'
const route = useRoute()

let noticeId = ref('')
let item = ref<any>([])

onMounted(async () => {
	noticeId.value = route.params.noticeId as string

	console.log(route.params.noticeId)
	const { data } = await getNoticeById(noticeId.value)
	item.value = data
})
</script>

<template>
	<van-nav-bar title="公告详情" left-arrow @click-left="onClickLeft" />

	<div class="h-[10px] bg-gray-50"></div>
	<div class="mt-2">
		<div class="text-[16px] text-center">{{ item.title }}</div>
		<div class="flex justify-center">
			<div class="flex">
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
		<hr class="mt-2" />
		<div class="text">
			{{ item.content }}
		</div>

		<div class="text-right text-[14px] mt-5">
			<div>幸福苑物业管理公司</div>
			<div>2021年05月11日</div>
			<div>物业电话：1234567890</div>
		</div>
	</div>
</template>

<style scoped>
.icon {
	display: inline-block;
	width: 20px;
}

.text {
	text-indent: 20px;
}
</style>
