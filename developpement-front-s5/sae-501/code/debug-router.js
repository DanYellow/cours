console.log = function () {};
import { app } from "./server/bootstrap.js";
import blessed from "blessed";
import blessedContrib from "blessed-contrib";

const screen = blessed.screen({
    smartCSR: true,
    title: "Title",
});

const grid = new blessedContrib.grid({ rows: 12, cols: 12, screen: screen });

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
                METHOD: `${getColorForMethod(layer.method.toUpperCase())}`,
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

const output = listRoutes
    // .filter((item) => item.PATH.length > 0 && item.PATH.includes("/"))
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

export { output as listRoutes };

if (process.env.NODE_ENV === "development") {
    app.get("/debug", async (req, res) => {
    
        res.render("pages/debug-router.njk", {
            // list_articles: result.data,
        });
    });
}

const table = grid.set(0, 0, 12, 8, blessedContrib.table, {
    keys: true,
    fg: "white",
    selectedFg: "white",
    selectedBg: "blue",
    width: "60%",
    interactive: true,
    label: ` SAE 501 - Routes list (${output.length}) ▲ ▼ `,
    style: {
        border: {
            fg: "cyan",
            bold: true,
        },
    },
    columnSpacing: 0,
    columnWidth: [10, 110],
});

let currentRowIndex = 0;

table.rows.on("select item", (_, index) => {
    currentRowIndex = index;
});

table.rows.key("enter", () => {
    // console.log("currentRowIndex", output[currentRowIndex]);
});

table.focus();

screen.append(table);
table.setData({
    headers: Object.keys(output[0]),
    data: Object.values(output).map((item) => Object.values(item)),
});

const box = grid.set(0, 8, 4, 4, blessed.box, {
    content: `On the left, here's the list of all routes (${output.length}) with their method in the project. You can move the list using top (▲) and down (▼) arrows.\n
You can quit the menu by pressing {bold}"q"{/bold}, {bold}"escape"{/bold} or {bold}"ctrl+c"{/bold}.
    `,
    label: ` SAE-501 - Infos `,
    tags: true,
    style: {
        fg: "white",
        border: {
            fg: "yellow",
        },
    },
});

screen.key(["escape", "q", "C-c"], function (ch, key) {
    return process.exit(0);
});
screen.render();
