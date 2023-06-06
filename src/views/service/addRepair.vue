<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { onClickLeft } from '@/utils'
import { addRepair } from '@/api/repair'
import { uploadFile } from '@/api/user'
const route = useRoute()
import { useStore } from '@/store'
const { id } = useStore()
const onSubmit = (values: any) => {
	let data = {
		type: type.value,
		category: category.value,
		place: place.value,
		title: title.value,
		content: message.value,
		fileList: fileList.value,
		communityId: id,
		imgs: imgs.value
	}
	console.log('显示要提交的数据：............')
	console.log(data)
	addRepair(data)
	onClickLeft()
}

const typePicker = ref(false)
const types = [
	{ text: '公共报修', value: '0' },
	{ text: '个人报修', value: '1' }
]

const type = ref('')
const typeText = ref('')
const changeType = ({ selectedOptions }: any) => {
	typeText.value = selectedOptions[0]?.text
	type.value = selectedOptions[0]?.value
	typePicker.value = false
}

const categoryPicker = ref(false)
const categories = [
	{ text: '路灯', value: '0' },
	{ text: '厕所', value: '1' }
]
const category = ref('0')
const categoryText = ref('路灯')
const changeCategory = ({ selectedOptions }: any) => {
	categoryText.value = selectedOptions[0]?.text
	category.value = selectedOptions[0]?.value
	categoryPicker.value = false
}

const placePicker = ref(false)
const places = [
	{ text: '天堂小区一号', value: '0' },
	{ text: '天堂小区一号', value: '1' }
]
// const place = ref('0')
const place = ref('天堂小区一号')
const changePlace = ({ selectedOptions }: any) => {
	place.value = selectedOptions[0]?.text
	placePicker.value = false
}
const message = ref('')
const title = ref('')

onMounted(async () => {
	type.value = route.params.type
	typeText.value = types.filter(item => item.value == type.value)[0].text
})
const fileList = ref([])
const imgs = ref([])

const afterRead = async (file: any) => {
	file.status = 'uploading'
	file.message = '上传中...'

	const formData = new FormData()
	console.log(file.file)
	formData.append('file', file.file)
	uploadFile(formData).then(res => {
		file.status = 'done'
		file.message = '上传成功'
		imgs.value.push(res.data)
		console.log(imgs.value)
	})
}
</script>

<template>
	<van-nav-bar title="添加报修" left-arrow @click-left="onClickLeft" />

	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<div class="bg-gray-100 h-10 flex items-center text">报修信息</div>
			<div>
				<van-field v-model="typeText" is-link readonly name="picker" label="报修类别" @click="typePicker = true" />
				<van-popup v-model:show="typePicker" position="bottom">
					<van-picker :columns="types" @confirm="changeType" @cancel="typePicker = false" />
				</van-popup>
			</div>

			<div>
				<van-field v-model="categoryText" is-link readonly name="picker" label="报修类型" @click="categoryPicker = true" />
				<van-popup v-model:show="categoryPicker" position="bottom">
					<van-picker :columns="categories" @confirm="changeCategory" @cancel="categoryPicker = false" />
				</van-popup>
			</div>

			<div>
				<van-field v-model="place" is-link readonly name="picker" label="报修小区" @click="placePicker = true" />
				<van-popup v-model:show="placePicker" position="bottom">
					<van-picker :columns="places" @confirm="changePlace" @cancel="placePicker = false" />
				</van-popup>
			</div>
			<div class="bg-gray-100 p-2 text">报修简要</div>
			<van-field v-model="title" class="borderb m-2" placeholder="报修简要" />
			<div class="bg-gray-100 p-2 text">报修内容</div>

			<van-field
				v-model="message"
				class="borderb m-2"
				rows="5"
				autosize
				type="textarea"
				maxlength="300"
				placeholder="请写下详细报修内容，有助于工作人员快速帮您解决问题"
				show-word-limit
			/>
			<van-uploader v-model="fileList" multiple :max-count="2" class="rounded-[10px] ml-2" :after-read="afterRead">
				<div class="w-[80px] h-[80px] rounded-[10px] bg-gray-100 borderb flex flex-col justify-center items-center ml-2">
					<img class="inline-block w-[20px]" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/plus.png" />
					<div>上传图片</div>
				</div>
			</van-uploader>
		</van-cell-group>
		<div style="margin: 16px" class="flex justify-center">
			<van-button round class="w-[50%]" type="primary" native-type="submit"> 提交 </van-button>
		</div>
	</van-form>
</template>

<style scoped>
.list {
	@apply flex justify-between;
}
.bordera {
	@apply border border-solid border-sky-900;
}

.text {
	text-indent: 20px;
}
.borderb {
	@apply border border-solid border-gray-200;
}
</style>
