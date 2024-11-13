import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "https://ct449-project-2.onrender.com",
        changeOrigin: true,
      },
      "/admin": {
        target: "https://ct449-project-2.onrender.com",
        changeOrigin: true,
      },
      // "/admin/users": {
      //   target: "https://ct449-project-2.onrender.com",
      //   changeOrigin: true,
      // },
      // "/admin-products": {
      //   target: "https://ct449-project-2.onrender.com",
      //   changeOrigin: true,
      // },
      "/admin-products": {
        target: "https://ct449-project-2.onrender.com",
        changeOrigin: true,
      },
      "/user": {
        target: "https://ct449-project-2.onrender.com",
        changeOrigin: true,
      },
      "/user/product": {
        target: "https://ct449-project-2.onrender.com",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
