<script setup lang="ts">
import { getRepairById } from '@/api/repair'
import { onMounted } from 'vue'
import { onClickLeft } from '@/utils'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUserInfo } from '@/api/user'
const route = useRoute()

const repair = ref()
const item = ref('')
const user = ref('')

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
	<van-nav-bar title="报修详情" left-text="返回" left-arrow @click-left="onClickLeft" />
	<div>
		<div class="flex justify-between">
			<div>
				{{ item.title }}
			</div>
			<div>
				{{ item.title }}
			</div>
		</div>
		<hr />
		<div class="flex justify-between">
			<div>报修分类</div>
			<div>
				{{ item.type }}
			</div>
		</div>
		<div class="flex justify-between">
			<div>报修类型</div>
			<div>
				{{ item.category }}
			</div>
		</div>
		<div class="flex justify-between">
			<div>报修小区</div>
			<div>
				{{ item.communityName }}
			</div>
		</div>

		<div class="flex justify-between">
			<div>报修时间</div>
			<div>
				{{ item.createTime }}
			</div>
		</div>

		<div class="flex justify-between">
			<div>报修人</div>
			<div>
				{{ item.userName }}
			</div>
		</div>

		<div class="flex justify-between">
			<div>手机号</div>
			<div>
				{{ user.phone }}
			</div>
		</div>

		<div>报修内容</div>
		<hr />
		<div>
			<div>
				{{ item.content }}
			</div>
			<img />
		</div>
	</div>
</template>
