import { app, BrowserWindow } from 'electron';

export default class webapp {

  private readonly window: BrowserWindow;

  constructor(url: string, options: any) {
    this.window = new BrowserWindow({
      title: options.title,
      width: options.width,
      height: options.height,
      icon: options.icon,
      webPreferences: {
        nodeIntegration: true
      }
    });

    if (options.title) {
      this.window.setTitle(options.title);
      this.window.on('page-title-updated', function(e) {
        e.preventDefault()
      });
    }
    this.window.loadURL(url, { userAgent: options.userAgent });
  }

};