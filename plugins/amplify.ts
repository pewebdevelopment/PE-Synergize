// plugins/amplify.ts
import { defineNuxtPlugin } from '#app';

import awsConfig from '../aws-exports.js';
import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';

export default defineNuxtPlugin(nuxtApp => {
  Amplify.configure(awsConfig);

  return {
    provide: {
      auth: Auth,
    },
  };
});