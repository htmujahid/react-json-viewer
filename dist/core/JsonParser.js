"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _url = require("../utils/url");
var _JsonRenderer = _interopRequireDefault(require("./JsonRenderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var JsonParser = /*#__PURE__*/function () {
  function JsonParser() {
    _classCallCheck(this, JsonParser);
    this.jsonRenderer = new _JsonRenderer["default"]();
  }
  _createClass(JsonParser, [{
    key: "parseJSON",
    value: function parseJSON(outputParent, value, maxLevel, columnAt, level, root) {
      if (level === 0) {
        this.root = root;
      }
      if (_typeof(value) === "object" && value !== null) {
        this.parseObject(outputParent, value, maxLevel, columnAt, level);
      } else {
        this.parseValue(outputParent, value);
      }
    }
  }, {
    key: "parseObject",
    value: function parseObject(outputParent, value, maxLevel, columnAt, level) {
      var isMaxLevel = maxLevel >= 0 && level >= maxLevel;
      var isCollapse = columnAt >= 0 && level >= columnAt;
      var isArray = Array.isArray(value);
      var items = isArray ? value : Object.keys(value);
      if (level === 0) {
        this.parseRoot(items, isArray, isMaxLevel, outputParent, isCollapse);
      }
      if (items.length && !isMaxLevel) {
        this.parseChild(items, level, isArray, value, maxLevel, columnAt, outputParent);
      } else if (items.length && isMaxLevel) {
        var itemsCount = this.jsonRenderer.createItemsCount(items.length);
        itemsCount.classList.remove("hide");
        outputParent.appendChild(itemsCount);
      }
      if (level === 0) {
        if (!items.length) {
          var _itemsCount = this.jsonRenderer.createItemsCount(0);
          _itemsCount.classList.remove("hide");
          outputParent.appendChild(_itemsCount);
        }
        outputParent.appendChild(document.createTextNode(isArray ? "]" : "}"));
        if (isCollapse) {
          outputParent.querySelector("ul").classList.add("hide");
        }
      }
    }
  }, {
    key: "parseRoot",
    value: function parseRoot(items, isArray, isMaxLevel, outputParent, isCollapse) {
      var rootCount = this.jsonRenderer.createItemsCount(items.length);
      var rootSymbol = this.root === "" ? "" : "".concat(this.root, ": ");
      var rootLink = this.jsonRenderer.createLink(isArray ? "".concat(rootSymbol, "[") : "".concat(rootSymbol, "{"));
      if (items.length) {
        rootLink.addEventListener("click", function () {
          if (isMaxLevel) return;
          rootLink.classList.toggle("collapsed");
          rootCount.classList.toggle("hide");
          outputParent.querySelector("ul").classList.toggle("hide");
        });
        if (isCollapse) {
          rootLink.classList.add("collapsed");
          rootCount.classList.remove("hide");
        }
      } else {
        rootLink.classList.add("empty");
      }
      rootLink.appendChild(rootCount);
      outputParent.appendChild(rootLink);
    }
  }, {
    key: "parseChild",
    value: function parseChild(items, level, isArray, value, maxLevel, columnAt, outputParent) {
      var _this = this;
      var len = items.length - 1;
      var ul = document.createElement("ul");
      ul.setAttribute("data-level", level);
      ul.classList.add("type-" + (isArray ? "array" : "object"));
      items.forEach(function (key, ind) {
        var item = isArray ? key : value[key];
        var li = document.createElement("li");
        if (_typeof(item) === "object") {
          if (!Array.isArray(item)) {
            _this.parseChildObject(item, isArray, key, maxLevel, columnAt, level, li, ind);
          } else {
            _this.parseChildArray(item, isArray, key, maxLevel, columnAt, level, li, ind);
          }
        } else {
          if (!isArray) {
            li.appendChild(document.createTextNode(key + ": "));
          } else {
            li.appendChild(document.createTextNode(ind + ": "));
          }
          _this.parseJSON(li, item, maxLevel, columnAt, level + 1);
        }
        if (ind < len) {
          if (_typeof(item) === "object") {
            if (!Array.isArray(item)) {
              li.appendChild(document.createTextNode(","));
            } else {
              li.appendChild(document.createTextNode(","));
            }
          } else {
            li.appendChild(document.createTextNode(","));
          }
        }
        ul.appendChild(li);
      }, this);
      outputParent.appendChild(ul);
    }
  }, {
    key: "parseChildObject",
    value: function parseChildObject(item, isArray, key, maxLevel, columnAt, level, li, ind) {
      if (!item || item instanceof Date) {
        li.appendChild(document.createTextNode(isArray ? "" : key + ": "));
        li.appendChild(this.jsonRenderer.createSimpleViewOf(item ? item : null));
      } else {
        var itemIsArray = Array.isArray(item);
        var itemLen = itemIsArray ? item.length : Object.keys(item).length;
        if (!itemLen) {
          li.appendChild(document.createTextNode((typeof key === "string" ? key : ind) + ": " + (itemIsArray ? "[]" : "{}")));
        } else {
          var itemTitle = (typeof key === "string" ? key + ": " : ind + ": ") + (itemIsArray ? "[" : "{");
          var itemLink = this.jsonRenderer.createLink(itemTitle);
          var itemsCount = this.jsonRenderer.createItemsCount(itemLen);
          if (maxLevel >= 0 && level + 1 >= maxLevel) {
            li.appendChild(document.createTextNode(itemTitle));
          } else {
            itemLink.appendChild(itemsCount);
            li.appendChild(itemLink);
          }
          this.parseJSON(li, item, maxLevel, columnAt, level + 1);
          li.appendChild(document.createTextNode(itemIsArray ? "]" : "}"));
          var list = li.querySelector("ul");
          var itemLinkCb = function itemLinkCb() {
            itemLink.classList.toggle("collapsed");
            itemsCount.classList.toggle("hide");
            list.classList.toggle("hide");
          };
          itemLink.addEventListener("click", itemLinkCb);
          if (columnAt >= 0 && level + 1 >= columnAt) {
            itemLinkCb();
          }
        }
      }
    }
  }, {
    key: "parseChildArray",
    value: function parseChildArray(item, isArray, key, maxLevel, columnAt, level, li, ind) {
      var itemIsArray = Array.isArray(item);
      var itemLen = itemIsArray ? item.length : Object.keys(item).length;
      if (!itemLen) {
        li.appendChild(document.createTextNode((typeof key === "string" ? key : ind) + ": " + (itemIsArray ? "[]" : "{}")));
      } else {
        var itemTitle = (typeof key === "string" ? key + ": " : ind + ": ") + (itemIsArray ? "[" : "{");
        var itemLink = this.jsonRenderer.createLink(itemTitle);
        var itemsCount = this.jsonRenderer.createItemsCount(itemLen);
        if (maxLevel >= 0 && level + 1 >= maxLevel) {
          li.appendChild(document.createTextNode(itemTitle));
        } else {
          itemLink.appendChild(itemsCount);
          li.appendChild(itemLink);
        }
        this.parseJSON(li, item, maxLevel, columnAt, level + 1);
        li.appendChild(document.createTextNode(itemIsArray ? "]" : "}"));
        var list = li.querySelector("ul");
        var itemLinkCb = function itemLinkCb() {
          itemLink.classList.toggle("collapsed");
          itemsCount.classList.toggle("hide");
          list.classList.toggle("hide");
        };
        itemLink.addEventListener("click", itemLinkCb);
        if (columnAt >= 0 && level + 1 >= columnAt) {
          itemLinkCb();
        }
      }
    }
  }, {
    key: "parseValue",
    value: function parseValue(outputParent, value) {
      var spanEl = document.createElement("span");
      var type = _typeof(value);
      var asText = "" + value;
      if ((0, _url.isUrl)(value)) {
        var a = document.createElement("a");
        a.innerText = '"' + value + '"';
        a.href = value;
        a.setAttribute("target", "_blank");
        spanEl.appendChild(a);
      } else {
        if (type === "string") {
          asText = '"' + value + '"';
        } else if (value === null) {
          type = "null";
        }
        spanEl.className = "type-" + type;
        spanEl.textContent = asText;
      }
      outputParent.appendChild(spanEl);
    }
  }]);
  return JsonParser;
}();
exports["default"] = JsonParser;