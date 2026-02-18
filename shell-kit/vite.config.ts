
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Vital: Alias '@' to the sdk folder so imports like '@/components/...' resolve to 'sdk/components/...'
      '@': path.resolve(__dirname, 'sdk'), 
    }
  },
  publicDir: 'public',
});
