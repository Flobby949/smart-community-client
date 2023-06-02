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

	<div class="absolute top-20 w-[100%] h-[100%]">
		<div class="bg-white mt-5 mr-2 ml-3">
			<div>
				<div>
					<div class="text-[20px]">{{ item.title }}</div>
					<div class="float-right">
						<div v-if="item.state == 0">未处理</div>
						<div v-if="item.state == 1">已处理</div>
					</div>
				</div>

				<hr />
				<div>
					<div class="list">
						<div>投诉类型</div>
						<div>物业服务</div>
					</div>

					<div class="list">
						<div>投诉时间</div>
						<div>{{ item.createTime }}</div>
					</div>
				</div>

				<div class="text-[20px]">报修内容</div>
				<hr />
				<div>
					{{ item.content }}
					<div class="flex">
						<template v-for="img in item.imgs" :key="img">
							<img class="img" :src="img" />
						</template>
					</div>
				</div>
				<div class="text-[20px]">投诉反馈</div>
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
</style>
