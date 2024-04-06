import { app } from "./server/index.js";

const getColorForMethod = (method) => {
    switch (method.toLowerCase()) {
        case "get":
            return `\x1b[35m${method}\x1b[0m`;
        case "post":
            return `\x1b[33m${method}\x1b[0m`;
        case "put":
            return `\x1b[36m${method}\x1b[0m`;
        case "delete":
            return `\x1b[32m${method}\x1b[0m`;
        default:
            return `\x1b[37m${method}\x1b[0m`;
    }
};

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
        console.log(
            `${getColorForMethod(layer.method.toUpperCase())} /%s`,
            path.concat(split(layer.regexp)).filter(Boolean).join("/")
        );
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
        console.log(thing.toString().split(","))
        return match
            ? match[1].replace(/\\(.)/g, "$1").split("/")
            : "<complex:" + thing.toString() + ">";
    }
};

app._router.stack.forEach(print.bind(null, []));
process.exit();
