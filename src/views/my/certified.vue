<template>
	<div>
		<van-form @submit="sbform">
			<div class="bg-gray-100">
				<van-nav-bar fixed title="业主认证" left-arrow @click-left="onClickLeft" />
				<p class="m-4 text-gray-500">选择房屋</p>
				<van-field v-model="fieldValue" is-link readonly label="房屋" placeholder="请选择需要认证的房屋" @click="show = true" />
				<p class="m-4 text-gray-500">住户信息</p>
				<van-cell-group>
					<van-field
						v-model="ownerInfo.realName"
						label="您的姓名"
						placeholder="请输入您的姓名"
						input-align="right"
						:rules="[{ required: true, message: '请填写您的姓名！' }]"
					/>
				</van-cell-group>
				<van-cell-group>
					<div class="flex justify-between items-center bg-white">
						<p class="m-4 text-gray-500">性别</p>
						<div class="flex">
							<p :class="check1" @click="typeCheck"><span class="ml-2 mr-2">男</span></p>
							<p :class="check2" @click="typeCheck"><span class="ml-2 mr-2">女</span></p>
						</div>
					</div>
				</van-cell-group>
				<van-cell-group>
					<van-field
						v-model="ownerInfo.identityCard"
						placeholder="请输入身份证号"
						:rules="[
							{ required: true, message: '请填写身份证号' },
							{ validator, message: '身份证号码格式错误！' }
						]"
						input-align="right"
					>
						<template #label>
							<span style="display: block; width: 8em">身份证件号</span>
						</template>
					</van-field>
				</van-cell-group>
				<van-cell title="生日" is-link :value="ownerInfo.birthday" @click="showBirthday = true" />
				<van-popup v-model:show="showBirthday" position="bottom" :style="{ height: '30%' }">
					<van-date-picker
						v-model="birthdayDate"
						title="选择日期"
						:min-date="minDate"
						:max-date="maxDate"
						@cancel="showBirthday = false"
						@confirm="sbdate"
				/></van-popup>
				<van-cell-group>
					<van-field
						v-model="ownerInfo.nation"
						label="民族"
						placeholder="请输入民族"
						input-align="right"
						:rules="[{ required: true, message: '请填写民族信息！' }]"
					/>
				</van-cell-group>
				<van-cell-group>
					<div class="flex justify-between items-center bg-white">
						<p class="m-4 text-gray-500">婚姻</p>
						<div class="flex">
							<p :class="check3" @click="typeCheck2(0)"><span class="ml-2 mr-2">未婚</span></p>
							<p :class="check4" @click="typeCheck2(1)"><span class="ml-2 mr-2">已婚</span></p>
						</div>
					</div>
				</van-cell-group>
				<van-cell-group>
					<div class="flex justify-between items-center bg-white">
						<p class="m-4 text-gray-500">户口类型</p>
						<div class="flex">
							<p :class="check5" @click="typeCheck3(0)"><span class="ml-2 mr-2">城镇</span></p>
							<p :class="check6" @click="typeCheck3(1)"><span class="ml-2 mr-2">农村</span></p>
						</div>
					</div>
				</van-cell-group>
				<van-cell-group>
					<van-field
						v-model="ownerInfo.party"
						label="党派"
						placeholder="请输入党派"
						input-align="right"
						:rules="[{ required: true, message: '请填写党派信息！' }]"
					/>
				</van-cell-group>
				<van-cell-group>
					<van-field
						v-model="ownerInfo.domicileLocation"
						label="户籍所在地"
						placeholder="请输入户籍所在地"
						input-align="right"
						:rules="[{ required: true, message: '请填写户籍所在地！' }]"
					/>
				</van-cell-group>
				<van-cell-group>
					<div class="flex justify-between items-center bg-white">
						<p class="m-4 text-gray-500">居住类型</p>
						<div class="flex">
							<p :class="check7" @click="typeCheck4(0)"><span class="ml-2 mr-2">长居</span></p>
							<p :class="check8" @click="typeCheck4(1)"><span class="ml-2 mr-2">短住</span></p>
						</div>
					</div>
				</van-cell-group>
				<van-cell-group>
					<van-field v-model="ownerInfo.stayCard" placeholder="请输入暂住证号" input-align="right">
						<template #label>
							<span style="display: block; width: 8em">暂住证号(选填)</span>
						</template>
					</van-field>
				</van-cell-group>
				<van-cell-group>
					<van-field
						v-model="ownerInfo.address"
						label="住址"
						placeholder="请输入住址"
						input-align="right"
						:rules="[{ required: true, message: '请填写住址！' }]"
					/>
				</van-cell-group>
				<p class="m-4 text-gray-500">紧急联系人信息</p>
				<van-cell-group>
					<van-field
						v-model="eContacts.realName"
						label="姓名"
						placeholder="请输入联系人姓名"
						input-align="right"
						:rules="[{ required: true, message: '请填写入联系人姓名！' }]"
					/>
				</van-cell-group>
				<van-cell-group>
					<van-field
						v-model="eContacts.relation"
						label="关系"
						placeholder="请输入联系人与您的关系"
						input-align="right"
						:rules="[{ required: true, message: '请输入联系人与您的关系！' }]"
					/>
				</van-cell-group>
				<van-cell-group>
					<van-field
						v-model="eContacts.phone"
						label="手机号"
						placeholder="请输入联系人手机号"
						input-align="right"
						:rules="[
							{ required: true, message: '请输入联系人手机号！' },
							{ pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }
						]"
					/>
				</van-cell-group>
				<van-cell-group>
					<van-field
						v-model="eContacts.address"
						label="住址"
						placeholder="请输入联系人的住址"
						input-align="right"
						:rules="[{ required: true, message: '请输入联系人的住址！' }]"
					/>
				</van-cell-group>
				<div class="flex justify-center items-center mt-8">
					<van-button class="w-80" type="primary" native-type="submit">提交认证</van-button>
				</div>
				<van-popup v-model:show="show" round position="bottom">
					<van-cascader
						v-model="ownerInfo.houseId"
						title="请选择需要认证的房屋"
						:options="options"
						:field-names="fieldNames"
						@close="show = false"
						@finish="onFinish"
					/>
				</van-popup>
			</div>
		</van-form>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive } from 'vue'
