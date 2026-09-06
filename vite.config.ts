import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      tailwindcss(),

      ...(env.ANALYZE === 'true'
        ? [
            visualizer({
              filename: 'dist/stats.html',
              open: false,
              gzipSize: true,
            }),
          ]
        : []),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: env.VITE_APP_PORT ? parseInt(env.VITE_APP_PORT, 10) : 5173,
      strictPort: true,
    },
  };
});
