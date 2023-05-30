<template>
	<div class="box">
		<div class="left">
			{{ prop.title }}
		</div>
		<div class="right">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
const prop = defineProps({
	title: {
		type: String,
		default: ''
	}
})
</script>

<style scoped>
.box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2px 15px;
	border-bottom: 1px solid #ebedf0;
	height: 40px;
	line-height: 40px;
}
.right {
	display: flex;
	align-items: center;
}
</style>
