<script setup lang="ts" name="About">
import { addComplaint } from '@/api/complaint'
import { uploadFile } from '@/api/user'
import { onClickLeft } from '@/utils'
import { ref } from 'vue'
const onSubmit = (values: any) => {
	let data = {
		type: type.value,
		title: title.value,
		content: message.value,
		fileList: fileList.value,
		imgs: imgs.value,
		communityId: 1
	}
	console.log('显示要提交的数据：............')
	console.log(data)
	addComplaint(data)
	onClickLeft()
}

const typePicker = ref(false)
const types = [
	{ text: '扰民投诉', value: '0' },
	{ text: '物业投诉', value: '1' },
	{ text: '卫生投诉', value: '1' },
	{ text: '安全投诉', value: '1' }
]

const type = ref('0')
const typeText = ref('扰民投诉')
const changeType = ({ selectedOptions }: any) => {
	typeText.value = selectedOptions[0]?.text
	type.value = selectedOptions[0]?.value
	typePicker.value = false
}
const message = ref('')
const title = ref('')
const fileList = ref([])
const imgs = ref([])

const afterRead = async (file: any) => {
	file.status = 'uploading'
	file.message = '上传中...'

	const formData = new FormData()
	console.log(file.file)
	formData.append('file', file.file)
	uploadFile(formData)
		.then(res => {
			file.status = 'done'
			file.message = '上传成功'
			imgs.value.push(res.data)
			console.log(imgs.value)
		})
		.catch(res => {
			file.status = 'fail'
			file.message = '上传失败'
		})
}
</script>
<template>
	<van-nav-bar title="添加投诉" left-text="返回" left-arrow @click-left="onClickLeft" />

	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<div>
				<van-field v-model="typeText" is-link readonly name="picker" label="投诉类型" @click="typePicker = true" />
				<van-popup v-model:show="typePicker" position="bottom">
					<van-picker :columns="types" @confirm="changeType" @cancel="typePicker = false" />
				</van-popup>
			</div>

			<div class="bg-gray-100">投诉简要</div>
			<van-field v-model="title" placeholder="报修简要" />
			<div class="bg-gray-100">投诉内容</div>

			<van-field v-model="message" class="bordera" rows="5" autosize type="textarea" maxlength="300" placeholder="请输入留言" show-word-limit />
			<van-uploader v-model="fileList" :after-read="afterRead" />
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit"> 提交 </van-button>
		</div>
	</van-form>
</template>
