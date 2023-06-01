<template>
	<div class="billRecord">
		<navBar title="缴费记录" />
		<!-- <div class="list"> -->
		<template v-for="(item, index) in list" :key="index">
			<div class="detailItem">
				<div class="time">{{ moment(item.access_time).format('MM月DD日') }}</div>
				<div class="billRecordItem">
					<div class="top">
						<img src="@/assets/icon/car-pay.png" alt="" />
						<span>{{ item.licence }}</span>
					</div>
					<div class="contentItemList">
						<div class="itemInfo">
							<span>停车类型</span>
							<span>{{ item.type == 0 ? '固定车辆' : '临时车辆' }}</span>
						</div>
						<div class="itemInfo">
							<span>进场时间</span>
							<span>{{ moment(item.access_time).format('YYYY/MM/DD HH:mm:ss') }}</span>
						</div>
						<div class="itemInfo">
							<span>已停时长</span>
							<span>{{ time(item.total_time) }}</span>
						</div>
						<div class="itemInfo">
							<span>计价单位</span>
							<span>{{ item.price }}元/小时</span>
						</div>
						<div class="itemInfo">
							<span>停车费用</span>
							<span>¥{{ Number(item.total_price).toFixed(2) }}元</span>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
	<!-- </div> -->
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import moment from 'moment'
import { onMounted, ref } from 'vue'
import { getMyCartParkVO } from '@/api/carport/carport'
const list = ref<any[]>([])
const router = useRouter()
function getData() {
	getMyCartParkVO().then((res: any) => {
		list.value = res.data
	})
}
onMounted(() => {
	getData()
})

const time = (timestamp: number) => {
	const date = new Date(timestamp)
	const hours = date.getHours().toString().padStart(2, '0') // 获取小时数并补零
	const minutes = date.getMinutes().toString().padStart(2, '0') // 获取分钟数并补零
	return `${hours}小时${minutes}分钟`
}
</script>

<style scoped>
.billRecord {
	height: 100vh;
	width: 100vw;
	background-color: #f5f5f5;
}
.billRecordItem {
	padding: 10px;
	width: 90%;
	display: flex;
	flex-direction: column;
	margin: 10px auto;
	background-color: #fff;
	border-radius: 4px;
}
.billRecordItem .contentItemList {
	width: 95%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-around;
	padding: 10px;
}
.billRecordItem .contentItemList .itemInfo {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.billRecordItem .top {
	display: flex;
	align-items: center;
	height: 40px;
	width: 100%;
	line-height: 40px;
	border-bottom: 2px dashed #ccc;
	padding-left: 10px;
	font-size: 16px;
}
.billRecordItem .top img {
	width: 25px;
	height: 25px;
	margin-right: 10px;
}
.time {
	padding: 10px;
	font-size: 16px;
	color: #000;
	text-align: center;
}
</style>
