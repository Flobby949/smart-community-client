<template>
	<div class="bg-blue-500 rounded-b-lg h-[150px]">
		<NavBar :title="'商铺列表'" :placeholder="true" :fixed="true" />
		<!-- <div class="bg-blue-600 h-[80px]"></div> -->

		<div class="guest-list mt-4 bg-white ml-4 mr-4">
			<div v-for="(item, index) in mallList" :key="index" class="rounded-3xl rounded-t-xl pt-2 pb-10 shadow-md p-4 relative mb-6">
				<div class="mt-0 p-3">
					<div class="flex text-xl">
						<!-- <img v-if="item.orderType === 4" src="https://s1.ax1x.com/2023/06/04/pC9wk7V.png" class="w-auto h-8 mr-4 pb-1" alt="电费" />
						<img v-if="item.orderType === 6" src="https://s1.ax1x.com/2023/06/04/pC9wVtU.png" class="w-auto h-8 mr-4 pb-1" alt="暖气费" />
						<img v-if="item.orderType === 7" src="https://s1.ax1x.com/2023/06/04/pC9wF00.png" class="w-auto h-8 mr-4 pb-1" alt="燃气费" />
						<img v-if="item.orderType === 3" src="https://s1.ax1x.com/2023/06/04/pC9wimq.png" class="w-auto h-8 mr-4 pb-1" alt="水费" />
						<img v-if="item.orderType === 2" src="https://s1.ax1x.com/2023/06/04/pC9wEkT.png" class="w-auto h-8 mr-4 pb-1" alt="停车费" />
						<img v-if="item.orderType === 5" src="https://s1.ax1x.com/2023/06/04/pC9wZhF.png" class="w-auto h-8 mr-4 pb-1" alt="物业费" /> -->
						<p class="pb-1">{{ item.communityName }}：{{ item.mallNumber }}</p>
					</div>
					<div class="dashed2 pb-2"></div>
					<div class="pt-5">
						<div class="flex relative">
							<p class="text-gray-500 pt-1">商铺地址：</p>
							<div class="absolute right-2 p-1 top-[-1px]">{{ item.address }}</div>
						</div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">商铺类型：</p>
							<div class="absolute right-2 p-1 top-[-1px]">{{ item.mallType }}</div>
						</div>

						<div class="relative text-center justify-center items-center mt-2">
							<!-- <div class="dashed2 pb-2"></div> -->

							<div class="mt-3 relative">
								<!-- <van-button size="small" class="w-[100px]" type="primary" @click="router.push('/payment/' + item.id)">付款</van-button> -->
								<p class="absolute right-2 top-[-2px] text-blue-400" @click="showInfo">查看详情</p>
							</div>
						</div>
					</div>
				</div>
				<van-dialog
					v-model:show="show"
					:show-cancel-button="false"
					:show-confirm-button="true"
					:overlay-style="overlayStyle"
					:style="{ width: '80%', height: '50%' }"
				>
					<div class="h-[40px] bg-blue-500 text-center text-white pt-3">{{ item.communityName }}：{{ item.mallNumber }}</div>
					<div class="p-4 text-sm">
						<div class="flex relative text-center justify-center items-center h-[40px]"></div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">商铺地址：</p>
							<div class="absolute right-2 p-1 top-[-1px]">{{ item.address }}</div>
						</div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">商铺类型：</p>
							<div class="absolute right-2 p-1 top-[-1px] text-orange-400">{{ item.mallType }}</div>
						</div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">商铺在售状态：</p>
							<div v-if="item.mallStatus === 0" class="absolute right-2 p-1 top-[-1px] text-blue-500">在售中</div>
							<div v-if="item.mallStatus === 1" class="absolute right-2 p-1 top-[-1px] text-red-500">已停止销售</div>
						</div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">商铺面积</p>
							<div class="absolute right-2 p-1 top-[-1px]">{{ item.mallArea }}平方米(m²)</div>
						</div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">发布时间</p>
							<div class="absolute right-2 p-1 top-[-1px]">{{ item.createTime }}</div>
						</div>
						<div class="flex relative">
							<p class="text-gray-500 pt-1">联系电话</p>
							<div class="absolute right-2 p-1 top-[-1px]">188888888888</div>
						</div>
					</div>

					<!-- <template #footer>
							<div class="flex items-center justify-between mt-10">
								<div>底部</div>
							</div>
						</template> -->
				</van-dialog>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, toRef, onMounted } from 'vue'
import { getUserInfo } from '@/api/user'
import { getMallListByUserId } from '@/api/society'
import { showToast } from 'vant'

const userInfo = ref<any>({})
// 用户id
let userId = 0
const show = ref(false)

const mallList = ref<any>([])

onMounted(() => {
	getUserInfo().then(res => {
		userId = res.data.id
		userInfo.value = res.data
		console.log(userInfo.value.id)
		getMallListByUserId(userId)
			.then(res => {
				mallList.value = res.data
				console.log(mallList)
				if (mallList.value.length === 0) {
					showToast('您暂无商铺信息')
				}
			})
			.catch(err => {
				showToast(err.msg)
				showToast('暂无登录信息，请登录')
			})
	})
	// 获取开门历史记录
})

const showInfo = () => {
	show.value = true
}

// 定义背景蒙层
const overlayStyle = ref({
	backgroundColor: 'rgba(0, 0, 0, 0.5)'
})
</script>

<style>
.dashed-border {
	border: 1px dashed #ddd;
	border-radius: 0.5rem;
}
.dashed {
	border: none;
	border-bottom: 2px dashed #ccc;
}
.dashed2 {
	border: none;
	border-bottom: 2px dashed #396cebaf;
}
</style>
