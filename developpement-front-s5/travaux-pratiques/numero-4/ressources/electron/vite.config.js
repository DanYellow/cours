import path from "path";

import { defineConfig } from "vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig(() => {
  return {
    plugins: [
      nodeResolve({
        moduleDirectories: [path.resolve(__dirname, "src"), "node_modules"],
        browser: true,
        preferBuiltins: false,
      }),
    ],
    build: {
      emptyOutDir: true,
      target: "esnext",
      outDir: "dist",
      watch: {
        buildDelay: 350,
        exclude: ["node_modules/**", "main.js", "vite.config.js"],
      },
      rollupOptions: {
        input: {
          // foo: "index.html",
          // nom du fichier compilé: nom du fichier original
          preload: "preload.js",
          renderer: "script.js",
        },
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
    },
    server: {
      port: 9117,
    },
  };
});
