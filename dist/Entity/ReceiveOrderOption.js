"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("./Entity"));
class ReceiveOrderOption extends Entity_1.default {
    static get getAsInfo() {
        return false;
    }
    static get path() {
        return "/api_v1_receiveorder_option";
    }
}
exports.default = ReceiveOrderOption;
