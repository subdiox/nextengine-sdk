"use strict";
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
const Path_1 = __importDefault(require("./Path"));
const util_1 = __importDefault(require("../lib/util"));
/**
 * Search query builder
 */
class Query {
    static get DEFAULT_LIMIT() {
        return 10000;
    }
    /**
     * @see http://api.next-e.jp/param_count_search.php
     * @return string
     */
    static get DELIMITER_FIELD() {
        return ",";
    }
    /**
     * @param Connection    connection      Instance of Connection
     * @param string|Entity pathOrEntity    Search path or Entity
     * @param object[]      [conditions=[]] List of query condition
     * @param object        [opts={}]       Limit, offset, ...
     */
    constructor(connection, pathOrEntity, conditions = [], opts = {}) {
        this.connection = undefined;
        this.pathOrEntity = undefined;
        this.connection = connection;
        this.pathOrEntity = pathOrEntity;
        this.conditions = conditions;
        this.opts = opts;
    }
    /**
     * Return number of result data
     *
     * @return Promise
     */
    count() {
        return this.fetch([], "count").then((0, util_1.default)("count"));
    }
    /**
     * Fetch query result
     *
     * @param string[] List of field
     * @return Promise
     */
    get(fields = []) {
        return this.fetch(fields, "search").then((0, util_1.default)("data"));
    }
    /**
     * Fetch query result in batch
     *
     * @see get
     * @param function iteratee Callback function
     * @return Promise resolve when all callbacks are finished
     */
    getInBatches(fields = [], iteratee) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = this.opts.limit || Query.DEFAULT_LIMIT;
            const offset = this.opts.offset || 0;
            return this.limit(limit)
                .offset(offset)
                .fetch(fields, "search")
                .then((partial) => {
                if (partial.length > 0) {
                    if (!iteratee) {
                        return partial;
                    }
                    return iteratee(partial).then(() => this.offset(offset).getInBatches(fields, iteratee));
                }
            });
        });
    }
    /**
     * Set limit to query condition
     *
     * @param int limit
     * @return Query New instance of Query
     */
    limit(limit) {
        const opts = Object.assign({}, this.opts, { limit: limit });
        return new Query(this.connection, this.pathOrEntity, this.conditions, opts);
    }
    /**
     * Set offset to query condition
     *
     * @param int offset
     * @return Query New instance of Query
     */
    offset(offset) {
        const opts = Object.assign({}, this.opts, { offset });
        return new Query(this.connection, this.pathOrEntity, this.conditions, opts);
    }
    /**
     * Set where to query condition
     *
     * @see toOperator
     * @param string field    One of field
     * @param string operator One of operator
     * @param string value
     * @return Query New instance of Query
     */
    where(field, operator, value) {
        const condition = { field, operator, value };
        const conditions = this.conditions.concat([condition]);
        return new Query(this.connection, this.pathOrEntity, conditions, this.opts);
    }
    /**
     * Prepare for API request
     *
     * @param string[] fields List of field
     * @param string   suffix /api_v1_xxx/{XXX} <-
     * @return Promise
     */
    fetch(fields, suffix = "") {
        const where = this.toParameter();
        const params = Object.assign(where, { fields });
        if (params.fields) {
            params.fields = fields.join(Query.DELIMITER_FIELD);
        }
        return this.request(params, suffix);
    }
    /**
     * Execute API request
     *
     * @param object params Request parameters
     * @param string suffix /api_v1_xxx/{XXX} <-
     * @return Promise
     */
    request(params, suffix = "") {
        if (!this.pathOrEntity || !this.connection) {
            return Promise.reject(null);
        }
        const path = Path_1.default.resolve(this.pathOrEntity, suffix);
        return this.connection.request("POST", path, params);
    }
    toOperator(operator) {
        switch (operator.toLowerCase()) {
            case "=":
                return "eq";
            case "!=":
            case "<>":
                return "neq";
            case ">":
                return "gt";
            case ">=":
                return "gte";
            case "<":
                return "lt";
            case "<=":
                return "lte";
            case "in":
                return "in";
            case "not in":
                return "nin";
            case "like":
                return "like";
            case "not like":
                return "nlike";
            case "is null":
                return "null";
            case "is not null":
                return "nnull";
            case "is blank":
                return "blank";
            case "is not blank":
                return "nblank";
            default:
                throw new Error("Unknown operator: " + operator);
        }
    }
    toParameter() {
        const where = this.conditions.reduce((acc, condition) => {
            const { field, operator, value } = condition;
            acc[`${field}-${this.toOperator(operator)}`] = value;
            return acc;
        }, {});
        return Object.assign(where, this.opts);
    }
}
exports.default = Query;
