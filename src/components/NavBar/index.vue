<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
	title: {
		type: String,
		default: '标题'
	},
	rightText: {
		type: String,
		default: ''
	}
})

const onClickLeft = () => {
	router.go(-1)
}
const emit = defineEmits(['click-right'])
const onClickRight = () => {
	emit('click-right')
}
</script>

<template>
	<van-nav-bar :fixed="true" :title="props.title" left-arrow :right-text="props.rightText" @click-left="onClickLeft" @click-right="onClickRight" />
</template>

<style scoped></style>
