const listNamedRoutes = {};
const regex = /((:[A-z])\w+\??)/g;
const print = (path, layer) => {
    // if (layer.handle.name === "namedRoute") {
    //     const url = path.concat(split(layer.regexp)).filter(Boolean).join("/");

    //     listNamedRoutes[layer.handle()] = {
    //         url,
    //         params: Array.from(url.matchAll(regex))
    //             .map((item) => item[0])
    //             .map((item) => item.replace(":", "").replace("?", "")),
    //     };
    // }

    if (layer.route) {
        layer.route.stack.forEach(
            print.bind(null, path.concat(split(layer.route.path)))
        );
    } else if (layer.name === "router" && layer.handle.stack) {
        layer.handle.stack.forEach(
            print.bind(null, path.concat(split(layer.regexp)))
        );
    } else if (layer.handle.name === "namedRoute") {
        const url = path.concat(split(layer.regexp)).filter(Boolean).join("/");

        listNamedRoutes[layer.handle()] = {
            url,
            params: Array.from(url.matchAll(regex))
                .map((item) => item[0])
                .map((item) => item.replace(":", "").replace("?", "")),
        };
    }
};

const split = (thing) => {
    if (typeof thing === "string") {
        return thing.split("/");
    } else if (thing.fast_slash) {
        return "";
    } else {
        const match = thing
            .toString()
            .replace("\\/?", "")
            .replace("(?=\\/|$)", "$")
            .match(
                /^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//
            );

        return match
            ? match[1].replace(/\\(.)/g, "$1").split("/")
            : thing.toString().substring(1);
    }
};

const generateNamedRoutes = (app) => {
    if (!app) {
        throw new Error("app object is missing");
    }

    app._router.stack.forEach(print.bind(null, []));

    return listNamedRoutes;
};

export { generateNamedRoutes };
