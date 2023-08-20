import path from "path";

import { defineConfig } from "vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";

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
    server: {
      port: 9117,
      open: false, 
    },
  };
});
