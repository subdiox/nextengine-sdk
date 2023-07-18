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
const Connection_1 = __importDefault(require("./lib/Connection"));
const Query_1 = __importDefault(require("./lib/Query"));
const UploadQueue_1 = __importDefault(require("./Entity/UploadQueue"));
/**
 * Nextengine API for Nodejs
 *
 * @see http://api.next-e.jp
 */
class NextEngine {
    get accessToken() {
        return this.connection.accessToken;
    }
    get refreshToken() {
        return this.connection.refreshToken;
    }
    /**
     * Constructor
     *
     * @param object opts
     *   @param string opts.clientId       client id
     *   @param string opts.clientSecret   client secret
     *   @param string [opts.redirectUri]  (optional)redirect uri
     *   @param string [opts.accessToken]  (optional)access token
     *   @param string [opts.refreshToken] (optional)refresh token
     */
    constructor(opts) {
        this.clientId = opts.clientId;
        this.clientSecret = opts.clientSecret;
        this.redirectUri = opts.redirectUri;
        this.connection = this.getConnection(opts.accessToken, opts.refreshToken);
    }
    /**
     * Send request to Nextengine API
     *
     * @see http://api.next-e.jp/request_url.php
     * @param string path   path of api
     * @param object params request body
     * @return Promise
     */
    request(path, params) {
        return this.connection.request("POST", path, params);
    }
    /**
     * Return Connection instance
     *
     * You can override this method to use custom connection
     *
     * @return Connection
     */
    getConnection(accessToken, refreshToken) {
        return new Connection_1.default(accessToken, refreshToken);
    }
    /**
     * Start query building
     *
     * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
     * @return Query
     */
    query(pathOrEntity) {
        const query = new Query_1.default(this.connection, pathOrEntity);
        return query;
    }
    /**
     * Send {xxx}/create request
     *
     * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
     * @param object params request body
     * @return Promise
     */
    create(pathOrEntity, params) {
        return this.query(pathOrEntity).request(params, "create");
    }
    /**
     * Send {xxx}/update request
     *
     * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
     * @param object params request body
     * @return Promise
     */
    update(pathOrEntity, params) {
        return this.query(pathOrEntity).request(params, "update");
    }
    /**
     * Send {xxx}/update request
     *
     * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
     * @param object params              request body
     * @return Promise
     */
    upload(pathOrEntity, params) {
        return this.query(pathOrEntity).request(params, "upload");
    }
    /**
     * Poll upload queue until specified status
     *
     * @param int   queueId                                                ID of upload queue
     * @param int[] [statuses=[UploadQueue.COMPLETED, UploadQueue.FAILED]] ID of upload status
     * @param int   [interval=5000]                                        Interval of polling
     * @return Promise
     */
    waitFor(queueId, statuses = [UploadQueue_1.default.COMPLETED, UploadQueue_1.default], interval = 5000) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.query(UploadQueue_1.default)
                .where("que_id", "=", queueId)
                .get(["que_status_id"])
                .then((res) => {
                if (statuses.indexOf(res.que_status_id) >= 0) {
                    return Promise.resolve();
                }
                else {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            this.waitFor(queueId, statuses, interval)
                                .then(resolve)
                                .catch(reject);
                        }, interval);
                    });
                }
            });
        });
    }
    /**
     * utility of upload + waitFor
     *
     * @see upload
     * @see waitFor
     * @param string|Entity pathOrEntity
     * @param int[] [statuses] ID of upload status
     * @return Promise
     */
    uploadAndWaitFor(pathOrEntity, params, statuses) {
        return this.upload(pathOrEntity, params).then((res) => this.waitFor(res.que_id, statuses));
    }
    /**
     * Fetch access token and refresh token
     *
     * @param string uid
     * @param string state
     * @return Promise
     */
    authorize(uid, state) {
        return this.request("/api_neauth", {
            uid: uid,
            state: state,
            client_id: this.clientId,
            client_secret: this.clientSecret,
        });
    }
    /**
     * Get authorize screen url
     *
     * @see http://api.next-e.jp/param_uid_state.php
     * @return string url for authorize
     */
    getAuthorizeURL() {
        var _a;
        const params = {
            client_id: this.clientId,
            redirect_uri: (_a = this.redirectUri) !== null && _a !== void 0 ? _a : undefined,
        };
        return `${Connection_1.default.hostPf}/users/sign_in/?${querystring_1.default.stringify(params)}`;
    }
}
exports.default = NextEngine;
