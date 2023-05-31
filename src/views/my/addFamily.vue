<script setup lang="ts">
import { ref, onBeforeMount, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'
import { findMyHouse, addFamilyInfo } from '@/api/owner/index'
const value1 = ref(0)
let option1: any
const router = useRouter()
const check1 = ref('text-blue-400 border border-blue-400 rounded-lg mr-1')
const check2 = ref('border rounded-lg mr-1')
const check3 = ref('text-blue-400 border border-blue-400 rounded-lg mr-1')
const check4 = ref('border rounded-lg mr-1')
const familyInfo = reactive({
	identity: 1,
	realName: '',
	gender: 1,
	phone: '',
	identityCard: '',
	houseId: value1
})
const onClickLeft = () => {
	router.push('/family')
}
interface HouseInfo {
	houseId: number
	name: string
}
const typeCheck = () => {
	;[check1.value, check2.value] = [check2.value, check1.value]
	if (familyInfo.identity == 1) {
		familyInfo.identity = 2
	} else {
		familyInfo.identity = 1
	}
}
const typeCheck2 = () => {
	;[check3.value, check4.value] = [check4.value, check3.value]
	if (familyInfo.gender == 1) {
		familyInfo.gender = 2
	} else {
		familyInfo.gender = 1
	}
}
onBeforeMount(() => {
	findMyHouse().then(res => {
		if (res.data.length != 0) {
			option1 = res.data.map((item: HouseInfo) => ({
				text: item.name, // 显示的文本
				value: item.houseId // 对应的值
			}))
			value1.value = option1[0].value
		}
	})
})
const onChange = (value: any) => {}
const sbform = () => {
	const params = new URLSearchParams()
	params.append('identity', familyInfo.identity)
	params.append('realName', familyInfo.realName)
	params.append('gender', familyInfo.gender)
	params.append('phone', familyInfo.phone)
	params.append('identityCard', familyInfo.identityCard)
	params.append('houseId', familyInfo.houseId)
	addFamilyInfo(params).then(res => {
		console.log(res)
		if (res.code === 1) {
			showSuccessToast('绑定成功')
			router.push('/family')
		} else {
			showFailToast('绑定失败')
		}
	})
}
</script>
<template>
	<div>
		<van-form @submit="sbform">
			<div class="bg-gray-100">
				<van-nav-bar title="绑定家属/租客" left-arrow @click-left="onClickLeft" />
				<p class="m-4 text-gray-500">选择房屋</p>
				<van-dropdown-menu class="mt-2">
					<van-dropdown-item v-model="value1" :options="option1" @change="onChange" />
				</van-dropdown-menu>
				<p class="m-4 text-gray-500">住户信息</p>

				<div class="flex justify-between items-center bg-white">
					<p class="m-4 text-gray-500">住户类型</p>
					<div class="flex">
						<p :class="check1" @click="typeCheck"><span class="ml-2 mr-2">家属</span></p>
						<p :class="check2" @click="typeCheck"><span class="ml-2 mr-2">租户</span></p>
					</div>
				</div>
				<van-cell-group>
					<van-field
						v-model="familyInfo.realName"
						label="您的姓名"
						placeholder="请输入您的姓名"
						input-align="right"
						:rules="[{ required: true, message: '请填写您的姓名！' }]"
					/>
				</van-cell-group>
				<div class="flex justify-between items-center bg-white">
					<p class="m-4 text-gray-500">性别</p>
					<div class="flex">
						<p :class="check3" @click="typeCheck2"><span class="ml-2 mr-2">男</span></p>
						<p :class="check4" @click="typeCheck2"><span class="ml-2 mr-2">女</span></p>
					</div>
				</div>
				<van-cell-group>
					<van-field
						v-model="familyInfo.phone"
						label="手机号"
						placeholder="请输入手机号"
						input-align="right"
						:rules="[
							{ required: true, message: '请填写您的手机号码！' },
							{ pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }
						]"
					/>
				</van-cell-group>
				<van-cell-group>
					<van-field v-model="familyInfo.identityCard" placeholder="请输入身份证号" input-align="right">
						<template #label>
							<span style="display: block; width: 8em">身份证件号(选填)</span>
						</template>
					</van-field>
				</van-cell-group>
			</div>
			<div class="flex justify-center items-center mt-16">
				<van-button class="w-64" type="primary" native-type="submit">邀请住户加入</van-button>
			</div>
		</van-form>
	</div>
</template>

<style scoped></style>
