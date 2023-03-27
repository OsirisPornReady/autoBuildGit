<template>
  <div class="container">

    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
<!--      <a-form-item label="项目名" v-bind="validateInfos.name">-->
<!--        <a-input v-model:value="modelRef.name"/>-->
<!--      </a-form-item>-->
<!--      <a-form-item label="详细路径" v-bind="validateInfos.region">-->
<!--        <a-input v-model:value="modelRef.path"/>-->
<!--      </a-form-item>-->
      <a-form-item label="标题">
        <a-input v-model:value="modelRef.title"/>
      </a-form-item>
      <a-form-item label="时间">
        <a-input v-model:value="modelRef.timeTitle"/>
      </a-form-item>
      <a-form-item :label="item" v-for="item in selectKeys">
        <a-select v-model:value="modelRef[item]"
                  :options="options[item]"
                  show-search
                  option-filter-prop="label"
                  placeholder="please select">
        </a-select>
      </a-form-item>
<!--      <a-form-item label="Activity type" v-bind="validateInfos.type">-->
<!--        <a-checkbox-group v-model:value="modelRef.type">-->
<!--          <a-checkbox value="1" name="type">Online</a-checkbox>-->
<!--          <a-checkbox value="2" name="type">Promotion</a-checkbox>-->
<!--          <a-checkbox value="3" name="type">Offline</a-checkbox>-->
<!--        </a-checkbox-group>-->
<!--      </a-form-item>-->
      <a-form-item label="封面路径">
        <a-input v-model:value="modelRef.thumb"/>
      </a-form-item>
      <a-form-item label="视频路径">
        <a-input v-model:value="modelRef.src"/>
      </a-form-item>
      <a-form-item label="简介">
        <a-textarea v-model:value="modelRef.brief" :rows="4" placeholder="简介在此输入"/>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
        <a-button type="primary" @click.prevent="submit">Save</a-button>
        <a-button style="margin-left: 10px" @click.prevent="cancel">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, defineComponent, ref, reactive, toRaw, inject } from "vue";
import { Form } from 'ant-design-vue';
import { router } from '@/utils/common'; //useElectronApi
import { getL, setL } from "@/utils/simpleLocalstorage";
import { getProjectPath } from "@/service/data.service";
import { message } from "ant-design-vue";

const { navigateTo } = router()

const props = defineProps<{
  recordKey: number
  editData: any
}>()
const emits = defineEmits(['closeModalOk', 'closeModalCancel'])
const broadcast: any = inject('broadcast');
const options: any = inject('options')

onMounted(() => {
  // let reply = useElectronApi().sendMessageToMain('loadLocalData');
  // setL('categoryList', reply.categoryList);
  // setL('videoList', reply.videoList);
  // console.log('本地数据', reply);
  modelRef.value.key = props.recordKey;
  if (props.recordKey === 0) {
    console.log('新增')
  } else {
    console.log('修改')
    modelRef.value = props.editData;
  }

})


const useForm = Form.useForm;
const labelCol = { span: 4 }
const wrapperCol = { span: 20 }


const modelRef = ref({
  // name: '',
  // path: '',
  // type: [],
  key: -1,
  title: '',
  time: '',
  timeTitle: '',
  fireCase: '',
  fireLevel: '',
  areaCase: '',
  area: '',
  thumb: '',
  src: '',
  brief: ''
});

const { thumb, src, title, key, brief, timeTitle, ...selectRef } = modelRef.value;
const selectKeys = Object.keys(selectRef).map(item => item as keyof typeof modelRef.value);

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
      required: false,
      message: 'Please select type',
      type: 'array',
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => {},
});

const onSelectProject = async (e: any) => {
  // let res = await getProjectPath(e);
  // modelRef.value.path = res;
  // return res;
}

const submit = () => {
  validate()
      .then(() => {
        // console.log(toRaw(modelRef));
        emits('closeModalOk', {
          msg: 'ok',
          key: props.recordKey,
          editData: toRaw(modelRef.value)
        });
      })
      .catch(err => {
        console.log('error', err);
        message.error('出错了')
      });
};

const cancel = () => {
  emits('closeModalCancel', { msg: 'cancel' });
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