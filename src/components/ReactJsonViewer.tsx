/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import "./JsonViewer.css";
import { JSONViewerFactory } from "../core/JsonViewer";

type Props = {
    data: any;
    root?: string;
    filter?: string;
    maxLevel?: number;
    columnAt?: number;
};

export default function ReactJsonViewer({
    data,
    root,
    filter,
    maxLevel,
    columnAt,
}: Props) {
    const jsonRef = useRef(null) as any;

    useEffect(() => {
        if (!document) {
            return;
        }

        const jsonViewerFactory = new JSONViewerFactory();

        const jsonViewer = jsonViewerFactory.createJSONViewer({
            json: data,
            root: root ?? "",
            filter: filter ?? "",
            maxLevel: maxLevel ?? -1,
            columnAt: columnAt ?? -1,
        });

        jsonRef.current.appendChild(jsonViewer.getJSONContainer());
    }, []);

    return <div ref={jsonRef} />;
}
