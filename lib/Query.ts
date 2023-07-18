import Path from "./Path";
import digg from "../lib/util";
import Connection from "./Connection";
import Entity from "../Entity/Entity";

interface Condition {
  field: string;
  operator: string;
  value: string | number | string[] | number[];
}

/**
 * Search query builder
 */
class Query {
  public connection?: Connection = undefined;
  public pathOrEntity?: string | Entity = undefined;
  public conditions: Condition[];
  public opts: any;

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
  constructor(
    connection?: Connection,
    pathOrEntity?: string | Entity,
    conditions: Condition[] = [],
    opts: any = {}
  ) {
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
    return this.fetch([], "count").then(digg("count"));
  }

  /**
   * Fetch query result
   *
   * @param string[] List of field
   * @return Promise
   */
  get(fields: string[] = []) {
    return this.fetch(fields, "search").then(digg("data"));
  }

  /**
   * Fetch query result in batch
   *
   * @see get
   * @param function iteratee Callback function
   * @return Promise resolve when all callbacks are finished
   */
  async getInBatches(fields: string[] = [], iteratee?: (partial: any) => any) {
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
          return iteratee(partial).then(() =>
            this.offset(offset).getInBatches(fields, iteratee)
          );
        }
      });
  }

  /**
   * Set limit to query condition
   *
   * @param int limit
   * @return Query New instance of Query
   */
  limit(limit: number) {
    const opts = Object.assign({}, this.opts, { limit: limit });
    return new Query(this.connection, this.pathOrEntity, this.conditions, opts);
  }

  /**
   * Set offset to query condition
   *
   * @param int offset
   * @return Query New instance of Query
   */
  offset(offset: number) {
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
  where(
    field: string,
    operator: string,
    value: string | number | string[] | number[]
  ) {
    const condition: Condition = { field, operator, value };
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
  fetch(fields: string[], suffix: string = "") {
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
  request(params: any, suffix: string = "") {
    if (!this.pathOrEntity || !this.connection) {
      return Promise.reject(null);
    }
    const path = Path.resolve(this.pathOrEntity, suffix);

    return this.connection.request("POST", path, params);
  }

  toOperator(operator: string): string {
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
    const where = this.conditions.reduce((acc: any, condition) => {
      const { field, operator, value } = condition;
      acc[`${field}-${this.toOperator(operator)}`] = value;
      return acc;
    }, {});

    return Object.assign(where, this.opts);
  }
}

export default Query;
