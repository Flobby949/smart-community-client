<template>
	<div class="bg-blue-500 rounded-b-3xl h-[180px]">
		<NavBar :title="'访客邀请记录'" :right-text="'开门记录'" @click-right="handleClickRight" />
		<!-- <div class="bg-blue-600 h-[80px]"></div> -->
		<div class="guest-list mt-[50px]">
			<div class="mt-0 p-3">
				<div class="text-white text-2xl relative top-[-20px] flex">
					<p>访客邀请记录</p>
					<div class="absolute right-0 top-[-10px]">
						<van-button round size="small" icon="plus" class="absolute right-0" @click="router.push('/invitation')">新增访客邀请</van-button>
					</div>
				</div>
				<!-- <div class="bg-white rounded-lg shadow-md p-4 mb-1 relative">
					 <van-cell class="p-1" v-for="(item, index) in list" :key="index" :title="item.name" :value="item.createTime"> </van-cell> -->

				<!--<div class="flex text-xl">
						<p class="pb-1">房屋：{{}}</p>
						<div class="absolute right-2 p-1 top-[-1px]">
							<van-button round size="mini" class="">使失效</van-button>
						</div>
					</div>
					<div class="dashed"></div>
					<div>
						<p class="text-gray-500 pt-1">开门授权：</p>
						<div class="grid grid-cols-2 gap-4 justify-center items-center ml-10 mr-10 text-gray-500 mt-5 mb-5">
							<div class="border border-gray-400">西入口闸机</div>
							<div class="border border-gray-400">东入口闸机</div>
							<div class="border border-gray-400">1号楼1单元</div>
							<div class="border border-gray-400">1号楼2单元</div>
						</div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">有效时长：{{}}</p>
							<div class="p-1 absolute right-0 top-2 text-blue-500" @click=""><van-icon color="#409eff" name="share-o" />分享</div>
						</div>
					</div>
				</div> -->
				<div v-for="(item, index) in inviList" :key="index" class="bg-white rounded-lg shadow-md p-4 mb-1 relative">
					<!-- <van-cell class="p-1" v-for="(item, index) in list" :key="index" :title="item.name" :value="item.createTime"> </van-cell> -->

					<div class="flex text-xl">
						<p class="pb-1">{{ item.houseInfo }}</p>
						<div class="absolute right-2 p-1 top-[-1px]">
							<van-button v-if="item.status === 0" round size="mini" type="primary" class="" @click="changeStatus(item.id)">使失效</van-button>
							<van-button v-if="item.status === 1" round size="mini" type="warning" class="">已失效</van-button>
						</div>
					</div>
					<div class="dashed"></div>
					<div>
						<p class="text-gray-500 pt-1">开门授权：</p>
						<div class="grid grid-cols-2 gap-4 justify-center items-center ml-10 mr-10 text-gray-500 mt-5 mb-5">
							<div class="border border-gray-400">西入口闸机</div>
							<div class="border border-gray-400">东入口闸机</div>
							<div class="border border-gray-400">1号楼1单元</div>
							<div class="border border-gray-400">1号楼2单元</div>
						</div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">有效时长：{{ item.validTime }}</p>
							<div class="p-1 absolute right-0 top-2 text-blue-500" @click="share(item.id, item)">
								<van-icon color="#409eff" name="share-o" />分享
							</div>
						</div>
					</div>

					<van-dialog
						v-model:show="show"
						:show-cancel-button="false"
						:show-confirm-button="false"
						:overlay-style="overlayStyle"
						:style="{ width: '80%', height: '80%' }"
					>
						<div class="h-[40px] bg-blue-500 text-center pt-3">{{ item.houseInfo }}</div>
						<div class="w-[100px] justify-center items-center ml-auto mr-auto mt-10">
							<img :src="imgUrl" />
						</div>
						<div class="justify-center items-center text-center mt-6 text-gray-500">
							<p class="text-sm">请将二维码放置门禁摄像头前扫描</p>
						</div>
						<div class="p-4">
							<p class="text-gray-500 pt-1 text-sm">开门授权：</p>
							<div class="grid grid-cols-2 gap-4 justify-center items-center ml-10 mr-10 text-gray-500 mt-5 mb-5 text-sm">
								<div class="border border-gray-400">西入口闸机</div>
								<div class="border border-gray-400">东入口闸机</div>
								<div class="border border-gray-400">1号楼1单元</div>
								<div class="border border-gray-400">1号楼2单元</div>
							</div>
							<div class="flex bg-gray-200 relative text-center justify-center items-center h-[40px]">
								<div class="text-gray-500 pt-1 text-sm pt-1 flex">
									<p class="p-1">有效时长：</p>
									<p class="text-orange-500 text-lg">{{ item.validTime }}</p>
								</div>
							</div>
						</div>

						<!-- <template #footer>
							<div class="flex items-center justify-between mt-10">
								<div>底部</div>
							</div>
						</template> -->
					</van-dialog>
					<!-- 底部弹出 -->
					<van-popup v-model:show="show" :overlay-style="overlayStyle2" overlay-class="my-overlay" position="bottom" :style="{ height: '12%' }">
						<div class="flex pt-3">
							<div class="bg-light-50 flex-1 relative text-center justify-center items-center">
								<van-icon name="wechat" color="#4cbf00" size="50" />
								<p>微信好友</p>
							</div>
							<div class="bg-light-50 flex-1 relative text-center justify-center items-center">
								<van-icon name="share" color="#4cbf00" size="50" />
								<p>复制链接</p>
							</div>
						</div>
					</van-popup>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, toRef, onMounted } from 'vue'
