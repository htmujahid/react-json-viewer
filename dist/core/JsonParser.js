"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("../utils/url");
var JsonRenderer_1 = require("./JsonRenderer");
var JsonParser = /** @class */ (function () {
    function JsonParser() {
        this.jsonRenderer = new JsonRenderer_1.default();
    }
    JsonParser.prototype.parseJSON = function (outputParent, value, maxLevel, columnAt, level, root) {
        if (level === 0) {
            this.root = root;
        }
        if (typeof value === "object" && value !== null) {
            this.parseObject(outputParent, value, maxLevel, columnAt, level);
        }
        else {
            this.parseValue(outputParent, value);
        }
    };
    JsonParser.prototype.parseObject = function (outputParent, value, maxLevel, columnAt, level) {
        var isMaxLevel = maxLevel >= 0 && level >= maxLevel;
        var isCollapse = columnAt >= 0 && level >= columnAt;
        var isArray = Array.isArray(value);
        var items = isArray ? value : Object.keys(value);
        if (level === 0) {
            this.parseRoot(items, isArray, isMaxLevel, outputParent, isCollapse);
        }
        if (items.length && !isMaxLevel) {
            this.parseChild(items, level, isArray, value, maxLevel, columnAt, outputParent);
        }
        else if (items.length && isMaxLevel) {
            var itemsCount = this.jsonRenderer.createItemsCount(items.length);
            itemsCount.classList.remove("hide");
            outputParent.appendChild(itemsCount);
        }
        if (level === 0) {
            if (!items.length) {
                var itemsCount = this.jsonRenderer.createItemsCount(0);
                itemsCount.classList.remove("hide");
                outputParent.appendChild(itemsCount);
            }
            outputParent.appendChild(document.createTextNode(isArray ? "]" : "}"));
            if (isCollapse) {
                outputParent.querySelector("ul").classList.add("hide");
            }
        }
    };
    JsonParser.prototype.parseRoot = function (items, isArray, isMaxLevel, outputParent, isCollapse) {
        var rootCount = this.jsonRenderer.createItemsCount(items.length);
        var rootSymbol = this.root === "" ? "" : "".concat(this.root, ": ");
        var rootLink = this.jsonRenderer.createLink(isArray ? "".concat(rootSymbol, "[") : "".concat(rootSymbol, "{"));
        if (items.length) {
            rootLink.addEventListener("click", function () {
                if (isMaxLevel)
                    return;
                rootLink.classList.toggle("collapsed");
                rootCount.classList.toggle("hide");
                outputParent.querySelector("ul").classList.toggle("hide");
            });
            if (isCollapse) {
                rootLink.classList.add("collapsed");
                rootCount.classList.remove("hide");
            }
        }
        else {
            rootLink.classList.add("empty");
        }
        rootLink.appendChild(rootCount);
        outputParent.appendChild(rootLink);
    };
    JsonParser.prototype.parseChild = function (items, level, isArray, value, maxLevel, columnAt, outputParent) {
        var _this = this;
        var len = items.length - 1;
        var ul = document.createElement("ul");
        ul.setAttribute("data-level", level);
        ul.classList.add("type-" + (isArray ? "array" : "object"));
        items.forEach(function (key, ind) {
            var item = isArray ? key : value[key];
            var li = document.createElement("li");
            if (typeof item === "object") {
                if (!Array.isArray(item)) {
                    _this.parseChildObject(item, isArray, key, maxLevel, columnAt, level, li, ind);
                }
                else {
                    _this.parseChildArray(item, isArray, key, maxLevel, columnAt, level, li, ind);
                }
            }
            else {
                if (!isArray) {
                    li.appendChild(document.createTextNode(key + ": "));
                }
                else {
                    li.appendChild(document.createTextNode(ind + ": "));
                }
                _this.parseJSON(li, item, maxLevel, columnAt, level + 1);
            }
            if (ind < len) {
                if (typeof item === "object") {
                    if (!Array.isArray(item)) {
                        li.appendChild(document.createTextNode(","));
                    }
                    else {
                        li.appendChild(document.createTextNode(","));
                    }
                }
                else {
                    li.appendChild(document.createTextNode(","));
                }
            }
            ul.appendChild(li);
        }, this);
        outputParent.appendChild(ul);
    };
    JsonParser.prototype.parseChildObject = function (item, isArray, key, maxLevel, columnAt, level, li, ind) {
        if (!item || item instanceof Date) {
            li.appendChild(document.createTextNode(isArray ? "" : key + ": "));
            li.appendChild(this.jsonRenderer.createSimpleViewOf(item ? item : null));
        }
        else {
            var itemIsArray = Array.isArray(item);
            var itemLen = itemIsArray ? item.length : Object.keys(item).length;
            if (!itemLen) {
                li.appendChild(document.createTextNode((typeof key === "string" ? key : ind) +
                    ": " +
                    (itemIsArray ? "[]" : "{}")));
            }
            else {
                var itemTitle = (typeof key === "string" ? key + ": " : ind + ": ") +
                    (itemIsArray ? "[" : "{");
                var itemLink_1 = this.jsonRenderer.createLink(itemTitle);
                var itemsCount_1 = this.jsonRenderer.createItemsCount(itemLen);
                if (maxLevel >= 0 && level + 1 >= maxLevel) {
                    li.appendChild(document.createTextNode(itemTitle));
                }
                else {
                    itemLink_1.appendChild(itemsCount_1);
                    li.appendChild(itemLink_1);
                }
                this.parseJSON(li, item, maxLevel, columnAt, level + 1);
                li.appendChild(document.createTextNode(itemIsArray ? "]" : "}"));
                var list_1 = li.querySelector("ul");
                var itemLinkCb = function () {
                    itemLink_1.classList.toggle("collapsed");
                    itemsCount_1.classList.toggle("hide");
                    list_1.classList.toggle("hide");
                };
                itemLink_1.addEventListener("click", itemLinkCb);
                if (columnAt >= 0 && level + 1 >= columnAt) {
                    itemLinkCb();
                }
            }
        }
    };
    JsonParser.prototype.parseChildArray = function (item, isArray, key, maxLevel, columnAt, level, li, ind) {
        var itemIsArray = Array.isArray(item);
        var itemLen = itemIsArray ? item.length : Object.keys(item).length;
        if (!itemLen) {
            li.appendChild(document.createTextNode((typeof key === "string" ? key : ind) +
                ": " +
                (itemIsArray ? "[]" : "{}")));
        }
        else {
            var itemTitle = (typeof key === "string" ? key + ": " : ind + ": ") +
                (itemIsArray ? "[" : "{");
            var itemLink_2 = this.jsonRenderer.createLink(itemTitle);
            var itemsCount_2 = this.jsonRenderer.createItemsCount(itemLen);
            if (maxLevel >= 0 && level + 1 >= maxLevel) {
                li.appendChild(document.createTextNode(itemTitle));
            }
            else {
                itemLink_2.appendChild(itemsCount_2);
                li.appendChild(itemLink_2);
            }
            this.parseJSON(li, item, maxLevel, columnAt, level + 1);
            li.appendChild(document.createTextNode(itemIsArray ? "]" : "}"));
            var list_2 = li.querySelector("ul");
            var itemLinkCb = function () {
                itemLink_2.classList.toggle("collapsed");
                itemsCount_2.classList.toggle("hide");
                list_2.classList.toggle("hide");
            };
            itemLink_2.addEventListener("click", itemLinkCb);
            if (columnAt >= 0 && level + 1 >= columnAt) {
                itemLinkCb();
            }
        }
    };
    JsonParser.prototype.parseValue = function (outputParent, value) {
        var spanEl = document.createElement("span");
        var type = typeof value;
        var asText = "" + value;
        if ((0, url_1.isUrl)(value)) {
            var a = document.createElement("a");
            a.innerText = '"' + value + '"';
            a.href = value;
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
        outputParent.appendChild(spanEl);
    };
    return JsonParser;
}());
exports.default = JsonParser;
//# sourceMappingURL=JsonParser.js.map