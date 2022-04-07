import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
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
    }
});