import { showDialog } from 'vant'
import { useRouter } from 'vue-router'
import { getHouseOptions, sbCertify, getDefaultInfo } from '@/api/owner/index'
import { getUserInfo } from '@/api/user'
const show = ref(false)
const fieldValue = ref('')
const router = useRouter()
const check1 = ref('text-blue-400 border border-blue-400 rounded-lg mr-1')
const check2 = ref('border rounded-lg mr-1')
const check3 = ref(check1.value)
const check4 = ref(check2.value)
const check5 = ref(check1.value)
const check6 = ref(check2.value)
const check7 = ref(check1.value)
const check8 = ref(check2.value)
const birthdayDate = ref()
const showBirthday = ref(false)
const minDate = new Date(1960, 0, 1)
const maxDate = new Date(2010, 0, 1)
const houseId = ref()
const eContacts = reactive({
	realName: '',
	relation: '',
	gender: 1,
	phone: '',
	address: ''
})
const ownerInfo = ref<any>({
	realName: '',
	gender: 1,
	identityCard: '',
	phone: '',
	houseId: null,
	birthday: '',
	nation: '',
	marriage: 1,
	accountType: 1,
	party: '',
	domicileLocation: '',
	rentalType: 0,
	stayCard: null,
	address: ''
})
const fieldNames = {
	text: 'name',
	value: 'id',
	children: 'items'
}
interface OptionInfo {
	name: string
	id: number
	items: Array<OptionInfo>
}
const options = ref<any[]>([])
onBeforeMount(() => {
	getHouseOptions().then(res => {
		options.value = res.data
	})
	getUserInfo().then(res => {
		ownerInfo.value.phone = res.data.phone
		if (res.data.realName != undefined) {
			ownerInfo.value.realName = res.data.realName
			ownerInfo.value.birthday = res.data.birthday
			ownerInfo.value.nation = res.data.nation
			ownerInfo.value.party = res.data.party
			ownerInfo.value.domicileLocation = res.data.domicileLocation
			ownerInfo.value.address = res.data.address
			if (res.data.gender == 2) {
				typeCheck()
			}
			if (res.data.marriage == 1) {
				typeCheck2(1)
			}
			if (res.data.accountType == 1) {
				typeCheck3(1)
			}
			if (res.data.rentalType == 1) {
				typeCheck4(1)
			}
		}
	})
	getDefaultInfo().then((res: any) => {
		if (res.data.identityCard != undefined) {
			ownerInfo.value.identityCard = res.data.identityCard
			let econtacts = JSON.parse(res.data.econtacts)
			eContacts.realName = econtacts.realName
			eContacts.phone = econtacts.phone
			eContacts.address = econtacts.address
			eContacts.relation = econtacts.relation
		}
	})
})
const typeCheck = () => {
	;[check1.value, check2.value] = [check2.value, check1.value]
	if (ownerInfo.value.gender == 1) {
		ownerInfo.value.gender = 2
	} else {
		ownerInfo.value.gender = 1
	}
}
const typeCheck2 = (number: any) => {
	if (number == 0) {
		check3.value = 'text-blue-400 border border-blue-400 rounded-lg mr-1'
		check4.value = 'border rounded-lg mr-1'
		ownerInfo.value.marriage = 0
	} else {
		check3.value = 'border rounded-lg mr-1'
		check4.value = 'text-blue-400 border border-blue-400 rounded-lg mr-1'
		ownerInfo.value.marriage = 1
	}
}
const typeCheck3 = (number: any) => {
	if (number == 0) {
		check5.value = 'text-blue-400 border border-blue-400 rounded-lg mr-1'
		check6.value = 'border rounded-lg mr-1'
		ownerInfo.value.accountType = 0
	} else {
		check5.value = 'border rounded-lg mr-1'
		check6.value = 'text-blue-400 border border-blue-400 rounded-lg mr-1'
		ownerInfo.value.accountType = 1
	}
}
const typeCheck4 = (number: any) => {
	if (number == 0) {
		check7.value = 'text-blue-400 border border-blue-400 rounded-lg mr-1'
		check8.value = 'border rounded-lg mr-1'
		ownerInfo.value.rentalType = 0
	} else {
		check7.value = 'border rounded-lg mr-1'
		check8.value = 'text-blue-400 border border-blue-400 rounded-lg mr-1'
		ownerInfo.value.rentalType = 1
	}
}
const sbdate = () => {
	ownerInfo.value.birthday = birthdayDate.value.join('-')
	showBirthday.value = false
}
const validator = (val: any) => {
	const card15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/
	const card18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
	return card15.test(val) || card18.test(val)
}
const onFinish = ({ selectedOptions }: any) => {
	show.value = false
	fieldValue.value = selectedOptions.map((option: OptionInfo) => option.name).join('/')
}
const onClickLeft = () => {
	router.push('/my')
}
const sbform = () => {
	let data = {
		realName: ownerInfo.value.realName,
		phone: ownerInfo.value.phone,
		gender: ownerInfo.value.gender,
		identityCard: ownerInfo.value.identityCard,
		houseId: ownerInfo.value.houseId,
		birthday: ownerInfo.value.birthday,
		nation: ownerInfo.value.nation,
		marriage: ownerInfo.value.marriage,
		accountType: ownerInfo.value.accountType,
		party: ownerInfo.value.party,
		domicileLocation: ownerInfo.value.domicileLocation,
		rentalType: ownerInfo.value.rentalType,
		stayCard: ownerInfo.value.stayCard,
		address: ownerInfo.value.address,
		ec: JSON.stringify(eContacts)
	}
	sbCertify(data).then((res: any) => {
		if (res.code == 1) {
			showDialog({
				message: '提交申请成功~请耐心等待审核哦'
			})
			setTimeout(() => {
				router.push('/my')
			}, 2000)
		} else if (res.code == 0) {
			showDialog({
				message: res.msg
			})
			setTimeout(() => {
				router.push('/my')
			}, 2000)
		} else if (res.code == 2) {
			showDialog({
				message: res.msg
			})
		}
	})
}
</script>

<style scoped></style>
