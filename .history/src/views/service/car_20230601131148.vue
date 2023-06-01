<template>
	<navbar title="我的车辆" />
	<div class="bg-blue-500 rounded-b-lg h-1/8">
		<div class="flex flex-col m-10 mt-15">
			<!--卡片1-->
			<div class="bg-white rounded-lg shadow-md p-4 mb-4">
				<h2 class="text-lg font-bold mb-2">车牌号：粤B88888</h2>
				<p>车辆品牌：奔驰</p>
				<p>型号：C 400</p>
				<p>年审日期：2021/11/01</p>
				<p>截止日期：2022/11/01</p>
			</div>
			<!--卡片2-->
			<div class="bg-white rounded-lg shadow-md p-4 mb-4">
				<h2 class="text-lg font-bold mb-2">车牌号：粤B666666</h2>
				<p>车辆品牌：宝马</p>
				<p>型号：X5</p>
				<p>年审日期：2021/12/01</p>
				<p>截止日期：2022/12/01</p>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import navbar from '@/components/NavBar/index.vue'
</script>
