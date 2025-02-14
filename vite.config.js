import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";
import process from 'node:process';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = `${env.VITE_BACKEND_URL ?? 'http://localhost:5174'}`;
  const PORT = `${env.VITE_PORT ?? '5174'}`;


  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },
        port: PORT,
      },
    },
  };
});