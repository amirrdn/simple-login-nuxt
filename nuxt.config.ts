// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from 'dotenv'

config()

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/global.css'
  ],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
  runtimeConfig: {
    sessionSecret: process.env.NUXT_SESSION_SECRET,
    public: {
      nodeEnv: process.env.NODE_ENV || 'development',
    },
  },
  app: {
    head: {
      title: 'Simple Login',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Simple Login with Nuxt 3' },
      ],
    },
  },
  typescript: {
    strict: true,
  },
  nitro: {
    compatibilityDate: '2025-05-07',
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Origin': '*',
        },
      },
    },
  },
  pages: true,
  srcDir: 'src',
  rootDir: '.',
})
