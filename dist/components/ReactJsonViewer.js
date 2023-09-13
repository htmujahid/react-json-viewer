"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ReactJsonViewer;
var _react = require("react");
require("./JsonViewer.css");
var _JsonViewer2 = require("../core/JsonViewer");
function ReactJsonViewer(_ref) {
  var data = _ref.data,
    root = _ref.root,
    filter = _ref.filter,
    maxLevel = _ref.maxLevel,
    columnAt = _ref.columnAt;
  var jsonRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (!document) {
      return;
    }
    var jsonViewerFactory = new _JsonViewer2.JSONViewerFactory();
    var jsonViewer = jsonViewerFactory.createJSONViewer({
      json: data,
      root: root !== null && root !== void 0 ? root : "",
      filter: filter !== null && filter !== void 0 ? filter : "",
      maxLevel: maxLevel !== null && maxLevel !== void 0 ? maxLevel : -1,
      columnAt: columnAt !== null && columnAt !== void 0 ? columnAt : -1
    });
    jsonRef.current.appendChild(jsonViewer.getJSONContainer());
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: jsonRef
  });
}