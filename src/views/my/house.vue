<template>
	<div class="box">
		<navbar title="我的房屋" />
		<div class="list">
			<div class="item">
				<div class="header">
					<span>幸福小区</span>
					<span>认证中</span>
				</div>
				<div class="content">
					<div class="title">
						<span>楼栋房号</span>
						<span>1栋1单元202室</span>
					</div>
					<div class="desc">
						<span>住房类型</span>
						<span>业主</span>
					</div>
				</div>
				<div class="bottom">
					<van-radio v-model="checked">默认小区</van-radio>
					<van-button plain hairline type="primary" round size="small">删除</van-button>
				</div>
			</div>
			<div class="item">
				<div class="header">
					<span>幸福小区</span>
					<span>认证中</span>
				</div>
				<div class="content">
					<div class="title">
						<span>楼栋房号</span>
						<span>1栋1单元202室</span>
					</div>
					<div class="desc">
						<span>住房类型</span>
						<span>业主</span>
					</div>
				</div>
				<div class="bottom">
					<van-radio v-model="checked">默认小区</van-radio>
					<van-button plain hairline type="primary" round size="small">删除</van-button>
				</div>
			</div>
		</div>
		<div class="controller">
			<van-button round block type="primary" @click="addHouse"> 我是业主，添加房屋 </van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { myHouse } from '@/api/owner'
import navbar from '@/components/NavBar/index.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'
const checked = ref(false)
const router = useRouter()
const addHouse = () => {
	router.push('/addHouse')
}
function getData() {
	myHouse().then((res: any) => {
		console.log(res)
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
</style>
