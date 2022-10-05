


export default defineNuxtConfig({
  srcDir: "./",
  css: [
    '@/assets/css/main.css',
  ],

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
});

// // https://v3.nuxtjs.org/api/configuration/nuxt.config
// export default defineNuxtConfig({
// modules: [
//     '@nuxtjs/tailwindcss'
//   ]
// })
