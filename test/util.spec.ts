/* eslint-env mocha */

import assert from "assert";
import digg from "../lib/util";

describe("util", () => {
  describe("digg", () => {
    it("must call object-path.get", () => {
      const expected = 100;
      const fn = digg("a.b.c");

      assert.equal(fn({ a: { b: { c: expected } } }), expected);
    });
  });
});
