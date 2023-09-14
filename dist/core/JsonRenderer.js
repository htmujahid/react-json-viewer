"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("../utils/url");
var JsonRenderer = /** @class */ (function () {
    function JsonRenderer() {
    }
    JsonRenderer.prototype.createSimpleViewOf = function (value) {
        var spanEl = document.createElement("span");
        var type = typeof value;
        var asText = "" + value;
        if ((0, url_1.isUrl)(value)) {
            var a = document.createElement("a");
            a.innerText = '"' + value + '"';
            a.href = "https://www.google.com";
            a.setAttribute("target", "_blank");
            spanEl.appendChild(a);
        }
        else {
            if (type === "string") {
                asText = '"' + value + '"';
            }
            else if (value === null) {
                type = "null";
            }
            spanEl.className = "type-" + type;
            spanEl.textContent = asText;
        }
        return spanEl;
    };
    JsonRenderer.prototype.createItemsCount = function (count) {
        var itemsCount = document.createElement("span");
        itemsCount.className = "items-ph hide";
        itemsCount.innerHTML = this.getItemsTitle(count);
        return itemsCount;
    };
    JsonRenderer.prototype.createLink = function (title) {
        var linkElement = document.createElement("a");
        linkElement.classList.add("list-link");
        linkElement.href = "javascript:void(0)";
        linkElement.innerHTML = title || "";
        return linkElement;
    };
    JsonRenderer.prototype.getItemsTitle = function (count) {
        var itemsTxt = count > 1 || count === 0 ? "items" : "item";
        return count + " " + itemsTxt;
    };
    return JsonRenderer;
}());
exports.default = JsonRenderer;
//# sourceMappingURL=JsonRenderer.js.map