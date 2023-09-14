import React from "react"
import { createRoot } from "react-dom/client";
import ReactJsonViewer from "../src";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
    <ReactJsonViewer
        data={{
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
        }}
    />
);
