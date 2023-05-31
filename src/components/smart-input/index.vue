<template>
	<div class="input">
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
.input {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 6px 15px;
	border-bottom: 1px solid #ebedf0;
	height: 45px;
	line-height: 45px;
}
.right {
	overflow: hidden;
	display: flex;
	align-items: center;
}
.van-cell van-field {
	border: none;
	padding: 0;
	margin: 0;
}
</style>
