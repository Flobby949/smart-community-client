<template>
	<div>
		<div class="h-52 bg-blue-400 rounded-bl-br-full"></div>
		<div class="w-11/12 h-44 mx-auto bg-white shadow-lg border rounded-lg -mt-24">
			<div class="flex flex-col items-center">
				<van-image class="-mt-9" round width="5rem" height="5rem" :src="userInfo.avatar" @click="goProfile()" />
				<p>asd</p>
			</div>
			<div class="flex justify-around items-center mt-4">
				<van-image class="bg-blue-400" round width="50" height="50" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/fang.png" />
				<van-image round width="50" height="50" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/cw2.png" />
				<van-image class="bg-blue-400" round width="50" height="50" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/mycar.png" />
				<van-image class="bg-blue-400" round width="50" height="50" src="https://music-1307940544.cos.ap-nanjing.myqcloud.com/test/zhangdan.png" />
			</div>
			<div class="flex justify-around items-center mt-1">
				<p @click="myHouse">我的房屋</p>
				<p @click="myCarPort">我的车位</p>
				<p @click="myCar">我的车辆</p>
				<p>我的账单</p>
			</div>
		</div>
		<van-cell-group class="mt-6 border">
			<van-cell title="家庭成员" icon="friends-o" link-type="switchTab" url="#/family" is-link />
			<van-cell title="业主认证" icon="hotel-o" url="#/certified" is-link />
			<van-cell title="我的访客" icon="contact" is-link />
			<van-cell title="我的报修" icon="bulb-o" is-link />
			<van-cell title="我的投诉" icon="envelop-o" is-link />
		</van-cell-group>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/api/user'
const router = useRouter()
const userInfo = ref<any>({})
const goProfile = () => {
	router.push('/profile')
}
const myCar = () => {
	router.push('/car')
}
const myCarPort = () => {
	router.push('/carport')
}
const myHouse = () => {
	router.push('/house')
}
//1
onBeforeMount(() => {
	getUserInfo().then((res: any) => {
		userInfo.value = res.data
	})
})
</script>

<style scoped>
.rounded-bl-br-full {
	border-bottom-left-radius: 80px;
	border-bottom-right-radius: 80px;
}
</style>
