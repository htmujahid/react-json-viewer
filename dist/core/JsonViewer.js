"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.JSONViewerFactory = void 0;
var _filter = require("../utils/filter");
var _JsonParser = _interopRequireDefault(require("./JsonParser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var JSONViewerFactory = /*#__PURE__*/function () {
  function JSONViewerFactory() {
    _classCallCheck(this, JSONViewerFactory);
  }
  _createClass(JSONViewerFactory, [{
    key: "createJSONViewer",
    value: function createJSONViewer(_ref) {
      var json = _ref.json,
        root = _ref.root,
        filter = _ref.filter,
        maxLevel = _ref.maxLevel,
        columnAt = _ref.columnAt;
      var jsonViewer = new JsonViewer();
      jsonViewer.setJSON(json);
      jsonViewer.setRoot(root);
      jsonViewer.setMaxLevel(maxLevel);
      jsonViewer.setColumnAt(columnAt);
      (0, _filter.filterValue)(jsonViewer, filter);
      jsonViewer.init();
      return jsonViewer;
    }
  }]);
  return JSONViewerFactory;
}();
exports.JSONViewerFactory = JSONViewerFactory;
var JsonViewer = /*#__PURE__*/function () {
  function JsonViewer() {
    _classCallCheck(this, JsonViewer);
    this.root = "";
    this.jsonContainer = document.createElement("pre");
    this.jsonContainer.classList.add("json-viewer");
    this.maxLevel = -1;
    this.columnAt = -1;
  }
  _createClass(JsonViewer, [{
    key: "init",
    value: function init() {
      this.jsonContainer.innerHTML = "";
      var jsonParser = new _JsonParser["default"]();
      jsonParser.parseJSON(this.jsonContainer, this.json, this.maxLevel, this.columnAt, 0, this.root);
    }
  }, {
    key: "setJSON",
    value: function setJSON(json) {
      this.json = json;
    }
  }, {
    key: "setRoot",
    value: function setRoot(root) {
      this.root = root;
    }
  }, {
    key: "setMaxLevel",
    value: function setMaxLevel(maxLvl) {
      this.maxLevel = maxLvl;
    }
  }, {
    key: "setColumnAt",
    value: function setColumnAt(colAt) {
      this.columnAt = colAt;
    }
  }, {
    key: "getJSON",
    value: function getJSON() {
      return this.json;
    }
  }, {
    key: "getRoot",
    value: function getRoot() {
      return this.root;
    }
  }, {
    key: "getMaxLevel",
    value: function getMaxLevel() {
      return this.maxLevel;
    }
  }, {
    key: "getColumnAt",
    value: function getColumnAt() {
      return this.columnAt;
    }
  }, {
    key: "getJSONContainer",
    value: function getJSONContainer() {
      return this.jsonContainer;
    }
  }]);
  return JsonViewer;
}();
exports["default"] = JsonViewer;