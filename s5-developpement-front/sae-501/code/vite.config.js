export default {
    base: "./",
    css: {
        devSourcemap: true,
    },
    appType: "custom",
    server: {
        // Expose the server to the network allowing access from ip address
        host: true,
        hmr: true,
        middlewareMode: true,
        fs: {
            strict: true,
            allow: [
                // Only these folders can be accessed by the dev server
                'public',
                'src',
                'node_modules',
            ]
        }
    },
};
