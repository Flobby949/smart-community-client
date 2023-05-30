<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const order = ref()

onMounted(() => {
	order.value = route.params.orderId
})
</script>

<template>
	<div>账单详情</div>
	<div>{{ order }}</div>
</template>
