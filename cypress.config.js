const { defineConfig } = require("cypress");
const { exec } = require('child_process')

module.exports = defineConfig({

  e2e: {
    baseUrl: 'http://localhost:3000',

    video: false,

    screenshotOnRunFailure: false,

    requestTimeout: 30000,

    projectId: "shr3v9",

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--window-size=4480,2520');
          return launchOptions
        }
      })
      on('after:screenshot', (details) => {
        exec('sh move-screenshot.sh');
      })
    },
  }
});
