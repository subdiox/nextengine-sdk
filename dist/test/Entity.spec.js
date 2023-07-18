"use strict";
/* eslint-env mocha */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const assert_1 = __importDefault(require("assert"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const Entity_1 = __importDefault(require("../Entity"));
describe("Entity", () => {
    describe("static get getAsInfo", () => {
        it("must return boolean", () => {
            for (const p in Entity_1.default) {
                const entity = Entity_1.default[p];
                assert_1.default.equal(typeof entity.getAsInfo, "boolean", entity.name);
            }
        });
    });
    describe("static get path", () => {
        it("must starts with slash", () => {
            for (const p in Entity_1.default) {
                const entity = Entity_1.default[p];
                assert_1.default.equal(entity.path[0], "/", entity.name);
            }
        });
        it("must not contain trailing slash", () => {
            for (const p in Entity_1.default) {
                const entity = Entity_1.default[p];
                assert_1.default.notEqual(entity.path.substr(-1), "/", entity.name);
            }
        });
    });
    describe("Entity/*", () => {
        it("must export all entities", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const files = glob_1.default.sync(path_1.default.join(__dirname, "/../Entity/*.ts"));
            for (const file of files) {
                const entityName = path_1.default.basename(file, ".ts");
                if (entityName === "Entity" || entityName === "index") {
                    continue;
                }
                const entity = yield (_a = file, Promise.resolve().then(() => __importStar(require(_a))));
                assert_1.default.ok(Entity_1.default[entityName], entityName);
                assert_1.default.equal(Entity_1.default[entityName], entity, entityName);
            }
        }));
    });
});
