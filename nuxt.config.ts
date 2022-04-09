import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
    meta: {
        title: 'The Coin Analyzer',
        link: [
            {
                rel: 'icon', type: 'image/png', href: './assets/icon.svg',
            },
        ],
    },
    buildModules: [
        "@pinia/nuxt",
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
    vite: {
        logLevel: "info",
        optimizeDeps: {
            include: [
                'vue', 'pinia'
            ]
        }
    },
  
});
