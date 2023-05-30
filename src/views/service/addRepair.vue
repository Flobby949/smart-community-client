<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const type = ref()

onMounted(() => {
	type.value = route.params.type
})
</script>

<template>
	<div>添加报修</div>
	<div>{{ type }}</div>
</template>
