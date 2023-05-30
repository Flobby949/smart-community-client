<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const compaintId = ref()

onMounted(() => {
	compaintId.value = route.params.compaintId
})
</script>

<template>
	<div>投诉详情</div>
	<div>{{ compaintId }}</div>
</template>
