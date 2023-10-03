import twig from "@vituum/vite-plugin-twig";
import vituum from "vituum";

export default {
  plugins: [
    vituum(),
    twig({
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
