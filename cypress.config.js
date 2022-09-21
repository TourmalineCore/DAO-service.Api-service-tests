const { defineConfig } = require("cypress");
const { exec } = require('child_process')
const { isFileExist, findFiles } = require('cy-verify-downloads');

module.exports = defineConfig({

  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  video: false,
  screenshotOnRunFailure: false,
  // retries: {
  //   runMode: 1,
  //   openMode: 0,
  // },
  requestTimeout: 30000,

  // screenshotsFolder: 'cypress/fixtures/screenshots',

  // viewportWidth: 1280,
  // viewportHeight: 720,
  projectId: "shr3v9",

  e2e: {
    setupNodeEvents(on, config) {
        on('before:browser:launch', (browser, launchOptions) => {
          if (browser.name === 'chrome' && browser.isHeadless) {
            // console.log('TRUE');
            launchOptions.args.push('--window-size=4480,2520');
            // console.log(launchOptions.args);
            return launchOptions
          }
        })
        on('after:screenshot', (details) => {
          console.log(details)
          exec('sh script2.sh')
        })
        on('task', { isFileExist, findFiles });
      // implement node event listeners here
    },
  },
});
