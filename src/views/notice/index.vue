<script setup lang="ts" name="About">
import { useRouter } from 'vue-router'

const router = useRouter()

const jump = () => {
	router.push({
		name: 'noticeDetail',
		params: {
			noticeId: 100
		}
	})
}
</script>

<template>
	<div>消息</div>

	<van-button type="primary" @click="jump">跳转</van-button>
</template>
