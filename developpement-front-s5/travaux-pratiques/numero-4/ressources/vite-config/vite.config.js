import twig from "@vituum/vite-plugin-twig";
import vituum from "vituum";

export default () => {
  return {
    plugins: [
      vituum(),
      twig({
        // Where the twig files are located
        root: "./src",
      }),
    ],
    build: {
      manifest: true,
      rollupOptions: {
        input: ["./src/pages/*.twig"],
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
