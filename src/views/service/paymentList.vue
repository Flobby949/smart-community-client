<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar/index.vue'
import { getUserInfo } from '@/api/user'
import { OrderListByUserId } from '@/api/society'
import { showNotify, showToast } from 'vant'

// 获取 getUserInfo
const userInfo = ref<any>({})
let id = 0

const bills = ref<any>([{}])

onMounted(() => {
	info(0)
})

const info = (status: number) => {
	getUserInfo()
		.then(res => {
			id = res.data.id
			userInfo.value = res.data
			console.log(userInfo.value.id)
			getList(userInfo.value.id, status)
		})
		.catch(err => {
			console.log(err)
			// 消息提示
			showNotify({ message: '用户信息获取错误，请重新登录' + err.msg })
		})
}

const getList = (id: number, status: number) => {
	// alert(status)
	// if (status === 1) {
	// 	bills.value = [{}]
	// }
	OrderListByUserId(id, status)
		.then(res => {
			bills.value = res.data
		})
		.catch(err => {
			console.log(err)
			showNotify({ message: '订单获取错误' })
		})
}
const click = ({ title }: any) => {
	// if ({ title }) alert('fdajfl')
	// showToast(title)
	if (title === '未支付') {
		showToast(title)
		getList(id, 0)
	} else {
		showToast(title)
		getList(id, 1)
	}
}

// onMounted(() => {})?
const active = ref(0)
</script>
<template>
	<NavBar :title="'账单列表'" />
	<van-tabs v-model:active="active" class="bg-white items-center py-1" swipeable @click-tab="click">
		<van-tab title="未支付">
			<!-- 列表内容 -->
			<div v-for="(item, index) in bills" :key="index" class="p-4">
				<van-cell-group class="mt-4" inset>
					<!-- 链接 -->
					<van-cell :value="item.orderMoney + ' 元'" is-link :url="'#/payment/' + item.id">
						<template #title>
							<div>
								<span class="custom-title">{{ item.orderTypeName }}</span>
								<van-tag type="primary">{{ item.orderTypeName }}</van-tag>
							</div>
						</template>
					</van-cell>
				</van-cell-group>
			</div>
		</van-tab>
		<van-tab title="已支付" class="bg-white items-center py-1">
			<!-- 列表内容 -->
			<div v-for="(item, index) in bills" :key="index" class="p-4">
				<van-cell-group class="mt-4" inset>
					<van-cell :value="item.orderMoney + ' 元'" is-link :url="'#/payment/' + item.id">
						<template #title>
							<div>
								<span class="custom-title">{{ item.orderTypeName }}</span>
								<van-tag type="primary">{{ item.orderTypeName }}</van-tag>
							</div>
						</template>
					</van-cell>
				</van-cell-group>
			</div>
			<!-- <van-cell title="单元格" icon="location-o" /> -->
		</van-tab>
	</van-tabs>
</template>
