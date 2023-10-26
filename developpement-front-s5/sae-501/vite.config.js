import tailwindcss from "@vituum/vite-plugin-tailwindcss";
import path from "path";
import { build, defineConfig } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createBuilds = () => {
  const imports = [
    {
      name: "frontend",
      path: path.resolve(__dirname, "src/scripts/main.frontend.js"),
    },
    {
      name: "backend",
      path: path.resolve(__dirname, "src/scripts/main.backend.js"),
    },
  ];

  imports.forEach(async ({ name, path }, idx) => {
    const manifestName = `manifest.${name}.json`;

    await build({
      configFile: false,
      build: {
        emptyOutDir: true,
        manifest: manifestName,
        lib: {
          entry: path,
          fileName: name,
          formats: ["es"],
        },
        rollupOptions: {
          output: {
            assetFileNames: `${name}.[name].[ext]`,
          },
        },
      },
      plugins: [tailwindcss()],
    });
  });
};

export default defineConfig(({ command }) => {
  return {
    base: "./",
    css: {
      // Displays the source of sass files in dev
      devSourcemap: true,
    },
    lib: {

    },
    plugins: [
      tailwindcss(),
      {
        name: "create-builds",
        async buildStart() {
          if (command === "build") {
            createBuilds()
          }
        },
      },
    ],
    server: {
      // Expose the server to the network allowing access from ip address
      host: true,
    },
  };
});
