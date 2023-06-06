<script setup lang="ts">
import { getComplaintById } from '@/api/complaint'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { onClickLeft } from '@/utils'
import { useRoute } from 'vue-router'
const route = useRoute()

const complaintId = ref()
const item = ref<any>({})

onMounted(async () => {
	complaintId.value = route.params.complaintId
	await getComplaintById(complaintId.value).then(res => {
		item.value = res.data
	})
})
</script>
<template>
	<div class="h-52 rounded-bl-br-full" style="background-color: rgb(62, 150, 239)">
		<van-nav-bar title="投诉建议" left-arrow fixed @click-left="onClickLeft" />
	</div>
	<div class="bg-gray-100 min-h-screen">
		<div class="m-2 rounded-[20px] relative top-[-120px]">
			<div>
				<div class="bg-white borderb">
					<div class="p-[4px] pb-[10px]" style="border-bottom: 1px dotted gray">
						<div class="text-[1rem] inline-block text mt-1 mb-1">{{ item.title }}</div>
					</div>

					<div class="flex justify-between text mt-3">
						<div style="color: gray">投诉类型</div>
						<div class="mr-5">
							<div v-if="item.type == 0">扰民投诉</div>
							<div v-if="item.type == 1">物业投诉</div>
							<div v-if="item.type == 2">卫生投诉</div>
							<div v-if="item.type == 3">安全投诉</div>
						</div>
					</div>

					<div class="flex justify-between text mt-3">
						<div style="color: gray">投诉时间</div>
						<div class="mr-5">
							{{ item.createTime }}
						</div>
					</div>

					<div class="mt-3 pb-3" style="border-bottom: 1px dotted gray">投诉内容</div>

					<div>
						<div class="text mt-2" style="color: gray">
							{{ item.content }}
						</div>

						<div class="flex m-2" style="min-height: 100px">
							<template v-for="img in item.imgs" :key="img">
								<img class="img mr-3" :src="img" />
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="relative top-[-100px]">
			<div class="text">投诉反馈</div>

			<div class="ml-1 mr-1 mt-4 borderb pt-4 pb-6 bg-white">
				<div class="flex justify-between text mt-2">
					<div style="color: gray">反馈人</div>
					<div class="mr-2">物业客服</div>
				</div>

				<div class="flex justify-between text mt-2">
					<div style="color: gray">反馈时间</div>
					<div class="mr-2">2021/05/31 10:01:45</div>
				</div>

				<div class="flex justify-between mt-2 text">
					<div class="w-[150px]" style="color: gray">处理方案</div>
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

.borderb {
	border: 1px solid rgb(188, 188, 188);
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
