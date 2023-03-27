<template>
  <div class="container">
    <a-card>
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="项目名" v-bind="validateInfos.name">
          <a-select v-model:value="modelRef.name"
                    show-search
                    :options="options"
                    @change="onSelectProject($event)"
                    placeholder="选择项目">
          </a-select>
        </a-form-item>
        <a-form-item label="详细路径" v-bind="validateInfos.region">
          <a-input v-model:value="modelRef.path"/>
        </a-form-item>
        <a-form-item label="Activity type" v-bind="validateInfos.type">
          <a-checkbox-group v-model:value="modelRef.type">
            <a-checkbox value="1" name="type">Online</a-checkbox>
            <a-checkbox value="2" name="type">Promotion</a-checkbox>
            <a-checkbox value="3" name="type">Offline</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
          <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, defineComponent, ref, reactive, toRaw } from "vue";
import { Form } from 'ant-design-vue';
import { router } from '@/utils/common'; //useElectronApi
import { getL, setL } from "@/utils/simpleLocalstorage";
import { getProjectPath } from "@/service/data.service";

const { navigateTo } = router()
const name = "index";

onMounted(() => {
  // let reply = useElectronApi().sendMessageToMain('loadLocalData');
  // setL('categoryList', reply.categoryList);
  // setL('videoList', reply.videoList);
  // console.log('本地数据', reply);
})

const useForm = Form.useForm;
const labelCol = { span: 4 }
const wrapperCol = { span: 20 }

const options = ref<any>([
  { value: '11', label: 'Jack' },
  { value: '22', label: 'Lucy' },
  { value: '33', label: 'Tom' },
]);

const modelRef = ref({
  name: '',
  path: '',
  type: [],
});
const rulesRef = ref({
  name: [
    {
      required: true,
      message: 'Please input name',
    },
  ],
  region: [
    {
      required: true,
      message: 'Please select region',
    },
  ],
  type: [
    {
      required: true,
      message: 'Please select type',
      type: 'array',
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => {},
});
const onSubmit = () => {
  validate()
      .then(() => {
        console.log(toRaw(modelRef));
      })
      .catch(err => {
        console.log('error', err);
      });
};
const onSelectProject = async (e: any) => {
  let res = await getProjectPath(e);
  modelRef.value.path = res;
  return res;
}

</script>

<style lang='less' scoped>
.container {
  width: 100%;
  height: 100%;
  //margin: 50px auto 0;
  padding: 50px 50px;
  //border-radius: 20px;
  //background-color: white;
  //box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.3);
}
</style>