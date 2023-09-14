import "./JsonViewer.css";
type Props = {
    data: any;
    root?: string;
    filter?: string;
    maxLevel?: number;
    columnAt?: number;
};
export default function ReactJsonViewer({ data, root, filter, maxLevel, columnAt, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
