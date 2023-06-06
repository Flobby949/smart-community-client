<script setup lang="ts">
import { findMyHouse, findFamily, deleteFamily } from '@/api/owner/index'
import { showSuccessToast, showFailToast } from 'vant'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const value1 = ref(0)
let option1: any
interface HouseInfo {
	houseId: number
	name: string
}

const familyList = ref<any[]>([])
onBeforeMount(() => {
	findMyHouse('identity=0').then((res: any) => {
		if (res.data.length != 0) {
			option1 = res.data.map((item: HouseInfo) => ({
				text: item.name, // 显示的文本
				value: item.houseId // 对应的值
			}))
			value1.value = option1[0].value
			findFamily('houseId=' + value1.value).then(res => {
				familyList.value = res.data
			})
		}
	})
})
const onChange = (value: any) => {
	findFamily('houseId=' + value).then(res => {
		familyList.value = res.data
	})
}
const onClickLeft = () => {
	router.push('/my')
}
const onClickRight = () => {
	router.push('/addFamily')
}
const deFamily = (id: number) => {
	const params = new URLSearchParams()
	params.append('id', id as unknown as string)
	deleteFamily({ data: params }).then((res: any) => {
		if (res.code === 1) {
			showSuccessToast('删除成功')
			onChange(value1.value)
		} else {
			showFailToast('删除失败')
		}
	})
}
</script>
<template>
	<div>
		<div v-if="value1 != 0">
			<div class="h-52 bg-blue-400 rounded-bl-br-full">
				<van-nav-bar fixed title="家庭成员" left-arrow right-text="+添加家庭成员" @click-left="onClickLeft" @click-right="onClickRight" />
				<van-dropdown-menu class="mt-2">
					<van-dropdown-item v-model="value1" :options="option1" @change="onChange" />
				</van-dropdown-menu>
			</div>
			<div v-if="familyList.length != 0" class="-mt-20">
				<div v-for="(item, index) in familyList" :key="index" class="w-11/12 mx-auto bg-white shadow-lg border rounded-lg mt-5">
					<div class="flex justify-between items-center">
						<div class="flex">
							<p class="text-xl mt-4 ml-4">{{ item?.realName }}</p>
							&emsp;
							<p class="mt-4 text-blue-400 border border-blue-400 rounded-lg">&nbsp;{{ item.isRegister }}&nbsp;</p>
						</div>
						<div class="mt-4 mr-4"><van-button size="small" type="danger" @click="deFamily(item.id)">删除</van-button></div>
					</div>
					<div class="flex justify-between items-center">
						<p class="mt-1 ml-4 text-gray-400">{{ item.phone.slice(0, 3) + '****' + item.phone.slice(-4) }}</p>
					</div>
					<div class="flex justify-between items-center">
						<p class="mt-1 ml-4 text-gray-400">住户类型</p>
						<p v-if="item.identity == 1" class="mr-4">家属</p>
						<p v-else class="mr-4">租户</p>
					</div>
					<div class="flex justify-between items-center mb-4">
						<p class="mt-1 ml-4 text-gray-400">有效期：</p>
						<p class="mr-4">长期有效</p>
					</div>
				</div>
			</div>
			<div v-else class="flex justify-center items-center mt-48">
				<div>
					<van-image width="200" height="200" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/019ae1570e0bea6ac7251f05d08477.jfif" />
					<p class="ml-4 mt-4 text-gray-500">暂无数据哦~快去添加吧</p>
				</div>
			</div>
		</div>
		<div v-else>
			<van-nav-bar title="家庭成员" left-arrow right-text="+添加家庭成员" @click-left="onClickLeft" @click-right="onClickRight" />
			<div class="flex justify-center items-center mt-48">
				<div>
					<van-image width="200" height="200" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/019ae1570e0bea6ac7251f05d08477.jfif" />
					<p class="ml-4 mt-4 text-gray-500">暂无数据哦~快去添加吧</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.rounded-bl-br-full {
	border-bottom-left-radius: 80px;
	border-bottom-right-radius: 80px;
}
</style>
