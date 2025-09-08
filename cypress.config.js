import { defineConfig } from "cypress";
import mochawesome from 'cypress-mochawesome-reporter/plugin.js';

export default defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'cloudTalk-exam',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      mochawesome(on);
    },
  },
});