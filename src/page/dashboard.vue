<template>

  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo"/>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1" @click="navigateTo('/index')">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2" @click="navigateTo('/list')">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', height: '100vh' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {router} from '@/utils/common';
import { getL, setL } from "@/utils/simpleLocalstorage";

import { UserOutlined } from "@ant-design/icons-vue";
import { VideoCameraOutlined } from "@ant-design/icons-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { MenuFoldOutlined } from "@ant-design/icons-vue";
import { MenuUnfoldOutlined } from "@ant-design/icons-vue";

const { navigateTo } = router()



const selectedKeys = ref<any>(['1']);
const collapsed = ref<boolean>(false);

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
