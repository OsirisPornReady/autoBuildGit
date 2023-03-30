<template>

  <project-search></project-search>

  <a-space style="margin-bottom: 20px">
    <a-button type="dashed" @click="add">Add</a-button>
    <a-button type="dashed" @click="download">Download</a-button>
    <a-button type="dashed" @click="loadData">Reload</a-button>
<!--    <a-button type="primary" danger @click="dumpfile">整理成最终形式</a-button>-->
    <a-button type="primary" danger @click="testBatch">调用测试</a-button>
  </a-space>

  <a-table :columns="columns" :data-source="dataSource" :scroll="{ x: true }" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['title', 'type', 'path', 'time', 'brief'].includes(column.dataIndex)">
        <template v-if="column.dataIndex === 'title' || column.dataIndex === 'brief'">
          <a-tooltip placement="topLeft" :title="text">
            {{ text }}
          </a-tooltip>
        </template>
        <template v-else-if="column.dataIndex === 'type'">
          <div>{{ text.label }}</div>
        </template>
        <template v-else>
          <div>{{ text }}</div>
        </template>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span>
            <a @click="edit(record)">edit</a>
            <a-divider type="vertical" />
            <a-popconfirm
                title="Are you sure delete this task?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="(e) => { del(record); message.success('删除成功') }"
                @cancel="(e) => {}"
            >
              <a>del</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>

  <a-modal :title="modalTitle"
           :visible="visible"
           :width="900"
           closable
           :mask-closable="false"
           :destroy-on-close="true"
           :footer="null"
           @ok="handleOk"
           @cancel="handleCancel">
    <project-edit :recordKey="recordKey" :editData="editData"  @closeModalOk="handleOk" @closeModalCancel="handleCancel"></project-edit>
  </a-modal>
</template>

<script lang='ts' setup>
import {inject, onMounted, reactive, ref, toRaw} from 'vue';
import { useElectronApi } from "@/utils/electronTools";
import ProjectEdit from '@/components/project-edit.vue'
import ProjectSearch from '@/components/project-search.vue'
import { message } from "ant-design-vue";

const tableOptions: any = inject('tableOptions');

const { sendMessageToMain, ipcRendererOn } = useElectronApi();


const name = "page"
const visible = ref(false);
const columns = [
  {
    title: 'title',
    dataIndex: 'title',
    width: 100,
    ellipsis: true
  },
  {
    title: 'type',
    dataIndex: 'type',
    width: 100,
  },
  {
    title: 'path',
    dataIndex: 'path',
    width: 100,
    ellipsis: true
  },
  {
    title: 'time',
    dataIndex: 'time',
    width: 100,
    ellipsis: true
  },
  {
    title: 'brief',
    dataIndex: 'brief',
    width: 100,
    ellipsis: true
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: 150
  },
];

let data: any = null;
const dataSource = ref<any>([]);

let recordKey = 0;
let editData: any = {};
let modalTitle = ref('')

onMounted(() => {
  loadData();
})

const add = () => {
  modalTitle.value = '新增';
  recordKey = 0;
  editData = {};
  visible.value = true;
}

const edit = (record: any) => {
  modalTitle.value = '修改';
  recordKey = record.key;
  editData = record;
  visible.value = true;
};

const del = (record: any) => {
  let key = record.key
  let index = dataSource.value.findIndex((i:any) => i.key === key)
  if (index >= 0) {
    dataSource.value.splice(index, 1);
  }
}

const handleOk = (e: any) => {
  visible.value = false;
  handleCallback(e)
};

const handleCancel = (e: any) => {
  visible.value = false;
};

const handleCallback = (e: any) => {
  // console.log(e)
  let key = e.key;
  let editData = e.editData;
  if (key > 0) {
    let index = dataSource.value.findIndex((i:any) => i.key === key)
    if (index >= 0) {
      dataSource.value.splice(index, 1, editData);
    }
  } else if (key == 0) {
    editData.key = dataSource.value.length + 1;
    dataSource.value.push(editData);
  }
  download();
}

const loadData = () => {
  data = sendMessageToMain('loadLocalData');
  console.log('本地数据: ', data)
  message.success('本地数据已导入')
  if (data) {
    dataSource.value = data;
  } else {
    dataSource.value = [];
  }
}

const download = () => {
  let outputData = toRaw(dataSource.value);
  sendMessageToMain('saveAsYAML', outputData);
  message.success('数据已保存')
}

const dumpfile = () => {
  data = sendMessageToMain('loadLocalData');
  let dumpData = []
  for (let i=0; i < data.length; i++) {
    let cell = {
      title: data[i].title,
      timeTitle: data[i].timeTitle,
      primaryKey: data[i].key,
      thumb: data[i].thumb,
      src: data[i].src,
      brief: data[i].brief,
      category: {
        time: data[i].time,
        fireCase: data[i].fireCase,
        fireLevel: data[i].fireLevel,
        areaCase: data[i].areaCase,
        area: data[i].area
      },
      fake: false
    }
    dumpData.push(cell);
  }
  sendMessageToMain('dumpData', dumpData);
  message.success('数据已整理完毕')
}

const testBatch = () => {
  sendMessageToMain('testBatch');
}

</script>

<style lang='less' scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>