import { getUserInfo } from '@/api/user'
import { invitaionListByUserId, invalidStatus } from '@/api/society'
import { showNotify, showToast, showConfirmDialog } from 'vant'

const show = ref(false)
const router = useRouter()
const userInfo = ref<any>({})
// 用户id
let userId = 0
// 用户邀请列表
const inviList = ref<any>([])
// 闸机列表
const gateList = ref<any>([])
// 失效状态
const status = ref()
const imgUrl = ref<any>('https://api.qrserver.com/v1/create-qr-code/?size=150%C3%97150&data=数据：')

const showImage = (data: any) => {
	console.log(data)
	imgUrl.value = 'https://api.qrserver.com/v1/create-qr-code/?size=150%C3%97150&data=数据：' + JSON.stringify(data)
	return imgUrl
}

// 定义背景蒙层
const overlayStyle = ref({
	backgroundColor: 'rgba(0, 0, 0, 0.4)'
})
const overlayStyle2 = ref({
	backgroundColor: 'rgba(0, 0, 0, 0)'
})

// 将字符串转成数组方法
const stringTransform = (gates: string) => {
	const arr = gates.split(',') // 将字符串转换成数组格式。这是所有Van Neumann或者Host网站的一部分。 （但是，Van Neumann网站不一定要求数字，但它可以包含任何语言的标准值） （_或_）。 （_或_）。 （_或_）。 （_或_）。 （_或_）。 （_或_）。 （_或_）。 （_或_）
	gateList.value = arr
}
const fresh = () => {
	invitaionListByUserId(userId)
		.then(res => {
			inviList.value = res.data.list
			showToast('已加载')
		})
		.catch(err => {
			console.log(err)
			showToast('加载失败')
		})
}
// 使失效方法
const changeStatus = (id: number) => {
	invalidStatus(id)
		.then(res => {
			showToast('已失效')
			fresh() //刷新
		})
		.catch(err => {
			showToast('操作失败，出现了bug，请联系开发人')
		})
}

// 分享方法
const share = (id: number, item: any) => {
	showImage(item)
	show.value = true
}

onMounted(() => {
	// 获取用户信息
	getUserInfo().then(res => {
		userInfo.value = res.data
		userId = res.data.id
		console.log(userInfo.value.id)
		// 获取邀请列表
		invitaionListByUserId(res.data.id)
			.then(res => {
				inviList.value = res.data.list
				showNotify({ type: 'primary', message: '成功添加' })
			})
			.catch(err => {
				console.log(err)
				showNotify({ type: 'danger', message: '成功添加' + err.msg })
			})
	})
})
const handleClickRight = () => {
	router.push('/invitation/openHistory')
}
</script>

<style>
.dashed {
	border: none;
	border-bottom: 2px dashed #ccc;
}
.grid > div {
	display: flex;
	align-items: center;
	justify-content: center;
}

.van-dialog__content {
	max-height: 60vh;
}
.my-overlay .van-overlay--default {
	background-color: red;
}
</style>
