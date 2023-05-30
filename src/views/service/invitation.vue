<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const invitation = ref()

onMounted(() => {
	invitation.value = route.params.invitationId
})
</script>

<template>
	<div>访客邀请</div>
	<div>{{ invitation }}</div>
</template>
