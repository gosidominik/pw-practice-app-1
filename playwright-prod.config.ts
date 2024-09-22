import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();


export default defineConfig<TestOptions>({

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200'
          : process.env.STAGING === '1' ? 'http://localhost:42001'
          : 'http://localhost:4200',

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http:localhost:4200'
      }
    }
  ],
});
