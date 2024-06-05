import _ from "lodash";

const listRoutes = [];
const listNamedRoutes = {};
const regexRouteParams = /((:[A-z])\w+\??)/g;
const regexOptionalURLFileExt = /(\(\.([A-z])*\)\??)/g

const print = (path, layer) => {
    if (layer.route) {
        layer.route.stack.forEach(
            print.bind(null, path.concat(split(layer.route.path)))
        );
    } else if (layer.name === "router" && layer.handle.stack) {
        layer.handle.stack.forEach(
            print.bind(null, path.concat(split(layer.regexp)))
        );
    } else if (layer.method || path.includes("*")) {
        const url = path.concat(split(layer.regexp)).filter(Boolean).join("/");

        url.split(",").forEach((item, idx, array) => {
            let computedPath = item;
            if (array.length > 1 && idx > 0) {
                const prefix = path.find((el) => el !== "");
                computedPath = prefix + computedPath;
            }

            const routeName = () => {
                if (layer.handle.name === "namedRoute") {
                    listNamedRoutes[layer.handle()] = [
                        ...listNamedRoutes?.[layer.handle()] || [],
                        {
                            url: computedPath.replace(regexOptionalURLFileExt, ""),
                            params: Array.from(computedPath.matchAll(regexRouteParams))
                                .map((_item) => _item[0])
                                .map((_item) =>
                                    _item.replace(":", "").replace("?", "")
                                ),
                        }
                    ];

                    listNamedRoutes[layer.handle()] = _.uniqBy(listNamedRoutes[layer.handle()], "url")
                    
                    return layer.handle();
                }

                return "";
            };

            listRoutes.push({
                METHOD: path.includes("*") ? "ANY" : layer.method.toUpperCase(),
                PATH: computedPath,
                NAME: routeName(),
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
    if (!app) {
        throw new Error("app object is missing");
    }
    app._router.stack.forEach(print.bind(null, []));

    return listRoutes
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
                    (t) => t.METHOD === value.METHOD && t.PATH === value.PATH
                )
        );
};

const generateNamedRoutes = (app) => {
    if (!app) {
        throw new Error("app object is missing");
    }
    app._router.stack.forEach(print.bind(null, []));

    return listNamedRoutes;
};

const generateUrl = (name, params) => {
    if (!listNamedRoutes[name]) {
        throw new Error(
            `Route named "${name}" is unknown. Please verify your routes.`
        );
    }

    let finalURL = "";
    const nbParamsInCommon = []

    listNamedRoutes[name].forEach(({params: urlParams }) => {
        nbParamsInCommon.push(_.intersection(Object.keys(params), urlParams).length)
    });
    const nbMaxParamsInCommon = Math.max(...nbParamsInCommon);
    const indexMaxParamsInComment = nbParamsInCommon.findIndex((item) => item === nbMaxParamsInCommon);

    if(nbMaxParamsInCommon === 0) {
        // As default, we take the route with no params
        const { url, params: urlParams } = listNamedRoutes[name].find((item) => item.params.length === 0)
        finalURL = url

        const listQSParams = new URLSearchParams();
        _.difference(Object.keys(params), urlParams).forEach((item) => {
            listQSParams.append(item, params[item])
        })

        if(listQSParams.toString()) {
            finalURL += `?${listQSParams.toString()}`;
        }
    } else {
        const { url, params: urlParams } = listNamedRoutes[name][indexMaxParamsInComment]
        urlParams.forEach((param) => {
            const re = new RegExp(String.raw`:[${param}]+(\([\[\]\w\-\{\}]+\))?\??`, "g");
            finalURL = url.replace(re, params[param]);
        })
        const listQSParams = new URLSearchParams();
        _.difference(Object.keys(params), urlParams).forEach((item) => {
            listQSParams.append(item, params[item])
        })

        if(listQSParams.toString()) {
            finalURL += `?${listQSParams.toString()}`;
        }
    }

    return finalURL;
}

export { generateListRoutes, generateNamedRoutes, generateUrl };
