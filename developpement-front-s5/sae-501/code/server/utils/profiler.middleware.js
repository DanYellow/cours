import { getNameForRoute } from "../../generate-list-routes.js";

export default (req, res, next) => {
    if (
        process.env.NODE_ENV !== "development"
        || req.originalUrl.includes("src")
        || req.originalUrl.includes("@vite")
        || req.originalUrl.includes("node_modules")
        || req.originalUrl.includes("database")
        || req.originalUrl.includes("styles")
        || req.originalUrl.includes("api")
        || req.originalUrl.includes("images")
        || req.originalUrl.includes("fonts")
    ) {
        return next();
    }

    const routeData = getNameForRoute(res.app, req.originalUrl);

    req.app.locals.profiler = {
        statusCode: res.statusCode,
        current_route: routeData.NAME,
        query_string: routeData.QUERY_STRING,
        eslint_report: req.app.locals.eslint_report,
    };

    next();
};
