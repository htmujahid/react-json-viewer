import JsonRenderer from "./JsonRenderer";
export default class JsonParser {
    jsonRenderer: JsonRenderer;
    root?: string;
    constructor();
    parseJSON(outputParent: any, value: any, maxLevel: number, columnAt: number, level: number, root?: string): void;
    parseObject(outputParent: any, value: any, maxLevel: number, columnAt: number, level: number): void;
    parseRoot(items: any, isArray: any, isMaxLevel: any, outputParent: any, isCollapse: any): void;
    parseChild(items: any, level: any, isArray: any, value: any, maxLevel: any, columnAt: any, outputParent: any): void;
    parseChildObject(item: any, isArray: any, key: string | number, maxLevel: number, columnAt: number, level: number, li: HTMLElement, ind: number): void;
    parseChildArray(item: any, isArray: boolean, key: string | number, maxLevel: number, columnAt: number, level: number, li: HTMLElement, ind: number): void;
    parseValue(outputParent: any, value: any): void;
}
