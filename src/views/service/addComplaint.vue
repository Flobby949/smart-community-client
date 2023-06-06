<script setup lang="ts" name="About">
import { addComplaint } from '@/api/complaint'
import { uploadFile } from '@/api/user'

import { onClickLeft } from '@/utils'
import { ref } from 'vue'
import { useStore } from '@/store'
const { id } = useStore()

console.log(id)
const onSubmit = (values: any) => {
	let data = {
		type: type.value,
		title: title.value,
		content: message.value,
		fileList: fileList.value,
		imgs: imgs.value,
		communityId: id
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
		.then((res: any) => {
			file.status = 'done'
			file.message = '上传成功'
			imgs.value.push(res.data as never)
			console.log(imgs.value)
		})
		.catch(res => {
			file.status = 'fail'
			file.message = '上传失败'
		})
}
</script>
<template>
	<div class="bg-gray-100 min-h-screen">
		<van-nav-bar fixed title="投诉建议" left-arrow @click-left="onClickLeft" />

		<van-form class="mt-2" @submit="onSubmit">
			<van-cell-group>
				<div>
					<van-field v-model="typeText" class="textColor" is-link readonly name="picker" label="投诉类型" @click="typePicker = true" />
					<van-popup v-model:show="typePicker" position="bottom">
						<van-picker :columns="types" @confirm="changeType" @cancel="typePicker = false" />
					</van-popup>
				</div>

				<hr />

				<div class="text mt-4">投诉简要</div>
				<van-field v-model="title" class="borderb mt-2" placeholder="请写下简要" />

				<div class="text mt-4">投诉内容</div>

				<van-field
					v-model="message"
					class="borderb w-[10%] mt-2"
					rows="5"
					type="textarea"
					maxlength="300"
					placeholder="请写下详细报修内容，有助于工作人员快速帮您解决问题"
					show-word-limit
				/>
				<van-uploader v-model="fileList" :after-read="afterRead" class="mt-3 mb-6 ml-2">
					<div class="w-[80px] h-[80px] rounded-[10px] flex flex-col justify-center items-center ml-2" style="border: 1px dotted gray">
						<img class="inline-block w-[20px]" src="https://my-xl.oss-cn-beijing.aliyuncs.com/images/plus.png" />
					</div>
				</van-uploader>
			</van-cell-group>
			<div style="margin: 16px" class="flex justify-center">
				<van-button round type="primary" native-type="submit" class="w-[50%]"> 提交 </van-button>
			</div>

			<div class="h-[100px]"></div>
		</van-form>
	</div>
</template>

<style scoped>
.text {
	text-indent: 20px;
	color: gray;
	font-size: 1rem !important;
}
.textColor {
	color: #fdfdfdff !important;
	font-size: 1rem !important;
}
.bordera {
	@apply border border-solid border-sky-900;
}
.borderb {
	@apply border border-solid border-gray-200;
}
</style>
