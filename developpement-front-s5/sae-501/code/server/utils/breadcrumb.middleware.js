export default (req, res, next) => {
    const fullUrl = req.originalUrl;
    const arrayURL = fullUrl.split("/").filter(Boolean);
    let breadcrumb = [];

    arrayURL.forEach((_, idx) => {
        const urlPart = [arrayURL[idx]];

        if (idx === 0) {
            breadcrumb.push(urlPart);
        } else {
            breadcrumb.push([...breadcrumb[idx - 1].filter(Boolean), ...urlPart]);
        }
    });

    breadcrumb = breadcrumb.map((item) => item.flat().join("/"));

    req.app.locals.breadcrumb = breadcrumb;

    next();
};
