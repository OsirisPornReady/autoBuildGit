<template>
  <div class="container">

    <a-form layout="inline">
      <a-form-item label="项目名" required>
        <a-input v-model:value="formState.username"/>
      </a-form-item>
      <a-form-item label="路径" required>
        <a-input v-model:value="formState.password"/>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="search">Search</a-button>
          <a-button danger @click="search">Reset</a-button>
        </a-space>
      </a-form-item>
    </a-form>

  </div>
</template>

<script lang='ts' setup>
import { onMounted, defineComponent, ref, reactive, toRaw } from "vue";
import { router } from '@/utils/common'; //useElectronApi
import { getL, setL } from "@/utils/simpleLocalstorage";

const { navigateTo } = router()

const formState = reactive({
  username: '',
  password: '',
});

const search = () => {

}

onMounted(() => {


})



</script>

<style lang='less' scoped>
.container {
  margin-bottom: 20px;
}
</style>