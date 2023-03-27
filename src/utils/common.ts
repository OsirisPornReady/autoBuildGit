import { useRouter as useVueRouter, useRoute } from "vue-router";
import { NavigationParams } from "./types";
import { fromEvent, Observable, pipe } from "rxjs";
import { filter, map, skip } from "rxjs/operators";
import { ipcRenderer } from "electron";

/**
 * 路由跳转
 * @returns router路由对象 navigateTo跳转方法
 */
export function router() {
  const router = useVueRouter();
  const route = useRoute();
  /**
   * 路由跳转
   * @param path 路由地址
   * @param params 携带参数
   */
  const navigateTo = (path: string, params: NavigationParams = {}) => {
    router.push({ path, query: params });
  };
  return { route, navigateTo };
}


// interface ElectronApi {
//   sendMessageToMain: (eventName: string, message?: any) => any;
//   listenMessageFromMain: (messageName: string) => Observable<any>;
// }
//
// export function useElectronApi(): ElectronApi {
//   const sendMessageToMain = (eventName: string, message: any = null) => {
//     return ipcRenderer.sendSync(eventName, message);
//   };
//
//   const filterOutUndefinedAndFirstArg = pipe(
//       filter(([_, message]) => message !== undefined),
//       map(([_, message]) => message)
//   );
//
//   const listenMessageFromMain = (messageName: string): Observable<any> => {
//     return fromEvent<[any, any]>(ipcRenderer, messageName).pipe(
//         skip(1),
//         filterOutUndefinedAndFirstArg
//     );
//   };
//
//   return {
//     sendMessageToMain,
//     listenMessageFromMain,
//   };
// }
