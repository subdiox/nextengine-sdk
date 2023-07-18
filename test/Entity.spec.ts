/* eslint-env mocha */

import assert from "assert";
import path from "path";
import glob from "glob";
import entities from "../Entity";

describe("Entity", () => {
  describe("static get getAsInfo", () => {
    it("must return boolean", () => {
      for (const p in entities) {
        const entity = (entities as any)[p];
        assert.equal(typeof entity.getAsInfo, "boolean", entity.name);
      }
    });
  });

  describe("static get path", () => {
    it("must starts with slash", () => {
      for (const p in entities) {
        const entity = (entities as any)[p];
        assert.equal(entity.path[0], "/", entity.name);
      }
    });

    it("must not contain trailing slash", () => {
      for (const p in entities) {
        const entity = (entities as any)[p];
        assert.notEqual(entity.path.substr(-1), "/", entity.name);
      }
    });
  });

  describe("Entity/*", () => {
    it("must export all entities", async () => {
      const files = glob.sync(path.join(__dirname, "/../Entity/*.ts"));
      for (const file of files) {
        const entityName = path.basename(file, ".ts");
        if (entityName === "Entity" || entityName === "index") {
          continue;
        }

        const entity = await import(file);
        assert.ok((entities as any)[entityName], entityName);
        assert.equal((entities as any)[entityName], entity, entityName);
      }
    });
  });
});
