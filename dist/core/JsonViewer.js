"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONViewerFactory = void 0;
var filter_1 = require("../utils/filter");
var JsonParser_1 = __importDefault(require("./JsonParser"));
var JSONViewerFactory = /** @class */ (function () {
    function JSONViewerFactory() {
    }
    JSONViewerFactory.prototype.createJSONViewer = function (_a) {
        var json = _a.json, root = _a.root, filter = _a.filter, maxLevel = _a.maxLevel, columnAt = _a.columnAt;
        var jsonViewer = new JsonViewer();
        jsonViewer.setJSON(json);
        jsonViewer.setRoot(root);
        jsonViewer.setMaxLevel(maxLevel);
        jsonViewer.setColumnAt(columnAt);
        (0, filter_1.filterValue)(jsonViewer, filter);
        jsonViewer.init();
        return jsonViewer;
    };
    return JSONViewerFactory;
}());
exports.JSONViewerFactory = JSONViewerFactory;
var JsonViewer = /** @class */ (function () {
    function JsonViewer() {
        this.root = "";
        this.jsonContainer = document.createElement("pre");
        this.jsonContainer.classList.add("json-viewer");
        this.maxLevel = -1;
        this.columnAt = -1;
    }
    JsonViewer.prototype.init = function () {
        this.jsonContainer.innerHTML = "";
        var jsonParser = new JsonParser_1.default();
        jsonParser.parseJSON(this.jsonContainer, this.json, this.maxLevel, this.columnAt, 0, this.root);
    };
    JsonViewer.prototype.setJSON = function (json) {
        this.json = json;
    };
    JsonViewer.prototype.setRoot = function (root) {
        this.root = root;
    };
    JsonViewer.prototype.setMaxLevel = function (maxLvl) {
        this.maxLevel = maxLvl;
    };
    JsonViewer.prototype.setColumnAt = function (colAt) {
        this.columnAt = colAt;
    };
    JsonViewer.prototype.getJSON = function () {
        return this.json;
    };
    JsonViewer.prototype.getRoot = function () {
        return this.root;
    };
    JsonViewer.prototype.getMaxLevel = function () {
        return this.maxLevel;
    };
    JsonViewer.prototype.getColumnAt = function () {
        return this.columnAt;
    };
    JsonViewer.prototype.getJSONContainer = function () {
        return this.jsonContainer;
    };
    return JsonViewer;
}());
exports.default = JsonViewer;
//# sourceMappingURL=JsonViewer.js.map