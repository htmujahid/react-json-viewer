"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./JsonViewer.css");
var JsonViewer_1 = require("../core/JsonViewer");
function ReactJsonViewer(_a) {
    var data = _a.data, root = _a.root, filter = _a.filter, maxLevel = _a.maxLevel, columnAt = _a.columnAt;
    var jsonRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!document) {
            return;
        }
        var jsonViewerFactory = new JsonViewer_1.JSONViewerFactory();
        var jsonViewer = jsonViewerFactory.createJSONViewer({
            json: data,
            root: root !== null && root !== void 0 ? root : "",
            filter: filter !== null && filter !== void 0 ? filter : "",
            maxLevel: maxLevel !== null && maxLevel !== void 0 ? maxLevel : -1,
            columnAt: columnAt !== null && columnAt !== void 0 ? columnAt : -1,
        });
        jsonRef.current.appendChild(jsonViewer.getJSONContainer());
    }, []);
    return (0, jsx_runtime_1.jsx)("div", { ref: jsonRef });
}
exports.default = ReactJsonViewer;
//# sourceMappingURL=ReactJsonViewer.js.map