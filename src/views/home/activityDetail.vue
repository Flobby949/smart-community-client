<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const activity = ref()

onMounted(() => {
	activity.value = route.params.activityId
})
</script>

<template>
	<div>活动详情</div>
	<div>{{ activity }}</div>
</template>
