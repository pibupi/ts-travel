"use strict";
exports.__esModule = true;
var arrayMap = require("../dist/test-array-map-dd");
var res = arrayMap([1, 2], function (item) {
    return item + 2;
});
console.log(res);
