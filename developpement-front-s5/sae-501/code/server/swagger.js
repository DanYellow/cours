import path from "path";

import swaggerJSDoc from "swagger-jsdoc";

const options = {
    apis: [path.join(path.resolve(), "server/api-router/*.js")],
    swaggerDefinition: {
        openapi: '3.0.0',
        produces: ["application/json"],
        info: {
            title: "SAE 501",
            version: "1.0.0",
        },
        servers: [
            { name: "dev", url: "/api" },
        ]
    },
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
 