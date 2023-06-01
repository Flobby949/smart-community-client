<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { onClickLeft } from '@/utils'
import { findMyHouse } from '@/api/owner'
import { addRepair } from '@/api/repair'
const route = useRoute()

const onSubmit = values => {
	let data = {
		type: type.value,
		category: category.value,
		place: place.value,
		title: title.value,
		content: message.value,
		fileList: fileList.value,
		communityId: 1
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
const changeType = ({ selectedOptions }) => {
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
const changeCategory = ({ selectedOptions }) => {
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
const changePlace = ({ selectedOptions }) => {
	place.value = selectedOptions[0]?.text
	placePicker.value = false
}
const message = ref('')
const title = ref('')

// const file = ref('')
onMounted(async () => {
	type.value = route.params.type
	typeText.value = types.filter(item => item.value == type.value)[0].text
})
const fileList = ref([
	{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
	// Uploader 根据文件后缀来判断是否为图片文件
	// 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
	{ url: 'https://cloud-image', isImage: true }
])
</script>

<template>
	<van-nav-bar title="添加报修" left-text="返回" left-arrow @click-left="onClickLeft" />
	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<div class="bg-gray-100 h-10 flex align-middle">报修信息</div>
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
			<div class="bg-gray-100">报修简要</div>
			<van-field v-model="title" placeholder="报修简要" />
			<div class="bg-gray-100">报修内容</div>

			<van-field v-model="message" class="bordera" rows="5" autosize type="textarea" maxlength="300" placeholder="请输入留言" show-word-limit />
			<van-uploader v-model="fileList" />
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit"> 提交 </van-button>
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
</style>
