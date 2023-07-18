"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class Path {
    static resolve(pathOrEntity, suffix) {
        if (typeof pathOrEntity === "string") {
            return `/api_v1_${pathOrEntity}/${suffix}`;
        }
        else if (suffix === "search") {
            return path_1.default.join(pathOrEntity.path, pathOrEntity.getAsInfo ? "info" : suffix);
        }
        else {
            return path_1.default.join(pathOrEntity.path, suffix);
        }
    }
}
exports.default = Path;
