<script setup lang="ts">
import { onMounted, ref } from 'vue'
import reviewCard from '@/components/review-card/index.vue'
import { auditList } from '@/api/smart'

const loading = ref(false)
const reviewList = ref([])
const getAuditList = () => {
	loading.value = true
	auditList()
		.then((res: any) => {
			reviewList.value = res.data
		})
		.finally(() => {
			loading.value = false
		})
}
onMounted(() => {
	getAuditList()
})
</script>

<template>
	<div class="h-[calc(100vh-50px)]">
		<nav-bar title="审核记录" />
		<van-pull-refresh v-model="loading" class="h-[calc(100vh-50px)]" style="margin-top: 50px" @refresh="getAuditList">
			<div class="flex flex-col w-screen justify-center items-center">
				<template v-for="item in reviewList" :key="item">
					<review-card :review-item="item" />
				</template>
			</div>
		</van-pull-refresh>
		<div class="addBtn" @click="$router.push('/addReview')">
			<van-icon name="plus" color="#fff" size="60px" />
		</div>
	</div>
</template>

<style scoped>
.addBtn {
	position: fixed;
	width: 80px;
	height: 80px;
	background: #0078d4;
	bottom: 10%;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 4px 4px 10px #b7b7b7, -2px -2px 10px #b7b7b7;
	z-index: 99;
}
</style>
