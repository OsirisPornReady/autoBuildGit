import { Observable, Subject } from "rxjs";
import {ref} from "vue";

export class Broadcast {
    broadcast = new Subject();
}

export const devMode: boolean = false;

export const options = ref({
    type: [
        { value: '0', label: '不限' },
        { value: '1', label: '前端' },
        { value: '2', label: '后端' },
        { value: '3', label: 'windows脚本' },
        { value: '4', label: 'linux脚本' }
    ],
})

export const tableOptions = ref({
    type: {
        0 : '不限',
        1 : '前端',
        2 : '后端',
        3 : 'windows脚本',
        4 : 'linux脚本'
    }
})
