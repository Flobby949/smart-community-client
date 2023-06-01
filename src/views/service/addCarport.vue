<template>
	<div>
		<navbar title="我的车位" />

		<van-form @submit="submitForm">
			<van-cell-group>
				<span class="title">选择车位</span>
				<van-field
					v-model="communityName"
					label="小区名称"
					is-link
					placeholder="选择城市"
					:rules="[{ required: true, message: '不能为空' }]"
					@click="comunityPick = true"
				/>
				<van-popup v-model:show="comunityPick" round position="bottom">
					<van-picker :columns="communityColumns" @cancel="comunityPick = false" @confirm="communityConfirm" />
				</van-popup>
				<van-field
					v-model="parkName"
					label="停车场名字"
					is-link
					placeholder="请选择停车场名称"
					:rules="[{ required: true, message: '不能为空' }]"
					@click="selectPark"
				/>
				<van-popup v-model:show="parkPick" round position="bottom">
					<van-picker :columns="parkColumns" @cancel="parkPick = false" @confirm="parkConfirm" />
				</van-popup>
				<!-- <van-field v-model="form.ownerId" label="户主" placeholder="请输入内容" :rules="[{ required: true, message: '不能为空' }]" /> -->
				<van-field v-model="form.licence" label="车牌号" placeholder="请输入内容" :rules="[{ required: true, message: '不能为空' }]" />
				<van-field
					v-model="carPortName"
					label="车位号"
					is-link
					placeholder="选择车位"
					:rules="[{ required: true, message: '不能为空' }]"
					@click="selectCarPort"
				/>
				<van-popup v-model:show="carPortPick" round position="bottom">
					<van-picker :columns="carPortColumns" @cancel="carPortPick = false" @confirm="carPortConfirm" />
				</van-popup>
				<span class="title">住户信息</span>
				<van-field v-model="form.realName" label="姓名" placeholder="请输入内容" :rules="[{ required: true, message: '不能为空' }]" />
				<van-field v-model="form.phone" label="联系方式" placeholder="请输入内容" :rules="[{ required: true, message: '不能为空' }]" />
			</van-cell-group>
			<div style="margin: 16px">
				<van-button type="primary" round native-type="submit" block class="mt-4">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script setup lang="ts">
import navbar from '@/components/NavBar/index.vue'
//import smartInput from '@/components/smart-input/index.vue'
import { showFailToast } from 'vant'
import { reactive, ref, onMounted, computed } from 'vue'
import { getParkList, getCommunityList, saveCarport, getNoOwnerList } from '@/api/carport/carport'
import { showConfirmDialog, showNotify, showSuccessToast, Picker, showDialog } from 'vant'
import router from '@/router'

const dropdownOptions1 = ['选项1', '选项2', '选项3']
const formRef = ref()
const communityList = ref<any[]>([])
const parkList = ref<any[]>([])
const carportList = ref<any[]>([])
const communityId = ref<number[]>([])
const columns = Object.entries(communityList).map(([value, text]) => ({ value, text }))

//小区选择器
const communityName = ref('')
const comunityPick = ref(false)
const communityColumns: PickItem[] = reactive([])
const communityConfirm = ({ selectedOptions }) => {
	communityName.value = selectedOptions[0].text
	if (form.communityId != selectedOptions[0].value) {
		parkName.value = ''
		carPortName.value = ''
		form.parkId = ''
		form.id = ''
		parkColumns.splice(0, parkColumns.length)
		carPortColumns.splice(0, carPortColumns.length)
		form.communityId = selectedOptions[0].value
		parkList.value.forEach(item => {
			if (item.communityId == form.communityId) {
				let obj: PickItem = {
					text: item.parkName,
					value: item.id
				}
				parkColumns.push(obj)
			}
		})
		if (parkColumns.length <= 0) {
			parkColumns.push({
				text: '该小区没有停车场'
			})
		}
	}
	comunityPick.value = false
	console.log(form)
}

//停车场选择器
const parkName = ref('')
const parkPick = ref(false)
const parkColumns: PickItem[] = reactive([])
const selectPark = () => {
	if (form.communityId != '') {
		parkPick.value = true
	} else {
		showDialog({ message: '请先选择小区', width: '320px' })
	}
}
const parkConfirm = ({ selectedOptions }) => {
	if (selectedOptions[0].text != '该小区没有停车场') {
		parkName.value = selectedOptions[0].text
		form.parkId = selectedOptions[0].value
		carPortName.value = ''
		form.id = ''
		carPortColumns.splice(0, carPortColumns.length)
		carportList.value.forEach(item => {
			if (item.parkId == form.parkId) {
				let obj: PickItem = {
					text: item.carportName,
					value: item.id
				}
				carPortColumns.push(obj)
			}
		})
	}
	console.log(form)
	parkPick.value = false
}

//车位选择器
const carPortName = ref('')
const carPortPick = ref(false)
const carPortColumns: PickItem[] = reactive([])
const selectCarPort = () => {
	if (form.parkId != '') {
		carPortPick.value = true
	} else {
		showDialog({ message: '请先选择停车场', width: '320px' })
	}
}
const carPortConfirm = ({ selectedOptions }) => {
	if (selectedOptions[0].text != '停车场没有车位') {
		carPortName.value = selectedOptions[0].text
		form.carportName = carPortName.value
		form.id = selectedOptions[0].value
	}
	console.log(form)
	carPortPick.value = false
}
const form = reactive({
	communityId: '',
	parkId: '',
	licence: '',
	carportName: '',
	realName: '',
	phone: '',
	id: ''
})
onMounted(() => {
	getCommunityLists()
	getParkLists()
	getCarportLists()
})

const submitForm = () => {
	saveCarport(form).then(res => {
		if (res.code === 1) {
			showDialog({ message: '操作成功', width: '360px' }).then(() => {
				router.back()
			})
		} else {
			showDialog({ message: res.msg, width: '360px' })
		}
	})
}
const validator = val => {
	if (val != '') {
		return true
	} else {
		return false
	}
}

//获取所有小区列表
const getCommunityLists = () => {
	getCommunityList().then(res => {
		communityList.value = res.data
		communityList.value.forEach(item => {
			let obj: PickItem = {
				text: item.communityName,
				value: item.id
			}
			communityColumns.push(obj)
		})
	})
}

//获取停车场列表
const getParkLists = () => {
	getParkList().then(res => {
		parkList.value = res.data
	})
}

//获取车位列表
const getCarportLists = () => {
	getNoOwnerList().then(res => {
		carportList.value = res.data
	})
}
interface PickItem {
	text: string
	value?: number
}
</script>

<style scoped>
.item {
	background-color: #fff;
	border-radius: 6px;
}
.title {
	display: block;
	background-color: #f5f5f5;
	padding: 0 20px;
	line-height: 40px;
	color: #333;
}
.boxItem {
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #ccc;
	border-radius: 4px;
	height: 30px;
	width: 40px;
	font-size: 12px;
	margin: 0 5px;
}
.active {
	border: 1px solid #3f99fe;
}
.file {
	display: flex;
	flex-direction: column;
	margin-left: 10px;
}
.file span {
	padding: 10px 0;
}
.upload {
	display: flex;
	align-items: center;
	justify-content: center;
}
.btn {
	margin: 20px 0;
	padding-bottom: 50px;
	justify-content: center;
	align-items: center;
	display: flex;
}
.van-button {
	width: 90%;
	margin: 0 auto;
}
.field {
	padding-top: 20px;
	padding-bottom: 10px;
}
</style>
