import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from "./router";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
    next();
});

console.log('当前环境模式',import.meta.env.VITE_OWNER)

app.use(router)
    .use(Antd)
    .mount('#app')