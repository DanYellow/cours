import { loadEnv } from "vite";
import twig from "@vituum/vite-plugin-twig";
import vituum from "vituum";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
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
    },
  };
};
