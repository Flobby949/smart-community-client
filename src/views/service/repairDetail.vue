<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const repair = ref()

onMounted(() => {
	repair.value = route.params.repairId
})
</script>

<template>
	<div>报修详情</div>
	<div>{{ repair }}</div>
</template>
