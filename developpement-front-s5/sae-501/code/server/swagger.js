import path from "path";

import swaggerJSDoc from "swagger-jsdoc";

const options = {
    apis: [path.join(path.resolve(), "server/api-router/*.js")],
    swaggerDefinition: {
        basePath: "/api",
        swagger: '2.0',
        produces: ["application/json"],
        info: {
            title: "SAE 501",
            version: "1.0.0",
        },
    },
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
 