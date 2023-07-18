import qs from "querystring";
import Connection from "./lib/Connection";
import Query from "./lib/Query";
import UploadQueue from "./Entity/UploadQueue";
import Entity from "./Entity/Entity";

interface ConstructorOption {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Nextengine API for Nodejs
 *
 * @see http://api.next-e.jp
 */
class NextEngine {
  public connection: Connection;
  public clientId?: string;
  public clientSecret?: string;
  public redirectUri?: string;

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
  constructor(opts: ConstructorOption) {
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
  request(path: string, params?: any) {
    return this.connection.request("POST", path, params);
  }

  /**
   * Return Connection instance
   *
   * You can override this method to use custom connection
   *
   * @return Connection
   */
  getConnection(accessToken?: string, refreshToken?: string) {
    return new Connection(accessToken, refreshToken);
  }

  /**
   * Start query building
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @return Query
   */
  query(pathOrEntity?: string | Entity) {
    const query = new Query(this.connection, pathOrEntity);

    return query;
  }

  /**
   * Send {xxx}/create request
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @param object params request body
   * @return Promise
   */
  create(pathOrEntity: string | Entity, params: any) {
    return this.query(pathOrEntity).request(params, "create");
  }

  /**
   * Send {xxx}/update request
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @param object params request body
   * @return Promise
   */
  update(pathOrEntity: string | Entity, params: any) {
    return this.query(pathOrEntity).request(params, "update");
  }

  /**
   * Send {xxx}/update request
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @param object params              request body
   * @return Promise
   */
  upload(pathOrEntity: string | Entity, params: any) {
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
  async waitFor(
    queueId: string | number,
    statuses = [UploadQueue.COMPLETED, UploadQueue],
    interval = 5000
  ) {
    return this.query(UploadQueue)
      .where("que_id", "=", queueId)
      .get(["que_status_id"])
      .then((res) => {
        if (statuses.indexOf(res.que_status_id) >= 0) {
          return Promise.resolve();
        } else {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.waitFor(queueId, statuses, interval)
                .then(resolve)
                .catch(reject);
            }, interval);
          });
        }
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
  uploadAndWaitFor(
    pathOrEntity: string | Entity,
    params?: any,
    statuses?: number[]
  ) {
    return this.upload(pathOrEntity, params).then((res) =>
      this.waitFor(res.que_id, statuses)
    );
  }

  /**
   * Fetch access token and refresh token
   *
   * @param string uid
   * @param string state
   * @return Promise
   */
  authorize(uid?: string, state?: string) {
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
    const params = {
      client_id: this.clientId,
      redirect_uri: this.redirectUri ?? undefined,
    };
    return `${Connection.hostPf}/users/sign_in/?${qs.stringify(params)}`;
  }
}

export default NextEngine;
