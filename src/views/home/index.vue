<script setup lang="ts">
import router from '@/router'
import moment from 'moment'
import { ref, reactive, onMounted } from 'vue'
import { getCommunityList, getActivity } from '@/api/carport/carport'
import { useStore } from '@/store'
import { ActivityList } from '@/api/society'
const activityList = ref<any[]>([])
// ActivityList().then(res => {
// 	activityList.value = res.data
// 	console.log(activityList.value)
// })
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
const communityList = ref<any[]>([])
interface PickItem {
	text: string
	value?: number
}
const communityName = ref('')
const communityId = ref(1)
const communityColumns: PickItem[] = reactive([])
//获取所有小区列表
const getCommunityLists = () => {
	getCommunityList().then(res => {
		communityList.value = res.data
		communityList.value.forEach(item => {
			let obj: PickItem = {
				text: item.communityName,
				value: item.id
			}
			communityColumns.push(obj)
		})
	})
}
//获取当前社区的活动列表
const getActivities = (communityId: number) => {
	ActivityList(communityId).then(res => {
		activityList.value = res.data
		console.log(res.data)
	})
}
const store = useStore()
const { setCommunity } = store
const { name, id } = store
onMounted(() => {
	getCommunityLists()
	console.log(name)
	communityName.value = name
	communityId.value = id
	getActivities(communityId.value)

	console.log(id)
})
const commChange = (value: any) => {
	const selectedItem = communityList.value.find(item => item.id === parseInt(value.target.value))
	setCommunity(selectedItem.id, selectedItem.communityName)
	console.log(name)
	communityName.value = selectedItem.communityName
	getActivities(communityId.value)
}
</script>

<template>
	<div class="bigBox">
		<div class="swiper">
			<select v-model="communityId" class="selectCity" @change="commChange">
				<option disabled selected value="" style="font-size: 0.5px">当前小区：{{ communityName }}</option>
				<option v-for="option in communityList" :key="option.value" :value="option.id" :label="option.communityName" class="text-xs">
					{{ option.communityName }}
				</option>
			</select>
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

			<div class="activitlist pb-[55px]">
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

.cityBox {
	display: flex;
	align-items: center;
	justify-content: center;
}

.swiper {
	position: relative;
}

.selectCity {
	position: absolute;
	top: 10px;
	left: 8px;
	z-index: 999;
	right: 0;
	width: 80px;
	height: 30px;
	border: none;
	outline: none;
	/* background-color: transparent; */
	/* background-color: #fff; */
	background-color: rgba(255, 255, 255, 0.2);
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-size: 14px;
	color: #000;
	text-align: center;
	border-radius: 4px;
	border: 1px solid #ccc;
	padding: 0 10px;
	margin-left: 10px;
}
</style>
