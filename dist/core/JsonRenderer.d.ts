export default class JsonRenderer {
    createSimpleViewOf(value: any): HTMLSpanElement;
    createItemsCount(count: number): HTMLSpanElement;
    createLink(title: string): HTMLAnchorElement;
    getItemsTitle(count: number): string;
}
