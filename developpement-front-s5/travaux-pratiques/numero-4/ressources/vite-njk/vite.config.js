import nunjucks from "@vituum/vite-plugin-nunjucks";
import vituum from "vituum";

export default {
  base: "./",
  css: {
    // Displays the source of sass files in dev
    devSourcemap: true,
  },
  plugins: [
    vituum({
      pages: {
        // Won't work on Windows, need to override base key instead
        normalizeBasePath: true
      }
    }),
    nunjucks({
      // Where the twig files are located
      root: "./src",
    }),
  ],
  server: {
    // Port of the server
    port: 9117,
    // Expose the server to the network allowing access from ip address
    host: true,
  },
};
