"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterValue = filterValue;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function filterValue(jsonViewer, filter) {
  if (!filter) {
    return;
  }
  var data = jsonViewer.json;
  var filterArray = filter.split("/");
  if (filterArray[0] === jsonViewer.getRoot() || filterArray[0] === "") {
    filterArray.splice(0, 1);
    if (filterArray[0] === jsonViewer.getRoot()) {
      filterArray.splice(0, 1);
    }
  }
  if (filterArray[filterArray.length - 1] === "") {
    filterArray.splice(filterArray.length - 1, 1);
  }
  filterArray.forEach(function (filter) {
    data = data[filter];
  });
  if (_typeof(data) === "object") {
    jsonViewer.setRoot(filterArray[filterArray.length - 1]);
  } else {
    jsonViewer.setRoot("");
    data = _defineProperty({}, filterArray[filterArray.length - 1], data);
  }
  if (!data) {
    jsonViewer.setRoot("Error");
    data = {
      404: "Data Not Found"
    };
  }
  jsonViewer.setJSON(data);
}