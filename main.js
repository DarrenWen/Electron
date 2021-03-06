//electron 会通过node去执行main.js这个模块，electron内置了elecron这个模块，拥有electron相应的API；
const electron = require('electron');

var path=require("path");
var cp = require('child_process');



const {ipcMain} = require('electron');

//监听web page里发出的message
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log("mian1" + arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')//在main process里向web page发出message
});

//一部发送消息
ipcMain.on('synchronous-message', (event, arg) => {
  console.log("mian2" + arg)  // prints "ping"
  event.returnValue = 'pong';
 
});


const app = electron.app  // 构建app模块

const BrowserWindow = electron.BrowserWindow // PASCAL命名，构建一个原声的浏览器窗口，构造函数；创建一个浏览器实例

let mainWindow //声明一个全局的主窗口，let变量，const不变。

function createWindow () {
  mainWindow = new BrowserWindow({width: 1024, height: 768, frame:false,fullscreen:false}) //创建一个新的窗口，给定了高度和宽度；

  //let newWindow = new BrowserWindow({width: 800, height: 600}) //可以创建多个新的窗口

  mainWindow.loadURL(`file://${__dirname}/test.html`) //加载index.html文件，这是es6的模板命令字的写法；file://是本地文件的协议
  //mainWindow.loadURL(`https://github.com`) //可以直接使用外部的一个网址，构建一个桌面应用；
  //mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', function(){
    mainWindow.webContents.send('mqtt-print', 'whooooooooooo');
    });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });


 
}

app.on('ready', createWindow) //当应用启动完成，注册ready方法，初始化一个新的窗口，此方法后可以调用API了

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


var handleSquirreEvent=function(args,done){
     if(process.platform!="win32")
      {
        return false;
      }


 function executeSquirrelCommand(args,done){
  var updateDotExe = path.resolve(path.dirname(process.execPath),'..','update.exe');
  var child = cp.spawn(updateDotExe,args,{detached:true});
  child.on('close',function(code){
    done();
  });
 }

 function install(done){
   var target = path.basename(process.execPath);
   executeSquirrelCommand(["--createShortcut",target],done);
 }

 function uninstall(done)
 {
   var target = target.basename(process.execPath);
   executeSquirrelCommand(["--removeShortcut",target],done);
 }

 var squirrelEvent = process.argv[1];
 switch(squirrelEvent){
   case '--squirrel-install':
   install(app.quit);
   return true;
   case '--squiirrel-update':
   install(app.quit);
   return true;
   case '--squirrel-obsolete':
   app.quit();
   return true;
   case '--squirrel-uninstall':
   uninstall(app.quit);
   return true;
 }
}

if(handleSquirreEvent())
  {
return ;
  }