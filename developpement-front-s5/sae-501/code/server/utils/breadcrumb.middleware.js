export default (req, res, next) => {
    const fullUrl = req.originalUrl;
    let breadcrumb = [];

    fullUrl
        .split("/")
        .filter(Boolean)
        .forEach((item, idx) => {
            const payload = [item];
            if (idx === 0) {
                breadcrumb.push(payload);
            } else {
                breadcrumb.push([...breadcrumb[idx - 1], ...payload].join("/"));
            }
        });

    breadcrumb = breadcrumb.flat();

    req.app.locals.breadcrumb = breadcrumb.flat();

    next();
};
