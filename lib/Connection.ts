import qs from "querystring";
import ConnectionError from "./ConnectionError";

class Connection {
  public accessToken?: string = undefined;
  public refreshToken?: string = undefined;

  static get host(): string {
    return "https://api.next-engine.org";
  }

  static get hostPf(): string {
    return "https://base.next-engine.org";
  }

  static get defaultOptions(): object {
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
  constructor(accessToken?: string, refreshToken?: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  /**
   * @param string        method XXX
   * @param string|Entity path   XXX
   * @param object        params XXX
   * @return Promise
   */
  request(
    method: string,
    path: string,
    params: { access_token?: string; refresh_token?: string } = {}
  ): Promise<any> {
    if (this.accessToken) {
      params.access_token = this.accessToken;
      params.refresh_token = this.refreshToken;
    }

    const url = Connection.host + path;
    const opts = Object.assign(Connection.defaultOptions, {
      method: method,
      body: qs.stringify(params),
    });

    return fetch(url, opts).then(this.handleResponse.bind(this));
  }

  async handleResponse(res: any): Promise<any> {
    return res
      .json()
      .then((json: any) => {
        this.accessToken = json.access_token;
        this.refreshToken = json.refresh_token;

        return json;
      })
      .then((json: any) => {
        if (json.result === "success") {
          return Promise.resolve(json);
        } else {
          return Promise.reject(
            new ConnectionError(json.message, json.code, json)
          );
        }
      });
  }
}

export default Connection;
