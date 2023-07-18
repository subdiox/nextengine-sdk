"use strict";
/* eslint-env mocha */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const util_1 = __importDefault(require("../lib/util"));
describe("util", () => {
    describe("digg", () => {
        it("must call object-path.get", () => {
            const expected = 100;
            const fn = (0, util_1.default)("a.b.c");
            assert_1.default.equal(fn({ a: { b: { c: expected } } }), expected);
        });
    });
});
