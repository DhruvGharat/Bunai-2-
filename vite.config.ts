
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  base: './',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Core UI libraries
      'vaul': 'vaul',
      'sonner': 'sonner',
      'recharts': 'recharts',
      'react-resizable-panels': 'react-resizable-panels',
      'react-hook-form': 'react-hook-form',
      'react-day-picker': 'react-day-picker',
      'next-themes': 'next-themes',
      'lucide-react': 'lucide-react',
      'input-otp': 'input-otp',
      'embla-carousel-react': 'embla-carousel-react',
      'cmdk': 'cmdk',
      'class-variance-authority': 'class-variance-authority',
      // Radix UI components
      '@radix-ui/react-slot': '@radix-ui/react-slot',
      // Project source directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
});