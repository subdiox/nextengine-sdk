"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_path_1 = require("object-path");
const digg = (path) => (obj) => {
    return (0, object_path_1.get)(obj, path);
};
exports.default = digg;
