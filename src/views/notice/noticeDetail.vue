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
	<div style="background-color: #f5f5f5" class="h-screen">
		<van-nav-bar title="公告详情" left-arrow @click-left="onClickLeft" />
		<div class="bg-white h-screen mt-2 text-center">
			<div class="text-[17px] relative top-2">{{ item.title }}</div>
			<div class="mt-3 text-[14px]">
				<div class="flex" style="color: #a1a1a1">
					<div class="mx-auto">
						<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/time.png" />
						<span class="ml-1 relative top-[2px]">{{ item.publishTime }}</span>
					</div>

					<div class="mx-auto relative right-20">
						<img class="icon" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/eye.png" />
						<span class="left-2 relative top-[2px]">{{ item.readNumber }}</span>
					</div>
				</div>
				<div class="border-b border-slate-400 mt-3 border-opacity-40"></div>
			</div>
			<div class="mt-7" style="color: #333333">
				<div class="leading-[30px] w-[310px] mx-auto">
					{{ item.content }}
				</div>

				<div class="text-right mt-10 mr-7 leading-[30px]" style="color: black">
					<div>幸福苑物业管理公司</div>
					<div>2021年05月11日</div>
					<div>物业电话：010-1234567890</div>
				</div>
			</div>
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
