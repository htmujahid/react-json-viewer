"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrl = void 0;
function isUrl(path) {
    var reg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return reg.test(path);
}
exports.isUrl = isUrl;
//# sourceMappingURL=url.js.map