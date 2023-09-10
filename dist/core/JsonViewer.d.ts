export declare class JSONViewerFactory {
    createJSONViewer({ json, root, filter, maxLevel, columnAt, }: {
        json: any;
        root: string;
        filter: string;
        maxLevel: number;
        columnAt: number;
    }): JsonViewer;
}
export default class JsonViewer {
    root: string;
    jsonContainer: HTMLElement;
    json: any;
    maxLevel: number;
    columnAt: number;
    constructor();
    init(): void;
    setJSON(json: any): void;
    setRoot(root: string): void;
    setMaxLevel(maxLvl: number): void;
    setColumnAt(colAt: number): void;
    getJSON(): any;
    getRoot(): string;
    getMaxLevel(): number;
    getColumnAt(): number;
    getJSONContainer(): HTMLElement;
}
