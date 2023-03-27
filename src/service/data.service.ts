import { fromEvent, Observable, pipe } from "rxjs";
import { filter, map, skip } from "rxjs/operators";


/**
 * 获取项目的路径
 * @returns string
 */
export function getProjectPath(id: number) {
  return `${id}的地址为:xxx`;
}


