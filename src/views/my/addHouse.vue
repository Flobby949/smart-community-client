<template>
	<div class="box">
		<navbar title="我的房屋" />
		<span class="title">选择房屋</span>
		<div class="item">
			<div>
				<smartInput title="小区">
					<van-field v-model="form.communityName" name="picker" placeholder="选择小区" @click="showPicker = true" />
					<van-popup v-model:show="showPicker" position="bottom">
						<van-picker :columns="house" @confirm="onConfirm" @cancel="showPicker = false" />
					</van-popup>
				</smartInput>
				<smartInput title="楼栋">
					<van-field v-model="form.buildingName" name="picker" placeholder="选择楼栋" @click="showPicker1Info" />
					<van-popup v-model:show="showPicker1" position="bottom">
						<van-picker :columns="buildings" @confirm="onConfirmBulidings" @cancel="showPicker1 = false" />
					</van-popup>
				</smartInput>
				<smartInput title="单元">
					<van-field v-model="form.unitName" name="picker" placeholder="选择楼栋" @click="showPicker2Info" />
					<van-popup v-model:show="showPicker2" position="bottom">
						<van-picker :columns="units" @confirm="onConfirmUnits" @cancel="showPicker2 = false" />
					</van-popup>
				</smartInput>
				<smartInput title="房间号">
					<van-field v-model="form.houseNumber" name="picker" placeholder="选择房间" @click="showPicker3Info" />
					<van-popup v-model:show="showPicker3" position="bottom">
						<van-picker :columns="rooms" @confirm="onConfirmHouse" @cancel="showPicker3 = false" />
					</van-popup>
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
					<div class="upload">
						<van-uploader v-model="form.first" :preview-image="false" class="upload" multiple :after-read="afterRead" :before-read="beforeRead">
							<template #default>
								<img src="@/assets/one.png" alt="" class="sfz" />
							</template>
						</van-uploader>
						<van-uploader v-model="form.two" :preview-image="false" class="upload" multiple :after-read="afterReadTwo" :before-read="beforeReadTwo">
							<template #default>
								<img src="@/assets/two.png" alt="" class="sfz" />
							</template>
						</van-uploader>
					</div>
				</div>
				<div class="btn">
					<van-button round type="primary" @click="submit">提交审核</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { findAllHouse, allBuilding, allUnit, allHouseByUnit, addHouse, upload } from '@/api/owner'
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
	house_id: '',
	two: []
})
const columns = ref<any[]>([])
const showPicker = ref<boolean>(false)
const showPicker1 = ref<boolean>(false)
const showPicker2 = ref<boolean>(false)
const showPicker3 = ref<boolean>(false)
const onConfirm = ({ selectedOptions }: any) => {
	form.communityId = selectedOptions[0].communityId
	form.communityName = selectedOptions[0].communityName
	console.log('选择的小区', form.communityId, form.communityName)
	allBuilding(form.communityId).then((res: any) => {
		// 去除重复的楼栋 根据名称判断
		res.data = res.data.filter((item: any, index: number) => {
			return (
				res.data.findIndex((item2: any) => {
					return item.buildingName === item2.buildingName
				}) === index
			)
		})
		buildings.value = res.data.map((item: any) => {
			item.text = item.buildingName
			item.value = item.buildingId
			return item
		})
	})
	showPicker.value = false
}

const onConfirmBulidings = ({ selectedOptions }: any) => {
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
const onConfirmUnits = ({ selectedOptions }: any) => {
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
const onConfirmHouse = ({ selectedOptions }: any) => {
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
	// 上传状态
	file.status = 'uploading'
	// 状态提示
	file.message = '上传中...'
	// 声明form表单数据
	const formData = new FormData()
	// 添加文件信息
	formData.append('file', file.file)
	// 上传接口调用
	upload(formData)
		.then(res => {
			// 上传成功
			file.status = 'done'
			// 存储返回数据
			file.addInfo = res.data
			showSuccessToast('上传成功')
		})
		.catch(() => {
			// 上传失败
			file.status = 'failed'
			// 失败状态提示
			file.message = '上传失败'
			showFailToast('上传失败')
		})
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
					return item.communityName === item2.communityName
				}) === index
			)
		})

		console.log(house.value)
	})
}
const submit = () => {
	if (form.communityName == '') {
		showFailToast('请选择小区')
		return
	}
	if (form.buildingName == '') {
		showFailToast('请选择楼栋')
		return
	}
	if (form.unitName == '') {
		showFailToast('请选择单元')
		return
	}
	if (form.houseNumber == '') {
		showFailToast('请选择房间号')
		return
	}
	if (form.real_name == '') {
		showFailToast('请输入姓名')
		return
	}
	if (form.phone == '') {
		showFailToast('请输入手机号')
		return
	}
	if (form.identity_card == '') {
		showFailToast('请输入身份证号')
		return
	}
	if (form.first.length == 0) {
		showFailToast('请上传身份证正面照')
		return
	}
	if (form.two.length == 0) {
		showFailToast('请上传身份证反面照')
		return
	}
	addHouse({
		houseId: form.houseId,
		identityCard: form.identity_card,
		phone: form.phone,
		gender: form.gender,
		realName: form.real_name
	}).then((res: any) => {
		if (res.code == 1) {
			showSuccessToast('添加成功')
			router.back()
		}
	})
}

const showPicker1Info = () => {
	if (form.communityName == '') {
		showFailToast('请先选择小区')
	} else {
		showPicker1.value = true
	}
}

const showPicker2Info = () => {
	if (form.buildingName == '') {
		showFailToast('请先选择楼栋')
	} else {
		showPicker2.value = true
	}
}
const showPicker3Info = () => {
	if (form.unitId == '') {
		showFailToast('请先选择单元')
	} else {
		showPicker3.value = true
	}
}
onMounted(() => {
	allHouse()
})

const afterReadTwo = (file: any) => {
	// 上传状态
	file.status = 'uploading'
	// 状态提示
	file.message = '上传中...'
	// 声明form表单数据
	const formData = new FormData()
	// 添加文件信息
	formData.append('file', file.file)
	// 上传接口调用
	upload(formData)
		.then(res => {
			// 上传成功
			file.status = 'done'
			// 存储返回数据
			file.addInfo = res.data
			showSuccessToast('上传成功')
		})
		.catch(() => {
			// 上传失败
			file.status = 'failed'
			// 失败状态提示
			file.message = '上传失败'
			showFailToast('上传失败')
		})
}
const beforeReadTwo = (file: any) => {
	if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
		showFailToast('只允许上传jpg/png格式的图片！')
		return false
	}
	return true
}
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

.sfz {
	width: 100px;
	height: 100px;
}
.upload {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
</style>
