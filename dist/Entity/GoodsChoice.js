"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("./Entity"));
class GoodsChoice extends Entity_1.default {
    static get getAsInfo() {
        return true;
    }
    static get path() {
        return "/api_v1_system_select";
    }
}
exports.default = GoodsChoice;
