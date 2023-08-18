import path from "path";
import { spawn } from "child_process";

import electron from "electron";
import { defineConfig } from "vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";

spawn(electron, ["."]);

export default defineConfig(() => {
  return {
    plugins: [
      nodeResolve({
        moduleDirectories: [
          path.resolve(__dirname),
          path.resolve(__dirname, "src"),
          "node_modules",
        ],
        browser: false,
        preferBuiltins: false,
      }),
    ],
    root: path.resolve(__dirname, 'src'),
    publicDir: false,
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
      open: false, 
    },
  };
});
