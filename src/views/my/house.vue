<template>
	<div class="box">
		<navbar title="我的房屋" />
		<div v-if="list.length > 0" class="list">
			<template v-for="(item, index) in list" :key="index">
				<div class="item">
					<div class="header">
						<span>{{ item.buildingName }}</span>
						<span>认证成功</span>
					</div>
					<div class="content">
						<div class="title">
							<span>楼栋房号</span>
							<span>{{ item.houseNumber }}</span>
						</div>
						<div class="desc">
							<span>住房类型</span>
							<span>{{ item.isOwner ? '业主' : '租客' }}</span>
						</div>
					</div>
					<div class="bottom">
						<van-radio :v-model="item.checked">默认小区</van-radio>
						<van-button plain hairline type="primary" round size="small" @click="deleteItem(item)">删除</van-button>
					</div>
				</div>
			</template>
		</div>
		<div v-else>
			<div class="empty">
				<img src="https://img.yzcdn.cn/vant/custom-empty-image.png" alt="" />
				<p>暂无房屋信息</p>
			</div>
		</div>
		<div class="controller">
			<van-button round block type="primary" @click="addHouse"> 我是业主，添加房屋 </van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { myHouse, deleteHouse } from '@/api/owner'
import navbar from '@/components/NavBar/index.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { showConfirmDialog, showNotify, showSuccessToast } from 'vant'
const router = useRouter()
const list = ref<any[]>([])
const addHouse = () => {
	router.push('/addHouse')
}
function getData() {
	myHouse().then((res: any) => {
		console.log(res)

		res.data.forEach((item: any) => {
			item.checked = item.isOwner == 1 ? true : false
		})
		list.value = res.data
		console.log(list.value)
	})
}

const deleteItem = (item: any) => {
	showConfirmDialog({
		title: '确定删除吗？',
		message: '删除后将无法恢复，请谨慎操作！'
	})
		.then(() => {
			deleteHouse(item.buildingId).then(() => {
				showSuccessToast('删除成功')
				window.location.reload()
			})
		})
		.catch(() => {
			showNotify('取消删除')
		})
}
onMounted(() => {
	getData()
})
</script>

<style scoped>
.box {
	background-color: #f5f5f5;
	height: 100vh;
}
.list {
	padding: 10px;
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 0 auto;
}
.item {
	background-color: #fff;
	width: 100%;
	border-radius: 4px;
	margin-bottom: 10px;
}
.header {
	padding: 5px 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #ccc;
}
.header span {
	font-size: 16px;
}
.header :nth-child(1) {
	color: #3f99fe;
}
.header :nth-child(2) {
	color: #ff888c;
}
.content {
	padding: 10px;
	font-size: 14px;
	border-bottom: 1px solid #ccc;
}
.title {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.desc {
	padding: 10px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.bottom {
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.van-button {
	width: 80px;
}
.controller {
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 20px;
	left: 0;
	right: 0;
	justify-content: center;
}
.controller .van-button {
	width: 160px;
	margin: 0 10px;
}
.empty {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.empty img {
	width: 100px;
	height: 100px;
}
</style>
