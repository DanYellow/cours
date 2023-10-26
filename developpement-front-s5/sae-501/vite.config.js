import tailwindcss from "@vituum/vite-plugin-tailwindcss";
import path from "path";

const libName = "scodoc-filling-grades";
export default {
  base: "./",
  css: {
    // Displays the source of sass files in dev
    devSourcemap: true,
  },
  plugins: [tailwindcss()],
  build: {
    emptyOutDir: true,
    manifest: true,
    lib: {
      entry: path.resolve(__dirname, "src/scripts/main.frontend.js"),
      fileName: libName,
      name: "ScodocFillingGrades",
      formats: ["es"],
    },
    // rollupOptions: {
    //     input: {
    //         foo: path.resolve(__dirname, 'src/scripts/styles.js'),
    //         backend: path.resolve(__dirname, 'src/scripts/main.backend.js'),
    //     },
    //     // output: {
    //     //     preserveModules: false
    //     // }
    // },
  },
  server: {
    // Expose the server to the network allowing access from ip address
    host: true,
  },
};
