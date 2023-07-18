/* eslint-env mocha */

import assert from "assert";
import sinon from "sinon";
import Connection from "../lib/Connection";

describe("Connection", () => {
  describe("get HOST", () => {
    it("must return url formatted string", () => {
      assert.ok(typeof Connection.host === "string");
    });
  });

  describe("get HOST_PF", () => {
    it("must return url formatted string", () => {
      assert.ok(typeof Connection.hostPf === "string");
    });
  });

  describe("get DEFAULT_OPTIONS", () => {
    it("must return object", () => {
      assert.ok(typeof Connection.defaultOptions === "object");
    });
  });

  describe("request", () => {
    it("must return Promise", () => {
      const conn = new Connection();
      assert.ok(conn.request("POST", "/") instanceof Promise);
    });
    it("must call handleResponse if Promise fulfilled", () => {
      const conn = new Connection();
      sinon.stub(conn, "handleResponse");

      return conn
        .request("POST", "/")
        .then(() => assert.ok(conn.handleResponse));
    });
  });

  describe("handleResponse", () => {
    it("must return Promise", async () => {
      const conn = new Connection();
      const res = await fetch("/");
      assert.ok(conn.handleResponse(res) instanceof Promise);
    });
  });
});
