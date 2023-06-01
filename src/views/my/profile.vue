<template>
	<div>
		<div>
			<van-nav-bar title="用户信息" left-arrow right-text="保存" @click-left="onClickLeft" @click-right="onClickRight" />
		</div>
		<div>
			<div class="flex justify-between items-center border-b h-12">
				<div class="ml-2">头像</div>
				<div class="flex items-center">
					<van-image class="mr-2" round width="2rem" height="2rem" :src="userInfo.avatar" />
					<van-uploader max-count="1" multiple :max-size="500 * 1024" :before-read="beforeRead" :after-read="afterRead" @oversize="onOversize">
						<van-icon name="arrow" />
					</van-uploader>
				</div>
			</div>
			<div class="flex justify-between items-center border-b h-12">
				<div class="ml-2">昵称</div>
				<div class="flex items-center" @click="show1 = true">
					<p class="mr-2">{{ userInfo.username }}</p>
					<van-icon name="arrow" />
				</div>
			</div>
			<div class="flex justify-between items-center border-b h-12">
				<div class="ml-2">性别</div>
				<div class="flex items-center" @click="show2 = true">
					<p v-if="userInfo.gender == 0" class="mr-2">未知</p>
					<p v-if="userInfo.gender == 1" class="mr-2">男</p>
					<p v-if="userInfo.gender == 2" class="mr-2">女</p>
					<van-icon name="arrow" />
				</div>
			</div>
			<div class="flex justify-between items-center border-b h-12">
				<div class="ml-2">手机号</div>
				<div class="flex items-center">
					<p class="mr-2">{{ userInfo.phone }}</p>
				</div>
			</div>
			<div class="flex justify-between items-center border-b h-12">
				<div class="ml-2">住址</div>
				<div class="flex items-center" @click="show4 = true">
					<p class="mr-2">{{ userInfo.address }}</p>
					<van-icon name="arrow" />
				</div>
			</div>
		</div>
		<van-dialog v-model:show="show1" title="修改用户信息" show-cancel-button>
			<van-field v-model="userInfo.username" label="昵称：" placeholder="请输入昵称" />
		</van-dialog>
		<van-popup v-model:show="show2" round position="bottom">
			<van-picker
				title="性别"
				:columns="[
					{ text: '未知', value: 0 },
					{ text: '男', value: 1 },
					{ text: '女', value: 2 }
				]"
				@cancel="show2 = false"
				@confirm="onConfirm"
			/>
		</van-popup>
		<van-dialog v-model:show="show4" title="修改用户信息" show-cancel-button>
			<van-field v-model="userInfo.address" label="住址：" placeholder="请输入住址" />
		</van-dialog>
		<div class="flex justify-center items-center mt-48">
			<van-button class="w-80" type="danger" native-type="submit">退出登录</van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { showSuccessToast, showFailToast, showToast, showDialog } from 'vant'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo, uploadFile, updateUser } from '@/api/user'
const router = useRouter()
const show1 = ref(false)
const show2 = ref(false)
const show4 = ref(false)
const userInfo = ref({})
const onClickLeft = () => {
	router.push('/my')
}
onBeforeMount(() => {
	getUserInfo().then(res => {
		userInfo.value = res.data
	})
})
const onConfirm = ({ selectedValues }) => {
	userInfo.value.gender = selectedValues.join(',')
	show2.value = false
}
const beforeRead = (file: any) => {
	if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
		showDialog({
			message: '请上传 jpg或png格式格式图片'
		})
		return false
	}
	return true
}
const afterRead = (file: any) => {
	const formData = new FormData()
	formData.append('file', file.file)
	uploadFile(formData)
		.then(res => {
			userInfo.value.avatar = res.data
		})
		.catch(() => {
			showDialog({
				message: '上传失败'
			})
		})
}
const onOversize = (file: any) => {
	console.log(file)
	showDialog({
		message: '文件大小不能超过 500kb'
	})
}
const onClickRight = () => {
	const params = new URLSearchParams()
	params.append('avatar', userInfo.value.avatar)
	params.append('username', userInfo.value.username)
	params.append('gender', userInfo.value.gender)
	params.append('address', userInfo.value.address)
	updateUser(params).then(res => {
		showDialog({
			message: '保存成功'
		})
	})
}
</script>

<style scoped></style>
