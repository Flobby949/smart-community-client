<script setup lang="ts">
import { getComplaintById } from '@/api/complaint'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { onClickLeft } from '@/utils'
import { useRoute } from 'vue-router'
const route = useRoute()

const complaintId = ref()
const item = ref('')

onMounted(async () => {
	complaintId.value = route.params.complaintId
	await getComplaintById(complaintId.value).then(res => {
		item.value = res.data
	})
	console.log(item.value.content)
})
</script>
<template>
	<div class="h-52 bg-blue-400 rounded-bl-br-full" style="z-index: 99">
		<van-nav-bar title="投诉建议" left-arrow @click-left="onClickLeft" />
	</div>

	<div class="absolute top-20 w-[100%] h-[100%] bg-gray-100 m-2 rounded-[5px]">
		<div>
			<div class="borderb bg-white">
				<div class="p-[4px]">
					<div class="font-bold inline-block text mt-1 mb-1">{{ item.title }}</div>
				</div>

				<hr />

				<div class="flex justify-between text mt-3">
					<div>投诉类型</div>
					<div class="mr-5">
						<div v-if="item.type == 0">扰民投诉</div>
						<div v-if="item.type == 1">物业投诉</div>
						<div v-if="item.type == 2">卫生投诉</div>
						<div v-if="item.type == 3">安全投诉</div>
					</div>
				</div>

				<div class="flex justify-between text mt-3">
					<div>投诉时间</div>
					<div class="mr-5">
						{{ item.createTime }}
					</div>
				</div>

				<div class="mt-3 font-bold">投诉内容</div>
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

			<div class="text mt-2">投诉反馈</div>

			<div class="bg-white ml-2 mr-2">
				<div class="flex justify-between text mt-2">
					<div>反馈人</div>
					<div class="mr-2">物业客服</div>
				</div>

				<div class="flex justify-between text mt-2">
					<div>反馈时间</div>
					<div class="mr-2">2021/05/31 10:01:45</div>
				</div>

				<div class="flex justify-between mt-2 text">
					<div class="w-[150px]">处理方案</div>
					<div class="mr-2">感谢您的反馈和意见，我们已经处理 完成，感谢您的监督</div>
				</div>
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
}
</style>
