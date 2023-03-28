<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { onMounted, ref, provide } from "vue";
import {router} from '@/utils/common';
import { Broadcast, options, tableOptions } from "@/service/global.service";
import { getL, setL } from "@/utils/simpleLocalstorage";
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const { navigateTo } = router()
const broadcast = new Broadcast();

provide('broadcast', broadcast);
provide('options', options);
provide('tableOptions', tableOptions);

onMounted(() => {

})

</script>

<style>
html,
body {
    background: none;
}

#app {
    width: 100%;
    height: 100%;
    background-size: cover;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
