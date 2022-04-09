import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
    meta: {
        title: 'The Coin Analyzer',
        link: [
            {
                rel: 'icon', type: 'image/png', href: 'https://raw.githubusercontent.com/atif0075/the-coin-analyzer/master/assets/icon.svg',
            },
        ],
    },
  
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
                'vue'
            ]
        }
    },

});
