"use strict";
/* eslint-env mocha */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const sinon_1 = __importDefault(require("sinon"));
const Connection_1 = __importDefault(require("../lib/Connection"));
describe("Connection", () => {
    describe("get HOST", () => {
        it("must return url formatted string", () => {
            assert_1.default.ok(typeof Connection_1.default.host === "string");
        });
    });
    describe("get HOST_PF", () => {
        it("must return url formatted string", () => {
            assert_1.default.ok(typeof Connection_1.default.hostPf === "string");
        });
    });
    describe("get DEFAULT_OPTIONS", () => {
        it("must return object", () => {
            assert_1.default.ok(typeof Connection_1.default.defaultOptions === "object");
        });
    });
    describe("request", () => {
        it("must return Promise", () => {
            const conn = new Connection_1.default();
            assert_1.default.ok(conn.request("POST", "/") instanceof Promise);
        });
        it("must call handleResponse if Promise fulfilled", () => {
            const conn = new Connection_1.default();
            sinon_1.default.stub(conn, "handleResponse");
            return conn
                .request("POST", "/")
                .then(() => assert_1.default.ok(conn.handleResponse));
        });
    });
    describe("handleResponse", () => {
        it("must return Promise", () => __awaiter(void 0, void 0, void 0, function* () {
            const conn = new Connection_1.default();
            const res = yield fetch("/");
            assert_1.default.ok(conn.handleResponse(res) instanceof Promise);
        }));
    });
});
