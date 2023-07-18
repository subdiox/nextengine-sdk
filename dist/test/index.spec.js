"use strict";
/* eslint-env mocha */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const querystring_1 = __importDefault(require("querystring"));
const __1 = __importDefault(require("../"));
const Connection_1 = __importDefault(require("../lib/Connection"));
const Query_1 = __importDefault(require("../lib/Query"));
const Goods_1 = __importDefault(require("../Entity/Goods"));
describe("Nextengine", () => {
    describe("request", () => {
        it("must return Promise", () => {
            const ne = new __1.default({});
            assert_1.default.ok(ne.request("/") instanceof Promise);
        });
    });
    describe("getConnection", () => {
        it("must return instance of Connection", () => {
            const ne = new __1.default({});
            assert_1.default.ok(ne.getConnection() instanceof Connection_1.default);
        });
    });
    describe("query", () => {
        it("must return instance of Query", () => {
            const ne = new __1.default({});
            assert_1.default.ok(ne.query() instanceof Query_1.default);
        });
    });
    describe("create", () => {
        it("must return Promise", () => {
            const ne = new __1.default({});
            assert_1.default.ok(ne.create(Goods_1.default, {}) instanceof Promise);
        });
    });
    describe("update", () => {
        it("must return Promise", () => {
            const ne = new __1.default({});
            assert_1.default.ok(ne.update(Goods_1.default, {}) instanceof Promise);
        });
    });
    describe("upload", () => {
        it("must return Promise", () => {
            const ne = new __1.default({});
            assert_1.default.ok(ne.upload(Goods_1.default, {}) instanceof Promise);
        });
    });
    describe("waitFor", () => {
        it("must return Promise", () => {
            const ne = new __1.default({});
            assert_1.default.ok(ne.waitFor(1) instanceof Promise);
        });
    });
    describe("uploadAndWaitFor", () => {
        it("must return Promise", () => {
            const ne = new __1.default({});
            assert_1.default.ok(ne.uploadAndWaitFor(Goods_1.default) instanceof Promise);
        });
    });
    describe("authorize", () => {
        it("must return Promise", () => {
            const ne = new __1.default({});
            assert_1.default.ok(ne.authorize() instanceof Promise);
        });
    });
    describe("getAuthorizeURL", () => {
        const env = process.env;
        it("must return url with query string client_id", () => {
            const ne = new __1.default({ clientId: env.CLIENT_ID });
            const url = ne.getAuthorizeURL();
            const query = querystring_1.default.parse(url.substr(url.indexOf("?") + 1));
            assert_1.default.ok(!!query.client_id);
            assert_1.default.ok(!query.redirect_uri);
        });
        it("must return url with query string redirect_uri if redirectUri present", () => {
            const ne = new __1.default({ redirectUri: "hoge" });
            const url = ne.getAuthorizeURL();
            const query = querystring_1.default.parse(url.substr(url.indexOf("?") + 1));
            assert_1.default.ok(!!query.redirect_uri);
        });
    });
});
