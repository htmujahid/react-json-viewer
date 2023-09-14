"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("react-dom/client");
var src_1 = require("../src");
var container = document.getElementById("root");
var root = (0, client_1.createRoot)(container);
root.render((0, jsx_runtime_1.jsx)(src_1.default, { data: {
        array: [1, 2, 3],
        boolean: true,
        null: null,
        number: 123,
        object: {
            a: "b",
            c: "d",
            e: "f",
        },
        string: "Hello World",
    } }));
