<template>
	<div>
		<van-form @submit="sbform">
			<div class="bg-gray-100">
				<van-nav-bar title="绑定家属/租客" left-arrow @click-left="onClickLeft" />
				<p class="m-4 text-gray-500">选择房屋</p>
				<van-dropdown-menu class="mt-2">
					<van-dropdown-item v-model="value1" :options="option1" @change="onChange" />
				</van-dropdown-menu>
				<p class="m-4 text-gray-500">住户信息</p>

				<div class="flex justify-between items-center bg-white">
					<p class="m-4 text-gray-500">住户类型</p>
					<div class="flex">
						<p :class="check1" @click="typeCheck"><span class="ml-2 mr-2">家属</span></p>
						<p :class="check2" @click="typeCheck"><span class="ml-2 mr-2">租户</span></p>
					</div>
				</div>
				<van-cell-group>
					<van-field
						v-model="familyInfo.realName"
						label="您的姓名"
						placeholder="请输入您的姓名"
						input-align="right"
						:rules="[{ required: true, message: '请填写您的姓名！' }]"
					/>
				</van-cell-group>
				<div class="flex justify-between items-center bg-white">
					<p class="m-4 text-gray-500">性别</p>
					<div class="flex">
						<p :class="check3" @click="typeCheck2"><span class="ml-2 mr-2">男</span></p>
						<p :class="check4" @click="typeCheck2"><span class="ml-2 mr-2">女</span></p>
					</div>
				</div>
				<van-cell-group>
					<van-field
						v-model="familyInfo.phone"
						label="手机号"
						placeholder="请输入手机号"
						input-align="right"
						:rules="[
							{ required: true, message: '请填写您的手机号码！' },
							{ pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' }
						]"
					/>
				</van-cell-group>
				<van-cell-group>
					<van-field v-model="familyInfo.identityCard" placeholder="请输入身份证号" input-align="right">
						<template #label>
							<span style="display: block; width: 8em">身份证件号(选填)</span>
						</template>
					</van-field>
				</van-cell-group>
			</div>
			<div class="flex justify-center items-center mt-16">
				<van-button class="w-64" type="primary" native-type="submit">邀请住户加入</van-button>
			</div>
		</van-form>
	</div>
</template>
