import { createApp } from 'vue'
import { store } from './store'
import 'vant/lib/index.css'
// normalize.css
import 'normalize.css/normalize.css'
// 全局样式
// import "./styles/index.less";
// tailwindcss
import './styles/tailwind.css'
// svg icon
import 'virtual:svg-icons-register'

import '@/assets/iconfont.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')
