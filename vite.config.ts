import { loadEnv } from "vite";
import type { ConfigEnv, UserConfig } from "vite";
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from "vite-plugin-html";
import { wrapperEnv } from "./build/utils";
import { createProxy } from "./build/proxy";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const { VITE_PORT, VITE_APP_TITLE, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = wrapperEnv(env);

  const isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      https: false,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      cssTarget: 'chrome80',
      outDir: 'dist',
      chunkSizeWarningLimit: 2000
    },
    plugins: [
      react(),
      createHtmlPlugin({
        minify: isBuild,
        inject: {
          data: {
            title: VITE_APP_TITLE
          }
        }
      }),
    ]
  };
};
