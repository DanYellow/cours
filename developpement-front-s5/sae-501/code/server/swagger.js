import path from "path";

import listArticles, { article } from "./swagger-schemas/article.js"
import listCommentsArticle, { commentArticle } from "./swagger-schemas/comment-article.js"
import listSAEs, { sae } from "./swagger-schemas/sae.js"

import swaggerJSDoc from "swagger-jsdoc";

const options = {
    apis: [path.join(path.resolve(), "server/api-router/*.js")],
    swaggerDefinition: {
        openapi: "3.0.0",
        produces: ["application/json"],
        info: {
            title: "SAE 501",
            version: "1.0.0",
        },
        servers: [{ description: "Dev server", url: "/api" }],
        components: {
            schemas: {
                Article: article,
                ListArticles: listArticles,
                CommentArticle: commentArticle,
                ListCommentsArticle: listCommentsArticle,
                ListSAEs: listSAEs,
                SAE: sae,
                Error: {
                    type: "object",
                    properties: {
                        errors: {
                            type: "integer",
                        },
                    },
                }
            },
        },
    },
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
