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
const querystring_1 = __importDefault(require("querystring"));
const ConnectionError_1 = __importDefault(require("./ConnectionError"));
class Connection {
    static get host() {
        return "https://api.next-engine.org";
    }
    static get hostPf() {
        return "https://base.next-engine.org";
    }
    static get defaultOptions() {
        return {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip,deflate",
            },
        };
    }
    /**
     *
     */
    constructor(accessToken, refreshToken) {
        this.accessToken = undefined;
        this.refreshToken = undefined;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    /**
     * @param string        method XXX
     * @param string|Entity path   XXX
     * @param object        params XXX
     * @return Promise
     */
    request(method, path, params = {}) {
        if (this.accessToken) {
            params.access_token = this.accessToken;
            params.refresh_token = this.refreshToken;
        }
        const url = Connection.host + path;
        const opts = Object.assign(Connection.defaultOptions, {
            method: method,
            body: querystring_1.default.stringify(params),
        });
        return fetch(url, opts).then(this.handleResponse.bind(this));
    }
    handleResponse(res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res
                .json()
                .then((json) => {
                this.accessToken = json.access_token;
                this.refreshToken = json.refresh_token;
                return json;
            })
                .then((json) => {
                if (json.result === "success") {
                    return Promise.resolve(json);
                }
                else {
                    return Promise.reject(new ConnectionError_1.default(json.message, json.code, json));
                }
            });
        });
    }
}
exports.default = Connection;
