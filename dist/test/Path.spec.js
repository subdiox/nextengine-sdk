"use strict";
/* eslint-env mocha */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Path_1 = __importDefault(require("../lib/Path"));
const ReceiveOrder_1 = __importDefault(require("../Entity/ReceiveOrder"));
describe("Path", () => {
    describe("resolve", () => {
        it("must return path string if string passed", () => {
            assert_1.default.equal(Path_1.default.resolve("hoge", "search"), "/api_v1_hoge/search");
        });
        it("must return path string if Entity passed", () => {
            assert_1.default.equal(Path_1.default.resolve(ReceiveOrder_1.default, "search"), "/api_v1_receiveorder_base/search");
        });
    });
});
