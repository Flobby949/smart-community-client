<template>
	<div class="item" @click="onClick">
		<div class="left">
			<van-icon :name="props.name" />
			<span>{{ props.title }}</span>
		</div>
		<div class="right">
			<van-icon name="arrow" />
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: '默认标题'
	}
})
const emit = defineEmits(['onItemClick'])

const onClick = () => {
	emit('onItemClick')
}
</script>

<style scoped>
.item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #ebedf0;
	height: 40px;
	line-height: 40px;
	padding: 5px 10px;
}
.left {
	display: flex;
	align-items: center;
}
.left span {
	margin-left: 10px;
	font-size: 14px;
}
</style>
