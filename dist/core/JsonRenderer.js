"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _url = require("../utils/url");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var JsonRenderer = /*#__PURE__*/function () {
  function JsonRenderer() {
    _classCallCheck(this, JsonRenderer);
  }
  _createClass(JsonRenderer, [{
    key: "createSimpleViewOf",
    value: function createSimpleViewOf(value) {
      var spanEl = document.createElement("span");
      var type = _typeof(value);
      var asText = "" + value;
      if ((0, _url.isUrl)(value)) {
        var a = document.createElement("a");
        a.innerText = '"' + value + '"';
        a.href = "https://www.google.com";
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
      return spanEl;
    }
  }, {
    key: "createItemsCount",
    value: function createItemsCount(count) {
      var itemsCount = document.createElement("span");
      itemsCount.className = "items-ph hide";
      itemsCount.innerHTML = this.getItemsTitle(count);
      return itemsCount;
    }
  }, {
    key: "createLink",
    value: function createLink(title) {
      var linkElement = document.createElement("a");
      linkElement.classList.add("list-link");
      linkElement.href = "javascript:void(0)";
      linkElement.innerHTML = title || "";
      return linkElement;
    }
  }, {
    key: "getItemsTitle",
    value: function getItemsTitle(count) {
      var itemsTxt = count > 1 || count === 0 ? "items" : "item";
      return count + " " + itemsTxt;
    }
  }]);
  return JsonRenderer;
}();
exports["default"] = JsonRenderer;