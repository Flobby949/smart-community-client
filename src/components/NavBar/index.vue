<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
	title: {
		type: String,
		default: '标题'
	}
})

const onClickLeft = () => {
	router.back()
}
</script>

<template>
	<van-nav-bar :title="props.title" left-arrow @click-left="onClickLeft" />
</template>

<style scoped></style>
