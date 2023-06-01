<template>
	<div class="box">
		<navbar title="我的车位" />
		<span class="title">选择房屋</span>
		<div class="item">
			<div>
				<smartInput title="小区">
					<van-field v-model="form.communityName" name="picker" placeholder="选择小区" @click="showPicker = true" />
					<van-popup v-model:show="showPicker" position="bottom">
						<!-- <van-picker :columns="house" @confirm="onConfirm" @cancel="showPicker = false" /> -->
						<van-picker
							v-model="{form.communityId}"
							title="请选择小区"
							:columns="{ columns }"
							@change="
								{
									handleChange
								}
							"
						/>
					</van-popup>
				</smartInput>
				<!-- <smartInput title="楼栋">
					<van-field v-model="form.buildingName" name="picker" placeholder="选择楼栋" @click="showPicker1 = true" />
					<van-popup v-model:show="showPicker1" position="bottom">
						<van-picker :columns="buildings" @confirm="onConfirmBulidings" @cancel="showPicker1 = false" />
					</van-popup>
				</smartInput>
				<smartInput title="单元">
					<van-field v-model="form.unitName" name="picker" placeholder="选择楼栋" @click="showPicker2 = true" />
					<van-popup v-model:show="showPicker2" position="bottom">
						<van-picker :columns="units" @confirm="onConfirmUnits" @cancel="showPicker2 = false" />
					</van-popup>
				</smartInput>
				<smartInput title="房间号">
					<van-field v-model="form.houseNumber" name="picker" placeholder="选择房间" @click="showPicker3 = true" />
					<van-popup v-model:show="showPicker3" position="bottom">
						<van-picker :columns="rooms" @confirm="onConfirmHouse" @cancel="showPicker3 = false" />
					</van-popup>
				</smartInput> -->
			</div>
		</div>
		<span class="title">住户信息</span>
		<div class="item">
			<div>
				<smartInput title="姓名">
					<van-field v-model="form.realName" placeholder="请输入姓名" clearable />
				</smartInput>
				<div class="btn">
					<van-button round type="primary" @click="submitForm">提交</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import navbar from '@/components/NavBar/index.vue'
import smartInput from '@/components/smart-input/index.vue'
import { findAllHouse, allBuilding, allUnit, allHouseByUnit, addHouse } from '@/api/owner'
import { reactive, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getParkList, getCommunityList, saveCarport } from '@/api/carport/carport'
import { showConfirmDialog, showNotify, showSuccessToast, showFailToast, Picker } from 'vant'
const carport = ref<any[]>([])
const formRef = ref()
const house = ref<any[]>([])
const showPicker = ref<boolean>(false)
const communityList = ref<any[]>([])
const buildings = ref<any[]>([])
const community = ref<any[]>([])
const router = useRouter()
let columns = []

const form = reactive({
	communityId: '',
	communityName: '',
	parkId: '',
	parkName: '',
	ownerId: '',
	carId: '',
	carportName: '',
	realName: '',
	phone: ''
})
onMounted(() => {
	getCommunityLists()
})

const submitForm = () => {
	saveCarport(form).then(() => {
		showSuccessToast('新增车位成功')
	})
	// formRef.value.validate((valid: boolean) => {
	// 	if (!valid) {
	// 		return false
	// 	}
	// 	saveCarport(form).then(() => {
	// 		showSuccessToast('新增车位成功')
	// 	})
	// })
}
//获取所有小区列表
const getCommunityLists = () => {
	getCommunityList().then(res => {
		communityList.value = res.data
		communityList.value.forEach(item => {
			let column = {
				values: [item.communityId.toString()],
				text: item.communityName
			}
			columns.push(column)
		})
	})
}

// const onConfirm = ({ selectedOptions }) => {
// 	form.communityId = selectedOptions[0].communityId
// 	form.communityName = selectedOptions[0].communityName
// 	console.log('选择的小区', form.communityId, form.communityName)
// 	allBuilding(form.communityId).then((res: any) => {
// 		buildings.value = res.data.map((item: any) => {
// 			item.text = item.buildingName
// 			item.value = item.buildingId
// 			return item
// 		})
// 	})
// 	showPicker.value = false
// }
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
