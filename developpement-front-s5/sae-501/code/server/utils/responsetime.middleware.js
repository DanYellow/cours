import onHeaders from "on-headers";

export default (req, res, next) => {
    if (process.env.NODE_ENV !== "development") {
        return next();
    }

    const start = new Date();
    if (res._responseTime) return next();
    res._responseTime = true;

    onHeaders(res, () => {
        const duration = new Date() - start;
        res.set("X-Response-Time", `${duration}ms`);
    });

    next();
};
