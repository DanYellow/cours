import { app } from "./server/index.js";
import blessed from "blessed";
import blessedContrib from "blessed-contrib";

const screen = blessed.screen();

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
                METHOD: `${layer.method.toUpperCase()}`,
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

app._router.stack.forEach(print.bind(null, []));

const output = listRoutes.filter(
    (item) => item.PATH.length > 0 && item.PATH.includes("/")
);

// console.log(Object.values(output))
var table = blessedContrib.table({
    keys: true,
    fg: "white",
    selectedFg: "white",
    selectedBg: "blue",
    interactive: true,
    label: "SAE 501 - Liste des routes",
    border: { type: "line", fg: "cyan" },
    columnSpacing: 10, //in chars
    columnWidth: [10, 50] /*in chars*/,
});

table.focus();

screen.append(table);
table.setData({
    headers: Object.keys(output[0]),
    data: Object.values(output).map((item) => Object.values(item)),
});

screen.key(["escape", "q", "C-c"], function (ch, key) {
    return process.exit(0);
});
screen.render();

// console.table(listRoutes.filter((item) => item.PATH.length > 0 && item.PATH.includes("/")));
// process.exit();
