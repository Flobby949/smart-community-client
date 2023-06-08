<template>
	<div class="empty">
		<img src="https://img.yzcdn.cn/vant/custom-empty-image.png" alt="" />
		<p>暂无数据</p>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.empty img {
	width: 200px;
	height: 200px;
}
.empty p {
	margin-top: 20px;
	font-size: 16px;
}
</style>
