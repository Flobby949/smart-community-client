<script setup lang="ts">
import router from '@/router'
import moment from 'moment'
import { ref, reactive } from 'vue'
import { ActivityList } from '@/api/society'
const activityList = ref<any[]>([])
ActivityList().then(res => {
	activityList.value = res.data
	console.log(activityList.value)
})
const showDetail = (id: number) => {
	router.push('/activityDetail/' + id)
}
const list = [
	{
		color: '#fdece4',
		title: '我的房屋',
		name: 'home-o',
		url: '/house'
	},
	{
		color: '#ebeafc',
		title: '访客邀请',
		name: 'friends-o',
		url: '/invitation'
	},
	{
		color: '#e9fbe3',
		title: '手机开门',
		name: 'open-o',
		url: '/Open'
	},
	{
		color: '#e2f4ff',
		title: '生活缴费',
		name: 'record-o',
		url: '/paymentList'
	}
]
const itemList = [
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
		title: '问卷调查',
		name: 'questionnaire'
	},
	{
		title: '社区公告',
		name: 'notice',
		url: '/notice'
	},
	{
		title: '联系物业',
		name: 'contact'
	},
	{
		title: '更多',
		name: 'more'
	}
]
</script>

<template>
	<div class="bigBox">
		<div class="swiper">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item>
					<img src="@/assets/1.png" alt="" />
				</van-swipe-item>
				<van-swipe-item>
					<img src="@/assets/2.png" alt="" />
				</van-swipe-item>
				<van-swipe-item>
					<img src="@/assets/3.png" alt="" />
				</van-swipe-item>
				<van-swipe-item>
					<img src="@/assets/4.png" alt="" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="notice">
			<van-notice-bar left-icon="volume-o" :scrollable="false">
				<van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false" :show-indicators="false">
					<van-swipe-item>2023年6月14日小雨，注意带伞</van-swipe-item>
					<van-swipe-item>智慧物业体验版上线了，快来尝鲜呀~~</van-swipe-item>
					<van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
				</van-swipe>
			</van-notice-bar>
		</div>
		<div class="controller">
			<div class="tips">
				<span></span>
				<span>常用功能</span>
			</div>
			<smart-item :list="list" />
		</div>
		<div class="info">
			<img src="@/assets/info.png" alt="" />
		</div>
		<div class="controller">
			<div class="tips">
				<span></span>
				<span>智慧社区</span>
			</div>
			<smart-icon :list="itemList" />
		</div>
		<div class="activity">
			<div class="tips">
				<span></span>
				<span>社区活动</span>
			</div>
			<div class="activitlist">
				<template v-for="(item, index) in activityList" :key="index">
					<div class="activititem" @click="showDetail(item.id)">
						<div class="img"><img :src="item.cover" alt="" class="image" /></div>
						<div class="activitinfo">
							<div class="activittitle">{{ item.title }}</div>
							<div class="activittime">
								<span>活动时间:</span>
								<span>{{ moment(item.publishTime).format('YYYY-MM-DD') }} ~ {{ moment(item.endTime).format('YYYY-MM-DD') }}</span>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
.bigBox {
	width: 100vw;
	height: 100vh;
	background-color: #f5f5f5;
	overflow-y: scroll;
}
.notice {
	margin-top: 2px;
	height: 40px;
	border-radius: 2px;
	background-color: #fff;
}
.notice-swipe {
	height: 40px;
	line-height: 40px;
}
.van-notice-bar {
	background-color: #fff;
	color: #000;
}
i {
	color: #3396fb;
}
.controller {
	margin-top: 10px;
	border-radius: 4px;
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
.info {
	margin-top: 10px;
	height: 100px;
	border-radius: 4px;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.info img {
	width: 90%;
	height: 90%;
}
.activity {
	margin-top: 10px;
	height: 40px;
	border-radius: 4px;
	background-color: #fff;
}

.activitlist {
	display: flex;
	flex-direction: column;
}
.activititem {
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: #fff;
	margin: 5px 8px;
	border-radius: 4px;
}
.activititem .img {
	height: 150px;
	width: 100%;
	border-radius: 4px;
	border-bottom: 2px solid #e4e4e4;
}
.activititem .img .image {
	width: 100%;
	height: 100%;
	border-radius: 4px;
}
.activititem .activitinfo {
	width: 100%;
	padding: 10px 10px;
}
.activititem .activittitle {
	font-size: 16px;
	line-height: 30px;
}
.activititem .activittime {
	display: flex;
	align-items: center;
	font-size: 14px;
	color: #0066ff;
	line-height: 30px;
}
</style>
