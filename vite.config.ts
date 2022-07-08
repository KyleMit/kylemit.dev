import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist'
    },
    plugins: [
        monacoEditorPlugin({})
    ],
});
