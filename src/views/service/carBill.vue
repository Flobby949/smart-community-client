<template>
	<div class="carBill">
		<navBar title="停车缴费" right-text="缴费记录" @click-right="clickRight" />
		<div class="list">
			<template v-for="(item, index) in list" :key="index">
				<div class="item">
					<div class="top">{{ item.licence }}</div>
					<div class="contentItem">
						<div class="tipsItem">
							<span>车辆类型</span>
							<span>
								{{ item.type == 0 ? '固定车辆' : '临时车辆' }}
							</span>
						</div>
						<div class="tipsItem">
							<span>进场时间</span>
							<span>{{ moment(item.access_time).format('YYYY/MM/DD HH:mm:ss') }}</span>
						</div>
						<div class="tipsItem">
							<span>已停时长</span>
							<span>{{ time(item.total_time) }}</span>
						</div>
					</div>
					<div class="price">¥{{ Number(item.total_price).toFixed(2) }}</div>
					<div class="bottom">
						<van-button type="primary" round block>立即缴费</van-button>
					</div>
				</div>
			</template>
		</div>
	</div>
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

const clickRight = () => {
	router.push('/billRecord')
}
</script>

<style scoped>
.carBill {
	height: 100vh;
	width: 100vw;
	background-color: #f5f5f5;
}
.list {
	padding: 0 10px;
	width: 90%;
	margin: 10px auto;
	background-color: #fff;
	border-radius: 4px;
}

.item .top {
	height: 40px;
	width: 100%;
	line-height: 40px;
	font-size: 16px;
	font-weight: bold;
	border-bottom: 2px dashed #ccc;
	text-align: center;
}
.item .contentItem {
	padding-top: 20px;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.item .contentItem .tipsItem {
	width: 95%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.item .price {
	height: 40px;
	width: 100%;
	line-height: 40px;
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	color: #409eff;
}
.item .bottom {
	padding: 10px;
}
</style>
