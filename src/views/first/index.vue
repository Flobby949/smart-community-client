<template>
	<div class="bigBox">
		<div class="box">
			<div class="hader">
				<span>温馨提示</span>
			</div>
			<div class="content">
				<div>
					为了帮助您安全使用产品和服务，在您同意并授权基础上，我们可能会收集你的交易信息，位置信息，设备信息等。请你认证阅读<a
						@click="
							$router.push({
								path: '/msg',
								query: {
									type: 0
								}
							})
						"
						>《用户服务协议》</a
					>及<a
						@click="
							$router.push({
								path: '/msg',
								query: {
									type: 1
								}
							})
						"
						>《隐私政策》</a
					>的全部条款。您同意并接受全部条款后，再开始使用我们的服务。
				</div>
			</div>
			<div class="bottom">
				<button @click="no">不同意</button>
				<button class="aggree" @click="$router.push('/login')">同意并继续</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
function no() {
	window.location.reload()
}
</script>

<style scoped>
.bigBox {
	height: 100vh;
	width: 100vw;
	background: #7d777b;
	position: relative;
}
.box {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	height: 320px;
	width: 320px;
	border-radius: 6px;
	display: flex;
	flex-direction: column;
}
.hader {
	height: 60px;
	line-height: 60px;
	text-align: center;
	border-bottom: 1px solid #ccc;
	font-size: 20px;
	font-weight: 500;
}
.content {
	flex: 1;
	border-bottom: 1px solid #ccc;
	padding: 20px;
	font-size: 14px;
}

.bottom {
	height: 60px;
	display: flex;
	align-items: center;
}
.bottom button {
	flex: 1;
}
.aggree {
	color: #63b0ff;
}
a {
	color: #51a7ff;
}
</style>
