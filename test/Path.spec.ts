/* eslint-env mocha */

import assert from "assert";
import Path from "../lib/Path";
import ReceiveOrder from "../Entity/ReceiveOrder";

describe("Path", () => {
  describe("resolve", () => {
    it("must return path string if string passed", () => {
      assert.equal(Path.resolve("hoge", "search"), "/api_v1_hoge/search");
    });
    it("must return path string if Entity passed", () => {
      assert.equal(
        Path.resolve(ReceiveOrder, "search"),
        "/api_v1_receiveorder_base/search"
      );
    });
  });
});
