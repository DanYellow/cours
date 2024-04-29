import ip from "ip";
import dotenv from "dotenv";

import { app } from "./bootstrap.js";

let envFilePath = ".env.prod.local";
if (process.env.NODE_ENV === "development") {
    envFilePath = ".env.dev.local";
}
const envVars = dotenv.config({ path: envFilePath });
const port = envVars?.parsed?.PORT || 3000;
const hostip = ip.address();

const listDomains = [hostip];

app.listen(port, listDomains, () => {
    console.log("---------------------------");
    console.log("Express server running at :");
    ["localhost", "127.0.0.1", ...listDomains]
        .filter(Boolean)
        .forEach((item) => {
            console.log(`• \x1b[33mhttp://${item}:${port}/\x1b[0m`);
        });
    if (process.env.NODE_ENV === "development") {
        console.log("\nSwagger running at :");
        ["localhost", "127.0.0.1", ...listDomains]
            .filter(Boolean)
            .forEach((item) => {
                console.log(`• \x1b[35mhttp://${item}:${port}/api-docs\x1b[0m`);
                console.log(`• \x1b[35mhttp://${item}:${port}/swagger\x1b[0m`);
            });
    }
    console.log("---------------------------");
});
