'use strict';
const { app, BrowserWindow, dialog } = require('electron');

let win;
const isDevelopment = process.env.NODE_ENV === 'development';

////////////////////////////////////////
// Error Handling
////////////////////////////////////////

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);

  if (!isDevelopment) {
    dialog.showErrorBox(
      'An error occurred',
      'The application encountered an unexpected error and will restart.\n\n' +
        `Error: ${error.message}`
    );
  }

  // Give time for the dialog to show, then restart
  setTimeout(() => {
    app.relaunch();
    app.exit(0);
  }, 1000);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);

  if (!isDevelopment) {
    console.error('Unhandled Promise Rejection:', reason);
  }
});

////////////////////////////////////////
// Window Management
////////////////////////////////////////

function createWindow() {
  try {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      show: false, // Don't show until ready-to-show
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        devTools: isDevelopment,
        sandbox: true,
      },
    });

    // Prevent window from being garbage collected
    win.on('closed', () => {
      win = null;
    });

    // Show window when ready
    win.once('ready-to-show', () => {
      win.maximize();
      win.show();

      if (isDevelopment) {
        win.webContents.openDevTools();
      }
    });

    // Handle renderer process crashes
    win.webContents.on('render-process-gone', (event, details) => {
      console.error('Renderer process crashed:', details);

      if (details.reason !== 'clean-exit') {
        const options = {
          type: 'error',
          title: 'Renderer Process Crashed',
          message: 'The renderer process has crashed',
          detail: `Reason: ${details.reason}`,
          buttons: ['Reload', 'Close'],
        };

        dialog.showMessageBox(win, options).then((result) => {
          if (result.response === 0) {
            win.reload();
          } else {
            win.close();
          }
        });
      }
    });

    // Handle unresponsive renderer
    win.on('unresponsive', () => {
      console.warn('Window became unresponsive');

      const options = {
        type: 'warning',
        title: 'Application Not Responding',
        message: 'The application is not responding',
        buttons: ['Wait', 'Reload', 'Close'],
      };

      dialog.showMessageBox(win, options).then((result) => {
        if (result.response === 1) {
          win.reload();
        } else if (result.response === 2) {
          win.close();
        }
      });
    });

    // Log navigation errors
    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Failed to load:', errorCode, errorDescription);
    });

    // Load the index.html file
    win.loadFile('index.html').catch((error) => {
      console.error('Failed to load index.html:', error);
      dialog.showErrorBox('Load Error', `Failed to load application: ${error.message}`);
    });
  } catch (error) {
    console.error('Error creating window:', error);
    dialog.showErrorBox('Window Creation Error', `Failed to create window: ${error.message}`);
    app.quit();
  }
}

////////////////////////////////////////
// App Event Handlers
////////////////////////////////////////

app.on('window-all-closed', () => {
  // On macOS, applications stay active until explicitly quit
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (win === null) {
    createWindow();
  }
});

// Wait for app to be ready before creating window
app
  .whenReady()
  .then(() => {
    console.log('App is ready, creating window...');
    createWindow();

    // Log app info
    console.log('AliceMQ version:', app.getVersion());
    console.log('Electron version:', process.versions.electron);
    console.log('Chrome version:', process.versions.chrome);
    console.log('Node version:', process.versions.node);
  })
  .catch((error) => {
    console.error('App initialization failed:', error);
    dialog.showErrorBox('Initialization Error', `Failed to start application: ${error.message}`);
    app.quit();
  });

// Handle app quit
app.on('before-quit', () => {
  console.log('App is quitting...');
});

////////////////////////////////////////
