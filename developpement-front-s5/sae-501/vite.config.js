import twig from "@vituum/vite-plugin-twig";
import vituum from "vituum";
import tailwindcss from '@vituum/vite-plugin-tailwindcss'

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
    twig({
      // Where the twig files are located
      root: "./src",
    }),
    tailwindcss(),
  ],
  server: {
    // Expose the server to the network allowing access from ip address
    host: true,
  },
};
