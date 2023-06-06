import { defineStore, createPinia } from 'pinia'
const store = createPinia()
export { store, useStore }
import { ref, reactive, onMounted } from 'vue'
const communityList = ref<any[]>([])
interface CommunityState {
	id: any
	name: any
}

const useStore = defineStore('community', {
	state: (): CommunityState => ({
		id: '1',
		name: '万象城'
	}),
	actions: {
		setCommunity(id: any, communityName: any) {
			this.id = id
			this.name = communityName
		}
	}
})