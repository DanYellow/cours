import { resolve } from "path";

import twig from "@vituum/vite-plugin-twig";
import vituum from "vituum";

export default () => {
  return {
    base: "./",
    // root: "src/",
    // publicDir: "../public/",
    plugins: [
      vituum(),
      twig({
        root: "./src",
      }),
      //   vituum({
      //     pages: {
      //       dir: "./pages",
      //     },
      //   }),
      //   twig({
      //     // root: "./pages",
      //     // data: "../data/**/*.json",
      //   }),
    ],
    build: {
      manifest: true,
      emptyOutDir: true,
      rollupOptions: {
        input: ["./*.twig"],
        output: {
          emptyOutDir: true,
          sourcemap: true,
        },
      },
    },
    server: {
      // Change port of the server
      port: 9117,
    },
  };
};
