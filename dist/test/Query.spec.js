"use strict";
/* eslint-env mocha */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Query_1 = __importDefault(require("../lib/Query"));
const Connection_1 = __importDefault(require("../lib/Connection"));
describe("Query", () => {
    describe("get DEFAULT_LIMIT", () => {
        it("must be 10000", () => {
            assert_1.default.equal(Query_1.default.DEFAULT_LIMIT, 10000);
        });
    });
    describe("count", () => {
        it("must return Promise", () => {
            const conn = new Connection_1.default();
            const q = new Query_1.default(conn, "xxx");
            assert_1.default.ok(q.count() instanceof Promise);
        });
    });
    describe("get", () => {
        it("must return Promise", () => {
            const conn = new Connection_1.default();
            const q = new Query_1.default(conn, "xxx");
            assert_1.default.ok(q.get() instanceof Promise);
        });
    });
    describe("getInBatches", () => {
        it("must return Promise", () => {
            const conn = new Connection_1.default();
            const q = new Query_1.default(conn, "xxx");
            assert_1.default.ok(q.getInBatches() instanceof Promise);
        });
    });
    describe("limit", () => {
        it("must return fresh instance of Query", () => {
            const q = new Query_1.default();
            assert_1.default.notStrictEqual(q, q.limit(10));
        });
        it("must have limit option", () => {
            const expected = 9999;
            const q = new Query_1.default().limit(expected);
            assert_1.default.equal(q.opts.limit, expected);
        });
    });
    describe("offset", () => {
        it("must return fresh instance of Query", () => {
            const q = new Query_1.default();
            assert_1.default.notStrictEqual(q, q.offset(100));
        });
        it("must have offset option", () => {
            const expected = 9999;
            const q = new Query_1.default().offset(expected);
            assert_1.default.equal(q.opts.offset, expected);
        });
    });
    describe("where", () => {
        it("must return fresh instance of Query", () => {
            const q = new Query_1.default();
            assert_1.default.notStrictEqual(q, q.where("", "", ""));
        });
        it("must inherit exists conditions", () => {
            const q = new Query_1.default().where("hoge", "=", "xxx").where("foo", ">", 100);
            assert_1.default.deepEqual(q.conditions, [
                ["hoge", "=", "xxx"],
                ["foo", ">", 100],
            ]);
        });
    });
    describe("fetch", () => {
        it("must return Promise", () => {
            const conn = new Connection_1.default();
            const q = new Query_1.default(conn, "xxx");
            assert_1.default.ok(q.fetch([]) instanceof Promise);
        });
    });
    describe("request", () => {
        it("must return Promise", () => {
            const conn = new Connection_1.default();
            const q = new Query_1.default(conn, "xxx");
            assert_1.default.ok(q.request({}, "") instanceof Promise);
        });
    });
    describe("toOperator", () => {
        it("must return eq if operator is `=`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("eq", q.toOperator("="));
        });
        it("must return neq if operator is `!=`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("neq", q.toOperator("!="));
        });
        it("must return neq if operator is `<>`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("neq", q.toOperator("<>"));
        });
        it("must return gt if operator is `>`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("gt", q.toOperator(">"));
        });
        it("must return gte if operator is `>=`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("gte", q.toOperator(">="));
        });
        it("must return lt if operator is `<`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("lt", q.toOperator("<"));
        });
        it("must return lte if operator is `<=`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("lte", q.toOperator("<="));
        });
        it("must return in if operator is `IN`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("in", q.toOperator("IN"));
        });
        it("must return null if operator is `IS NULL`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("null", q.toOperator("IS NULL"));
        });
        it("must return nnull if operator is `IS NOT NULL`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("nnull", q.toOperator("IS NOT NULL"));
        });
        it("must return blank if operator is `IS BLANK`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("blank", q.toOperator("IS BLANK"));
        });
        it("must return nblank if operator is `NOT IS BLANK`", () => {
            const q = new Query_1.default();
            assert_1.default.equal("nblank", q.toOperator("IS NOT BLANK"));
        });
        it("must throw Error if mapping not exists", () => {
            const q = new Query_1.default();
            assert_1.default.throws(() => {
                q.toOperator("xxx");
            });
        });
    });
    describe("toParameter", () => {
        it("must return Object", () => {
            const q = new Query_1.default();
            assert_1.default.equal(typeof q.toParameter(), "object");
        });
        it("must have limit if limit present", () => {
            const q = new Query_1.default().limit(1);
            const ret = q.toParameter();
            assert_1.default.ok("limit" in ret);
        });
        it("must have offset if offset present", () => {
            const q = new Query_1.default().offset(1);
            const ret = q.toParameter();
            assert_1.default.ok("offset" in ret);
        });
        it("must have all filter parameters", () => {
            const q = new Query_1.default()
                .where("hoge", "IN", [1, 2, 3])
                .where("foo", "<>", 300);
            const ret = q.toParameter();
            assert_1.default.ok("hoge-in" in ret);
            assert_1.default.ok("foo-neq" in ret);
        });
    });
});
