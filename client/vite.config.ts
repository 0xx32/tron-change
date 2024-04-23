import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            assets: path.resolve(__dirname, './src/assets'),
            api: path.resolve(__dirname, './src/api'),
            components: path.resolve(__dirname, './src/components'),
            '@types': path.resolve(__dirname, './src/@types'),
            hooks: path.resolve(__dirname, './src/hooks'),
            constants: path.resolve(__dirname, './src/constants'),
        },
    },
});
