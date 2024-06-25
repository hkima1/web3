import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  commonjsOptions: {
    esmExternals: true 
 },
 build: {
  rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
  },
},
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

});
