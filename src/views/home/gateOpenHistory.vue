<template>
	<div class="bg-blue-500 rounded-b-lg h-[150px]">
		<NavBar :title="'开门记录'" />
		<!-- <div class="bg-blue-600 h-[80px]"></div> -->
		<div class="guest-list mt-[50px]">
			<div class="mt-1 p-3">
				<van-list class="bg-white rounded-lg shadow-md p-4 mb-4">
					<van-cell v-for="(item, index) in historyLists" :key="index" class="p-1" :title="item.name" :value="item.createTime"> </van-cell>
				</van-list>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, toRef, onMounted } from 'vue'
import { getUserInfo } from '@/api/user'
import { gateOpenListByUserId } from '@/api/society'
const userInfo = ref<any>({})
// 用户id
let userId = 0

const historyLists = ref<any>([])

onMounted(() => {
	getUserInfo().then(res => {
		userId = res.data.id
		userInfo.value = res.data
		console.log(userInfo.value.id)
		gateOpenListByUserId(userId).then(res => {
			historyLists.value = res.data
			console.log(historyLists)
		})
	})
	// 获取开门历史记录
})
</script>

<style>
.dashed-border {
	border: 1px dashed #ddd;
	border-radius: 0.5rem;
}
</style>
