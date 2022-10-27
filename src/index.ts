import { join } from 'path';
import { app } from "electron";
import { Command } from "commander";

import { name, description, version } from "../package.json";
import webapp from "./webapp";

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

const program = new Command();

program
  .name(name)
  .description(description)
  .version(version);
program
  .command("open")
  .description("Open a webapp in a new normal window")
  .argument("<url>", "The URL to open")
  .option("-ua, --user-agent <userAgent>", "The user agent to use")
  .option("-w, --width <width>", "The width of the window")
  .option("-h, --height <height>", "The height of the window")
  .option("-t, --title <title>", "The title of the window")
  .option("-i, --icon <icon>", "The icon of the window")
  .action((url, options) => {
    app.whenReady().then(() => {

      options.userAgent = options.userAgent || "Mozilla/5.0 (X11; Linux x86_64; rv:105.0) Gecko/20100101 Firefox/105.0";
      options.width = parseInt(options.width) || 1000;
      options.height = parseInt(options.height) || 600;
      options.icon = options.icon || join(app.getAppPath(), "data/com.miguelovila.webonboard.png");

      const webappInstance = new webapp(url, options);
    });
  });

program.parse(process.argv);