const { app, BrowserWindow,Menu, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}
let mainWindow;
let addWindow;

const createWindow = () => {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
  }
    
    
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
 
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu);

  
  
};
function createAddWindow(){
  addWindow = new BrowserWindow({
    width: 200,
    width: 300,
    title:'Add shopping list item',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
  }
   
  })
  addWindow.loadFile(path.join(__dirname, 'addWindow.html'));
  addWindow.on('close', function(){
    addWindow = null;
  })
}
const mainMenuTemplate = [
 
  {
  label:'File',
  submenu:[
    {
      label:'Add Item',
      click(){
        createAddWindow()
      }
    },
    {
      label:'Clear Item',
      click(){
        mainWindow.webContents.send('item:clear');
      }
    },
    {
      label:'Quit',
      accelerator:process.platform == 'darwin'? 'Command+Q': 'Ctrl+Q',
      click(){
        app.quit();
      }
    }
  ]
}
]

ipcMain.on('item:add', function(e,item){
  console.log(item)
  mainWindow.webContents.send('item:add',item);
  addWindow.close();
})
if (process.platform == 'darwin'){
  mainMenuTemplate.unshift({label:''});
}

if (process.env.MODE_ENV != 'production'){
  mainMenuTemplate.push({
    'label':'Developer tools',
    'submenu':[
      {
        label:'Toggle Devtools',
        accelerator: process.platform == 'darwin' ? 'Command+I': 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role:'reload'
      }
      
    ],
    
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
