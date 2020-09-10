import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import './assets/utils.scss'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

