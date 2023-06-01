<script setup lang="ts">
import { getNoticeById } from '@/api/notice'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { onClickLeft } from '@/utils'
const route = useRoute()

let noticeId = ref('')
let item = ref('')

onMounted(async () => {
	noticeId.value = route.params.noticeId

	console.log(route.params.noticeId)
	const { data } = await getNoticeById(noticeId.value)
	item.value = data
	// console.log(data)
	// getNoticeById(noticeId.value).then(res => {
	// 	// console.log(res)
	// 	item.value = res.data
	// 	console.log(item.value)
	// })
})
</script>

<template>
	<van-nav-bar title="公告详情" left-text="返回" left-arrow @click-left="onClickLeft" />
	<div class="text-[20px] text-center">{{ item.title }}</div>
	<div class="border border-solid border-dark-100">
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
	<div>
		{{ item.content }}
	</div>

	<div class="text-right">
		<div>幸福苑物业管理公司</div>
		<div>2021年05月11日</div>
		<div>物业电话：1234567890</div>
	</div>
</template>

<style scoped>
.icon {
	display: inline-block;
	width: 20px;
}
</style>
