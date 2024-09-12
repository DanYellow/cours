import path from "path";
import dotenv from "dotenv";

// Doc : https://swagger.io/docs/specification/data-models/data-types/
// Doc : https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md
import listArticles, { article } from "./swagger-schemas/article.js";
import listCommentsArticle, { commentArticle } from "./swagger-schemas/comment-article.js";
import listSAEs, { sae } from "./swagger-schemas/sae.js";
import listAuthors, { author } from "./swagger-schemas/author.js";

import swaggerJSDoc from "swagger-jsdoc";

const envFilePath = ".env.dev.local";

const envVars = dotenv.config({ path: envFilePath });
const port = envVars?.parsed?.PORT || 3000;

const options = {
    apis: [path.join(path.resolve(), "server/api-router/*.js")],
    swaggerDefinition: {
        openapi: "3.0.3",
        produces: ["application/json"],
        info: {
            title: "Swagger SAE 501",
            version: "2024.0.0",
            description: "List endpoints of SAE 501",
        },
        externalDocs: {
            description: "Back to homepage",
            url:  `http://localhost:${port}`
        },
        servers: [{ description: "Dev server", url: `http://localhost:${port}/api` }],
        components: {
            schemas: {
                Article: article,
                ListArticles: listArticles,
                CommentArticle: commentArticle,
                ListCommentsArticle: listCommentsArticle,
                ListSAEs: listSAEs,
                SAE: sae,
                ListAuthors: listAuthors,
                Author: author,
                Error: {
                    type: "object",
                    properties: {
                        errors: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                },
            },
        },
    },
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
