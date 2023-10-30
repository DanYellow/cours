import path from "path";

import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SAE 501",
            version: "1.0.0",
        },
        servers: ["http://localhost:3000"],
    },
    apis: [path.join(path.resolve(), "server/api-router/*.js")],
    swaggerDefinition: {
        basePath: "/api",
        produces: ["application/json"],
    },
    servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
 