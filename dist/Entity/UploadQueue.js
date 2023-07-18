"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("./Entity"));
class UploadQueue extends Entity_1.default {
    static get COMPLETED() {
        return 2;
    }
    static get FAILED() {
        return -1;
    }
    static get IN_PROGRESS() {
        return 1;
    }
    static get getAsInfo() {
        return false;
    }
    static get path() {
        return "/api_v1_system_que";
    }
}
exports.default = UploadQueue;
