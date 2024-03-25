import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

const PROXY_TARGET = "http://t.weather.itboy.net/"; // 后端服务地址

export default defineConfig({
  base: "/v3s-admin/",
  plugins: [
    vue(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: "test.html", //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: PROXY_TARGET,
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on("proxyRes", (proxyRes, req, res) => {
            proxyRes.headers["x-proxy-url"] = PROXY_TARGET + req.originalUrl;
          });
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ["echarts"],
        },
      },
    },
  },
});
