import path from "path";

import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [],
    root: path.resolve(__dirname, 'src'),
    server: {
      port: 7777,
      open: false,
      headers: {
        "Content-Security-Policy-Report-Only": "default-src 'self' https://www.youtube.com/; report-uri mon.url;",
        // OU (plus moderne) - Ne fonctionne qu'en HTTPS !
        // "Content-Security-Policy-Report-Only": "default-src 'self' https://www.youtube.com/; report-to endpoint"
        // "Report-To": '{"group":"endpoint","max_age":31536000,"endpoints":[{"url":" mon.url"}]}',
      }
    },
  };
});
