import { fromEvent } from "rxjs";
import { ipcRenderer } from "electron";



export function useElectronApi() {
  const sendMessageToMain = (eventName: string, message: any = null) => {
    return ipcRenderer.sendSync(eventName, message);
  };

  const ipcRendererOn = (eventName: string) => {
    return fromEvent(ipcRenderer, eventName);
  };

  return {
    sendMessageToMain,
    ipcRendererOn,
    ipcRenderer
  };
}
