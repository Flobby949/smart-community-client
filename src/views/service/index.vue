<script setup lang="ts">
const itemList = [
	{
		title: '社区公告',
		name: 'notice',
		url: '/notice'
	},
	{
		title: '问卷调查',
		name: 'questionnaire',
		url: '/questionnaire'
	},
	{
		title: '在线报修',
		name: 'repair',
		url: '/repair'
	},
	{
		title: '投诉建议',
		name: 'suggest',
		url: '/complaint'
	},

	{
		title: '联系物业',
		name: 'contact',
		url: '/phone'
	}
]
const List = [
	{
		title: '生活缴费',
		name: 'life-o',
		url: '/carBill'
	},
	{
		title: '我的车位',
		name: 'cart-o',
		url: '/carport'
	},
	{
		title: '停车缴费',
		name: 'car-pay',
		url: '/carBill'
	},
	{
		title: '我的房屋',
		name: 'house-o',
		url: '/house'
	},

	{
		title: '手机开门',
		name: 'opendoor-o'
	},
	{
		title: '访客邀请',
		name: 'invite1-o',
		url: '/invite'
	},
	{
		title: '家属邀请',
		name: 'invite2-o',
		url: '/invite'
	}
]
</script>

<template>
	<div class="serviceBox">
		<van-nav-bar title="物业服务" />
		<div class="serviceList">
			<div class="one">
				<div class="tips">
					<span></span>
					<span>物业服务</span>
				</div>
				<service-icon :list="itemList" />
			</div>
			<div class="two">
				<div class="tips">
					<span></span>
					<span>社区服务</span>
				</div>
				<service-icon :list="List" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.serviceBox {
	height: 100vh;
	width: 100vw;
	background-color: #f5f5f5f5;
}
.serviceList {
	display: flex;
	flex-direction: column;
	padding: 10px;
	background-color: #fff;
}
.tips {
	display: flex;
	align-items: center;
	padding: 10px 20px;
	font-size: 14px;
}
.tips span:nth-child(1) {
	width: 4px;
	height: 16px;
	margin-right: 10px;
	background-color: #3396fb;
}
.two {
	margin-top: 20px;
}
</style>
