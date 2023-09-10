"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterValue = void 0;
function filterValue(jsonViewer, filter) {
    var _a;
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
    if (typeof data === "object") {
        jsonViewer.setRoot(filterArray[filterArray.length - 1]);
    }
    else {
        jsonViewer.setRoot("");
        data = (_a = {},
            _a[filterArray[filterArray.length - 1]] = data,
            _a);
    }
    if (!data) {
        jsonViewer.setRoot("Error");
        data = {
            404: "Data Not Found",
        };
    }
    jsonViewer.setJSON(data);
}
exports.filterValue = filterValue;
//# sourceMappingURL=filter.js.map