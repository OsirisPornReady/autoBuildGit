// app 控制应用程序的事件生命周期（相当于应用程序）
// BrowserWindow 创建并控制浏览器窗口（相当于打开桌面弹框）
import {app, BrowserWindow, ipcMain} from 'electron'
import path from 'path'
import * as fs from "fs";
import * as fse from "fs-extra";
import * as YAML from "yaml";
import yaml from 'js-yaml';
// import fetch from "electron-fetch";
// import Store from 'electron-store';
// import schedule from 'node-schedule';

//获取当前环境
const evn = process.env.NODE_ENV;

// 定义全局变量，获取窗口实例
let win: BrowserWindow;

// 测试一种很新的写法
// 很明显失败了 不能直接用vite的环境变量 还是老实用process.env.NODE_ENV吧
// 注释在这里提醒后人
// console.log('当前环境模式',import.meta.env.VITE_OWNER)
let config: any;

//配置文件读取 判断是否打包(app.isPackaged)
const dataPath =
    evn == "development"
        ? path.join(__dirname, "../public/autoBuildGitData")
        : path.join(app.getPath("appData"), "autoBuildGitData");

const appDataPath = path.join(app.getPath("appData"));

/**
 * 创建一个窗口
 */
const createWindow = async () => {
    win = new BrowserWindow({
        webPreferences: {
            devTools: true,
            // 集成网页和 Node.js，也就是在渲染进程中，可以调用 Node.js 方法
            nodeIntegration: true,
            contextIsolation: false,
            //允许html页面上的javascript代码访问nodejs 环境api代码的能力（与node集成的意思）
        }
    })

    // 生产环境、开发环境，访问的路径不同
    // 开发环境下，我们访问的是 Vite 本地服务
    // 打包之后，我们访问的是 dist 静态文件
    // 所以这里要加个判断
    if (evn == 'development') {
        await win.loadURL(`http://localhost:3012/`)
        win.webContents.openDevTools()
    } else {
        await win.loadFile(path.join(__dirname, "../dist/index.html"));
    }

    ipcMain.on('message', async (event, args) => {
        console.log('收到网页消息',args)
        // TODO:不返回消息会卡死 切记！！！！！
        event.returnValue = 'pong'
    })

    ipcMain.on('loadLocalData', (event, args) => {
        let res = path.join(dataPath, '/data.yml')
        let file = fs.readFileSync(res,'utf8')
        let localData = YAML.parse(file);
        event.returnValue = localData;
    })

    ipcMain.on('loadDataPath', (event, args) => {
        let retPath = '';
        if(evn === 'development'){
            retPath = '/autoBuildGitData';
        } else {
            retPath = dataPath;
        }
        event.returnValue = retPath;
    })

    ipcMain.on('saveAsYAML', (event, args) => {
        let docData = YAML.stringify(args)
        // console.log(docData);
        let res = path.join(dataPath, '/data.yml')
        fs.writeFileSync(res, docData, 'utf-8');
        event.returnValue = '';
    })

    ipcMain.on('dumpData', (event, args) => {
        let docData = YAML.stringify(args)
        // console.log(docData);
        let res = path.join(dataPath, '/final.yml')
        fs.writeFileSync(res, docData, 'utf-8');
        event.returnValue = '';
    })
}

const initApp = () => {
    let configPath = path.join(process.resourcesPath, "autoBuildGitData");
    if (evn === "development") {
        configPath = path.join(__dirname, "../public/autoBuildGitData");
    }
    if (!fs.existsSync(`${appDataPath}/autoBuildGitData`) && evn !== 'development') {
        fse.copySync(configPath, `${appDataPath}/autoBuildGitData`);
    }

    let configYmlPath =
        evn === "development"
            ? path.join(__dirname, "../public/autoBuildGitData/config.yml")
            : `${appDataPath}/autoBuildGitData/config.yml`;
    config = yaml.load(fs.readFileSync(configYmlPath, "utf8"));
};

// 初始化app（在 Electron 完成初始化时触发）
app
    .whenReady()
    .then(createWindow)
    .then(() => {
        //判断环境 如果是开发环境就不处理移动
        initApp();
    })
    .then(() => {
        setInterval(() => {
            win.webContents.send("message", { message: "electron初始化了" });
        }, 500);
    });





