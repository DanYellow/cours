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

        url.split(",").forEach((item) => {
            listRoutes.push({
                METHOD: layer.method.toUpperCase(),
                PATH: item,
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


// table.setData({
//     headers: Object.keys(output[0]),
//     data: Object.values(output).map((item) => Object.values(item)),
// });

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
