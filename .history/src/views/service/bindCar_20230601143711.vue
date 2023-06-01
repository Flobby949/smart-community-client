<template>
	<div class="box">
		<navbar title="添加车辆" />
		<span class="title">选择房屋</span>
		<div class="item">
			<div>
				<smartInput title="车辆品牌">
					<van-field v-model="form.real_name" placeholder="请输入姓名" clearable />
				</smartInput>
			</div>
		</div>
		<span class="title">住户信息</span>
		<div class="item">
			<div>
				<smartInput title="姓名">
					<van-field v-model="form.real_name" placeholder="请输入姓名" clearable />
				</smartInput>
				<!-- 性别 -->
				<smartInput title="性别">
					<div :class="['boxItem', form.gender === 0 ? 'active' : '']" @click="choose(0)">男</div>
					<div :class="['boxItem', form.gender === 1 ? 'active' : '']" @click="choose(1)">女</div>
				</smartInput>
				<smartInput title="手机号">
					<van-field v-model="form.phone" placeholder="请输入手机号" clearable />
				</smartInput>
				<smartInput title="身份证号">
					<van-field v-model="form.identity_card" placeholder="请输入身份证号" clearable />
				</smartInput>
				<div class="file">
					<span>上传证件照片</span>
					<van-uploader v-model="form.first" class="upload" multiple :after-read="afterRead" :before-read="beforeRead" />
				</div>
				<div class="btn">
					<van-button round type="primary" @click="submit">提交</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { findAllHouse, allBuilding, allUnit, allHouseByUnit, addHouse } from '@/api/owner'
import navbar from '@/components/NavBar/index.vue'
import smartInput from '@/components/smart-input/index.vue'
import { showFailToast, showSuccessToast } from 'vant'
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = reactive({
	community: '',
	houseId: '',
	gender: -1,
	first: [],
	communityId: '',
	communityName: '',
	buildingId: '',
	buildingName: '',
	unitId: '',
	unitName: '',
	houseNumber: '',
	identity_card: '',
	phone: '',
	real_name: '',
	house_id: ''
})
const columns = ref<any[]>([])
const showPicker = ref<boolean>(false)
const showPicker1 = ref<boolean>(false)
const showPicker2 = ref<boolean>(false)
const showPicker3 = ref<boolean>(false)
const onConfirm = ({ selectedOptions }) => {
	form.communityId = selectedOptions[0].communityId
	form.communityName = selectedOptions[0].communityName
	console.log('选择的小区', form.communityId, form.communityName)
	allBuilding(form.communityId).then((res: any) => {
		buildings.value = res.data.map((item: any) => {
			item.text = item.buildingName
			item.value = item.buildingId
			return item
		})
	})
	showPicker.value = false
}

const onConfirmBulidings = ({ selectedOptions }) => {
	form.buildingId = selectedOptions[0].buildingId
	form.buildingName = selectedOptions[0].buildingName
	console.log('选择的楼栋', form.buildingId, form.buildingName)
	showPicker1.value = false
	allUnit(form.communityId, form.buildingId).then((res: any) => {
		console.log(res.data)
		units.value = res.data.map((item: any) => {
			item.text = item.units
			item.value = item.units
			return item
		})
		// 过滤掉重复的单元
		units.value = units.value.filter((item: any, index: number) => {
			return (
				units.value.findIndex((item2: any) => {
					return item.units === item2.units
				}) === index
			)
		})
	})
}
const onConfirmUnits = ({ selectedOptions }) => {
	form.unitId = selectedOptions[0].units
	form.unitName = selectedOptions[0].units
	console.log('选择的单元', form.unitId, form.unitName)
	showPicker2.value = false
	allHouseByUnit(form.communityId, form.buildingId, form.unitId).then((res: any) => {
		rooms.value = res.data.map((item: any) => {
			item.text = item.houseNumber
			item.value = item.houseNumber
			return item
		})
	})
}
const onConfirmHouse = ({ selectedOptions }) => {
	form.houseNumber = selectedOptions[0].houseNumber
	console.log('选择的房间号', form.houseNumber)
	form.houseId = selectedOptions[0].id
	console.log('abc')

	showPicker3.value = false
}
const buildings = ref<any[]>([])
const units = ref<any[]>([])
const rooms = ref<any[]>([])
const choose = (sex: number) => {
	form.gender = sex
}

const afterRead = (file: any) => {
	console.log(file.file.name)
}
const beforeRead = (file: any) => {
	if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
		showFailToast('只允许上传jpg/png格式的图片！')
		return false
	}
	return true
}
const house = ref<any[]>([])
function allHouse() {
	findAllHouse().then((res: any) => {
		console.log(res.data)
		house.value = res.data.map((item: any) => {
			item.text = item.communityName
			item.value = item.communityId
			return item
		})
		// 过滤掉重复的小区
		house.value = house.value.filter((item: any, index: number) => {
			return (
				house.value.findIndex((item2: any) => {
					return item.communityId === item2.communityId
				}) === index
			)
		})

		console.log(house.value)
	})
}
const submit = () => {
	addHouse({
		houseId: form.houseId,
		identityCard: form.identity_card,
		phone: form.phone,
		gender: form.gender,
		realName: form.real_name
	}).then((res: any) => {
		if (res.code == 1) {
			showSuccessToast('添加成功')
			router.push('/house')
		}
	})
}
onMounted(() => {
	allHouse()
})
</script>

<style scoped>
.box {
	height: 100vh;
	width: 100vw;
	background-color: #f5f5f5;
	overflow: auto;
}
.item {
	background-color: #fff;
	border-radius: 6px;
}
.title {
	font-size: 16px;
	margin-left: 10px;
	height: 40px;
	line-height: 40px;
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
</style>

