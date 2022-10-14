export default defineNuxtConfig({
  srcDir: "./",
  css: [
    '@/assets/css/main.css',
  ],
  meta: {
    script: [
      { src: '/polyfills.js' },
    ],
  },
  router: {
    middleware: ["auth"]
  },

  buildModules: [
    '@pinia/nuxt',

  ],

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  // alias: {
  // 'aws-amplify': 'aws-amplify/lib/', 
  // '@aws-amplify/core': '@aws-amplify/core/lib',
  // '@aws-amplify/auth': '@aws-amplify/auth/lib',
  // }
});

// // https://v3.nuxtjs.org/api/configuration/nuxt.config
// export default defineNuxtConfig({
// modules: [
//     '@nuxtjs/tailwindcss'
//   ]
// })
