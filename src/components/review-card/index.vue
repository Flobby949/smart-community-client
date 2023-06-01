<template>
	<div class="card">
		<div class="title w-full h-[30%] border-style flex items-center justify-between px-2">
			<span>{{ reviewItem.communityName }}</span>
			<van-tag :type="reviewTagTypeList[reviewItem.status]" size="large">{{ reviewStatusText[reviewItem.status] }}</van-tag>
		</div>
		<div class="flex flex-row flex-1 justify-around">
			<div class="flex flex-col justify-center items-center">
				<van-icon class="iconfont" class-prefix="icon" name="face" size="70px" :color="iconColorList[reviewItem.face]" />
				<van-tag plain :type="wayTagType[reviewItem.face]" size="large">{{ wayTagText[reviewItem.face] }}</van-tag>
			</div>

			<div class="flex flex-col justify-center items-center">
				<van-icon class="iconfont" class-prefix="icon" name="finger" size="70px" :color="iconColorList[reviewItem.finger]" />
				<van-tag plain :type="wayTagType[reviewItem.finger]" size="large">{{ wayTagText[reviewItem.finger] }}</van-tag>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const reviewTagTypeList: any[] = ['warning', 'success', 'danger']
const reviewStatusText = ['未审核', '已通过', '已拒绝']
const iconColorList = ['#8d8d8d', '#449ffb']
const wayTagType: any[] = ['default', 'primary']
const wayTagText = ['未提交', '已提交']
defineProps<{
	reviewItem: {
		realName: string
		communityName: string
		status: number
		face: number
		finger: number
	}
}>()
</script>

<style scoped>
.card {
	@apply flex flex-col rounded-md box-border my-2 p-2 w-[90vw] h-48;
	box-shadow: 2px 2px 5px #ddd, -2px -2px 5px #ddd;
}

.border-style {
	border-bottom: 1px dashed #999;
}
</style>
