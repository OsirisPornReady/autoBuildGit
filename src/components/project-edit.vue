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
        <a-input v-model:value="modelRef.title" placeholder="please input"/>
      </a-form-item>
      <a-form-item label="类型">
        <a-select v-model:value="modelRef.type"
                  :options="options.type"
                  :label-in-value="true"
                  @change="(i) => {
                    if(i) {
                      modelRef.type = i.option
                    }
                  }"
                  show-search
                  option-filter-prop="label"
                  allow-clear
                  placeholder="please select">
        </a-select>
      </a-form-item>
      <a-form-item label="项目路径">
        <a-input v-model:value="modelRef.path" placeholder="please input"/>
      </a-form-item>
      <a-form-item label="时间">
        <a-date-picker v-model:value="modelRef.time" valueFormat="YYYY-MM-DD"/>
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
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';

const { navigateTo } = router()

const props = defineProps<{
  recordKey: number
  editData: any
}>()
const emits = defineEmits(['closeModalOk', 'closeModalCancel'])
const broadcast: any = inject('broadcast');
const options: any = inject('options')

onMounted(() => {
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
  key: -1,
  title: '',
  type: null,
  path: '',
  time: '',
  brief: ''
});

// const { key, title, path, time, brief, ...selectRef } = modelRef.value;
// const selectKeys = Object.keys(selectRef).map(item => item as keyof typeof modelRef.value);

const rulesRef = ref({

});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => {},
});


const submit = () => {
  validate()
      .then(() => {

        emits('closeModalOk', {
          msg: 'ok',
          key: props.recordKey,
          editData: toRaw(modelRef.value)
        });
      })
      .catch(err => {
        console.error(err, '\n', 'data: ', toRaw(modelRef.value));
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