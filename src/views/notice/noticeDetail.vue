<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const noticeId = ref()

onMounted(() => {
	noticeId.value = route.params.noticeId
})
</script>

<template>
	<div>通知详情</div>
	<div>{{ noticeId }}</div>
</template>
