const listRoutes = [];

const print = (path, layer) => {
    if (layer.route) {
        layer.route.stack.forEach(
            print.bind(null, path.concat(split(layer.route.path)))
        );
    } else if (layer.name === "router" && layer.handle.stack) {
        layer.handle.stack.forEach(
            print.bind(null, path.concat(split(layer.regexp)))
        );
    } else if (layer.method) {
        const url = path.concat(split(layer.regexp)).filter(Boolean).join("/");

        url.split(",").forEach((item, idx, array) => {
            let computedPath = item;
            if(array.length > 1 && idx > 0) {
                const prefix = path.find(el => el !== "");
                computedPath = prefix + computedPath;
            } 
            listRoutes.push({
                METHOD: layer.method.toUpperCase(),
                PATH: computedPath,
            });
        });
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

const generateListRoutes = (app) => {
    app._router.stack.forEach(print.bind(null, []));

    return (
        listRoutes
            .map((item) => {
                if (item.PATH[0] === "/") {
                    return item;
                }

                return {
                    ...item,
                    PATH: `/${item.PATH}`,
                };
            })
            .filter(
                (value, index, self) =>
                    index ===
                    self.findIndex(
                        (t) =>
                            t.METHOD === value.METHOD && t.PATH === value.PATH
                    )
            )
    );
};

export { generateListRoutes };
