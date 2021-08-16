import { app, BrowserWindow, Menu } from "electron";
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from "electron-devtools-installer";
import windowManager from "@/scripts/window/manager";
import WINDOWS from "@/config/WINDOWS";
import APP from "@/config/APP";
import "@/scripts/models/system";
import "@/scripts/models/createCanvas";

/**
 * Electron App
 */
export default class App {
  /**
   * 实例化 APP
   */
  constructor() {
    this.init();
  }

  /**
   * APP 初始化
   */
  private init() {
    process.development = process.env.NODE_ENV === "development";
    this.beforeReady();
    this.ready();
  }

  /**
   * ready 之前
   */
  private beforeReady() {
    app.setName(APP.name);
    Menu.setApplicationMenu(null);
  }

  /**
   * ready
   */
  private ready() {
    // Quit when all windows are closed.
    app.on("window-all-closed", () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0)
        windowManager.createWindow(WINDOWS.MAIN);
    });

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(async () => {
      // if (process.development) {
      //   // Install Vue Devtools
      //   try {
      //     await installExtension(REACT_DEVELOPER_TOOLS)
      //       .then((name) => {
      //         console.log(`Added Extension:  ${name}`);
      //       })
      //       .catch((err) => console.log("An error occurred: ", err));
      //   } catch (e) {
      //     console.error("Vue Devtools failed to install:", e.toString());
      //   }
      // }

      // 创建主窗口
      windowManager.createWindow(WINDOWS.MAIN).then((window) => {
        windowManager.createWindow(WINDOWS.COLOR_PICKER, {
          options: { parent: window.window },
        });
      });
    });

    // Exit cleanly on request from parent process in development mode.
    if (process.development) {
      if (process.platform === "win32") {
        process.on("message", (data) => {
          if (data === "graceful-exit") {
            app.quit();
          }
        });
      } else {
        process.on("SIGTERM", () => {
          app.quit();
        });
      }
    }
  }
}
