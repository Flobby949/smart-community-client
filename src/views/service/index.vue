<script setup lang="ts" name="About"></script>

<template>
	<div>物业服务</div>

	<div class="flex justify-around">
		<div class="border border-solid border-red-100 text-center" @click="$router.push('/notice')">
			<van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
			<div>社区公告</div>
		</div>

		<div class="border border-solid border-red-100 text-center">
			<van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
			<div>在线报修</div>
		</div>

		<div class="border border-solid border-red-100 text-center">
			<van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
			<div>投诉建议</div>
		</div>

		<div class="border border-solid border-red-100 text-center">
			<van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
			<div>联系物业</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
