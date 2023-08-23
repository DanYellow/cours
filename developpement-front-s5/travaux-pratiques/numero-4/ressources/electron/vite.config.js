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
      port: 7777,
      open: false,
      headers: {
        "Content-Security-Policy-Report-Only": "default-src 'self' https://www.youtube.com/; report-uri http://localhost:8000/csp-report.php;",
        // OU (plus moderne) - Ne fonctionne qu'en HTTPS !
        // "Content-Security-Policy-Report-Only": "default-src 'self' https://www.youtube.com/; report-to endpoint"
        // "Reporting-Endpoints": "endpoint="https://localhost:8000/csp-report.php",
      }
    },
  };
});
