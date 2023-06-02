<script setup lang="ts">
import { useCachedViewStoreHook } from '@/store/modules/cachedView'
import { useDarkMode } from '@/hooks/useToggleDarkMode'
import { computed } from 'vue'

const cachedViews = computed(() => {
	return useCachedViewStoreHook().cachedViewList
})
</script>

<template>
	<div class="app-wrapper">
		<van-config-provider :theme="useDarkMode() ? 'dark' : 'light'">
			<!-- <nav-bar /> -->
			<router-view v-slot="{ Component }">
				<keep-alive :include="cachedViews">
					<component :is="Component" />
				</keep-alive>
			</router-view>
			<!-- <tabbar /> -->
			<div class="mybar">
				<div class="mynavbar">
					<div class="mynavbarItem">
						<RouterLink to="/home" class="navitem">
							<van-icon name="wap-home-o" class="icon" />
							<span>首页</span>
						</RouterLink>
						<RouterLink to="/Service" class="navitem">
							<van-icon name="like-o" class="icon" />
							<span>服务</span>
						</RouterLink>
						<RouterLink to="/Open" class="navitem opendoor">
							<van-icon name="eye-o" class="icon" />
							<span>开门</span>
						</RouterLink>
						<RouterLink to="/notice" class="navitem">
							<van-icon name="bullhorn-o" class="icon" />
							<span>消息</span>
						</RouterLink>
						<RouterLink to="/My" class="navitem">
							<van-icon name="user-o" class="icon" />
							<span>我的</span>
						</RouterLink>
					</div>
				</div>
			</div>
		</van-config-provider>
	</div>
</template>

<style lang="less" scoped>
@import '@/styles/mixin.less';

.app-wrapper {
	.clearfix();
	position: relative;
	height: 100%;
	width: 100%;
}
.mybar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background-color: #fff;
	height: 60px;
}

.mynavbar {
	height: 60px;
	background-color: #fff;
	display: flex;
	align-items: center;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	padding: 0 20px;
	width: 100vw;
}
.mynavbarItem {
	display: flex;
	align-items: center;
}
.mynavbarItem .navitem {
	flex: 1;
	width: 65px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 100%;
	padding: 0 10px;
	font-size: 14px;
}
.icon {
	font-size: 22px;
}
.navitem span {
	margin-top: 2px;
}
.opendoor {
	position: relative;
	top: -20px;
	border-radius: 50%;
	width: 60px !important;
	height: 60px !important;
	background-color: #fff;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
.opendoor .icon {
	font-size: 30px;
}
.opendoor span {
	margin-top: -10px;
}
/* 路由当前激活样式 */
.router-link-active {
	color: #27afff;
}
</style>
